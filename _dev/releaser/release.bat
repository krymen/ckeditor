::
:: Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
:: For licensing, see LICENSE.html or http://ckeditor.com/license
::

@ECHO OFF

CLS
ECHO.

:: rmdir /S /Q release

java -jar ckreleaser/ckreleaser.jar ckreleaser.release ../.. release "3.6.5 (SVN)" ckeditor_3.6.5_svn --run-before-release=langtool.bat
