﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.tools} object, which contains
 *		utility functions.
 */

/**
 * Utility functions.
 * @namespace
 * @example
 */
CKEDITOR.tools =
{
	arrayCompare : function( arrayA, arrayB )
	{
		if ( !arrayA && !arrayB )
			return true;

		if ( !arrayA || !arrayB || arrayA.length != arrayB.length )
			return false;

		for ( var i = 0 ; i < arrayA.length ; i++ )
		{
			if ( arrayA[ i ] != arrayB[ i ] )
				return false;
		}

		return true;
	},

	/**
	 * Copy the properties from one object to another. By default, properties
	 * already present in the target object <strong>are not</strong> overwritten.
	 * @param {Object} target The object to be extended.
	 * @param {Object} source[,souce(n)] The objects from which copy
	 *		properties. Any number of objects can be passed to this function.
	 * @param {Boolean} [overwrite] Indicates that properties already present
	 *		in the target object must be overwritten. This must be the last
	 *		parameter in the function call.
	 * @returns {Object} the extended object (target).
	 * @example
	 * // Create the sample object.
	 * var myObject =
	 * {
	 *     prop1 : true
	 * };
	 *
	 * // Extend the above object with two properties.
	 * CKEDITOR.tools.extend( myObject,
	 *     {
	 *         prop2 : true,
	 *         prop3 : true
	 *     } );
	 *
	 * // Alert "prop1", "prop2" and "prop3".
	 * for ( var p in myObject )
	 *     alert( p );
	 */
	extend : function( target )
	{
		var argsLength = arguments.length,
			overwrite = arguments[ argsLength - 1 ];

		if ( typeof overwrite == 'boolean' )
			argsLength--;
		else
			overwrite = false;

		for ( var i = 1 ; i < argsLength ; i++ )
		{
			var source = arguments[ i ];

			for ( var propertyName in source )
			{
				if ( overwrite || target[ propertyName ] == undefined )
					target[ propertyName ] = source[ propertyName ];
			}
		}

		return target;
	},

	/**
	 * Creates an object which is an instance of a class which prototype is a
	 * predefined object. All properties defined in the source object are
	 * automatically inherited by the resulting object, including future
	 * changes to it.
	 * @param {Object} source The source object to be used as the prototype for
	 *		the final object.
	 * @returns {Object} The resulting copy.
	 */
	prototypedCopy : function( source )
	{
		var copy = function()
		{};
		copy.prototype = source;
		return new copy();
	},

	/**
	 * Checks if an object is an Array.
	 * @param {Object} object The object to be checked.
	 * @type Boolean
	 * @returns <i>true</i> if the object is an Array, otherwise <i>false</i>.
	 * @example
	 * alert( CKEDITOR.tools.isArray( [] ) );      // "true"
	 * alert( CKEDITOR.tools.isArray( 'Test' ) );  // "false"
	 */
	isArray : function( object )
	{
		return ( !!object && object instanceof Array );
	},

	/**
	 * Transforms a CSS property name to its relative DOM style name.
	 * @param {String} cssName The CSS property name.
	 * @returns {String} The transformed name.
	 * @example
	 * alert( CKEDITOR.tools.cssStyleToDomStyle( 'background-color' ) );  // "backgroundColor"
	 * alert( CKEDITOR.tools.cssStyleToDomStyle( 'float' ) );             // "cssFloat"
	 */
	cssStyleToDomStyle : function( cssName )
	{
		if ( cssName == 'float' )
			return 'cssFloat';
		else
		{
			return cssName.replace( /-./g, function( match )
				{
					return match.substr( 1 ).toUpperCase();
				});
		}
	},

	/**
	 * Replace special HTML characters in a string with their relative HTML
	 * entity values.
	 * @param {String} text The string to be encoded.
	 * @returns {String} The encode string.
	 * @example
	 * alert( CKEDITOR.tools.htmlEncode( 'A > B & C < D' ) );  // "A &amp;gt; B &amp;amp; C &amp;lt; D"
	 */
	htmlEncode : function( text )
	{
		var standard = function( text )
		{
			var span = new CKEDITOR.dom.element( 'span' );
			span.setText( text );
			return span.getHtml();
		};

		this.htmlEncode = ( standard( '>' ) == '>' ) ?
			function( text )
			{
				// WebKit does't encode the ">" character, which makes sense, but
				// it's different than other browsers.
				return standard( text ).replace( />/g, '&gt;' );
			} :
			standard;

		return this.htmlEncode( text );
	},

	/**
	 * Gets a unique number for this CKEDITOR execution session. It returns
	 * progressive numbers starting at 1.
	 * @function
	 * @returns {Number} A unique number.
	 * @example
	 * alert( CKEDITOR.tools.<b>getNextNumber()</b> );  // "1" (e.g.)
	 * alert( CKEDITOR.tools.<b>getNextNumber()</b> );  // "2"
	 */
	getNextNumber : (function()
	{
		var last = 0;
		return function()
		{
			return ++last;
		};
	})(),

	/**
	 * Creates a function override.
	 * @param {Function} originalFunction The function to be overridden.
	 * @param {Function} functionBuilder A function that returns the new
	 *		function. The original function reference will be passed to this
	 *		function.
	 * @returns {Function} The new function.
	 * @example
	 * var example =
	 * {
	 *     myFunction : function( name )
	 *     {
	 *         alert( 'Name: ' + name );
	 *     }
	 * };
	 *
	 * example.myFunction = CKEDITOR.tools.override( example.myFunction, function( myFunctionOriginal )
	 *     {
	 *         return function( name )
	 *             {
	 *                 alert( 'Override Name: ' + name );
	 *                 myFunctionOriginal.call( this, name );
	 *             };
	 *     });
	 */
	override : function( originalFunction, functionBuilder )
	{
		return functionBuilder( originalFunction );
	},

	/**
	 * Executes a function after specified delay.
	 * @param {Function} func The function to be executed.
	 * @param {Number} [milliseconds] The amount of time (millisecods) to wait
	 *		to fire the function execution. Defaults to zero.
	 * @param {Object} [scope] The object to hold the function execution scope
	 *		(the "this" object). By default the "window" object.
	 * @param {Object|Array} [args] A single object, or an array of objects, to
	 *		pass as arguments to the function.
	 * @param {Object} [ownerWindow] The window that will be used to set the
	 *		timeout. By default the current "window".
	 * @returns {Object} A value that can be used to cancel the function execution.
	 * @example
	 * CKEDITOR.tools.<b>setTimeout(
	 *     function()
	 *     {
	 *         alert( 'Executed after 2 seconds' );
	 *     },
	 *     2000 )</b>;
	 */
	setTimeout : function( func, milliseconds, scope, args, ownerWindow )
	{
		if ( !ownerWindow )
			ownerWindow = window;

		if ( !scope )
			scope = ownerWindow;

		return ownerWindow.setTimeout(
			function()
			{
				if ( args )
					func.apply( scope, [].concat( args ) ) ;
				else
					func.apply( scope ) ;
			},
			milliseconds || 0 );
	},

	/**
	 * Remove spaces from the start and the end of a string. The following
	 * characters are removed: space, tab, line break, line feed.
	 * @function
	 * @param {String} str The text from which remove the spaces.
	 * @returns {String} The modified string without the boundary spaces.
	 * @example
	 * alert( CKEDITOR.tools.trim( '  example ' );  // "example"
	 */
	trim : (function()
	{
		// We are not using \s because we don't want "non-breaking spaces" to be caught.
		var trimRegex = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
		return function( str )
		{
			return str.replace( trimRegex, '' ) ;
		};
	})(),

	/**
	 * Remove spaces from the start (left) of a string. The following
	 * characters are removed: space, tab, line break, line feed.
	 * @function
	 * @param {String} str The text from which remove the spaces.
	 * @returns {String} The modified string excluding the removed spaces.
	 * @example
	 * alert( CKEDITOR.tools.ltrim( '  example ' );  // "example "
	 */
	ltrim : (function()
	{
		// We are not using \s because we don't want "non-breaking spaces" to be caught.
		var trimRegex = /^[ \t\n\r]+/g;
		return function( str )
		{
			return str.replace( trimRegex, '' ) ;
		};
	})(),

	/**
	 * Remove spaces from the end (right) of a string. The following
	 * characters are removed: space, tab, line break, line feed.
	 * @function
	 * @param {String} str The text from which remove the spaces.
	 * @returns {String} The modified string excluding the removed spaces.
	 * @example
	 * alert( CKEDITOR.tools.ltrim( '  example ' );  // "  example"
	 */
	rtrim : (function()
	{
		// We are not using \s because we don't want "non-breaking spaces" to be caught.
		var trimRegex = /[ \t\n\r]+$/g;
		return function( str )
		{
			return str.replace( trimRegex, '' ) ;
		};
	})(),

	/**
	 * Returns the index of an element in an array.
	 * @param {Array} array The array to be searched.
	 * @param {Object} entry The element to be found.
	 * @returns {Number} The (zero based) index of the first entry that matches
	 *		the entry, or -1 if not found.
	 * @example
	 * var letters = [ 'a', 'b', 'c' ];
	 * alert( CKEDITOR.tools.indexOf( letters, 'b' ) );  "1"
	 */
	indexOf : function( array, entry )
	{
		for ( var i = 0, len = array.length ; i < len ; i++ )
		{
			if ( array[ i ] == entry )
				return i;
		}
		return -1;
	},

	bind : function( func, obj )
	{
		return function() { return func.apply( obj, arguments ); };
	}
};

// PACKAGER_RENAME( CKEDITOR.tools )
