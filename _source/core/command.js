﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.command = function( editor, commandDefinition )
{
	this.state = ( 'state' in commandDefinition ) ? commandDefinition.state : CKEDITOR.TRISTATE_OFF;

	this.exec = function()
	{
		commandDefinition.exec.call( this, editor );
	};

	CKEDITOR.tools.extend( this, commandDefinition );

	// Call the CKEDITOR.event constructor to initialize this instance.
	CKEDITOR.event.call( this );
};

CKEDITOR.command.prototype =
{
	setState : function( newState )
	{
		// Do nothing if there is no state change.
		if ( this.state == newState )
			return false;

		// Set the new state.
		this.state = newState;

		// Fire the "state" event, so other parts of the code can react to the
		// change.
		this.fire( 'state' );

		return true;
	}
}

CKEDITOR.event.implementOn( CKEDITOR.command.prototype );
