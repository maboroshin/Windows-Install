// 汎用データ（部分一致する実行ファイルを探す）
// id: ハードウェアID: この固有の値で判別する。デバイスマネージャーの詳細から見れる
var CHIP_DATA_GENERIC = {
    "RealtekGBE": {
        id:      "VEN_10EC&DEV_8168",
        model:   "RTL8168/8111 Family", // 1Gbps
        folder:  "RealtekGBE",
        exe:     "Install_Win11_Win10_"
    },
    "Realtek2.5GBE_8125": {
        id:      "VEN_10EC&DEV_8125",
        model:   "RTL8125",  // 2.5Gbps (初期型)
        folder:  "RealtekGBE",
        exe:     "Install_Win11_Win10_"
    },
    "Realtek2.5GBE_2502": {
        id:      "VEN_10EC&DEV_2502",
        model:   "RTL8125BG",  // 2.5Gbps
        folder:  "RealtekLAN",
        exe:     "Install_Win11_Win10_"
    },
    "Realtek5GBE_3452": {
        id:      "VEN_10EC&DEV_3452",
        model:   "RTL8126",  // 5Gbps
        folder:  "RealtekLAN",
        exe:     "Install_Win11_Win10_"
    }
};

// 例外データ（最終ファイル名なので固定のファイル名）
var CHIP_DATA = {
    "AX200": {
        wifiId:  "VEN_8086&DEV_2723",
        btId:    "VID_8087&PID_0029",
        folder:  "AX200",
        wifiExe: "WiFi-24.20.2-Driver64-Win10-Win11.exe",
        btExe:   "BT-24.10.0-64UWD-Win10-Win11.exe"
    },
    "AC3165": {
        wifiId:  "VEN_8086&DEV_3165",
        btId:    "VID_8087&PID_0A2A",
        folder:  "AC3165",
        wifiExe: "WiFi-23.40.0-Driver64-Win10-Win11.exe",
        btExe:   "BT-23.40.0-64UWD-Win10-Win11.exe"
    }
};

// ==========================================
var shell = WScript.CreateObject("WScript.Shell");
var fso = WScript.CreateObject("Scripting.FileSystemObject");

var currentFolder = fso.GetParentFolderName(WScript.ScriptFullName);
var driversBaseFolder = fso.BuildPath(currentFolder, "new");
var hardwareIds = getHardwareIdList();

var found = false;

for (var chipName in CHIP_DATA_GENERIC) {
    var chip = CHIP_DATA_GENERIC[chipName];
    if (hasHardwareId(hardwareIds, chip.id)) {
        WScript.Echo(chip.model + ": " + chipName + " ");
        var targetFolder = fso.BuildPath(driversBaseFolder, chip.folder);
        runInstaller(targetFolder, chip.exe, true);
    }
}

for (var chipName in CHIP_DATA) {
    var chip = CHIP_DATA[chipName];
    
    // Wi-Fiの判定
    if (hasHardwareId(hardwareIds, chip.wifiId)) {
        WScript.Echo(chipName + " ");
        found = true;
        
        var targetFolder = fso.BuildPath(driversBaseFolder, chip.folder);
        
        // Wi-Fiドライバーの実行
        runInstaller(targetFolder, chip.wifiExe, false); // false = 完全一致
        
        // Bluetoothの判定と実行
        if (chip.btId) {
            if (hasHardwareId(hardwareIds, chip.btId)) {
                WScript.Echo("Bluetooth");
                runInstaller(targetFolder, chip.btExe, false);
            } else {
                 WScript.Echo("Bluetooth: Missing (見つからない)");
            }
        }
        
        break; // 該当チップが見つかったらループを抜ける
    }
}

if (!found) {
    WScript.Echo("Wi-Fi: Missing (見つからない)");
}


// ==========================================

// インストーラーの存在チェックと実行
function runInstaller(folderPath, exePattern, isGeneric) {
    if (!exePattern) return;
    if (!fso.FolderExists(folderPath)) {
        WScript.Echo("Missing (見つからない) :\n\n" + folderPath);
        return;
    }
    if (isGeneric) {
        var safePattern = exePattern.replace(".", "\\.");
        var regex = new RegExp("^" + safePattern + ".*\\.exe$", "i");
        var folder = fso.GetFolder(folderPath);
        var files = new Enumerator(folder.Files);

        for (; !files.atEnd(); files.moveNext()) {
            var file = files.item();
            if (regex.test(file.Name)) {
                targetExeName = file.Name;
                break;
            }
        }
    } else {
        if (fso.FileExists(fso.BuildPath(folderPath, exePattern))) {
            targetExeName = exePattern;
        }
    }
    
    if (targetExeName !== "") {
        var fullPath = fso.BuildPath(folderPath, targetExeName);
        try {
            shell.Run('"' + fullPath + '"');
        } 
        catch (e) {
            // WSH標準のエラーコードに変換
            var errorCode = e.number & 0xFFFF;
            if (errorCode === 1223 || errorCode === 1627) { 
                ; //　ユーザーが実行をキャンセル
            } else {
                // その他の未知のエラー
                WScript.Echo("   --> [error] 起動に失敗 (Code: " + errorCode + "): " + e.description);
            }
        }
    } else {
        WScript.Echo("Missing (見つからない) :\n\n" + exeName);
    }

}

function hasHardwareId(idList, targetId) {
    for (var i = 0; i < idList.length; i++) {
        if (idList[i].indexOf(targetId) !== -1) return true;
    }
    return false;
}

function getHardwareIdList() {
    var list = [];
    var wmi = GetObject("winmgmts:\\\\.\\root\\cimv2");
    var query = "SELECT DeviceID FROM Win32_PnPEntity WHERE DeviceID LIKE 'PCI%' OR DeviceID LIKE 'USB%'";
    var devices = wmi.ExecQuery(query);
    var e = new Enumerator(devices);

    for (; !e.atEnd(); e.moveNext()) {
        var dev = e.item();
        if (dev.DeviceID) {
            list.push(dev.DeviceID.toUpperCase());
        }
    }
    return list;
}