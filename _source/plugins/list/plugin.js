/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @file Insert and remove numbered and bulleted lists.
 */

(function()
{
	var listNodeNames = { ol : 1, ul : 1 },
		emptyTextRegex = /^[\n\r\t ]*$/;

	CKEDITOR.plugins.list = {
		/*
		 * Convert a DOM list tree into a data structure that is easier to
		 * manipulate. This operation should be non-intrusive in the sense that it
		 * does not change the DOM tree, with the exception that it may add some
		 * markers to the list item nodes when database is specified.
		 */
		listToArray : function( listNode, database, baseArray, baseIndentLevel, grandparentNode )
		{
			if ( !listNodeNames[ listNode.getName() ] )
				return [];

			if ( !baseIndentLevel )
				baseIndentLevel = 0;
			if ( !baseArray )
				baseArray = [];

			// Iterate over all list items to get their contents and look for inner lists.
			for ( var i = 0, count = listNode.getChildCount() ; i < count ; i++ )
			{
				var listItem = listNode.getChild( i );

				// It may be a text node or some funny stuff.
				if ( listItem.$.nodeName.toLowerCase() != 'li' )
					continue;
				var itemObj = { 'parent' : listNode, indent : baseIndentLevel, contents : [] };
				if ( !grandparentNode )
				{
					itemObj.grandparent = listNode.getParent();
					if ( itemObj.grandparent && itemObj.grandparent.$.nodeName.toLowerCase() == 'li' )
						itemObj.grandparent = itemObj.grandparent.getParent();
				}
				else
					itemObj.grandparent = grandparentNode;

				if ( database )
					CKEDITOR.dom.element.setMarker( database, listItem, 'listarray_index', baseArray.length );
				baseArray.push( itemObj );

				for ( var j = 0, itemChildCount = listItem.getChildCount() ; j < itemChildCount ; j++ )
				{
					var child = listItem.getChild( j );
					if ( child.type == CKEDITOR.NODE_ELEMENT && listNodeNames[ child.getName() ] )
						// Note the recursion here, it pushes inner list items with
						// +1 indentation in the correct order.
						CKEDITOR.plugins.list.listToArray( child, database, baseArray, baseIndentLevel + 1, itemObj.grandparent );
					else
						itemObj.contents.push( child );
				}
			}
			return baseArray;
		},

		// Convert our internal representation of a list back to a DOM forest.
		arrayToList : function( listArray, database, baseIndex, paragraphMode )
		{
			if ( !baseIndex )
				baseIndex = 0;
			if ( !listArray || listArray.length < baseIndex + 1 )
				return null;
			var doc = listArray[ baseIndex ].parent.getDocument(),
				retval = new CKEDITOR.dom.documentFragment( doc ),
				rootNode = null,
				currentIndex = baseIndex,
				indentLevel = Math.max( listArray[ baseIndex ].indent, 0 ),
				currentListItem = null;
			while ( true )
			{
				var item = listArray[ currentIndex ];
				if ( item.indent == indentLevel )
				{
					if ( !rootNode || listArray[ currentIndex ].parent.getName() != rootNode.getName() )
					{
						rootNode = listArray[ currentIndex ].parent.clone( false );
						retval.append( rootNode );
					}
					currentListItem = rootNode.append( doc.createElement( 'li' ) );
					for ( var i = 0 ; i < item.contents.length ; i++ )
						currentListItem.append( item.contents[i].clone( true ) );
					currentIndex++;
				}
				else if ( item.indent == Math.max( indentLevel, 0 ) + 1 )
				{
					var listData = CKEDITOR.plugins.list.arrayToList( listArray, null, currentIndex, paragraphMode );
					currentListItem.append( listData.listNode );
					currentIndex = listData.nextIndex;
				}
				else if ( item.indent == -1 && baseIndex == 0 && item.grandparent )
				{
					var currentListItem;
					if ( listNodeNames[ item.grandparent.getName() ] )
						currentListItem = doc.createElement( 'li' );
					else
					{
						if ( paragraphMode != 'br' && item.grandparent.getName() != 'td' )
							currentListItem = doc.createElement( paragraphMode );
						else
							currentListItem = new CKEDITOR.dom.documentFragment( doc );
					}

					for ( var i = 0 ; i < item.contents.length ; i++ )
						currentListItem.append( item.contents[i].clone( true ) );

					if ( currentListItem.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT )
					{
						if ( currentListItem.getLast()
								&& currentListItem.getLast().type == CKEDITOR.NODE_ELEMENT
								&& currentListItem.getLast().getAttribute( 'type' ) == '_moz' )
							currentListItem.getLast().remove();
						currentListItem.append( doc.createElement( 'br' ) );
					}

					if ( currentListItem.getName() == paragraphMode && currentListItem.$.firstChild )
					{
						currentListItem.trim();
						var firstChild = currentListItem.getFirst();
						if ( firstChild.type == CKEDITOR.NODE_ELEMENT && firstChild.isBlockBoundary() )
						{
							var tmp = new CKEDITOR.dom.documentFragment( doc );
							currentListItem.moveChildren( tmp );
							currentListItem = tmp;
						}
					}

					var currentListItemName = currentListItem.$.nodeName.toLowerCase();
					if ( !CKEDITOR.env.ie && currentListItemName == 'div' || currentListItemName == 'p' )
						currentListItem.append( doc.createElement( 'br' ) );
					retval.append( currentListItem );
					rootNode = null;
					currentIndex++;
				}
				else
					return null;

				if ( listArray.length <= currentIndex || Math.max( listArray[ currentIndex ].indent, 0 ) < indentLevel )
					break;
			}

			// Clear marker attributes for the new list tree made of cloned nodes, if any.
			if ( database )
			{
				var currentNode = retval.getFirst();
				while ( currentNode )
				{
					if ( currentNode.type == CKEDITOR.NODE_ELEMENT )
						CKEDITOR.dom.element.clearMarkers( database, currentNode );
					currentNode = currentNode.getNextSourceNode();
				}
			}

			return { listNode : retval, nextIndex : currentIndex };
		}
	};

	function setState( editor, state )
	{
		editor.getCommand( this.name ).setState( state );
	}

	function onSelectionChange( evt )
	{
		var elements = evt.data.path.elements;

		for ( var i = 0 ; i < elements.length ; i++ )
		{
			if ( listNodeNames[ elements[i].getName() ] )
				return setState.call( this, evt.editor,
						this.type == elements[i].getName() ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF );
		}

		setState.call( this, evt.editor, CKEDITOR.TRISTATE_OFF );
	}

	function changeListType( editor, groupObj, database, listsCreated )
	{
		// This case is easy...
		// 1. Convert the whole list into a one-dimensional array.
		// 2. Change the list type by modifying the array.
		// 3. Recreate the whole list by converting the array to a list.
		// 4. Replace the original list with the recreated list.
		var listArray = CKEDITOR.plugins.list.listToArray( groupObj.root, database ),
			selectedListItems = [];

		for ( var i = 0 ; i < groupObj.contents.length ; i++ )
		{
			var itemNode = groupObj.contents[i];
			itemNode = itemNode.getAscendant( 'li', true );
			if ( !itemNode || itemNode.getCustomData( 'list_item_processed' ) )
				continue;
			selectedListItems.push( itemNode );
			CKEDITOR.dom.element.setMarker( database, itemNode, 'list_item_processed', true );
		}
		
		var fakeParent = groupObj.root.getDocument().createElement( this.type );
		for ( var i = 0 ; i < selectedListItems.length ; i++ )
		{
			var listIndex = selectedListItems[i].getCustomData( 'listarray_index' );
			listArray[listIndex].parent = fakeParent;
		}
		var newList = CKEDITOR.plugins.list.arrayToList( listArray, database, null, editor.config.enterMode );
		for ( var i = 0, length = newList.listNode.getChildCount(), child ;
				i < length && ( child = newList.listNode.getChild( i ) ) ; i++ )
		{
			if ( child.getName() == this.type )
				listsCreated.push( child );
		}
		newList.listNode.replace( groupObj.root );
	}

	function createList( editor, groupObj, listsCreated )
	{
		var contents = groupObj.contents,
			doc = groupObj.root.getDocument(),
			listContents = [];

		// It is possible to have the contents returned by DomRangeIterator to be the same as the root.
		// e.g. when we're running into table cells.
		// In such a case, enclose the childNodes of contents[0] into a <div>.
		if ( contents.length == 1 && contents[0].equals( groupObj.root ) )
		{
			var divBlock = doc.createElement( 'div' );
			contents[0].moveChildren && contents[0].moveChildren( divBlock );
			contents[0].append( divBlock );
			contents[0] = divBlock;
		}

		// Calculate the common parent node of all content blocks.
		var commonParent = groupObj.contents[0].getParent();
		for ( var i = 0 ; i < contents.length ; i++ )
			commonParent = commonParent.getCommonAncestor( contents[i].getParent() );

		// We want to insert things that are in the same tree level only, so calculate the contents again
		// by expanding the selected blocks to the same tree level.
		for ( var i = 0 ; i < contents.length ; i++ )
		{
			var contentNode = contents[i],
				parentNode;
			while ( ( parentNode = contentNode.getParent() ) )
			{
				if ( parentNode.equals( commonParent ) )
				{
					listContents.push( contentNode );
					break;
				}
				contentNode = parentNode;
			}
		}

		if ( listContents.length < 1 )
			return;

		// Insert the list to the DOM tree.
		var insertAnchor = listContents[ listContents.length - 1 ].getNext(),
			listNode = doc.createElement( this.type );

		listsCreated.push( listNode );
		while ( listContents.length )
		{
			var contentBlock = listContents.shift(),
				listItem = doc.createElement( 'li' );
			contentBlock.moveChildren( listItem );
			contentBlock.remove();
			listItem.appendTo( listNode );
		}
		if ( insertAnchor )
			listNode.insertBefore( insertAnchor );
		else
			listNode.appendTo( commonParent );
	}

	function removeList( editor, groupObj, database )
	{
		// This is very much like the change list type operation.
		// Except that we're changing the selected items' indent to -1 in the list array.
		var listArray = CKEDITOR.plugins.list.listToArray( groupObj.root, database ),
			selectedListItems = [];

		for ( var i = 0 ; i < groupObj.contents.length ; i++ )
		{
			var itemNode = groupObj.contents[i];
			itemNode = itemNode.getAscendant( 'li', true );
			if ( !itemNode || itemNode.getCustomData( 'list_item_processed' ) )
				continue;
			selectedListItems.push( itemNode );
			CKEDITOR.dom.element.setMarker( database, itemNode, 'list_item_processed', true );
		}

		var lastListIndex = null;
		for ( var i = 0 ; i < selectedListItems.length ; i++ )
		{
			var listIndex = selectedListItems[i].getCustomData( 'listarray_index' );
			listArray[listIndex].indent = -1;
			lastListIndex = listIndex;
		}

		// After cutting parts of the list out with indent=-1, we still have to maintain the array list
		// model's nextItem.indent <= currentItem.indent + 1 invariant. Otherwise the array model of the
		// list cannot be converted back to a real DOM list.
		for ( var i = lastListIndex + 1 ; i < listArray.length ; i++ )
		{
			if ( listArray[i].indent > listArray[i-1].indent + 1 )
			{
				var indentOffset = listArray[i-1].indent + 1 - listArray[i].indent;
				var oldIndent = listArray[i].indent;
				while ( listArray[i] && listArray[i].indent >= oldIndent )
				{
					listArray[i].indent += indentOffset;
					i++;
				}
				i--;
			}
		}

		var newList = CKEDITOR.plugins.list.arrayToList( listArray, database, null, editor.config.enterMode );
		// If groupObj.root is the last element in its parent, or its nextSibling is a <br>, then we should
		// not add a <br> after the final item. So, check for the cases and trim the <br>.
		if ( groupObj.root.getNext() == null || groupObj.root.getNext().$.nodeName.toLowerCase() == 'br' )
		{
			if ( newList.listNode.getLast().$.nodeName.toLowerCase() == 'br' )
				newList.listNode.getLast().remove();
		}
		newList.listNode.replace( groupObj.root );
	}

	function listCommand( name, type )
	{
		this.name = name;
		this.type = type;
	}

	listCommand.prototype = {
		exec : function( editor )
		{
			editor.focus();

			var doc = editor.document,
				selection = editor.getSelection(),
				ranges = selection && selection.getRanges();

			// There should be at least one selected range.
			if ( !ranges || ranges.length < 1 )
				return;
			
			// Midas lists rule #1 says we can create a list even in an empty document.
			// But DOM iterator wouldn't run if the document is really empty.
			// So create a paragraph if the document is empty and we're going to create a list.
			if ( this.state == CKEDITOR.TRISTATE_OFF )
			{
				var body = doc.getBody();
				body.trim();
				if ( !body.getFirst() )
				{
					var paragraph = doc.createElement( editor.config.enterMode );
					paragraph.appendTo( body );
					ranges = [ new CKEDITOR.dom.range( doc ) ];
					ranges[0].selectNodeContents( paragraph );
					selection.selectRanges( ranges );
				}
			}
			
			var bookmarks = selection.createBookmarks( true );

			// Group the blocks up because there are many cases where multiple lists have to be created,
			// or multiple lists have to be cancelled.
			var listGroups = [],
				database = {};

			while ( ranges.length > 0 )
			{
				var range = ranges.shift(),
					boundaryNodes = range.getBoundaryNodes(),
					startNode = boundaryNodes.startNode,
					endNode = boundaryNodes.endNode;
				if ( startNode.type == CKEDITOR.NODE_ELEMENT && startNode.getName() == 'td' )
					range.setStartAt( boundaryNodes.startNode, CKEDITOR.POSITION_AFTER_START );
				if ( endNode.type == CKEDITOR.NODE_ELEMENT && endNode.getName() == 'td' )
					range.setEndAt( boundaryNodes.endNode, CKEDITOR.POSITION_BEFORE_END );

				var iterator = range.createIterator(),
					block;
				iterator.forceBrBreak = ( this.state == CKEDITOR.TRISTATE_OFF );

				while ( ( block = iterator.getNextParagraph() ) )
				{
					var path = new CKEDITOR.dom.elementPath( block ),
						listNode = null,
						processedFlag = false,
						blockLimit = path.blockLimit;

					// First, try to group by a list ancestor.
					for ( var i = 0 ; i < path.elements.length ; i++ )
					{
						var element = path.elements[i];
						if ( listNodeNames[ element.getName() ] )
						{
							// If we've encountered a list inside a block limit
							// The last group object of the block limit element should
							// no longer be valid. Since paragraphs after the list
							// should belong to a different group of paragraphs before
							// the list. (Bug #1309)
							blockLimit.removeCustomData( 'list_group_object' );

							var groupObj = element.getCustomData( 'list_group_object' );
							if ( groupObj )
								groupObj.contents.push( block );
							else
							{
								groupObj = { root : element, contents : [ block ] };
								listGroups.push( groupObj );
								CKEDITOR.dom.element.setMarker( database, element, 'list_group_object', groupObj );
							}
							processedFlag = true;
							break;
						}
					}

					if ( processedFlag )
						continue;

					// No list ancestor? Group by block limit.
					var root = blockLimit;
					if ( root.getCustomData( 'list_group_object' ) )
						root.getCustomData( 'list_group_object' ).contents.push( block );
					else
					{
						var groupObj = { root : root, contents : [ block ] };
						CKEDITOR.dom.element.setMarker( database, root, 'list_group_object', groupObj );
						listGroups.push( groupObj );
					}
				}
			}

			// Now we have two kinds of list groups, groups rooted at a list, and groups rooted at a block limit element.
			// We either have to build lists or remove lists, for removing a list does not makes sense when we are looking
			// at the group that's not rooted at lists. So we have three cases to handle.
			var listsCreated = [];
			while ( listGroups.length > 0 )
			{
				var groupObj = listGroups.shift();
				if ( this.state == CKEDITOR.TRISTATE_OFF )
				{
					if ( listNodeNames[ groupObj.root.getName() ] )
						changeListType.call( this, editor, groupObj, database, listsCreated );
					else
						createList.call( this, editor, groupObj, listsCreated );
				}
				else if ( this.state == CKEDITOR.TRISTATE_ON && listNodeNames[ groupObj.root.getName() ] )
					removeList.call( this, editor, groupObj, database );
			}

			// For all new lists created, merge adjacent, same type lists.
			for ( var i = 0 ; i < listsCreated.length ; i++ )
			{
				var listNode = listsCreated[i],
					stopFlag = false,
					currentNode = listNode;

				while ( !stopFlag )
				{
					currentNode = currentNode.getNext();
					if ( currentNode && currentNode.type == CKEDITOR.NODE_TEXT && emptyTextRegex.test( currentNode.getText() ) )
						continue;
					stopFlag = true;
				}

				if ( currentNode && currentNode.getName() == this.type )
				{
					currentNode.remove();
					currentNode.moveChildren( listNode );
				}
				
				stopFlag = false;
				currentNode = listNode;
				while ( !stopFlag )
				{
					currentNode = currentNode.getNext();
					if ( currentNode && currentNode.type == CKEDITOR.NODE_TEXT && emptyTextRegex.test( currentNode.getText() ) )
						continue;
					stopFlag = true;
				}
				if ( currentNode && currentNode.getName() == this.type  )
				{
					currentNode.remove();
					currentNode.moveChildren( listNode, true );
				}
			}

			// Clean up, restore selection and update toolbar button states.
			CKEDITOR.dom.element.clearAllMarkers( database );
			selection.selectBookmarks( bookmarks );
			editor.focus();
		}
	};

	CKEDITOR.plugins.add( 'list',
	{
		init : function( editor )
		{
			// Register commands.
			var numberedListCommand = new listCommand( 'numberedlist', 'ol' ),
				bulletedListCommand = new listCommand( 'bulletedlist', 'ul' );
			editor.addCommand( 'numberedlist', numberedListCommand );
			editor.addCommand( 'bulletedlist', bulletedListCommand );

			// Register the toolbar button.
			editor.ui.addButton( 'NumberedList',
				{
					label : editor.lang.numberedlist,
					command : 'numberedlist' 
				} );
			editor.ui.addButton( 'BulletedList',
				{
					label : editor.lang.bulletedlist,
					command : 'bulletedlist'
				} );

			// Register the state changing handlers.
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, numberedListCommand ) );
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, bulletedListCommand ) );
		},

		requires : [ 'domiterator' ]
	} );
})();
