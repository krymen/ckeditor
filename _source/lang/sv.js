﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * Swedish language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['sv'] =
{
	/**
	 * The language reading direction. Possible values are "rtl" for
	 * Right-To-Left languages (like Arabic) and "ltr" for Left-To-Right
	 * languages (like English).
	 * @default 'ltr'
	 */
	dir : 'ltr',

	/*
	 * Screenreader titles. Please note that screenreaders are not always capable
	 * of reading non-English words. So be careful while translating it.
	 */
	editorTitle		: 'Rich text editor, %1', // MISSING

	// Toolbar buttons without dialogs.
	source			: 'Källa',
	newPage			: 'Ny sida',
	save			: 'Spara',
	preview			: 'Förhandsgranska',
	cut				: 'Klipp ut',
	copy			: 'Kopiera',
	paste			: 'Klistra in',
	print			: 'Skriv ut',
	underline		: 'Understruken',
	bold			: 'Fet',
	italic			: 'Kursiv',
	selectAll		: 'Markera allt',
	removeFormat	: 'Radera formatering',
	strike			: 'Genomstruken',
	subscript		: 'Nedsänkta tecken',
	superscript		: 'Upphöjda tecken',
	horizontalrule	: 'Infoga horisontal linje',
	pagebreak		: 'Infoga sidbrytning',
	unlink			: 'Radera länk',
	undo			: 'Ångra',
	redo			: 'Gör om',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Bläddra på server',
		url				: 'URL',
		protocol		: 'Protokoll',
		upload			: 'Ladda upp',
		uploadSubmit	: 'Skicka till server',
		image			: 'Bild',
		flash			: 'Flash',
		form			: 'Formulär',
		checkbox		: 'Kryssruta',
		radio		: 'Alternativknapp',
		textField		: 'Textfält',
		textarea		: 'Textruta',
		hiddenField		: 'Dolt fält',
		button			: 'Knapp',
		select	: 'Flervalslista',
		imageButton		: 'Bildknapp',
		notSet			: '<ej angivet>',
		id				: 'Id',
		name			: 'Namn',
		langDir			: 'Språkriktning',
		langDirLtr		: 'Vänster till Höger (VTH)',
		langDirRtl		: 'Höger till Vänster (HTV)',
		langCode		: 'Språkkod',
		longDescr		: 'URL-beskrivning',
		cssClass		: 'Stylesheet class',
		advisoryTitle	: 'Titel',
		cssStyle		: 'Style',
		ok				: 'OK',
		cancel			: 'Avbryt',
		generalTab		: 'General', // MISSING
		advancedTab		: 'Avancerad',
		validateNumberFailed	: 'This value is not a number.', // MISSING
		confirmNewPage	: 'Any unsaved changes to this content will be lost. Are you sure you want to load new page?', // MISSING
		confirmCancel	: 'Some of the options have been changed. Are you sure to close the dialog?' // MISSING
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Klistra in utökat tecken',
		title		: 'Välj utökat tecken'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Infoga/Redigera länk',		// IE6 BUG: A title called "Link" in an <A> tag would invalidate its padding!!
		menu		: 'Redigera länk',
		title		: 'Länk',
		info		: 'Länkinformation',
		target		: 'Mål',
		upload		: 'Ladda upp',
		advanced	: 'Avancerad',
		type		: 'Länktyp',
		toAnchor	: 'Ankare i sidan',
		toEmail		: 'E-post',
		target		: 'Mål',
		targetNotSet	: '<ej angivet>',
		targetFrame	: '<ram>',
		targetPopup	: '<popup-fönster>',
		targetNew	: 'Nytt fönster (_blank)',
		targetTop	: 'Översta fönstret (_top)',
		targetSelf	: 'Detta fönstret (_self)',
		targetParent	: 'Föregående Window (_parent)',
		targetFrameName	: 'Målets ramnamn',
		targetPopupName	: 'Popup-fönstrets namn',
		popupFeatures	: 'Popup-fönstrets egenskaper',
		popupResizable	: 'Resizable', // MISSING
		popupStatusBar	: 'Statusfält',
		popupLocationBar	: 'Adressfält',
		popupToolbar	: 'Verktygsfält',
		popupMenuBar	: 'Menyfält',
		popupFullScreen	: 'Helskärm (endast IE)',
		popupScrollBars	: 'Scrolllista',
		popupDependent	: 'Beroende (endest Netscape)',
		popupWidth		: 'Bredd',
		popupLeft		: 'Position från vänster',
		popupHeight		: 'Höjd',
		popupTop		: 'Position från sidans topp',
		id				: 'Id', // MISSING
		langDir			: 'Språkriktning',
		langDirNotSet	: '<ej angivet>',
		langDirLTR		: 'Vänster till Höger (VTH)',
		langDirRTL		: 'Höger till Vänster (HTV)',
		acccessKey		: 'Behörighetsnyckel',
		name			: 'Namn',
		langCode		: 'Språkriktning',
		tabIndex		: 'Tabindex',
		advisoryTitle	: 'Titel',
		advisoryContentType	: 'Innehållstyp',
		cssClasses		: 'Stylesheet class',
		charset			: 'Teckenuppställning',
		styles			: 'Style',
		selectAnchor	: 'Välj ett ankare',
		anchorName		: 'efter ankarnamn',
		anchorId		: 'efter objektid',
		emailAddress	: 'E-postadress',
		emailSubject	: 'Ämne',
		emailBody		: 'Innehåll',
		noAnchors		: '(Inga ankare kunde hittas)',
		noUrl			: 'Var god ange länkens URL',
		noEmail			: 'Var god ange E-postadress'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Infoga/Redigera ankarlänk',
		menu		: 'Egenskaper för ankarlänk',
		title		: 'Egenskaper för ankarlänk',
		name		: 'Ankarnamn',
		errorName	: 'Var god ange ett ankarnamn'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Sök och ersätt',
		find				: 'Sök',
		replace				: 'Ersätt',
		findWhat			: 'Sök efter:',
		replaceWith			: 'Ersätt med:',
		notFoundMsg			: 'Angiven text kunde ej hittas.',
		matchCase			: 'Skiftläge',
		matchWord			: 'Inkludera hela ord',
		matchCyclic			: 'Match cyclic', // MISSING
		replaceAll			: 'Ersätt alla',
		replaceSuccessMsg	: '%1 occurrence(s) replaced.' // MISSING
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Tabell',
		title		: 'Tabellegenskaper',
		menu		: 'Tabellegenskaper',
		deleteTable	: 'Radera tabell',
		rows		: 'Rader',
		columns		: 'Kolumner',
		border		: 'Kantstorlek',
		align		: 'Justering',
		alignNotSet	: '<ej angivet>',
		alignLeft	: 'Vänster',
		alignCenter	: 'Centrerad',
		alignRight	: 'Höger',
		width		: 'Bredd',
		widthPx		: 'pixlar',
		widthPc		: 'procent',
		height		: 'Höjd',
		cellSpace	: 'Cellavstånd',
		cellPad		: 'Cellutfyllnad',
		caption		: 'Rubrik',
		summary		: 'Sammanfattning',
		headers		: 'Headers', // MISSING
		headersNone		: 'None', // MISSING
		headersColumn	: 'First column', // MISSING
		headersRow		: 'First Row', // MISSING
		headersBoth		: 'Both', // MISSING
		invalidRows		: 'Number of rows must be a number greater than 0.', // MISSING
		invalidCols		: 'Number of columns must be a number greater than 0.', // MISSING
		invalidBorder	: 'Border size must be a number.', // MISSING
		invalidWidth	: 'Table width must be a number.', // MISSING
		invalidHeight	: 'Table height must be a number.', // MISSING
		invalidCellSpacing	: 'Cell spacing must be a number.', // MISSING
		invalidCellPadding	: 'Cell padding must be a number.', // MISSING

		cell :
		{
			menu			: 'Cell',
			insertBefore	: 'Lägg till Cell Före',
			insertAfter		: 'Lägg till Cell Efter',
			deleteCell		: 'Radera celler',
			merge			: 'Sammanfoga celler',
			mergeRight		: 'Sammanfoga Höger',
			mergeDown		: 'Sammanfoga Ner',
			splitHorizontal	: 'Dela Cell Horisontellt',
			splitVertical	: 'Dela Cell Vertikalt',
			title			: 'Cell Properties', // MISSING
			cellType		: 'Cell Type', // MISSING
			rowSpan			: 'Rows Span', // MISSING
			colSpan			: 'Columns Span', // MISSING
			wordWrap		: 'Word Wrap', // MISSING
			hAlign			: 'Horizontal Alignment', // MISSING
			vAlign			: 'Vertical Alignment', // MISSING
			alignTop		: 'Top', // MISSING
			alignMiddle		: 'Middle', // MISSING
			alignBottom		: 'Bottom', // MISSING
			alignBaseline	: 'Baseline', // MISSING
			bgColor			: 'Background Color', // MISSING
			borderColor		: 'Border Color', // MISSING
			data			: 'Data', // MISSING
			header			: 'Header', // MISSING
			yes				: 'Yes', // MISSING
			no				: 'No', // MISSING
			invalidWidth	: 'Cell width must be a number.', // MISSING
			invalidHeight	: 'Cell height must be a number.', // MISSING
			invalidRowSpan	: 'Rows span must be a whole number.', // MISSING
			invalidColSpan	: 'Columns span must be a whole number.' // MISSING
		},

		row :
		{
			menu			: 'Rad',
			insertBefore	: 'Lägg till Rad Före',
			insertAfter		: 'Lägg till Rad Efter',
			deleteRow		: 'Radera rad'
		},

		column :
		{
			menu			: 'Kolumn',
			insertBefore	: 'Lägg till Kolumn Före',
			insertAfter		: 'Lägg till Kolumn Efter',
			deleteColumn	: 'Radera kolumn'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Egenskaper för knapp',
		text		: 'Text (Värde)',
		type		: 'Typ',
		typeBtn		: 'Knapp',
		typeSbm		: 'Skicka',
		typeRst		: 'Återställ'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Egenskaper för kryssruta',
		radioTitle	: 'Egenskaper för alternativknapp',
		value		: 'Värde',
		selected	: 'Vald'
	},

	// Form Dialog.
	form :
	{
		title		: 'Egenskaper för formulär',
		menu		: 'Egenskaper för formulär',
		action		: 'Funktion',
		method		: 'Metod',
		encoding	: 'Encoding', // MISSING
		target		: 'Mål',
		targetNotSet	: '<ej angivet>',
		targetNew	: 'Nytt fönster (_blank)',
		targetTop	: 'Översta fönstret (_top)',
		targetSelf	: 'Detta fönstret (_self)',
		targetParent	: 'Föregående Window (_parent)'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Egenskaper för flervalslista',
		selectInfo	: 'Information',
		opAvail		: 'Befintliga val',
		value		: 'Värde',
		size		: 'Storlek',
		lines		: 'Linjer',
		chkMulti	: 'Tillåt flerval',
		opText		: 'Text',
		opValue		: 'Värde',
		btnAdd		: 'Lägg till',
		btnModify	: 'Redigera',
		btnUp		: 'Upp',
		btnDown		: 'Ner',
		btnSetValue : 'Markera som valt värde',
		btnDelete	: 'Radera'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Egenskaper för textruta',
		cols		: 'Kolumner',
		rows		: 'Rader'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Egenskaper för textfält',
		name		: 'Namn',
		value		: 'Värde',
		charWidth	: 'Teckenbredd',
		maxChars	: 'Max antal tecken',
		type		: 'Typ',
		typeText	: 'Text',
		typePass	: 'Lösenord'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Egenskaper för dolt fält',
		name	: 'Namn',
		value	: 'Värde'
	},

	// Image Dialog.
	image :
	{
		title		: 'Bildegenskaper',
		titleButton	: 'Egenskaper för bildknapp',
		menu		: 'Bildegenskaper',
		infoTab	: 'Bildinformation',
		btnUpload	: 'Skicka till server',
		url		: 'URL',
		upload	: 'Ladda upp',
		alt		: 'Alternativ text',
		width		: 'Bredd',
		height	: 'Höjd',
		lockRatio	: 'Lås höjd/bredd förhållanden',
		resetSize	: 'Återställ storlek',
		border	: 'Kant',
		hSpace	: 'Horis. marginal',
		vSpace	: 'Vert. marginal',
		align		: 'Justering',
		alignLeft	: 'Vänster',
		alignAbsBottom: 'Absolut nederkant',
		alignAbsMiddle: 'Absolut centrering',
		alignBaseline	: 'Baslinje',
		alignBottom	: 'Nederkant',
		alignMiddle	: 'Mitten',
		alignRight	: 'Höger',
		alignTextTop	: 'Text överkant',
		alignTop	: 'Överkant',
		preview	: 'Förhandsgranska',
		alertUrl	: 'Var god och ange bildens URL',
		linkTab	: 'Länk',
		button2Img	: 'Do you want to transform the selected image button on a simple image?', // MISSING
		img2Button	: 'Do you want to transform the selected image on a image button?' // MISSING
	},

	// Flash Dialog
	flash :
	{
		properties		: 'Flashegenskaper',
		propertiesTab	: 'Properties', // MISSING
		title		: 'Flashegenskaper',
		chkPlay		: 'Automatisk uppspelning',
		chkLoop		: 'Upprepa/Loopa',
		chkMenu		: 'Aktivera Flashmeny',
		chkFull		: 'Allow Fullscreen', // MISSING
 		scale		: 'Skala',
		scaleAll		: 'Visa allt',
		scaleNoBorder	: 'Ingen ram',
		scaleFit		: 'Exakt passning',
		access			: 'Script Access', // MISSING
		accessAlways	: 'Always', // MISSING
		accessSameDomain	: 'Same domain', // MISSING
		accessNever	: 'Never', // MISSING
		align		: 'Justering',
		alignLeft	: 'Vänster',
		alignAbsBottom: 'Absolut nederkant',
		alignAbsMiddle: 'Absolut centrering',
		alignBaseline	: 'Baslinje',
		alignBottom	: 'Nederkant',
		alignMiddle	: 'Mitten',
		alignRight	: 'Höger',
		alignTextTop	: 'Text överkant',
		alignTop	: 'Överkant',
		quality		: 'Quality', // MISSING
		windowMode	: 'Window mode', // MISSING
		flashvars	: 'Variables for Flash', // MISSING
		bgcolor	: 'Bakgrundsfärg',
		width	: 'Bredd',
		height	: 'Höjd',
		hSpace	: 'Horis. marginal',
		vSpace	: 'Vert. marginal',
		validateSrc : 'Var god ange länkens URL',
		validateWidth : 'Width must be a number.', // MISSING
		validateHeight : 'Height must be a number.', // MISSING
		validateHSpace : 'HSpace must be a number.', // MISSING
		validateVSpace : 'VSpace must be a number.' // MISSING
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Stavningskontroll',
		title			: 'Spell Check', // MISSING
		notAvailable	: 'Sorry, but service is unavailable now.', // MISSING
		errorLoading	: 'Error loading application service host: %s.', // MISSING
		notInDic		: 'Saknas i ordlistan',
		changeTo		: 'Ändra till',
		btnIgnore		: 'Ignorera',
		btnIgnoreAll	: 'Ignorera alla',
		btnReplace		: 'Ersätt',
		btnReplaceAll	: 'Ersätt alla',
		btnUndo			: 'Ångra',
		noSuggestions	: '- Förslag saknas -',
		progress		: 'Stavningskontroll pågår...',
		noMispell		: 'Stavningskontroll slutförd: Inga stavfel påträffades.',
		noChanges		: 'Stavningskontroll slutförd: Inga ord rättades.',
		oneChange		: 'Stavningskontroll slutförd: Ett ord rättades.',
		manyChanges		: 'Stavningskontroll slutförd: %1 ord rättades.',
		ieSpellDownload	: 'Stavningskontrollen är ej installerad. Vill du göra det nu?'
	},

	smiley :
	{
		toolbar	: 'Smiley',
		title	: 'Infoga smiley'
	},

	elementsPath :
	{
		eleTitle : '%1 element' // MISSING
	},

	numberedlist : 'Numrerad lista',
	bulletedlist : 'Punktlista',
	indent : 'Öka indrag',
	outdent : 'Minska indrag',

	justify :
	{
		left : 'Vänsterjustera',
		center : 'Centrera',
		right : 'Högerjustera',
		block : 'Justera till marginaler'
	},

	outdent : 'Minska indrag',
	blockquote : 'Blockquote', // MISSING

	clipboard :
	{
		title		: 'Klistra in',
		cutError	: 'Säkerhetsinställningar i Er webläsare tillåter inte åtgården Klipp ut. Använd (Ctrl+X) istället.',
		copyError	: 'Säkerhetsinställningar i Er webläsare tillåter inte åtgården Kopiera. Använd (Ctrl+C) istället',
		pasteMsg	: 'Var god och klistra in Er text i rutan nedan genom att använda (<STRONG>Ctrl+V</STRONG>) klicka sen på <STRONG>OK</STRONG>.',
		securityMsg	: 'På grund av din webläsares säkerhetsinställningar kan verktyget inte få åtkomst till urklippsdatan. Var god och använd detta fönster istället.'
	},

	pastefromword :
	{
		toolbar : 'Klistra in från Word',
		title : 'Klistra in från Word',
		advice : 'Var god och klistra in Er text i rutan nedan genom att använda (<STRONG>Ctrl+V</STRONG>) klicka sen på <STRONG>OK</STRONG>.',
		ignoreFontFace : 'Ignorera typsnittsdefinitioner',
		removeStyle : 'Radera Stildefinitioner'
	},

	pasteText :
	{
		button : 'Klistra in som vanlig text',
		title : 'Klistra in som vanlig text'
	},

	templates :
	{
		button : 'Sidmallar',
		title : 'Sidmallar',
		insertOption: 'Ersätt aktuellt innehåll',
		selectPromptMsg: 'Var god välj en mall att använda med editorn<br>(allt nuvarande innehåll raderas):',
		emptyListMsg : '(Ingen mall är vald)'
	},

	showBlocks : 'Show Blocks', // MISSING

	stylesCombo :
	{
		label : 'Anpassad stil',
		panelTitle1 : 'Block Styles', // MISSING
		panelTitle2 : 'Inline Styles', // MISSING
		panelTitle3 : 'Object Styles' // MISSING
	},

	format :
	{
		label : 'Teckenformat',
		panelTitle : 'Teckenformat',

		tag_p : 'Normal',
		tag_pre : 'Formaterad',
		tag_address : 'Adress',
		tag_h1 : 'Rubrik 1',
		tag_h2 : 'Rubrik 2',
		tag_h3 : 'Rubrik 3',
		tag_h4 : 'Rubrik 4',
		tag_h5 : 'Rubrik 5',
		tag_h6 : 'Rubrik 6',
		tag_div : 'Normal (DIV)'
	},

	font :
	{
		label : 'Typsnitt',
		panelTitle : 'Typsnitt'
	},

	fontSize :
	{
		label : 'Storlek',
		panelTitle : 'Storlek'
	},

	colorButton :
	{
		textColorTitle : 'Textfärg',
		bgColorTitle : 'Bakgrundsfärg',
		auto : 'Automatisk',
		more : 'Fler färger...'
	},
	
	about :
	{
		title : 'About CKEditor', // MISSING
		moreInfo : 'For licensing information please visit our web site:', // MISSING
		copy : 'Copyright &copy; $1. All rights reserved.' // MISSING
	}
};