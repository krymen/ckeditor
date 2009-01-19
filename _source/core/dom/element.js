﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.dom.element} class, which
 *		represents a DOM element.
 */

/**
 * Represents a DOM element.
 * @constructor
 * @augments CKEDITOR.dom.node
 * @param {Object|String} element A native DOM element or the element name for
 *		new elements.
 * @param {CKEDITOR.dom.document} [ownerDocument] The document that will contain
 *		the element in case of element creation.
 * @example
 * // Create a new &lt;span&gt; element.
 * var element = new CKEDITOR.dom.element( 'span' );
 * @example
 * // Create an element based on a native DOM element.
 * var element = new CKEDITOR.dom.element( document.getElementById( 'myId' ) );
 */
CKEDITOR.dom.element = function( element, ownerDocument )
{
	if ( typeof element == 'string' )
		element = ( ownerDocument ? ownerDocument.$ : document ).createElement( element );

	// Call the base constructor (we must not call CKEDITOR.dom.node).
	CKEDITOR.dom.domObject.call( this, element );
};

// PACKAGER_RENAME( CKEDITOR.dom.element )

/**
 * The the {@link CKEDITOR.dom.element} representing and element. If the
 * element is a native DOM element, it will be transformed into a valid
 * CKEDITOR.dom.element object.
 * @returns {CKEDITOR.dom.element} The transformed element.
 * @example
 * var element = new CKEDITOR.dom.element( 'span' );
 * alert( element == <b>CKEDITOR.dom.element.get( element )</b> );  "true"
 * @example
 * var element = document.getElementById( 'myElement' );
 * alert( <b>CKEDITOR.dom.element.get( element )</b>.getName() );  e.g. "p"
 */
CKEDITOR.dom.element.get = function( element )
{
	return element && ( element.$ ? element : new CKEDITOR.dom.element( element ) );
};

CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node();

/**
 * Creates an instance of the {@link CKEDITOR.dom.element} class based on the
 * HTML representation of an element.
 * @param {String} html The element HTML. It should define only one element in
 *		the "root" level. The "root" element can have child nodes, but not
 *		siblings.
 * @returns {CKEDITOR.dom.element} The element instance.
 * @example
 * var element = <b>CKEDITOR.dom.element.createFromHtml( '&lt;strong class="anyclass"&gt;My element&lt;/strong&gt;' )</b>;
 * alert( element.getName() );  // "strong"
 */
CKEDITOR.dom.element.createFromHtml = function( html, ownerDocument )
{
	var temp = new CKEDITOR.dom.element( 'div', ownerDocument );
	temp.setHtml( html );

	// When returning the node, remove it from its parent to detach it.
	return temp.getFirst().remove();
};

CKEDITOR.tools.extend( CKEDITOR.dom.element.prototype,
	/** @lends CKEDITOR.dom.element.prototype */
	{
		/**
		 * The node type. This is a constant value set to
		 * {@link CKEDITOR.NODE_ELEMENT}.
		 * @type Number
		 * @example
		 */
		type : CKEDITOR.NODE_ELEMENT,

		/**
		 * Adds a CSS class to the element. It appends the class to the
		 * already existing names.
		 * @param {String} className The name of the class to be added.
		 * @example
		 * var element = new CKEDITOR.dom.element( 'div' );
		 * element.addClass( 'classA' );  // &lt;div class="classA"&gt;
		 * element.addClass( 'classB' );  // &lt;div class="classA classB"&gt;
		 * element.addClass( 'classA' );  // &lt;div class="classA classB"&gt;
		 */
		addClass : function( className )
		{
			var c = this.$.className;
			if ( c )
			{
				var regex = new RegExp( '(?:^|\\s)' + className + '(?:\\s|$)', '' );
				if ( !regex.test( c ) )
					c += ' ' + className;
			}
			this.$.className = c || className;
		},

		/**
		 * Removes a CSS class name from the elements classes. Other classes
		 * remain untouched.
		 * @param {String} className The name of the class to remove.
		 * @example
		 * var element = new CKEDITOR.dom.element( 'div' );
		 * element.addClass( 'classA' );  // &lt;div class="classA"&gt;
		 * element.addClass( 'classB' );  // &lt;div class="classA classB"&gt;
		 * element.removeClass( 'classA' );  // &lt;div class="classB"&gt;
		 * element.removeClass( 'classB' );  // &lt;div&gt;
		 */
		removeClass : function( className )
		{
			var c = this.$.className;
			if ( c )
			{
				var regex = new RegExp( '(?:^|\\s+)' + className + '(?=\\s|$)', '' );
				if ( regex.test( c ) )
				{
					c = c.replace( regex, '' ).replace( /^\s+/, '' );

					if ( c )
						this.$.className = c;
					else
						this.removeAttribute( 'class' );
				}
			}
		},

		/**
		 * Append a node as a child of this element.
		 * @param {CKEDITOR.dom.node|String} node The node or element name to be
		 *		appended.
		 * @param {Boolean} [toStart] Indicates that the element is to be
		 *		appended at the start.
		 * @returns {CKEDITOR.dom.node} The appended node.
		 * @example
		 * var p = new CKEDITOR.dom.element( 'p' );
		 *
		 * var strong = new CKEDITOR.dom.element( 'strong' );
		 * <b>p.append( strong );</b>
		 *
		 * var em = <b>p.append( 'em' );</b>
		 *
		 * // result: "&lt;p&gt;&lt;strong&gt;&lt;/strong&gt;&lt;em&gt;&lt;/em&gt;&lt;/p&gt;"
		 */
		append : function( node, toStart )
		{
			if ( typeof node == 'string' )
				node = new CKEDITOR.dom.element( node );

			if ( toStart )
				this.$.insertBefore( node.$, this.$.firstChild );
			else
				this.$.appendChild( node.$ );

			return node;
		},

		/**
		 * Append text to this element.
		 * @param {String} text The text to be appended.
		 * @returns {CKEDITOR.dom.node} The appended node.
		 * @example
		 * var p = new CKEDITOR.dom.element( 'p' );
		 * p.appendText( 'This is' );
		 * p.appendText( ' some text' );
		 *
		 * // result: "&lt;p&gt;This is some text&lt;/p&gt;"
		 */
		appendText : function( text )
		{
			if ( this.$.text != undefined )
				this.$.text += text;
			else
				this.append( new CKEDITOR.dom.text( text ) );
		},

		/**
		 * Breaks one of the ancestor element in the element position, moving
		 * this element between the broken parts.
		 * @param {CKEDITOR.dom.element} parent The anscestor element to get broken.
		 * @example
		 * // Before breaking:
		 * //     <b>This <i>is some<span /> sample</i> test text</b>
		 * // If "element" is <span /> and "parent" is <i>:
		 * //     <b>This <i>is some</i><span /><i> sample</i> test text</b>
		 * element.breakParent( parent );
		 * @example
		 * // Before breaking:
		 * //     <b>This <i>is some<span /> sample</i> test text</b>
		 * // If "element" is <span /> and "parent" is <b>:
		 * //     <b>This <i>is some</i></b><span /><b><i> sample</i> test text</b>
		 * element.breakParent( parent );
		 */
		breakParent : function( parent )
		{
			var range = new CKEDITOR.dom.range( this.getDocument() );

			// We'll be extracting part of this element, so let's use our
			// range to get the correct piece.
			range.setStartAfter( this );
			range.setEndAfter( parent );

			// Extract it.
			var docFrag = range.extractContents();

			// Move the element outside the broken element.
			range.insertNode( this.remove() );

			// Re-insert the extracted piece after the element.
			docFrag.insertAfterNode( this );
		},

		contains :
			CKEDITOR.env.ie || CKEDITOR.env.webkit ?
				function( node )
				{
					var $ = this.$;

					return node.type != CKEDITOR.NODE_ELEMENT ?
						$.contains( node.getParent().$ ) :
						$ != node.$ && $.contains( node.$ );
				}
			:
				function( node )
				{
					return !!( this.$.compareDocumentPosition( node.$ ) & 16 );
				},

		/**
		 * Moves the selection focus to this element.
		 * @example
		 * var element = CKEDITOR.document.getById( 'myTextarea' );
		 * <b>element.focus()</b>;
		 */
		focus : function()
		{
			this.$.focus();
		},

		/**
		 * Gets the inner HTML of this element.
		 * @returns {String} The inner HTML of this element.
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '&lt;div&gt;&lt;b&gt;Example&lt;/b&gt;&lt;/div&gt;' );
		 * alert( <b>p.getHtml()</b> );  // "&lt;b&gt;Example&lt;/b&gt;"
		 */
		getHtml : function()
		{
			return this.$.innerHTML;
		},

		/**
		 * Sets the inner HTML of this element.
		 * @param {String} html The HTML to be set for this element.
		 * @returns {String} The inserted HTML.
		 * @example
		 * var p = new CKEDITOR.dom.element( 'p' );
		 * <b>p.setHtml( '&lt;b&gt;Inner&lt;/b&gt; HTML' );</b>
		 *
		 * // result: "&lt;p&gt;&lt;b&gt;Inner&lt;/b&gt; HTML&lt;/p&gt;"
		 */
		setHtml : function( html )
		{
			return ( this.$.innerHTML = html );
		},

		/**
		 * Sets the element contents as plain text.
		 * @param {String} text The text to be set.
		 * @returns {String} The inserted text.
		 * @example
		 * var element = new CKEDITOR.dom.element( 'div' );
		 * element.setText( 'A > B & C < D' );
		 * alert( element.innerHTML );  // "A &amp;gt; B &amp;amp; C &amp;lt; D"
		 */
		setText : function( text )
		{
			CKEDITOR.dom.element.prototype.setText = ( this.$.innerText != undefined ) ?
				function ( text )
				{
					return this.$.innerText = text;
				} :
				function ( text )
				{
					return this.$.textContent = text;
				};

			return this.setText( text );
		},

		/**
		 * Gets the value of an element attribute.
		 * @function
		 * @param {String} name The attribute name.
		 * @returns {String} The attribute value or null if not defined.
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '&lt;input type="text" /&gt;' );
		 * alert( <b>element.getAttribute( 'type' )</b> );  // "text"
		 */
		getAttribute : (function()
		{
			var standard = function( name )
			{
				return this.$.getAttribute( name, 2 );
			};

			if ( CKEDITOR.env.ie )
			{
				return function( name )
				{
					switch ( name )
					{
						case 'class':
							name = 'className';
							break;

						case 'tabindex':
							var tabIndex = standard.call( this, name );

							// IE returns tabIndex=0 by default for all
							// elements. For those elements,
							// getAtrribute( 'tabindex', 2 ) returns 32768
							// instead. So, we must make this check to give a
							// uniform result among all browsers.
							if ( tabIndex !== 0 && this.$.tabIndex === 0 )
								tabIndex = null;

							return tabIndex;
							break;
					}

					return standard.call( this, name );
				};
			}
			else
				return standard;
		})(),

		getChildren : function()
		{
			return new CKEDITOR.dom.nodeList( this.$.childNodes );
		},

		/**
		 * Gets the current computed value of one of the element CSS style
		 * properties.
		 * @function
		 * @param {String} propertyName The style property name.
		 * @returns {String} The property value.
		 * @example
		 * var element = new CKEDITOR.dom.element( 'span' );
		 * alert( <b>element.getComputedStyle( 'display' )</b> );  // "inline"
		 */
		getComputedStyle :
			CKEDITOR.env.ie ?
				function( propertyName )
				{
					return this.$.currentStyle[ CKEDITOR.tools.cssStyleToDomStyle( propertyName ) ];
				}
			:
				function( propertyName )
				{
					return this.getWindow().$.getComputedStyle( this.$, '' ).getPropertyValue( propertyName );
				},

		/**
		 * Gets the DTD entries for this element.
		 * @returns {Object} An object containing the list of elements accepted
		 *		by this element.
		 */
		getDtd : function()
		{
			var dtd = CKEDITOR.dtd[ this.getName() ];

			this.getDtd = function()
			{
				return dtd;
			};

			return dtd;
		},

		getElementsByTag : function( tagName )
		{
			return new CKEDITOR.dom.nodeList( this.$.getElementsByTagName( tagName ) );
		},

		/**
		 * Gets the computed tabindex for this element.
		 * @function
		 * @returns {Number} The tabindex value.
		 * @example
		 * var element = CKEDITOR.document.getById( 'myDiv' );
		 * alert( <b>element.getTabIndex()</b> );  // e.g. "-1"
		 */
		getTabIndex :
			CKEDITOR.env.ie ?
				function()
				{
					var tabIndex = this.$.tabIndex;

					// IE returns tabIndex=0 by default for all elements. In
					// those cases we must check that the element really has
					// the tabindex attribute set to zero, or it is one of
					// those element that should have zero by default.
					if ( tabIndex === 0 && !CKEDITOR.dtd.$tabIndex[ this.getName() ] && parseInt( this.getAttribute( 'tabindex' ), 10 ) !== 0 )
						tabIndex = -1;

						return tabIndex;
				}
			: CKEDITOR.env.webkit ?
				function()
				{
					var tabIndex = this.$.tabIndex;

					// Safari returns "undefined" for elements that should not
					// have tabindex (like a div). So, we must try to get it
					// from the attribute.
					// https://bugs.webkit.org/show_bug.cgi?id=20596
					if ( tabIndex == undefined )
					{
						tabIndex = parseInt( this.getAttribute( 'tabindex' ), 10 );

						// If the element don't have the tabindex attribute,
						// then we should return -1.
						if ( isNaN( tabIndex ) )
							tabIndex = -1;
					}

					return tabIndex;
				}
			:
				function()
				{
					return this.$.tabIndex;
				},

		/**
		 * Gets the text value of this element.
		 *
		 * Only in IE (which uses innerText), &lt;br&gt; will cause linebreaks,
		 * and sucessive whitespaces (including line breaks) will be reduced to
		 * a single space. This behavior is ok for us, for now. It may change
		 * in the future.
		 * @returns {String} The text value.
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '&lt;div&gt;Same &lt;i&gt;text&lt;/i&gt;.&lt;/div&gt;' );
		 * alert( <b>element.getText()</b> );  // "Sample text."
		 */
		getText : function()
		{
			return this.$.textContent || this.$.innerText;
		},

		/**
		 * Gets the window object that contains this element.
		 * @returns {CKEDITOR.dom.window} The window object.
		 * @example
		 */
		getWindow : function()
		{
			return this.getDocument().getWindow();
		},

		/**
		 * Gets the value of the "id" attribute of this element.
		 * @returns {String} The element id, or null if not available.
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '&lt;p id="myId"&gt;&lt;/p&gt;' );
		 * alert( <b>element.getId()</b> );  // "myId"
		 */
		getId : function()
		{
			return this.$.id || null;
		},

		/**
		 * Gets the value of the "name" attribute of this element.
		 * @returns {String} The element name, or null if not available.
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '&lt;input name="myName"&gt;&lt;/input&gt;' );
		 * alert( <b>element.getNameAtt()</b> );  // "myName"
		 */
		getNameAtt : function()
		{
			return this.$.name || null;
		},

		/**
		 * Gets the element name (tag name). The returned name is guaranteed to
		 * be always full lowercased.
		 * @returns {String} The element name.
		 * @example
		 * var element = new CKEDITOR.dom.element( 'span' );
		 * alert( <b>element.getName()</b> );  // "span"
		 */
		getName : function()
		{
			// Cache the lowercased name inside a closure.
			var nodeName = this.$.nodeName.toLowerCase();

			return (
			/** @ignore */
			this.getName = function()
				{
					return nodeName;
				})();
		},

		/**
		 * Gets the value set to this element. This value is usually available
		 * for form field elements.
		 * @returns {String} The element value.
		 */
		getValue : function()
		{
			return this.$.value;
		},

		/**
		 * Gets the first child node of this element.
		 * @returns {CKEDITOR.dom.node} The first child node or null if not
		 *		available.
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '&lt;div&gt;&lt;b&gt;Example&lt;/b&gt;&lt;/div&gt;' );
		 * var first = <b>element.getFirst()</b>;
		 * alert( first.getName() );  // "b"
		 */
		getFirst : function()
		{
			var $ = this.$.firstChild;
			return $ ? new CKEDITOR.dom.node( $ ) : null;
		},

		getLast : function()
		{
			var $ = this.$.lastChild;
			return $ ? new CKEDITOR.dom.node( $ ) : null;
		},

		/**
		 * Gets the node that follows this element in its parent's child list.
		 * @returns {CKEDITOR.dom.node} The next node or null if not
		 *		available.
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '&lt;div&gt;&lt;b&gt;Example&lt;/b&gt; &lt;i&gt;next&lt;/i&gt;&lt;/div&gt;' );
		 * var first = <b>element.getFirst().getNext()</b>;
		 * alert( first.getName() );  // "i"
		 */
		getNext : function()
		{
			var $ = this.$.nextSibling;
			return $ ? new CKEDITOR.dom.node( $ ) : null;
		},

		/**
		 * Checks if the element name matches one or more names.
		 * @param {String} name[,name[,...]] One or more names to be checked.
		 * @returns {Boolean} true if the element name matches any of the names.
		 * @example
		 * var element = new CKEDITOR.element( 'span' );
		 * alert( <b>element.is( 'span' )</b> );  "true"
		 * alert( <b>element.is( 'p', 'span' )</b> );  "true"
		 * alert( <b>element.is( 'p' )</b> );  "false"
		 * alert( <b>element.is( 'p', 'div' )</b> );  "false"
		 */
		is : function()
		{
			var name = this.getName();
			for ( var i = 0 ; i < arguments.length ; i++ )
			{
				if ( arguments[ i ] == name )
					return true;
			}
			return false;
		},

		/**
		 * Indicates that the element has defined attributes.
		 * @returns {Boolean} True if the element has attributes.
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '<div title="Test">Example</div>' );
		 * alert( <b>element.hasAttributes()</b> );  "true"
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '<div>Example</div>' );
		 * alert( <b>element.hasAttributes()</b> );  "false"
		 */
		hasAttributes :
			CKEDITOR.env.ie ?
				function()
				{
					var attributes = this.$.attributes;

					for ( var i = 0 ; i < attributes.length ; i++ )
					{
						var attribute = attributes[i];

						switch ( attribute.nodeName )
						{
							case 'class' :
								// IE has a strange bug. If calling removeAttribute('className'),
								// the attributes collection will still contain the "class"
								// attribute, which will be marked as "specified", even if the
								// outerHTML of the element is not displaying the class attribute.
								// Note : I was not able to reproduce it outside the editor,
								// but I've faced it while working on the TC of #1391.
								if ( this.$.className.length > 0 )
									return true;

							// Attributes to be ignored.
							case '_cke_expando' :
								continue;

							/*jsl:fallthru*/

							default :
								if ( attribute.specified )
									return true;
						}
					}

					return false;
				}
			:
				function()
				{
					return this.$.attributes.length > 0;
				},

		/**
		 * Hides this element (display:none).
		 * @example
		 * var element = CKEDITOR.dom.element.getById( 'myElement' );
		 * <b>element.hide()</b>;
		 */
		hide : function()
		{
			this.setStyle( 'display', 'none' );
		},

		moveChildren : function( target, toStart )
		{
			var $ = this.$;
			target = target.$;

			if ( $ == target )
				return;

			var child;

			if ( toStart )
			{
				while ( (child = $.lastChild) )
					target.insertBefore( $.removeChild( child ), target.firstChild );
			}
			else
			{
				while ( (child = $.firstChild) )
					target.appendChild( $.removeChild( child ) );
			}
		},

		/**
		 * Shows this element (display it).
		 * @example
		 * var element = CKEDITOR.dom.element.getById( 'myElement' );
		 * <b>element.show()</b>;
		 */
		show : function()
		{
			this.setStyles(
				{
					display : '',
					visibility : ''
				});
		},

		/**
		 * Sets the value of an element attribute.
		 * @param {String} name The name of the attribute.
		 * @param {String} value The value to be set to the attribute.
		 * @function
		 * @returns {CKEDITOR.dom.element} This element instance.
		 * @example
		 * var element = CKEDITOR.dom.element.getById( 'myElement' );
		 * <b>element.setAttribute( 'class', 'myClass' )</b>;
		 * <b>element.setAttribute( 'title', 'This is an example' )</b>;
		 */
		setAttribute : (function()
		{
			var standard = function( name, value )
			{
				this.$.setAttribute( name, value );
				return this;
			};

			if ( CKEDITOR.env.ie )
			{
				return function( name, value )
				{
					if ( name == 'class' )
						this.$.className = value;
					if ( name == 'style' )
						this.$.style.cssText = value;
					else
						standard.apply( this, arguments );
					return this;
				};
			}
			else
				return standard;
		})(),

		/**
		 * Sets the value of several element attributes.
		 * @param {Object} attributesPairs An object containing the names and
		 *		values of the attributes.
		 * @returns {CKEDITOR.dom.element} This element instance.
		 * @example
		 * var element = CKEDITOR.dom.element.getById( 'myElement' );
		 * <b>element.setAttributes({
		 *     'class' : 'myClass',
		 *     'title' : 'This is an example' })</b>;
		 */
		setAttributes : function( attributesPairs )
		{
			for ( var name in attributesPairs )
				this.setAttribute( name, attributesPairs[ name ] );
			return this;
		},

		/**
		 * Sets the element value. This function is usually used with form
		 * field element.
		 * @param {String} value The element value.
		 * @returns {CKEDITOR.dom.element} This element instance.
		 */
		setValue : function( value )
		{
			this.$.value = value;
			return this;
		},

		/**
		 * Removes an attribute from the element.
		 * @param {String} name The attribute name.
		 * @function
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '<div class="classA"></div>' );
		 * element.removeAttribute( 'class' );
		 */
		removeAttribute : (function()
		{
			var standard = function( name )
			{
				this.$.removeAttribute( name );
			};

			if ( CKEDITOR.env.ie )
			{
				return function( name )
				{
					if ( name == 'class' )
						name = 'className';
					standard.call( this, name );
				};
			}
			else
				return standard;
		})(),

		removeAttributes : function ( attributes )
		{
			for ( var i = 0 ; i < attributes.length ; i++ )
				this.removeAttribute( attributes[ i ] );
		},

		/**
		 * Removes a style from the element.
		 * @param {String} name The style name.
		 * @function
		 * @example
		 * var element = CKEDITOR.dom.element.createFromHtml( '<div style="display:none"></div>' );
		 * element.removeStyle( 'display' );
		 */
		removeStyle : function( name )
		{
			this.setStyle( name, '' );

			if ( !this.$.style.cssText )
				this.removeAttribute( 'style' );
		},

		/**
		 * Sets the value of an element style.
		 * @param {String} name The name of the style. The CSS naming notation
		 *		must be used (e.g. "background-color").
		 * @param {String} value The value to be set to the style.
		 * @returns {CKEDITOR.dom.element} This element instance.
		 * @example
		 * var element = CKEDITOR.dom.element.getById( 'myElement' );
		 * <b>element.setStyle( 'background-color', '#ff0000' )</b>;
		 * <b>element.setStyle( 'margin-top', '10px' )</b>;
		 * <b>element.setStyle( 'float', 'right' )</b>;
		 */
		setStyle : function( name, value )
		{
			this.$.style[ CKEDITOR.tools.cssStyleToDomStyle( name ) ] = value;
			return this;
		},

		/**
		 * Sets the value of several element styles.
		 * @param {Object} stylesPairs An object containing the names and
		 *		values of the styles.
		 * @returns {CKEDITOR.dom.element} This element instance.
		 * @example
		 * var element = CKEDITOR.dom.element.getById( 'myElement' );
		 * <b>element.setStyles({
		 *     'position' : 'absolute',
		 *     'float' : 'right' })</b>;
		 */
		setStyles : function( stylesPairs )
		{
			for ( var name in stylesPairs )
				this.setStyle( name, stylesPairs[ name ] );
			return this;
		},

		/**
		 * Sets the opacity of an element.
		 * @param {Number} opacity A number within the range [0.0, 1.0].
		 * @example
		 * var element = CKEDITOR.dom.element.getById( 'myElement' );
		 * <b>element.setOpacity( 0.75 )</b>;
		 */
		setOpacity : function( opacity )
		{
			if ( CKEDITOR.env.ie )
			{
				opacity = Math.round( opacity * 100 );
				this.setStyle( 'filter', opacity >= 100 ? '' : 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + opacity + ')' );
			}
			else
				this.setStyle( 'opacity', opacity );
		},

		/**
		 * Makes the element and its children unselectable.
		 * @function
		 * @example
		 * var element = CKEDITOR.dom.element.getById( 'myElement' );
		 * element.unselectable();
		 */
		unselectable :
			CKEDITOR.env.gecko ?
				function()
				{
					this.$.style.MozUserSelect = 'none';
				}
			: CKEDITOR.env.webkit ?
				function()
				{
					this.$.style.KhtmlUserSelect = 'none';
				}
			:
				function()
				{
					if ( CKEDITOR.env.ie || CKEDITOR.env.opera )
					{
						var element = this.$,
							e,
							i = 0;

						element.unselectable = 'on';

						while ( ( e = element.all[ i++ ] ) )
						{
							switch ( e.tagName.toLowerCase() )
							{
								case 'iframe' :
								case 'textarea' :
								case 'input' :
								case 'select' :
									/* Ignore the above tags */
									break;
								default :
									e.unselectable = 'on';
							}
						}
					}
				}
	});
