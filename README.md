**Windowsのインストール**では、面倒な作業がたくさんある。**Windows 10**から、デジタル認証でプロダクトキーの入力は不要になり、アップデートも超簡単になったが、以下をなるべく簡略化したい。

- インストール工程のクリック作業 → 自動化
- ドライバーのインストール → 統合や、サイレントインストール
- アップデートのインストール → 統合（そんなに手間ではないが）
- ソフトウェアのインストール → ポータブル化（主にポータブルアプリで探す）
- Windows設定 / Edge設定

→ 詳細: [Windowsのインストール](https://github.com/maboroshin/Windows-Install/wiki/Windows%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)

## ダウンロード

緑の「Code」ボタンから、「Download Zip」を押す。

### フォルダ構成

各種インストーラーを配置し、バッチファイルを実行すればサイレントインストールを実行します。すべて終わったらWindowsを再起動します。

フォルダ構成は以下で想定。ファイル名は例で、バージョン番号は自動補完される。構文を簡単にするためフォルダ名は空白なしで作成。
<br>☆: 手動で実行するファイル
- Install_Chipset.js : 一番最初に実行すべき。古いバージョンでなく不明なデバイスになってる可能性がある。
- Install_0_Network.bat : 先にネットワークにつなげたい。
- Install_GPU_intel.bat : 表示に問題がなければ、インストールがひと段落してからでもいい。
- Install_Assistant.bat : 最新ドライバーの更新を検出する目的。主に使うPCにのみ入っていればいい。
- Install_Eizo.bat : Eizoのモニターを使っている場合のみ。

~~~
Driver\
├─ ☆ Install_0_Network.bat
├─ ☆ Install_GPU_intel.bat
├─ ☆ Install_Assistant.bat
├─ ☆ Install_Eizo.bat
├─ .ventoyignore
├── System_AnySystemName\
│   └── ☆ Install_Chipset.js
│   └── Intel-chipset_10.1.00001.0001\
│       └── SetupChipset.exe
├── New\
│   ├─ gfx_win_101.2135.exe
│   ├─ Intel-Driver-and-Support-Assistant-Installer.exe
│   ├─ BT-23.150.0-64UWD-Win10-Win11.exe
│   ├─ WiFi-23.150.0-Driver64-Win10-Win11.exe
│   └── RealtekGBE\
│       └── Install_Win11_Win10_10076_06242025.exe
└── Eizo\
    └── SIS1117_Setup.exe
~~~
