
goto :skipcomment
REM Folder name in right section
REM No spaces in folder name to simplify syntax

REM �E�����t�H���_��
REM �\�����ȒP�ɂ��邽�߃t�H���_���͋󔒂Ȃ�

:skipcomment
Set FolderLatestDriver=New
Set FolderRealtekGbE=RealtekGbE
Set FolderRealtekAudio=RealtekAudio

:ask
REM Install Realtek network driver
REM Realtek �l�b�g���[�N�h���C�o�[���C���X�g�[��
set "input="
set /p input=Continue? ���s���܂����H (y/n):

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
REM �����L�[�������ƁAIntel��WiFi/BlueTooth�h���C�o�[���C���X�g�[��
Pause;

for %%f in (%FolderLatestDriver%\\WiFi-*.exe) do (
    %%f /quiet /passive
)

for %%f in (%FolderLatestDriver%\\BT-*.exe) do (
    %%f /quiet /passive
)

REM Completed. �������܂���

Pause;


