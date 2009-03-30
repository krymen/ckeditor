﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * Khmer language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['km'] =
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
	source			: 'កូត',
	newPage			: 'ទំព័រថ្មី',
	save			: 'រក្សាទុក',
	preview			: 'មើលសាកល្បង',
	cut				: 'កាត់យក',
	copy			: 'ចំលងយក',
	paste			: 'ចំលងដាក់',
	print			: 'បោះពុម្ភ',
	underline		: 'ដិតបន្ទាត់ពីក្រោមអក្សរ',
	bold			: 'អក្សរដិតធំ',
	italic			: 'អក្សរផ្តេក',
	selectAll		: 'ជ្រើសរើសទាំងអស់',
	removeFormat	: 'លប់ចោល ការរចនា',
	strike			: 'ដិតបន្ទាត់ពាក់កណ្តាលអក្សរ',
	subscript		: 'អក្សរតូចក្រោម',
	superscript		: 'អក្សរតូចលើ',
	horizontalrule	: 'បន្ថែមបន្ទាត់ផ្តេក',
	pagebreak		: 'បន្ថែម ការផ្តាច់ទំព័រ',
	unlink			: 'លប់ឈ្នាប់',
	undo			: 'សារឡើងវិញ',
	redo			: 'ធ្វើឡើងវិញ',

	// Common messages and labels.
	common :
	{
		browseServer	: 'មើល',
		url				: 'URL',
		protocol		: 'ប្រូតូកូល',
		upload			: 'ទាញយក',
		uploadSubmit	: 'បញ្ជូនទៅកាន់ម៉ាស៊ីនផ្តល់សេវា',
		image			: 'រូបភាព',
		flash			: 'Flash',
		form			: 'បែបបទ',
		checkbox		: 'ប្រអប់ជ្រើសរើស',
		radio		: 'ប៉ូតុនរង្វង់មូល',
		textField		: 'ជួរសរសេរអត្ថបទ',
		textarea		: 'តំបន់សរសេរអត្ថបទ',
		hiddenField		: 'ជួរលាក់',
		button			: 'ប៉ូតុន',
		select	: 'ជួរជ្រើសរើស',
		imageButton		: 'ប៉ូតុនរូបភាព',
		notSet			: '<មិនមែន>',
		id				: 'Id',
		name			: 'ឈ្មោះ',
		langDir			: 'ទិសដៅភាសា',
		langDirLtr		: 'ពីឆ្វេងទៅស្តាំ(LTR)',
		langDirRtl		: 'ពីស្តាំទៅឆ្វេង(RTL)',
		langCode		: 'លេខកូតភាសា',
		longDescr		: 'អធិប្បាយ URL វែង',
		cssClass		: 'Stylesheet Classes',
		advisoryTitle	: 'ចំណងជើង ប្រឹក្សា',
		cssStyle		: 'ម៉ូត',
		ok				: 'យល់ព្រម',
		cancel			: 'មិនយល់ព្រម',
		generalTab		: 'General', // MISSING
		advancedTab		: 'កំរិតខ្ពស់',
		validateNumberFailed	: 'This value is not a number.', // MISSING
		confirmNewPage	: 'Any unsaved changes to this content will be lost. Are you sure you want to load new page?', // MISSING
		confirmCancel	: 'Some of the options have been changed. Are you sure to close the dialog?' // MISSING
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'បន្ថែមអក្សរពិសេស',
		title		: 'តូអក្សរពិសេស'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'បន្ថែម/កែប្រែ ឈ្នាប់',		// IE6 BUG: A title called "Link" in an <A> tag would invalidate its padding!!
		menu		: 'កែប្រែឈ្នាប់',
		title		: 'ឈ្នាប់',
		info		: 'ពត៌មានអំពីឈ្នាប់',
		target		: 'គោលដៅ',
		upload		: 'ទាញយក',
		advanced	: 'កំរិតខ្ពស់',
		type		: 'ប្រភេទឈ្នាប់',
		toAnchor	: 'យុថ្កានៅក្នុងទំព័រនេះ',
		toEmail		: 'អ៊ីមែល',
		target		: 'គោលដៅ',
		targetNotSet	: '<មិនមែន>',
		targetFrame	: '<ហ្វ្រេម>',
		targetPopup	: '<វីនដូវ លោត>',
		targetNew	: 'វីនដូវថ្មី (_blank)',
		targetTop	: 'វីនដូវនៅលើគេ(_top)',
		targetSelf	: 'វីនដូវដដែល (_self)',
		targetParent	: 'វីនដូវមេ (_parent)',
		targetFrameName	: 'ឈ្មោះហ្រ្វេមដែលជាគោលដៅ',
		targetPopupName	: 'ឈ្មោះវីនដូវលោត',
		popupFeatures	: 'លក្ខណះរបស់វីនដូលលោត',
		popupResizable	: 'Resizable', // MISSING
		popupStatusBar	: 'របា ពត៌មាន',
		popupLocationBar	: 'របា ទីតាំង',
		popupToolbar	: 'របា ឩបករណ៍',
		popupMenuBar	: 'របា មឺនុយ',
		popupFullScreen	: 'អេក្រុងពេញ(IE)',
		popupScrollBars	: 'របា ទាញ',
		popupDependent	: 'អាស្រ័យលើ (Netscape)',
		popupWidth		: 'ទទឹង',
		popupLeft		: 'ទីតាំងខាងឆ្វេង',
		popupHeight		: 'កំពស់',
		popupTop		: 'ទីតាំងខាងលើ',
		id				: 'Id', // MISSING
		langDir			: 'ទិសដៅភាសា',
		langDirNotSet	: '<មិនមែន>',
		langDirLTR		: 'ពីឆ្វេងទៅស្តាំ(LTR)',
		langDirRTL		: 'ពីស្តាំទៅឆ្វេង(RTL)',
		acccessKey		: 'ឃី សំរាប់ចូល',
		name			: 'ឈ្មោះ',
		langCode		: 'ទិសដៅភាសា',
		tabIndex		: 'លេខ Tab',
		advisoryTitle	: 'ចំណងជើង ប្រឹក្សា',
		advisoryContentType	: 'ប្រភេទអត្ថបទ ប្រឹក្សា',
		cssClasses		: 'Stylesheet Classes',
		charset			: 'លេខកូតអក្សររបស់ឈ្នាប់',
		styles			: 'ម៉ូត',
		selectAnchor	: 'ជ្រើសរើសយុថ្កា',
		anchorName		: 'តាមឈ្មោះរបស់យុថ្កា',
		anchorId		: 'តាម Id',
		emailAddress	: 'អ៊ីមែល',
		emailSubject	: 'ចំណងជើងអត្ថបទ',
		emailBody		: 'អត្ថបទ',
		noAnchors		: '(No anchors available in the document)', // MISSING
		noUrl			: 'សូមសរសេរ អាស័យដ្ឋាន URL',
		noEmail			: 'សូមសរសេរ អាស័យដ្ឋាន អ៊ីមែល'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'បន្ថែម/កែប្រែ យុថ្កា',
		menu		: 'ការកំណត់យុថ្កា',
		title		: 'ការកំណត់យុថ្កា',
		name		: 'ឈ្មោះយុទ្ធថ្កា',
		errorName	: 'សូមសរសេរ ឈ្មោះយុទ្ធថ្កា'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Find and Replace', // MISSING
		find				: 'ស្វែងរក',
		replace				: 'ជំនួស',
		findWhat			: 'ស្វែងរកអ្វី:',
		replaceWith			: 'ជំនួសជាមួយ:',
		notFoundMsg			: 'ពាក្យនេះ រកមិនឃើញទេ ។',
		matchCase			: 'ករណ៉ត្រូវរក',
		matchWord			: 'ត្រូវពាក្យទាំងអស់',
		matchCyclic			: 'Match cyclic', // MISSING
		replaceAll			: 'ជំនួសទាំងអស់',
		replaceSuccessMsg	: '%1 occurrence(s) replaced.' // MISSING
	},

	// Table Dialog
	table :
	{
		toolbar		: 'តារាង',
		title		: 'ការកំណត់ តារាង',
		menu		: 'ការកំណត់ តារាង',
		deleteTable	: 'លប់តារាង',
		rows		: 'ជួរផ្តេក',
		columns		: 'ជួរឈរ',
		border		: 'ទំហំស៊ុម',
		align		: 'ការកំណត់ទីតាំង',
		alignNotSet	: '<មិនកំណត់>',
		alignLeft	: 'ខាងឆ្វេង',
		alignCenter	: 'កណ្តាល',
		alignRight	: 'ខាងស្តាំ',
		width		: 'ទទឹង',
		widthPx		: 'ភីកសែល',
		widthPc		: 'ភាគរយ',
		height		: 'កំពស់',
		cellSpace	: 'គំលាតសែល',
		cellPad		: 'គែមសែល',
		caption		: 'ចំណងជើង',
		summary		: 'សេចក្តីសង្ខេប',
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
			menu			: 'Cell', // MISSING
			insertBefore	: 'Insert Cell Before', // MISSING
			insertAfter		: 'Insert Cell After', // MISSING
			deleteCell		: 'លប់សែល',
			merge			: 'បញ្ជូលសែល',
			mergeRight		: 'Merge Right', // MISSING
			mergeDown		: 'Merge Down', // MISSING
			splitHorizontal	: 'Split Cell Horizontally', // MISSING
			splitVertical	: 'Split Cell Vertically' // MISSING
		},

		row :
		{
			menu			: 'Row', // MISSING
			insertBefore	: 'Insert Row Before', // MISSING
			insertAfter		: 'Insert Row After', // MISSING
			deleteRow		: 'លប់ជួរផ្តេក'
		},

		column :
		{
			menu			: 'Column', // MISSING
			insertBefore	: 'Insert Column Before', // MISSING
			insertAfter		: 'Insert Column After', // MISSING
			deleteColumn	: 'លប់ជួរឈរ'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'ការកំណត់ ប៉ូតុន',
		text		: 'អត្ថបទ(តំលៃ)',
		type		: 'ប្រភេទ',
		typeBtn		: 'Button', // MISSING
		typeSbm		: 'Submit', // MISSING
		typeRst		: 'Reset' // MISSING
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'ការកំណត់ប្រអប់ជ្រើសរើស',
		radioTitle	: 'ការកំណត់ប៉ូតុនរង្វង់',
		value		: 'តំលៃ',
		selected	: 'បានជ្រើសរើស'
	},

	// Form Dialog.
	form :
	{
		title		: 'ការកំណត់បែបបទ',
		menu		: 'ការកំណត់បែបបទ',
		action		: 'សកម្មភាព',
		method		: 'វិធី',
		encoding	: 'Encoding', // MISSING
		target		: 'គោលដៅ',
		targetNotSet	: '<មិនមែន>',
		targetNew	: 'វីនដូវថ្មី (_blank)',
		targetTop	: 'វីនដូវនៅលើគេ(_top)',
		targetSelf	: 'វីនដូវដដែល (_self)',
		targetParent	: 'វីនដូវមេ (_parent)'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'ការកំណត់ជួរជ្រើសរើស',
		selectInfo	: 'ពត៌មាន',
		opAvail		: 'ការកំណត់ជ្រើសរើស ដែលអាចកំណត់បាន',
		value		: 'តំលៃ',
		size		: 'ទំហំ',
		lines		: 'បន្ទាត់',
		chkMulti	: 'អនុញ្ញាតអោយជ្រើសរើសច្រើន',
		opText		: 'ពាក្យ',
		opValue		: 'តំលៃ',
		btnAdd		: 'បន្ថែម',
		btnModify	: 'ផ្លាស់ប្តូរ',
		btnUp		: 'លើ',
		btnDown		: 'ក្រោម',
		btnSetValue : 'Set as selected value', // MISSING
		btnDelete	: 'លប់'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'ការកំណត់កន្លែងសរសេរអត្ថបទ',
		cols		: 'ជូរឈរ',
		rows		: 'ជូរផ្តេក'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'ការកំណត់ជួរអត្ថបទ',
		name		: 'ឈ្មោះ',
		value		: 'តំលៃ',
		charWidth	: 'ទទឹង អក្សរ',
		maxChars	: 'អក្សរអតិបរិមា',
		type		: 'ប្រភេទ',
		typeText	: 'ពាក្យ',
		typePass	: 'ពាក្យសំងាត់'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'ការកំណត់ជួរលាក់',
		name	: 'ឈ្មោះ',
		value	: 'តំលៃ'
	},

	// Image Dialog.
	image :
	{
		title		: 'ការកំណត់រូបភាព',
		titleButton	: 'ការកំណត់ប៉ូតុនរូបភាព',
		menu		: 'ការកំណត់រូបភាព',
		infoTab	: 'ពត៌មានអំពីរូបភាព',
		btnUpload	: 'បញ្ជូនទៅកាន់ម៉ាស៊ីនផ្តល់សេវា',
		url		: 'URL',
		upload	: 'ទាញយក',
		alt		: 'អត្ថបទជំនួស',
		width		: 'ទទឹង',
		height	: 'កំពស់',
		lockRatio	: 'អត្រាឡុក',
		resetSize	: 'កំណត់ទំហំឡើងវិញ',
		border	: 'ស៊ុម',
		hSpace	: 'គំលាតទទឹង',
		vSpace	: 'គំលាតបណ្តោយ',
		align		: 'កំណត់ទីតាំង',
		alignLeft	: 'ខាងឆ្វង',
		alignAbsBottom: 'Abs Bottom', // MISSING
		alignAbsMiddle: 'Abs Middle', // MISSING
		alignBaseline	: 'បន្ទាត់ជាមូលដ្ឋាន',
		alignBottom	: 'ខាងក្រោម',
		alignMiddle	: 'កណ្តាល',
		alignRight	: 'ខាងស្តាំ',
		alignTextTop	: 'លើអត្ថបទ',
		alignTop	: 'ខាងលើ',
		preview	: 'មើលសាកល្បង',
		alertUrl	: 'សូមសរសេរងាស័យដ្ឋានរបស់រូបភាព',
		linkTab	: 'ឈ្នាប់',
		button2Img	: 'Do you want to transform the selected image button on a simple image?', // MISSING
		img2Button	: 'Do you want to transform the selected image on a image button?' // MISSING
	},

	// Flash Dialog
	flash :
	{
		properties		: 'ការកំណត់ Flash',
		propertiesTab	: 'Properties', // MISSING
		title		: 'ការកំណត់ Flash',
		chkPlay		: 'លេងដោយស្វ័យប្រវត្ត',
		chkLoop		: 'ចំនួនដង',
		chkMenu		: 'បង្ហាញ មឺនុយរបស់ Flash',
		chkFull		: 'Allow Fullscreen', // MISSING
 		scale		: 'ទំហំ',
		scaleAll		: 'បង្ហាញទាំងអស់',
		scaleNoBorder	: 'មិនបង្ហាញស៊ុម',
		scaleFit		: 'ត្រូវល្មម',
		access			: 'Script Access', // MISSING
		accessAlways	: 'Always', // MISSING
		accessSameDomain	: 'Same domain', // MISSING
		accessNever	: 'Never', // MISSING
		align		: 'កំណត់ទីតាំង',
		alignLeft	: 'ខាងឆ្វង',
		alignAbsBottom: 'Abs Bottom', // MISSING
		alignAbsMiddle: 'Abs Middle', // MISSING
		alignBaseline	: 'បន្ទាត់ជាមូលដ្ឋាន',
		alignBottom	: 'ខាងក្រោម',
		alignMiddle	: 'កណ្តាល',
		alignRight	: 'ខាងស្តាំ',
		alignTextTop	: 'លើអត្ថបទ',
		alignTop	: 'ខាងលើ',
		quality		: 'Quality', // MISSING
		windowMode	: 'Window mode', // MISSING
		flashvars	: 'Variables for Flash', // MISSING
		bgcolor	: 'ពណ៌ផ្ទៃខាងក្រោយ',
		width	: 'ទទឹង',
		height	: 'កំពស់',
		hSpace	: 'គំលាតទទឹង',
		vSpace	: 'គំលាតបណ្តោយ',
		validateSrc : 'សូមសរសេរ អាស័យដ្ឋាន URL',
		validateWidth : 'Width must be a number.', // MISSING
		validateHeight : 'Height must be a number.', // MISSING
		validateHSpace : 'HSpace must be a number.', // MISSING
		validateVSpace : 'VSpace must be a number.' // MISSING
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'ពិនិត្យអក្ខរាវិរុទ្ធ',
		title			: 'Spell Check', // MISSING
		notAvailable	: 'Sorry, but service is unavailable now.', // MISSING
		errorLoading	: 'Error loading application service host: %s.', // MISSING
		notInDic		: 'គ្មានក្នុងវចនានុក្រម',
		changeTo		: 'ផ្លាស់ប្តូរទៅ',
		btnIgnore		: 'មិនផ្លាស់ប្តូរ',
		btnIgnoreAll	: 'មិនផ្លាស់ប្តូរ ទាំងអស់',
		btnReplace		: 'ជំនួស',
		btnReplaceAll	: 'ជំនួសទាំងអស់',
		btnUndo			: 'សារឡើងវិញ',
		noSuggestions	: '- គ្មានសំណើរ -',
		progress		: 'កំពុងពិនិត្យអក្ខរាវិរុទ្ធ...',
		noMispell		: 'ការពិនិត្យអក្ខរាវិរុទ្ធបានចប់: គ្មានកំហុស',
		noChanges		: 'ការពិនិត្យអក្ខរាវិរុទ្ធបានចប់: ពុំមានផ្លាស់ប្តូរ',
		oneChange		: 'ការពិនិត្យអក្ខរាវិរុទ្ធបានចប់: ពាក្យមួយត្រូចបានផ្លាស់ប្តូរ',
		manyChanges		: 'ការពិនិត្យអក្ខរាវិរុទ្ធបានចប់: %1 ពាក្យបានផ្លាស់ប្តូរ',
		ieSpellDownload	: 'ពុំមានកម្មវិធីពិនិត្យអក្ខរាវិរុទ្ធ ។ តើចង់ទាញយកពីណា?'
	},

	smiley :
	{
		toolbar	: 'រូបភាព',
		title	: 'បញ្ជូលរូបភាព'
	},

	elementsPath :
	{
		eleTitle : '%1 element' // MISSING
	},

	numberedlist : 'បញ្ជីជាអក្សរ',
	bulletedlist : 'បញ្ជីជារង្វង់មូល',
	indent : 'បន្ថែមការចូលបន្ទាត់',
	outdent : 'បន្ថយការចូលបន្ទាត់',

	justify :
	{
		left : 'តំរឹមឆ្វេង',
		center : 'តំរឹមកណ្តាល',
		right : 'តំរឹមស្តាំ',
		block : 'តំរឹមសងខាង'
	},

	outdent : 'បន្ថយការចូលបន្ទាត់',
	blockquote : 'Blockquote', // MISSING

	clipboard :
	{
		title		: 'ចំលងដាក់',
		cutError	: 'ការកំណត់សុវត្ថភាពរបស់កម្មវិធីរុករករបស់លោកអ្នក នេះ\u200bមិនអាចធ្វើកម្មវិធីតាក់តែងអត្ថបទ កាត់អត្ថបទយកដោយស្វ័យប្រវត្តបានឡើយ ។ សូមប្រើប្រាស់បន្សំ ឃីដូចនេះ  (Ctrl+X) ។',
		copyError	: 'ការកំណត់សុវត្ថភាពរបស់កម្មវិធីរុករករបស់លោកអ្នក នេះ\u200bមិនអាចធ្វើកម្មវិធីតាក់តែងអត្ថបទ ចំលងអត្ថបទយកដោយស្វ័យប្រវត្តបានឡើយ ។ សូមប្រើប្រាស់បន្សំ ឃីដូចនេះ (Ctrl+C)។',
		pasteMsg	: 'សូមចំលងអត្ថបទទៅដាក់ក្នុងប្រអប់ដូចខាងក្រោមដោយប្រើប្រាស់ ឃី \u200b(<STRONG>Ctrl+V</STRONG>) ហើយចុច <STRONG>OK</STRONG> ។',
		securityMsg	: 'Because of your browser security settings, the editor is not able to access your clipboard data directly. You are required to paste it again in this window.' // MISSING
	},

	pastefromword :
	{
		toolbar : 'ចំលងដាក់ពី Word',
		title : 'ចំលងដាក់ពី Word',
		advice : 'សូមចំលងអត្ថបទទៅដាក់ក្នុងប្រអប់ដូចខាងក្រោមដោយប្រើប្រាស់ ឃី \u200b(<STRONG>Ctrl+V</STRONG>) ហើយចុច <STRONG>OK</STRONG> ។',
		ignoreFontFace : 'មិនគិតអំពីប្រភេទពុម្ភអក្សរ',
		removeStyle : 'លប់ម៉ូត'
	},

	pasteText :
	{
		button : 'ចំលងដាក់អត្ថបទធម្មតា',
		title : 'ចំលងដាក់អត្ថបទធម្មតា'
	},

	templates :
	{
		button : 'ឯកសារគំរូ',
		title : 'ឯកសារគំរូ របស់អត្ថន័យ',
		insertOption: 'Replace actual contents', // MISSING
		selectPromptMsg: 'សូមជ្រើសរើសឯកសារគំរូ ដើម្បីបើកនៅក្នុងកម្មវិធីតាក់តែងអត្ថបទ<br>(អត្ថបទនឹងបាត់បង់):',
		emptyListMsg : '(ពុំមានឯកសារគំរូត្រូវបានកំណត់)'
	},

	showBlocks : 'Show Blocks', // MISSING

	stylesCombo :
	{
		label : 'ម៉ូត',
		panelTitle1 : 'Block Styles', // MISSING
		panelTitle2 : 'Inline Styles', // MISSING
		panelTitle3 : 'Object Styles' // MISSING
	},

	format :
	{
		label : 'រចនា',
		panelTitle : 'រចនា',

		tag_p : 'Normal',
		tag_pre : 'Formatted',
		tag_address : 'Address',
		tag_h1 : 'Heading 1',
		tag_h2 : 'Heading 2',
		tag_h3 : 'Heading 3',
		tag_h4 : 'Heading 4',
		tag_h5 : 'Heading 5',
		tag_h6 : 'Heading 6',
		tag_div : 'Normal (DIV)'
	},

	font :
	{
		label : 'ហ្វុង',
		panelTitle : 'ហ្វុង'
	},

	fontSize :
	{
		label : 'ទំហំ',
		panelTitle : 'ទំហំ'
	},

	colorButton :
	{
		textColorTitle : 'ពណ៌អក្សរ',
		bgColorTitle : 'ពណ៌ផ្ទៃខាងក្រោយ',
		auto : 'ស្វ័យប្រវត្ត',
		more : 'ពណ៌ផ្សេងទៀត..'
	}
};
