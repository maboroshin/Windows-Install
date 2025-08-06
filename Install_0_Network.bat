
goto :skipcomment
REM Folder name in right section
REM No spaces in folder name to simplify syntax

REM 右項がフォルダ名
REM 構文を簡単にするためフォルダ名は空白なし

:skipcomment
Set FolderLatestDriver=New
Set FolderRealtekGbE=RealtekGbE
Set FolderRealtekAudio=RealtekAudio

:ask
REM Install Realtek network driver
REM Realtek ネットワークドライバーをインストール
set "input="
set /p input=Continue? 続行しますか？ (y/n):

if /i "%input%"=="y" (
  for %%f in (%FolderLatestDriver%\\%FolderRealtekGbE%\\Install_Win11_Win10_*.exe) do (
      %%f /S
  )
    goto end
) else if /i "%input%"=="n" (
    goto end
) else (
    echo "y" yes, "n" no
    goto ask
)

:end
REM Press any key to install Intel WiFi and BlueTooth drivers
REM 何かキーを押すと、IntelのWiFi/BlueToothドライバーをインストール
Pause;

for %%f in (%FolderLatestDriver%\\WiFi-*.exe) do (
    %%f /quiet /passive
)

for %%f in (%FolderLatestDriver%\\BT-*.exe) do (
    %%f /quiet /passive
)

REM Completed. 完了しました

Pause;


