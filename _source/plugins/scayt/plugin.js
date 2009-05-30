/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Spell Check As You Type (SCAYT).
 * Button name : Scayt.
 */

(function()
{
	var commandName 	= 'scaytcheck',
		sc_on_cssclass 	= 'scayt_enabled',
		sc_off_cssclass = 'scayt_disabled',
		openPage		= '';

	var onEngineLoad = function()
	{
		var editor = this;
		dojo.requireLocalization( 'scayt', 'caption', '', 'ROOT' );

		var createInstance = function()	// Create new instance every time Document is created.
		{
			// Initialise Scayt instance.
			var scayt_control = new scayt(
				{
					srcNodeRef: editor.document.getWindow().$.frameElement
				});

			// Copy config.
			var	lastInstance = plugin.instances[ editor.name ];
			if ( lastInstance )
			{
				scayt_control.sLang = lastInstance.sLang;
				scayt_control.option( lastInstance.option() );
				scayt_control.paused = lastInstance.paused;
			}

			plugin.instances[ editor.name ] = scayt_control;

			try {
				scayt_control.setDisabled( scayt_control.paused === false );				// I really don't know why it causes JS error in IE
			} catch (e) {}
		};

		editor.on( 'contentDom', createInstance );		// Get the iframe somehow.
		editor.on( 'contentDomUnload', function()
			{
				// Remove scripts.
				var scripts = CKEDITOR.document.getElementsByTag( 'script' );
				scaytIdRegex =  /^dojoIoScript(\d+)$/i;
				scaytSrcRegex =  /^http:\/\/demo\.spellchecker\.net\/spellcheck3\/script\/ssrv\.cgi/i;

				for ( var i=0; i < scripts.count(); i++ )
				{
					var script = scripts.getItem( i ),
						id = script.getId(),
						src = script.getAttribute( 'src' );

					if ( id && src && id.match( scaytIdRegex ) && src.match( scaytSrcRegex ))
						script.remove();
				}
			});

		editor.on( 'beforeCommandExec', function( ev )		// Disable SCAYT before Source command execution.
			{
				if ( ev.data.name == 'source' && editor.mode == 'wysiwyg' )
				{
					var scayt = plugin.getScayt( editor );
					if ( scayt )
					{
						scayt.paused = !scayt.disabled;
						scayt.setDisabled( true );
					}
				}
			});

		// Listen to data manipulation to reflect scayt markup.
		editor.on( 'beforeGetData', function()
			{
				if ( plugin.isScaytEnabled( editor ) )
					plugin.getScayt( editor ).refresh();
			});

		editor.on( 'afterSetData', function()
			{
				if ( plugin.isScaytEnabled( editor ) )
					plugin.getScayt( editor ).refresh();
			});

		editor.on( 'scaytDialog', function( ev )	// Communication with dialog.
			{
				ev.data.djConfig = djConfig;
				ev.data.scayt_control = plugin.getScayt( editor );
				ev.data.tab = openPage;
				ev.data.scayt = scayt;
			});

		if ( editor.document )
		{
			createInstance();
			editor.fire( 'showScaytState' );
		}
	};

	CKEDITOR.plugins.scayt =
	{
		engineLoaded : false,
		instances : {},
		getScayt : function( editor )
		{
			var instance = this.instances[ editor.name ];
			return instance;
		},
		isScaytReady : function( editor )
		{
			return this.engineLoaded === true &&
				'undefined' !== typeof scayt && this.getScayt( editor );
		},
		isScaytEnabled : function( editor ) 
		{
			var scayt = this.getScayt( editor );
			return ( scayt ) ? scayt.disabled === false : false;
		},
		loadEngine : function( editor )
		{
			if ( this.engineLoaded === true )
				return onEngineLoad.apply( editor );	// Add new instance.
			else if ( this.engineLoaded == -1 )			// We are waiting.
				return CKEDITOR.on( 'scaytReady', function(){ onEngineLoad.apply( editor );} );	// Use function(){} to avoid rejection as duplicate.

			CKEDITOR.on( 'scaytReady', onEngineLoad, editor );
			CKEDITOR.on( 'scaytReady', function()
				{
					this.engineLoaded = true;
				},
				this, 
				null, 
				0 );	// First to run.

			this.engineLoaded = -1;	// Loading in progress.
			djConfig = 
			{
				baseUrl: './',
				blankGif: 'http://demo.spellchecker.net/spellcheck3/lf/scayt/blank.gif',
				parseOnLoad: true,
				afterOnLoad: true,
				useXDomain: true,
				locale: 'en',
				xdWaitSeconds: 10,
				preventCache: false,
				scaytNodes: document.getElementById('foo'),
				require: [
					'dojo.i18n',
					'scayt._base'
				],
				modulePaths:
				{
					'scayt': 'http://demo.spellchecker.net/spellcheck3/lf/scayt'
				},
				addOnLoad: 
				[
					function()
					{
						CKEDITOR.fireOnce( 'scaytReady' );
					}
				],
				isDebug: false
			};

			// Append javascript code.
			CKEDITOR.document.getHead().append( 
				CKEDITOR.document.createElement( 'script',
					{
						attributes :
							{
								type : 'text/javascript',
								src : 'http://demo.spellchecker.net/spellcheck3/lf/dojo/dojo/dojo.xd.js'
							}
					})
			);
		}
	};

	var plugin = CKEDITOR.plugins.scayt;

	// Context menu constructing.
	var addButtonCommand = function( editor, buttonName, buttonLabel, commandName, command, menugroup, menuOrder )
	{
		editor.addCommand( commandName, command );

		// If the "menu" plugin is loaded, register the menu item.
		editor.addMenuItem( commandName,
			{
				label : buttonLabel,
				command : commandName,
				group : menugroup,
				order : menuOrder
			});
	};

	var commandDefinition = 
	{
		preserveState : true,

		exec: function( editor )
		{
			if ( plugin.isScaytReady( editor ) )
			{
				var isEnabled = plugin.isScaytEnabled( editor );
				
				this.setState( isEnabled ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON );

				var scayt_control = plugin.getScayt( editor );
				scayt_control.setDisabled( isEnabled );
			}
			else if ( !editor.config.scayt_autoStartup && plugin.engineLoaded >= 0 )	// Load first time
			{
				this.setState( CKEDITOR.TRISTATE_DISABLED );
				
				editor.on( 'showScaytState', function()
					{
						this.removeListener();
						this.setState( plugin.isScaytEnabled( editor ) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF );
					},
					this);
				
				plugin.loadEngine( editor );
			}
		}
	};
	
	// Add scayt plugin.
	CKEDITOR.plugins.add( 'scayt',
	{
		requires : [ 'menubutton' ],

		beforeInit : function( editor )
		{
			// Register own rbc menu group.
			editor.config.menu_groups = 'scayt_suggest,scayt_moresuggest,scayt_control,' + editor.config.menu_groups;
		},

		init : function( editor )
		{
			var moreSuggestions = {};
			var mainSuggestions = {};

			// Scayt command.
			var command = editor.addCommand( commandName, commandDefinition );

			// Add Options dialog.
			CKEDITOR.dialog.add( commandName, CKEDITOR.getUrl( this.path + 'dialogs/options.js' ) );

			var menuGroup = 'scaytButton';
			editor.addMenuGroup( menuGroup );
			editor.addMenuItems(
				{
					scaytToggle : 
					{
						label : editor.lang.scayt.enable,
						command : commandName,
						group : menuGroup
					},
					
					scaytOptions : 
					{
						label : editor.lang.scayt.options,
						group : menuGroup,
						onClick : function()
						{
							openPage = 'options';
							editor.openDialog( commandName );
						}
					},
					
					scaytLangs : 
					{
						label : editor.lang.scayt.langs,
						group : menuGroup,
						onClick : function()
						{
							openPage = 'langs';
							editor.openDialog( commandName );
						}
					},
					
					scaytAbout :
					{
						label : editor.lang.scayt.about,
						group : menuGroup,
						onClick : function()
						{
							openPage = 'about';
							editor.openDialog( commandName );
						}
					}
				});

			editor.ui.add( 'Scayt', CKEDITOR.UI_MENUBUTTON,
				{
					label : editor.lang.scayt.title,
					title : editor.lang.scayt.title,
					className : 'cke_button_scayt',
					onRender: function()
					{
						command.on( 'state', function()
							{
								this.setState( command.state );
							},
							this);
					},
					onMenu : function()
					{
						var isEnabled = plugin.isScaytEnabled( editor );

						editor.getMenuItem( 'scaytToggle' ).label = editor.lang.scayt[ isEnabled ? 'disable' : 'enable' ];

						return {
							scaytToggle : CKEDITOR.TRISTATE_OFF,
							scaytOptions : isEnabled ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
							scaytLangs : isEnabled ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
							scaytAbout : isEnabled ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED 
						};
					}
				});

			// If the "contextmenu" plugin is loaded, register the listeners.
			if ( editor.contextMenu && editor.addMenuItems )
			{
				editor.contextMenu.addListener( function( element, selection )
					{
						var scayt_control = plugin.getScayt( editor );
						if ( !plugin.isScaytEnabled( editor ) || !element || !element.$ )
							return null;

						var word = scayt_control.getWord( element.$ );

						if ( !word ) 
							return null;

						var sLang = scayt_control.getLang(),
							_r = {},
							items_suggestion = scayt.getSuggestion( word, sLang );

						// Remove unused commands and menuitems
						for ( i in moreSuggestions )
						{
							delete editor._.menuItems[ i ];
							delete editor._.commands[ i ];
						}
						for ( i in mainSuggestions )
						{
							delete editor._.menuItems[ i ];
							delete editor._.commands[ i ];
						}
						moreSuggestions = {};		// Reset items.
						mainSuggestions = {};

						// Register the More suggestions group;
						editor.addMenuItem( 'scayt_moresuggest',
							{
								label : editor.lang.scayt.moreSuggestions,
								group : 'scayt_moresuggest',
								order : 10,
								getItems : function()
								{
									return moreSuggestions;
								}
							});

						for ( var i = 0, l = items_suggestion.length; i < l; i += 1 )
						{
							var commandName = 'scayt_suggestion_' + items_suggestion[i].replace( ' ', '_' );
							var exec = ( function( el, s )
								{
									return {
										exec: function( editor )
										{
											scayt_control.replace(el, s);
										}
									};
								})( element.$, items_suggestion[i] );

							if ( i < editor.config.scayt_maxSuggestions )
							{
								addButtonCommand( editor, 'button_' + commandName, items_suggestion[i], 
									commandName, exec, 'scayt_suggest', i + 1 );
								_r[ commandName ] = CKEDITOR.TRISTATE_OFF;
								mainSuggestions[ commandName ] = CKEDITOR.TRISTATE_OFF;
							}
							else
							{
								addButtonCommand( editor, 'button_' + commandName, items_suggestion[i], 
									commandName, exec, 'scayt_moresuggest', i + 1 );
								moreSuggestions[ commandName ] = CKEDITOR.TRISTATE_OFF;
							}
						}

						var ignore_command =
						{
							exec: function()
							{
								scayt_control.ignore( element.$ );
							}
						};
						var ignore_all_command =
						{
							exec: function()
							{
								scayt_control.ignoreAll( element.$ );
							}
						};
						var addword_command =
						{
							exec: function()
							{
								scayt.addWordToUserDictionary( element.$ );
							}
						};

						addButtonCommand( editor, 'ignore', editor.lang.scayt.ignore, 
							'scayt_ignore', ignore_command, 'scayt_control', 1);
						addButtonCommand( editor, 'ignore_all', editor.lang.scayt.ignoreAll, 
							'scayt_ignore_all', ignore_all_command, 'scayt_control', 2);
						addButtonCommand( editor, 'add_word', editor.lang.scayt.addWord, 
							'scayt_add_word', addword_command, 'scayt_control', 3);

						mainSuggestions[ 'scayt_moresuggest' ] = CKEDITOR.TRISTATE_OFF;
						mainSuggestions[ 'scayt_ignore' ] = CKEDITOR.TRISTATE_OFF;
						mainSuggestions[ 'scayt_ignore_all' ] = CKEDITOR.TRISTATE_OFF;
						mainSuggestions[ 'scayt_add_word' ] = CKEDITOR.TRISTATE_OFF;

						return mainSuggestions;
					});
			}

			// Start plugin
			if ( editor.config.scayt_autoStartup )
				plugin.loadEngine( editor );
		}
	});
})();

CKEDITOR.config.scayt_maxSuggestions = 5;
CKEDITOR.config.scayt_autoStartup = false;
