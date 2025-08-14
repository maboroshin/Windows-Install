var fso = new ActiveXObject("Scripting.FileSystemObject");
var shell = new ActiveXObject("WScript.Shell");
var parentFolder = fso.GetParentFolderName(WScript.ScriptFullName);
var re = /Intel-chipset_/i;

var subFolders = new Enumerator( fso.GetFolder(parentFolder).SubFolders);

for (; !subFolders.atEnd(); subFolders.moveNext()) {
    var folder = subFolders.item();
    var folderName = folder.Name;

    if (re.test(folderName)) {
        var exePath = fso.BuildPath(folder.Path, "SetupChipset.exe");

        if (fso.FileExists(exePath)) {
            // shell.Run('"' + exePath + '" /help', 1, false);
            shell.Run('"' + exePath + '" -s -norestart', 1, false);
        } else
            WScript.Echo(folderName + " SetupChipset.exe Missing (見つからない)");
    }
}

