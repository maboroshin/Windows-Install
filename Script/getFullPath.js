/*
getFullPath.js

English: Script to copy full path
Usage  : Drop the target file into this script
 
���{�� : �t���p�X���R�s�[���܂�
�g�p�@ : �Ώۂ̃t�@�C�������̃X�N���v�g�Ƀh���b�v

Version 2025-08-15

 */

var slashType = 1; // 0 : Slash,  1 : Backslash (�~�L��)

var aSlashType = ["/", "\\"];

var wsArg = WScript.Arguments;
if (wsArg.length == 0) {
  var msg = "Drop the target file into this " + WScript.ScriptName  + "\n\n" +
  "���� " + WScript.ScriptName  + " �Ƀt�@�C�����h���b�v���Ă��������B";
  WScript.echo(msg);
  // RunSelfOpen();
  WScript.quit();
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
var a = [];
for (var i = 0; i < wsArg.length; i++) {
  var file = wsArg(i);
  var sPath = fso.GetAbsolutePathName(file);
  sPath = sPath.split("\\").join(aSlashType[slashType])
  a.push(sPath);
}
a.sort();
setClipboardData(a.join("\r\n"));

/* - */
function setClipboardData(s)
{
  with (new ActiveXObject('InternetExplorer.Application')) {
    Visible = false;
    Navigate('about:blank');
    while (Busy)
      ;
    var window = document.parentWindow;
    window.clipboardData.setData("Text", s);
    Quit();
  }
}

function RunSelfOpen() {
  var WshShell = WScript.CreateObject("Wscript.Shell");
  WshShell.Run("notepad " + WScript.ScriptName);
}