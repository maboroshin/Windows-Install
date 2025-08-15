set BATDIR=%~dp0

powershell -Command "Start-Process wscript.exe -ArgumentList '%BATDIR%\dell.js' -Verb runAs"
