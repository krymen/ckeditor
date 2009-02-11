﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.editor} class, which is the base
 *		for other classes representing DOM objects.
 */

/**
 * Represents a DOM object. This class is not intended to be used directly. It
 * serves as the base class for other classes representing specific DOM
 * objects.
 * @constructor
 * @param {Object} nativeDomObject A native DOM object.
 * @augments CKEDITOR.event
 * @example
 */
CKEDITOR.dom.domObject = function( nativeDomObject )
{
	if ( nativeDomObject )
	{
		/**
		 * The native DOM object represented by this class instance.
		 * @type Object
		 * @example
		 * var element = new CKEDITOR.dom.element( 'span' );
		 * alert( element.$.nodeType );  // "1"
		 */
		this.$ = nativeDomObject;

		// Get the main private function from the custom data. Create it if not
		// defined.
		if ( !( this._ = this.getCustomData( '_' ) ) )
			this.setCustomData( '_', ( this._ = {} ) );

		// Call the base event constructor.
		if ( !this._.events )
			CKEDITOR.event.call( this );
	}
};

CKEDITOR.dom.domObject.prototype = (function()
{
	// Do not define other local variables here. We want to keep the native
	// listener closures as clean as possible.

	var getNativeListener = function( domObject, eventName )
	{
		return function( domEvent )
		{
			domObject.fire( eventName, new CKEDITOR.dom.event( domEvent ) );
		};
	};

	return /** @lends CKEDITOR.dom.domObject.prototype */ {

		/** @ignore */
		on  : function( eventName )
		{
			// We customize the "on" function here. The basic idea is that we'll have
			// only one listener for a native event, which will then call all listeners
			// set to the event.

			// Get the listeners holder object.
			var nativeListeners = this.getCustomData( '_cke_nativeListeners' ) || this.setCustomData( '_cke_nativeListeners', {} );

			// Check if we have a listener for that event.
			if ( !nativeListeners[ eventName ] )
			{
				var listener = nativeListeners[ eventName ] = getNativeListener( this, eventName );

				if ( this.$.addEventListener )
					this.$.addEventListener( eventName, listener, false );
				else if ( this.$.attachEvent )
					this.$.attachEvent( 'on' + eventName, listener );
			}

			// Call the original implementation.
			return CKEDITOR.event.prototype.on.apply( this, arguments );
		},

		/** @ignore */
		removeListener : function( eventName )
		{
			// Call the original implementation.
			CKEDITOR.event.prototype.removeListener.apply( this, arguments );

			// If we don't have listeners for this event, clean the DOM up.
			if ( !this.hasListeners( eventName ) )
			{
				var nativeListeners = this.getCustomData( '_cke_nativeListeners' );
				var listener = nativeListeners && nativeListeners[ eventName ];
				if ( listener )
				{
					if ( this.$.removeEventListener )
						this.$.removeEventListener( eventName, listener, false );
					else if ( this.$.detachEvent )
						this.$.detachEvent( eventName, listener );

					delete nativeListeners[ eventName ];
				}
			}
		}
	};
})();

(function( domObjectProto )
{
	var customData = {};

	/**
	 * Determines whether the specified object is equal to the current object.
	 * @name CKEDITOR.dom.domObject.prototype.equals
	 * @function
	 * @param {Object} object The object to compare with the current object.
	 * @returns {Boolean} "true" if the object is equal.
	 * @example
	 * var doc = new CKEDITOR.dom.document( document );
	 * alert( doc.equals( CKEDITOR.document ) );  // "true"
	 * alert( doc == CKEDITOR.document );         // "false"
	 */
	domObjectProto.equals = function( object )
	{
		return ( object && object.$ === this.$ );
	};

	/**
	 * Sets a data slot value for this object. These values are shared by all
	 * instances pointing to that same DOM object.
	 * @name CKEDITOR.dom.domObject.prototype.setCustomData
	 * @function
	 * @param {String} key A key used to identify the data slot.
	 * @param {Object} value The value to set to the data slot.
	 * @returns {CKEDITOR.dom.domObject} This DOM object instance.
	 * @see CKEDITOR.dom.domObject.prototype.getCustomData
	 * @example
	 * var element = new CKEDITOR.dom.element( 'span' );
	 * element.setCustomData( 'hasCustomData', true );
	 */
	domObjectProto.setCustomData = function( key, value )
	{
		var expandoNumber = this.$._cke_expando || ( this.$._cke_expando = CKEDITOR.tools.getNextNumber() ),
			dataSlot = customData[ expandoNumber ] || ( customData[ expandoNumber ] = {} );

		dataSlot[ key ] = value;

		return this;
	};

	/**
	 * Gets the value set to a data slot in this object.
	 * @name CKEDITOR.dom.domObject.prototype.getCustomData
	 * @function
	 * @param {String} key The key used to identify the data slot.
	 * @returns {Object} This value set to the data slot.
	 * @see CKEDITOR.dom.domObject.prototype.setCustomData
	 * @example
	 * var element = new CKEDITOR.dom.element( 'span' );
	 * alert( element.getCustomData( 'hasCustomData' ) );  // e.g. 'true'
	 */
	domObjectProto.getCustomData = function( key )
	{
		var expandoNumber = this.$._cke_expando,
			dataSlot = expandoNumber && customData[ expandoNumber ];

		if ( dataSlot && dataSlot[ key ] !== undefined )
			return dataSlot[ key ];
		return null;
	};

	domObjectProto.removeCustomData = function( key )
	{
		var expandoNumber = this.$._cke_expando,
			dataSlot = expandoNumber && customData[ expandoNumber ],
			retval = dataSlot[ key ];

		delete dataSlot[ key ];
		return retval || null;
	};

	// Implement CKEDITOR.event.
	CKEDITOR.event.implementOn( domObjectProto );

})( CKEDITOR.dom.domObject.prototype );
