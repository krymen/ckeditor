﻿/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @file AutoGrow plugin
 */
(function(){

	CKEDITOR.plugins.add( 'autogrow',
	{
		init : function( editor )
		{
			var lastContentHeight;
			var resizeEditor = function( editor )
			{
				if ( !editor.window )
					return;

				var doc = editor.document,
					resizeable = editor.getResizable( 1 ),
					body = doc.getBody().$,
					htmlElement = doc.getDocumentElement().$,
					currentHeight = resizeable.$.offsetHeight,
					newHeight;

				var delta =
						// Delta height by checking scrollHeight.
						( CKEDITOR.env.ie && CKEDITOR.env.quirks ? body.scrollHeight - body.clientHeight
								: htmlElement.scrollHeight - ( htmlElement.clientHeight || htmlElement.offsetHeight ) )
						// Negative scrollHeight (content reduced) is not supported in some browsers, figure it out by watching over the content size.
						|| ( body.clientHeight < lastContentHeight ? body.clientHeight - lastContentHeight : 0 );

				if ( delta )
				{
					newHeight = currentHeight + delta;
					var min = editor.config.autoGrow_minHeight,
						max = editor.config.autoGrow_maxHeight;

					( min == undefined ) && ( editor.config.autoGrow_minHeight = min = 200 );
					if ( min )
						newHeight = Math.max( newHeight, min );
					if ( max )
						newHeight = Math.min( newHeight, max );

					if ( newHeight != currentHeight )
					{
						newHeight = editor.fire( 'autoGrow', { currentHeight : currentHeight, newHeight : newHeight } ).newHeight;
						resizeable.setStyle( 'height', newHeight + 'px' );
						editor.fire( 'resize' );
					}
				}

				lastContentHeight = body.clientHeight;
			};

			for ( var eventName in { contentDom:1, key:1, selectionChange:1, insertElement:1 } )
			{
				editor.on( eventName, function( evt )
				{
					var maximize = editor.getCommand( 'maximize' );
					// Some time is required for insertHtml, and it gives other events better performance as well.
					if ( evt.editor.mode == 'wysiwyg' &&
						// Disable autogrow when the editor is maximized .(#6339)
						( !maximize || maximize.state != CKEDITOR.TRISTATE_ON ) )
					{
						setTimeout( function(){ resizeEditor( evt.editor ); }, 100 );
					}
				});
			}
		}
	});
})();
/**
 * The minimum height to which the editor can reach using AutoGrow.
 * @name CKEDITOR.config.autoGrow_minHeight
 * @type Number
 * @default 200
 * @since 3.4
 * @example
 * config.autoGrow_minHeight = 300;
 */

/**
 * The maximum height to which the editor can reach using AutoGrow. Zero means unlimited.
 * @name CKEDITOR.config.autoGrow_maxHeight
 * @type Number
 * @default 0
 * @since 3.4
 * @example
 * config.autoGrow_maxHeight = 400;
 */

/**
 * Fired when the AutoGrow plugin is about to change the size of the editor.
 * @name CKEDITOR.editor#autogrow
 * @event
 * @param {Number} data.currentHeight The current height of the editor (before the resizing).
 * @param {Number} data.newHeight The new height of the editor (after the resizing). It can be changed
 *				to determine another height to be used instead.
 */
