/*
_del.js

English: Delete files from delList.txt
         Set the files in the "Send to" folder as hidden.
Usage  : Run _del.bat
         You can edit delList.txt as you like
 
日本語 : delList.txt を読みファイルを削除
         「送る」フォルダのファイルは隠しファイルに変更
使用法 : _del.bat を実行
         delList.txt はお好みに編集可能

Version 2025-08-15

 */
var WshShell = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");
/* - */
var currentFolder = fso.GetParentFolderName(WScript.ScriptFullName);
var delList = fso.BuildPath(currentFolder, "delList.txt")

var a = LineToArray(delList);
var rComment = /^\/\//;

for (var i in a) {
  if (a[i] == "" || rComment.test(a[i]) )
    continue;
  if (a[i].indexOf("%") != -1)
    a[i] = WshShell.ExpandEnvironmentStrings(a[i]);
  if (fso.FileExists(a[i])) {
    if (/Windows[\\\/]SendTo/.test(a[i])) {
        var file = fso.GetFile(a[i])
        file.Attributes = file.Attributes | 2;
      }
    else
      fso.DeleteFile(a[i]);
  }
  if (fso.FolderExists(a[i]))
    fso.DeleteFolder(a[i]);
}

DeleteEmptyFolder("C:\\ESD");


/* - */
function LineToArray(Obj, f)
{
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var ioMode = 1; // 1:read
  var isCreate = false;
  var isUnicode = (f ? -1 : 0); // 0:ascii -1:unicode
  var a = [];
  with (fso.OpenTextFile(Obj, ioMode, isCreate, isUnicode)) {
    while (!AtEndOfStream)
      a.push(ReadLine());
    Close();
  }
  return a;
}

function DeleteEmptyFolder(Obj) {
  if (fso.FolderExists(Obj)) {
    var folder = fso.GetFolder(Obj);
    var fileCount = folder.Files.Count;
    var folderCount = folder.SubFolders.Count;
    if (fileCount === 0 && folderCount === 0) {
      fso.DeleteFolder(Obj);
    }
  }
}

