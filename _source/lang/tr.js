﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Defines the {@link CKEDITOR.lang} object, for the
 * Turkish language.
 */

/**#@+
   @type String
   @example
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKEDITOR.lang['tr'] =
{
	/**
	 * The language reading direction. Possible values are "rtl" for
	 * Right-To-Left languages (like Arabic) and "ltr" for Left-To-Right
	 * languages (like English).
	 * @default 'ltr'
	 */
	dir : 'ltr',

	// Toolbar buttons without dialogs.
	source			: 'Kaynak',
	newPage			: 'Yeni Sayfa',
	save			: 'Kaydet',
	preview			: 'Ön İzleme',
	cut				: 'Kes',
	copy			: 'Kopyala',
	paste			: 'Yapıştır',
	print			: 'Yazdır',
	underline		: 'Altı Çizgili',
	bold			: 'Kalın',
	italic			: 'İtalik',
	selectAll		: 'Tümünü Seç',
	removeFormat	: 'Biçimi Kaldır',
	strike			: 'Üstü Çizgili',
	subscript		: 'Alt Simge',
	superscript		: 'Üst Simge',
	horizontalrule	: 'Yatay Satır Ekle',
	pagebreak		: 'Sayfa Sonu Ekle',
	unlink			: 'Köprü Kaldır',
	undo			: 'Geri Al',
	redo			: 'Tekrarla',

	// Common messages and labels.
	common :
	{
		browseServer	: 'Sunucuyu Gez',
		url				: 'URL',
		protocol		: 'Protokol',
		upload			: 'Karşıya Yükle',
		uploadSubmit	: 'Sunucuya Yolla',
		image			: 'Resim',
		flash			: 'Flash',
		form			: 'Form',
		checkbox		: 'Onay Kutusu',
		radio		: 'Seçenek Düğmesi',
		textField		: 'Metin Girişi',
		textarea		: 'Çok Satırlı Metin',
		hiddenField		: 'Gizli Veri',
		button			: 'Düğme',
		select	: 'Seçim Menüsü',
		imageButton		: 'Resimli Düğme',
		notSet			: '<tanımlanmamış>',
		id				: 'Kimlik',
		name			: 'Ad',
		langDir			: 'Dil Yönü',
		langDirLtr		: 'Soldan Sağa (LTR)',
		langDirRtl		: 'Sağdan Sola (RTL)',
		langCode		: 'Dil Kodlaması',
		longDescr		: 'Uzun Tanımlı URL',
		cssClass		: 'Biçem Sayfası Sınıfları',
		advisoryTitle	: 'Danışma Başlığı',
		cssStyle		: 'Biçem',
		ok				: 'Tamam',
		cancel			: 'İptal',
		generalTab		: 'Genel',
		advancedTab		: 'Gelişmiş',
		validateNumberFailed	: 'This value is not a number.', // MISSING
		confirmNewPage	: 'Any unsaved changes to this content will be lost. Are you sure you want to load new page?', // MISSING
		confirmCancel	: 'Some of the options have been changed. Are you sure to close the dialog?' // MISSING
	},

	// Special char dialog.
	specialChar		:
	{
		toolbar		: 'Özel Karakter Ekle',
		title		: 'Özel Karakter Seç'
	},

	// Link dialog.
	link :
	{
		toolbar		: 'Köprü Ekle/Düzenle',		// IE6 BUG: A title called "Link" in an <A> tag would invalidate its padding!!
		menu		: 'Köprü Düzenle',
		title		: 'Köprü',
		info		: 'Köprü Bilgisi',
		target		: 'Hedef',
		upload		: 'Karşıya Yükle',
		advanced	: 'Gelişmiş',
		type		: 'Köprü Türü',
		toAnchor	: 'Bu sayfada çapa',
		toEmail		: 'E-Posta',
		target		: 'Hedef',
		targetNotSet	: '<tanımlanmamış>',
		targetFrame	: '<çerçeve>',
		targetPopup	: '<yeni açılan pencere>',
		targetNew	: 'Yeni Pencere(_blank)',
		targetTop	: 'En Üst Pencere (_top)',
		targetSelf	: 'Kendi Penceresi (_self)',
		targetParent	: 'Anne Pencere (_parent)',
		targetFrameName	: 'Hedef Çerçeve Adı',
		targetPopupName	: 'Yeni Açılan Pencere Adı',
		popupFeatures	: 'Yeni Açılan Pencere Özellikleri',
		popupResizable	: 'Resizable', // MISSING
		popupStatusBar	: 'Durum Çubuğu',
		popupLocationBar	: 'Yer Çubuğu',
		popupToolbar	: 'Araç Çubuğu',
		popupMenuBar	: 'Menü Çubuğu',
		popupFullScreen	: 'Tam Ekran (IE)',
		popupScrollBars	: 'Kaydırma Çubukları',
		popupDependent	: 'Bağımlı (Netscape)',
		popupWidth		: 'Genişlik',
		popupLeft		: 'Sola Göre Konum',
		popupHeight		: 'Yükseklik',
		popupTop		: 'Yukarıya Göre Konum',
		id				: 'Id', // MISSING
		langDir			: 'Dil Yönü',
		langDirNotSet	: '<tanımlanmamış>',
		langDirLTR		: 'Soldan Sağa (LTR)',
		langDirRTL		: 'Sağdan Sola (RTL)',
		acccessKey		: 'Erişim Tuşu',
		name			: 'Ad',
		langCode		: 'Dil Yönü',
		tabIndex		: 'Sekme İndeksi',
		advisoryTitle	: 'Danışma Başlığı',
		advisoryContentType	: 'Danışma İçerik Türü',
		cssClasses		: 'Biçem Sayfası Sınıfları',
		charset			: 'Bağlı Kaynak Karakter Gurubu',
		styles			: 'Biçem',
		selectAnchor	: 'Çapa Seç',
		anchorName		: 'Çapa Adı ile',
		anchorId		: 'Eleman Kimlik Numarası ile',
		emailAddress	: 'E-Posta Adresi',
		emailSubject	: 'İleti Konusu',
		emailBody		: 'İleti Gövdesi',
		noAnchors		: '(Bu belgede hiç çapa yok)',
		noUrl			: 'Lütfen köprü URL\'sini yazın',
		noEmail			: 'Lütfen E-posta adresini yazın'
	},

	// Anchor dialog
	anchor :
	{
		toolbar		: 'Çapa Ekle/Düzenle',
		menu		: 'Çapa Özellikleri',
		title		: 'Çapa Özellikleri',
		name		: 'Çapa Adı',
		errorName	: 'Lütfen çapa için ad giriniz'
	},

	// Find And Replace Dialog
	findAndReplace :
	{
		title				: 'Bul ve Değiştir',
		find				: 'Bul',
		replace				: 'Değiştir',
		findWhat			: 'Aranan:',
		replaceWith			: 'Bununla değiştir:',
		notFoundMsg			: 'Belirtilen yazı bulunamadı.',
		matchCase			: 'Büyük/küçük harf duyarlı',
		matchWord			: 'Kelimenin tamamı uysun',
		matchCyclic			: 'Match cyclic', // MISSING
		replaceAll			: 'Tümünü Değiştir',
		replaceSuccessMsg	: '%1 occurrence(s) replaced.' // MISSING
	},

	// Table Dialog
	table :
	{
		toolbar		: 'Tablo',
		title		: 'Tablo Özellikleri',
		menu		: 'Tablo Özellikleri',
		deleteTable	: 'Tabloyu Sil',
		rows		: 'Satırlar',
		columns		: 'Sütunlar',
		border		: 'Kenar Kalınlığı',
		align		: 'Hizalama',
		alignNotSet	: '<Tanımlanmamış>',
		alignLeft	: 'Sol',
		alignCenter	: 'Merkez',
		alignRight	: 'Sağ',
		width		: 'Genişlik',
		widthPx		: 'piksel',
		widthPc		: 'yüzde',
		height		: 'Yükseklik',
		cellSpace	: 'Izgara kalınlığı',
		cellPad		: 'Izgara yazı arası',
		caption		: 'Başlık',
		summary		: 'Özet',
		headers		: 'Başlıklar',
		headersNone		: 'Yok',
		headersColumn	: 'İlk Sütun',
		headersRow		: 'İlk Satır',
		headersBoth		: 'Her İkisi',
		invalidRows		: 'Number of rows must be a number greater than 0.', // MISSING
		invalidCols		: 'Number of columns must be a number greater than 0.', // MISSING
		invalidBorder	: 'Border size must be a number.', // MISSING
		invalidWidth	: 'Table width must be a number.', // MISSING
		invalidHeight	: 'Table height must be a number.', // MISSING
		invalidCellSpacing	: 'Cell spacing must be a number.', // MISSING
		invalidCellPadding	: 'Cell padding must be a number.', // MISSING

		cell :
		{
			menu			: 'Hücre',
			insertBefore	: 'Hücre Ekle - Önce',
			insertAfter		: 'Hücre Ekle - Sonra',
			deleteCell		: 'Hücre Sil',
			merge			: 'Hücreleri Birleştir',
			mergeRight		: 'Birleştir - Sağdaki İle ',
			mergeDown		: 'Birleştir - Aşağıdaki İle ',
			splitHorizontal	: 'Hücreyi Yatay Böl',
			splitVertical	: 'Hücreyi Dikey Böl'
		},

		row :
		{
			menu			: 'Satır',
			insertBefore	: 'Satır Ekle - Önce',
			insertAfter		: 'Satır Ekle - Sonra',
			deleteRow		: 'Satır Sil'
		},

		column :
		{
			menu			: 'Sütun',
			insertBefore	: 'Kolon Ekle - Önce',
			insertAfter		: 'Kolon Ekle - Sonra',
			deleteColumn	: 'Sütun Sil'
		}
	},

	// Button Dialog.
	button :
	{
		title		: 'Düğme Özellikleri',
		text		: 'Metin (Değer)',
		type		: 'Tip',
		typeBtn		: 'Düğme',
		typeSbm		: 'Gönder',
		typeRst		: 'Sıfırla'
	},

	// Checkbox and Radio Button Dialogs.
	checkboxAndRadio :
	{
		checkboxTitle : 'Onay Kutusu Özellikleri',
		radioTitle	: 'Seçenek Düğmesi Özellikleri',
		value		: 'Değer',
		selected	: 'Seçili'
	},

	// Form Dialog.
	form :
	{
		title		: 'Form Özellikleri',
		menu		: 'Form Özellikleri',
		action		: 'İşlem',
		method		: 'Yöntem',
		encoding	: 'Encoding', // MISSING
		target		: 'Hedef',
		targetNotSet	: '<tanımlanmamış>',
		targetNew	: 'Yeni Pencere(_blank)',
		targetTop	: 'En Üst Pencere (_top)',
		targetSelf	: 'Kendi Penceresi (_self)',
		targetParent	: 'Anne Pencere (_parent)'
	},

	// Select Field Dialog.
	select :
	{
		title		: 'Seçim Menüsü Özellikleri',
		selectInfo	: 'Bilgi',
		opAvail		: 'Mevcut Seçenekler',
		value		: 'Değer',
		size		: 'Boyut',
		lines		: 'satır',
		chkMulti	: 'Çoklu seçime izin ver',
		opText		: 'Metin',
		opValue		: 'Değer',
		btnAdd		: 'Ekle',
		btnModify	: 'Düzenle',
		btnUp		: 'Yukarı',
		btnDown		: 'Aşağı',
		btnSetValue : 'Seçili değer olarak ata',
		btnDelete	: 'Sil'
	},

	// Textarea Dialog.
	textarea :
	{
		title		: 'Çok Satırlı Metin Özellikleri',
		cols		: 'Sütunlar',
		rows		: 'Satırlar'
	},

	// Text Field Dialog.
	textfield :
	{
		title		: 'Metin Girişi Özellikleri',
		name		: 'Ad',
		value		: 'Değer',
		charWidth	: 'Karakter Genişliği',
		maxChars	: 'En Fazla Karakter',
		type		: 'Tür',
		typeText	: 'Metin',
		typePass	: 'Parola'
	},

	// Hidden Field Dialog.
	hidden :
	{
		title	: 'Gizli Veri Özellikleri',
		name	: 'Ad',
		value	: 'Değer'
	},

	// Image Dialog.
	image :
	{
		title		: 'Resim Özellikleri',
		titleButton	: 'Resimli Düğme Özellikleri',
		menu		: 'Resim Özellikleri',
		infoTab	: 'Resim Bilgisi',
		btnUpload	: 'Sunucuya Yolla',
		url		: 'URL',
		upload	: 'Karşıya Yükle',
		alt		: 'Alternatif Yazı',
		width		: 'Genişlik',
		height	: 'Yükseklik',
		lockRatio	: 'Oranı Kilitle',
		resetSize	: 'Boyutu Başa Döndür',
		border	: 'Kenar',
		hSpace	: 'Yatay Boşluk',
		vSpace	: 'Dikey Boşluk',
		align		: 'Hizalama',
		alignLeft	: 'Sol',
		alignAbsBottom: 'Tam Altı',
		alignAbsMiddle: 'Tam Ortası',
		alignBaseline	: 'Taban Çizgisi',
		alignBottom	: 'Alt',
		alignMiddle	: 'Orta',
		alignRight	: 'Sağ',
		alignTextTop	: 'Yazı Tepeye',
		alignTop	: 'Tepe',
		preview	: 'Ön İzleme',
		alertUrl	: 'Lütfen resmin URL\'sini yazınız',
		linkTab	: 'Köprü',
		button2Img	: 'Do you want to transform the selected image button on a simple image?', // MISSING
		img2Button	: 'Do you want to transform the selected image on a image button?' // MISSING
	},

	// Flash Dialog
	flash :
	{
		properties		: 'Flash Özellikleri',
		propertiesTab	: 'Properties', // MISSING
		title		: 'Flash Özellikleri',
		chkPlay		: 'Otomatik Oynat',
		chkLoop		: 'Döngü',
		chkMenu		: 'Flash Menüsünü Kullan',
		chkFull		: 'Allow Fullscreen', // MISSING
 		scale		: 'Boyutlandır',
		scaleAll		: 'Hepsini Göster',
		scaleNoBorder	: 'Kenar Yok',
		scaleFit		: 'Tam Sığdır',
		access			: 'Script Access', // MISSING
		accessAlways	: 'Always', // MISSING
		accessSameDomain	: 'Same domain', // MISSING
		accessNever	: 'Never', // MISSING
		align		: 'Hizalama',
		alignLeft	: 'Sol',
		alignAbsBottom: 'Tam Altı',
		alignAbsMiddle: 'Tam Ortası',
		alignBaseline	: 'Taban Çizgisi',
		alignBottom	: 'Alt',
		alignMiddle	: 'Orta',
		alignRight	: 'Sağ',
		alignTextTop	: 'Yazı Tepeye',
		alignTop	: 'Tepe',
		quality		: 'Quality', // MISSING
		windowMode	: 'Window mode', // MISSING
		flashvars	: 'Variables for Flash', // MISSING
		bgcolor	: 'Arka Renk',
		width	: 'Genişlik',
		height	: 'Yükseklik',
		hSpace	: 'Yatay Boşluk',
		vSpace	: 'Dikey Boşluk',
		validateSrc : 'Lütfen köprü URL\'sini yazın',
		validateWidth : 'Width must be a number.', // MISSING
		validateHeight : 'Height must be a number.', // MISSING
		validateHSpace : 'HSpace must be a number.', // MISSING
		validateVSpace : 'VSpace must be a number.' // MISSING
	},

	// Speller Pages Dialog
	spellCheck :
	{
		toolbar			: 'Yazım Denetimi',
		title			: 'Spell Check', // MISSING
		notAvailable	: 'Sorry, but service is unavailable now.', // MISSING
		errorLoading	: 'Error loading application service host: %s.', // MISSING
		notInDic		: 'Sözlükte Yok',
		changeTo		: 'Şuna değiştir:',
		btnIgnore		: 'Yoksay',
		btnIgnoreAll	: 'Tümünü Yoksay',
		btnReplace		: 'Değiştir',
		btnReplaceAll	: 'Tümünü Değiştir',
		btnUndo			: 'Geri Al',
		noSuggestions	: '- Öneri Yok -',
		progress		: 'Yazım denetimi işlemde...',
		noMispell		: 'Yazım denetimi tamamlandı: Yanlış yazıma rastlanmadı',
		noChanges		: 'Yazım denetimi tamamlandı: Hiçbir kelime değiştirilmedi',
		oneChange		: 'Yazım denetimi tamamlandı: Bir kelime değiştirildi',
		manyChanges		: 'Yazım denetimi tamamlandı: %1 kelime değiştirildi',
		ieSpellDownload	: 'Yazım denetimi yüklenmemiş. Şimdi yüklemek ister misiniz?'
	},

	smiley :
	{
		toolbar	: 'İfade',
		title	: 'İfade Ekle'
	},

	elementsPath :
	{
		eleTitle : '%1 element' // MISSING
	},

	numberedlist : 'Numaralı Liste',
	bulletedlist : 'Simgeli Liste',
	indent : 'Sekme Arttır',
	outdent : 'Sekme Azalt',

	justify :
	{
		left : 'Sola Dayalı',
		center : 'Ortalanmış',
		right : 'Sağa Dayalı',
		block : 'İki Kenara Yaslanmış'
	},

	outdent : 'Sekme Azalt',
	blockquote : 'Blok Oluştur',

	clipboard :
	{
		title		: 'Yapıştır',
		cutError	: 'Gezgin yazılımınızın güvenlik ayarları düzenleyicinin otomatik kesme işlemine izin vermiyor. İşlem için (Ctrl+X) tuşlarını kullanın.',
		copyError	: 'Gezgin yazılımınızın güvenlik ayarları düzenleyicinin otomatik kopyalama işlemine izin vermiyor. İşlem için (Ctrl+C) tuşlarını kullanın.',
		pasteMsg	: 'Lütfen aşağıdaki kutunun içine yapıştırın. (<STRONG>Ctrl+V</STRONG>) ve <STRONG>Tamam</STRONG> butonunu tıklayın.',
		securityMsg	: 'Gezgin yazılımınızın güvenlik ayarları düzenleyicinin direkt olarak panoya erişimine izin vermiyor. Bu pencere içine tekrar yapıştırmalısınız..'
	},

	pastefromword :
	{
		toolbar : 'Word\'den Yapıştır',
		title : 'Word\'den Yapıştır',
		advice : 'Lütfen aşağıdaki kutunun içine yapıştırın. (<STRONG>Ctrl+V</STRONG>) ve <STRONG>Tamam</STRONG> butonunu tıklayın.',
		ignoreFontFace : 'Yazı Tipi tanımlarını yoksay',
		removeStyle : 'Biçem Tanımlarını çıkar'
	},

	pasteText :
	{
		button : 'Düz Metin Olarak Yapıştır',
		title : 'Düz Metin Olarak Yapıştır'
	},

	templates :
	{
		button : 'Şablonlar',
		title : 'İçerik Şablonları',
		insertOption: 'Mevcut içerik ile değiştir',
		selectPromptMsg: 'Düzenleyicide açmak için lütfen bir şablon seçin.<br>(hali hazırdaki içerik kaybolacaktır.):',
		emptyListMsg : '(Belirli bir şablon seçilmedi)'
	},

	showBlocks : 'Blokları Göster',

	stylesCombo :
	{
		label : 'Biçem',
		panelTitle1 : 'Block Styles', // MISSING
		panelTitle2 : 'Inline Styles', // MISSING
		panelTitle3 : 'Object Styles' // MISSING
	},

	format :
	{
		label : 'Biçim',
		panelTitle : 'Biçim',

		tag_p : 'Normal',
		tag_pre : 'Biçimli',
		tag_address : 'Adres',
		tag_h1 : 'Başlık 1',
		tag_h2 : 'Başlık 2',
		tag_h3 : 'Başlık 3',
		tag_h4 : 'Başlık 4',
		tag_h5 : 'Başlık 5',
		tag_h6 : 'Başlık 6',
		tag_div : 'Paragraf (DIV)'
	},

	font :
	{
		label : 'Yazı Türü',
		panelTitle : 'Yazı Türü'
	},

	fontSize :
	{
		label : 'Boyut',
		panelTitle : 'Boyut'
	},

	colorButton :
	{
		textColorTitle : 'Yazı Rengi',
		bgColorTitle : 'Arka Renk',
		auto : 'Otomatik',
		more : 'Diğer renkler...'
	}
};
