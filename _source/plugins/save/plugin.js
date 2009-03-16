/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileSave plugin.
 */

(function()
{
	var saveCmd =
	{
		exec : function( editor )
		{
			var $form = editor.element.$.form;

			if ( $form )
			{
				try
				{
					$form.submit();
				}
				catch( e )
				{
					// If there's a button named "submit" then the form.submit
					// function is masked and can't be called in IE/FF, so we
					// call the click() method of that button.
					if ( $form.submit.click )
						$form.submit.click()
				}
			}
		}
	};

	var pluginName = 'save';

	// Register a plugin named "save".
	CKEDITOR.plugins.add( pluginName,
	{
		init : function( editor )
		{
			editor.addCommand( pluginName, saveCmd );
			editor.ui.addButton( 'Save',
				{
					label : editor.lang.save,
					command : pluginName
				});
		}
	});
})();
