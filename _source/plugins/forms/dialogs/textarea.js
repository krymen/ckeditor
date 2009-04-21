/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.dialog.add( 'textarea', function( editor )
{
	return {
		title : editor.lang.textarea.title,
		minWidth : 350,
		minHeight : 140,
		onShow : function()
		{
			var element = this.getParentEditor().getSelection().getSelectedElement();
			if ( element && element.getName() == "textarea" )
			{
				this._element = element;
				this.setupContent( element );
			}
		},
		onOk : function()
		{
			var editor,
				element = this._element,
				isInsertMode = !element;

			if ( isInsertMode )
			{
				editor = this.getParentEditor();
				element = editor.document.createElement( 'textarea' );
			}
			this.commitContent( element );

			if ( isInsertMode )
				editor.insertElement( element );
		},
		contents : [
			{
				id : 'info',
				label : editor.lang.textarea.title,
				title : editor.lang.textarea.title,
				elements : [
					{
						id : '_cke_saved_name',
						type : 'text',
						label : editor.lang.common.name,
						'default' : '',
						accessKey : 'N',
						setup : function( element )
						{
							this.setValue( element.getAttribute( '_cke_saved_name' ) );
						},
						commit : function( element )
						{
							if ( this.getValue() )
								element.setAttribute( '_cke_saved_name', this.getValue() );
							else
							{
								element.removeAttribute( '_cke_saved_name' );
								element.removeAttribute( 'name' );
							}
						}
					},
					{
						id : 'cols',
						type : 'text',
						label : editor.lang.textarea.cols,
						'default' : '',
						accessKey : 'C',
						style : 'width:50px',
						validate : CKEDITOR.dialog.validate.integer( editor.lang.common.validateNumberFailed ),
						setup : function( element )
						{
							var ieDefault = 20;
							var value = element.getAttribute( 'cols' );
							this.setValue( ( CKEDITOR.env.ie && ( value == ieDefault ) ? '' : value ) || '' );
						},
						commit : function( element )
						{
							if ( this.getValue() )
								element.setAttribute( 'cols', this.getValue() );
							else
								element.removeAttribute( 'cols' );
						}
					},
					{
						id : 'rows',
						type : 'text',
						label : editor.lang.textarea.rows,
						'default' : '',
						accessKey : 'R',
						style : 'width:50px',
						validate : CKEDITOR.dialog.validate.integer( editor.lang.common.validateNumberFailed ),
						setup : function( element )
						{
							var ieDefault = 2;
							var value = element.getAttribute( 'rows' );
							this.setValue( ( CKEDITOR.env.ie && ( value == ieDefault ) ? '' : value ) || '' );
						},
						commit : function( element )
						{
							if ( this.getValue() )
								element.setAttribute( 'rows', this.getValue() );
							else
								element.removeAttribute( 'rows' );
						}
					}
				]
			}
		]
	};
});
