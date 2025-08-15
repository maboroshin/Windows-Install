/*
_lnk.js

English: Create Shortcuts
Usage  : Run this script
 
日本語 : ショートカット作成
使用法 : このスクリプトを実行

Version 2025-08-15

 */
function Main() {
  makeLink(currentFolder, folderSendTo, "GetFullPath.js");
  makeLink(currentFolder, folderSendTo, "Player.js");
  //makeLink(currentFolder, folderSendTo, "bmpToPng.js");
}


var fso = new ActiveXObject("Scripting.FileSystemObject");
var currentFolder = fso.GetParentFolderName(WScript.ScriptFullName);

var WshShell = new ActiveXObject("WScript.Shell");
var folderSendTo = WshShell.SpecialFolders("SendTo");

Main();

/* - */
function makeLink(fromFolder, toFolder, fileName, arg) {
  var fileTarget = fromFolder + "\\" + fileName;
  var linkName = fso.GetBaseName(fileTarget);
  
  var oShellLink = WshShell.CreateShortcut(toFolder + "\\" + linkName + ".lnk");
  
  if (fso.FileExists(fileTarget) == false)
    return;

  if (fso.FileExists(oShellLink))
    return;
    
  with (oShellLink) {
    TargetPath = fileTarget
    WorkingDirectory = fso.GetParentFolderName(fileTarget);
    if (arg)
      Arguments = arg;
    if (linkName == "task")
      IconLocation = "shell32.dll, 20";
    Save();
  }
  WScript.echo(oShellLink);
}
