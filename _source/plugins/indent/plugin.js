/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @file Increse and decrease indent commands.
 */

(function()
{
	var listNodeNames = { ol : 1, ul : 1 };

	function setState( editor, state )
	{
		var command = editor.getCommand( this.name );
		command.state = state;
		command.fire( 'state' );
	}

	function onSelectionChange( evt )
	{
		var elements = evt.data.path.elements,
			listNode, listItem,
			editor = evt.editor;

		for ( var i = 0 ; i < elements.length ; i++ )
		{
			if ( elements[i].getName() == 'li' )
			{
				listItem = elements[i];
				continue;
			}
			if ( listNodeNames[ elements[i].getName() ] )
			{
				listNode = elements[i];
				break;
			}
		}

		if ( listNode )
		{
			if ( this.name == 'outdent' )
				return setState.call( this, editor, CKEDITOR.TRISTATE_OFF );
			else
			{
				while ( listItem && ( listItem = listItem.getPrevious() ) )
				{
					if ( listItem.getName && listItem.getName() == 'li' )
						return setState.call( this, editor, CKEDITOR.TRISTATE_OFF );
				}
				return setState.call( this, editor, CKEDITOR.TRISTATE_DISABLED );
			}
		}

		if ( !this.useIndentClasses && this.name == 'indent' )
			return setState.call( this, editor, CKEDITOR.TRISTATE_OFF );

		var path = evt.data.path,
			firstBlock = path.block || path.blockLimit;
		if ( !firstBlock )
			return setState.call( this, editor, CKEDITOR.TRISTATE_DISABLED );

		if ( this.useIndentClasses )
		{
			var indentClass = firstBlock.$.className.match( this.classNameRegex ),
				indentStep = 0;
			if ( indentClass != null )
			{
				indentClass = indentClass[1];
				indentStep = this.indentClassMap[ indentClass ];
			}
			if ( ( this.name == 'outdent' && indentStep == 0 ) ||
					( this.name == 'indent' && indentStep == editor.config.indentClass.length ) )
				return setState.call( this, editor, CKEDITOR.TRISTATE_DISABLED );
			return setState.call( this, editor, CKEDITOR.TRISTATE_OFF );
		}
		else
		{
			var indent = parseInt( firstBlock.getComputedStyle( this.indentCssProperty ), 10 );
			if ( isNaN( indent ) )
				indent = 0;
			if ( indent <= 0 )
				return setState.call( this, editor, CKEDITOR.TRISTATE_DISABLED );
			return setState.call( this, editor, CKEDITOR.TRISTATE_OFF );
		}
	}

	function indentList( editor, range, listNode )
	{
		// Our starting and ending points of the range might be inside some blocks under a list item...
		// So before playing with the iterator, we need to expand the block to include the list items.
		var startContainer = range.startContainer,
			endContainer = range.endContainer;
		while ( startContainer && !startContainer.getParent().equals( listNode ) )
			startContainer = startContainer.getParent();
		while ( endContainer && !endContainer.getParent().equals( listNode ) )
			endContainer = endContainer.getParent();

		if ( !startContainer || !endContainer )
			return;

		// Now we can iterate over the individual items on the same tree depth.
		var block = startContainer,
			itemsToMove = [],
			stopFlag = false;
		while ( stopFlag == false )
		{
			if ( block.equals( endContainer ) )
				stopFlag = true;
			itemsToMove.push( block );
			block = block.getNext();
		}
		if ( itemsToMove.length < 1 )
			return;

		// Do indent or outdent operations on the array model of the list, not the
		// list's DOM tree itself. The array model demands that it knows as much as
		// possible about the surrounding lists, we need to feed it the further
		// ancestor node that is still a list.
		var listParents = listNode.getParents();
		for ( var i = listParents.length - 1 ; i >= 0 ; i-- )
		{
			if ( listParents[i].getName && listNodeNames[ listParents[i].getName() ] )
			{
				listNode = listParents[i];
				break;
			}
		}
		var indentOffset = this.name == 'indent' ? 1 : -1,
			startItem = itemsToMove[0],
			lastItem = itemsToMove[ itemsToMove.length - 1 ],
			database = {};

		// Convert the list DOM tree into a one dimensional array.
		var listArray = CKEDITOR.plugins.list.listToArray( listNode, database );

		// Apply indenting or outdenting on the array.
		var baseIndent = listArray[ lastItem.getCustomData( 'listarray_index' ) ].indent;
		for ( var i = startItem.getCustomData( 'listarray_index' ) ; i <= lastItem.getCustomData( 'listarray_index' ) ; i++ )
			listArray[i].indent += indentOffset;
		for ( var i = lastItem.getCustomData( 'listarray_index' ) + 1 ;
				i < listArray.length && listArray[i].indent > baseIndent ; i++ )
			listArray[i].indent += indentOffset;

		// Convert the array back to a DOM forest (yes we might have a few subtrees now).
		// And replace the old list with the new forest.
		var newList = CKEDITOR.plugins.list.arrayToList( listArray, null, null, editor.config.enterMode );
		if ( newList )
			newList.listNode.replace( listNode );

		// Clean up the markers.
		CKEDITOR.dom.element.clearAllMarkers( database );
	}

	function indentBlock( editor, range )
	{
		var iterator = range.createIterator();
		iterator.enforceRealBlocks = true;

		range.enlarge( CKEDITOR.ENLARGE_BLOCK_CONTENTS );
		var commonParent = range.getCommonAncestor(),
			block;

		while ( ( block = iterator.getNextParagraph() ) )
		{
			// We don't want to indent subtrees recursively, so only perform the indent
			// operation if the block itself is the nearestParent, or the block's parent
			// is the commonParent.
			if ( !( block.equals( commonParent ) || block.getParent().equals( commonParent ) ) )
				continue;

			if ( this.useIndentClasses )
			{
				// Transform current class name to indent step index.
				var indentClass = block.$.className.match( this.classNameRegex ),
					indentStep = 0;
				if ( indentClass != null )
				{
					indentClass = indentClass[1];
					indentStep = this.indentClassMap[ indentClass ];
				}

				// Operate on indent step index, transform indent step index back to class
				// name.
				if ( this.name == 'outdent' )
					indentStep--;
				else
					indentStep++;
				indentStep = Math.min( indentStep, editor.config.indentClasses.length );
				indentStep = Math.max( indentStep, 0 );
				var className = CKEDITOR.tools.ltrim( block.$.className.replace( this.classNameRegex, '' ) );
				if ( indentStep < 1 )
					block.$.className = className;
				else
					block.addClass( editor.config.indentClasses[ indentStep - 1 ] );
			}
			else
			{
				var currentOffset = parseInt( block.getComputedStyle( this.indentCssProperty ), 10 );
				if ( isNaN( currentOffset ) )
					currentOffset = 0;
				currentOffset += ( this.name == 'indent' ? 1 : -1 ) * editor.config.indentOffset;
				currentOffset = Math.max( currentOffset, 0 );
				currentOffset = Math.ceil( currentOffset / editor.config.indentOffset ) * editor.config.indentOffset;
				block.setStyle( this.indentCssProperty, currentOffset ? currentOffset + editor.config.indentUnit : '' );
				if ( block.getAttribute( 'style' ) == '' )
					block.removeAttribute( 'style' );
			}
		}
	}

	function indentCommand( editor, name )
	{
		this.name = name;
		this.useIndentClasses = editor.config.indentClasses && editor.config.indentClasses.length > 0;
		if ( this.useIndentClasses )
		{
			this.classNameRegex = new RegExp( '(?:^|\\s+)(' + editor.config.indentClasses.join( '|' ) + ')(?=$|\\s)' );
			this.indentClassMap = {};
			for ( var i = 0 ; i < editor.config.indentClasses.length ; i++ )
				this.indentClassMap[ editor.config.indentClasses[i] ] = i + 1;
		}
		else
			this.indentCssProperty = editor.config.contentsLangDirection == 'ltr' ? 'margin-left' : 'margin-right';
	}

	indentCommand.prototype = {
		exec : function( editor )
		{
			var selection = editor.getSelection(),
				range = selection && selection.getRanges()[0];

			if ( !selection || !range )
				return;

			var bookmarks = selection.createBookmarks(),
				boundaryNodes = range.getBoundaryNodes(),
				nearestListBlock = boundaryNodes.startNode.getCommonAncestor( boundaryNodes.endNode );

			while ( nearestListBlock )
			{
				if ( nearestListBlock.type == CKEDITOR.NODE_ELEMENT && listNodeNames[ nearestListBlock.getName() ] )
					break;
				nearestListBlock = nearestListBlock.getParent();
			}

			if ( nearestListBlock )
				indentList.call( this, editor, range, nearestListBlock );
			else
				indentBlock.call( this, editor, range );

			editor.focus();
			selection.selectBookmarks( bookmarks );
		}
	};

	CKEDITOR.plugins.add( 'indent',
	{
		init : function( editor )
		{
			// Register commands.
			var indent = new indentCommand( editor, 'indent' ),
				outdent = new indentCommand( editor, 'outdent' );
			editor.addCommand( 'indent', indent );
			editor.addCommand( 'outdent', outdent );

			// Register the toolbar buttons.
			editor.ui.addButton( 'Indent',
				{
					label : editor.lang.indent,
					command : 'indent'
				});
			editor.ui.addButton( 'Outdent',
				{
					label : editor.lang.outdent,
					command : 'outdent' 
				});

			// Register the state changing handlers.
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, indent ) );
			editor.on( 'selectionChange', CKEDITOR.tools.bind( onSelectionChange, outdent ) );
		},
		
		requires : [ 'domiterator', 'list' ]
	} );
})();

CKEDITOR.tools.extend( CKEDITOR.config,
	{
		indentOffset : 40,
		indentUnit : 'px',
		indentClasses : null
	});
