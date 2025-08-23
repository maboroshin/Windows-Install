/*
GetFullPath.js

English: Script to copy full path
Usage  : Drop the target file into this script
 
日本語 : フルパスをコピーします
使用法 : 対象のファイルをこのスクリプトにドロップ

Version 2025-08-15

 */

var slashType = 1; // 0 : Slash,  1 : Backslash (円記号)

var aSlashType = ["/", "\\"];

var wsArg = WScript.Arguments;
if (wsArg.length == 0) {
  var msg = "Drop the target file into this " + WScript.ScriptName  + "\n\n" +
  "この " + WScript.ScriptName  + " にファイルをドロップしてください。";
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
