**Windowsのインストール**では、面倒な作業がたくさんある。**Windows 10**から、デジタル認証でプロダクトキーの入力は不要になり、アップデートも超簡単になったが、以下をなるべく簡略化したい。簡単にしておきたいが、複雑なISOファイル作成とかも避けたい。

* インストール工程のクリック作業 → 自動化したい
* ドライバーのインストール → 統合。またここのバッチファイルでサイレントインストール
* アップデートのインストール → 統合（そんなに手間ではないが）
* ソフトウェアのインストール → ポータブル化（主にポータブルアプリで探す）
* Windows設定 / Edge設定

→ 詳細: [Windowsのインストール](https://github.com/maboroshin/Windows-Install/wiki/Windows%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)

#### 更新情報
- 2026年5月更新: 漏れてた Install_GPU_intel.bat を追加。_del.js の誤記修正。バッチから Install_0_Network.js にし、古いWi-Fi-カードをAC3165とAX200を判別し別のドライバーをインストール。
  - 課題: GPUも判別して第11世代以降のドライバーを分けないと。それかGPU用のbatファイルを複数置くかだ。

## ダウンロード

緑の「Code」ボタンから、「Download Zip」を押す。

## 使用法

各種インストーラーを配置し、各バッチファイルを実行すればサイレントインストールを実行します。すべて終わったらWindowsを再起動します。効果は、インストーラー実行時の「次へ」を押すのを減らす程度でたいしたものではない。

## フォルダ構成

フォルダ構成は以下で想定。ファイル名は例で、バージョン番号は自動補完される。構文を簡単にするためフォルダ名は空白なしで作成。
<br>System_AnySystemName : System_LIVA_Z2 など改名しシステムごとに作る。システム固有そうなドライバーを入れておく。
<br>☆: 手動で実行するファイル
* _Install_Chipset.js : 一番最初に実行すべき。古いドライバではなく、ドライバ自体がなく不明なデバイスになってることがあるので。
* Install_0_Network.js : 先にネットワークにつなげたい。Realtekの1GbE/2.5GbE/5GbEを検出。
  * Wi-Fiは、ドライバーの更新が止まってるAC3165とAX200を検出し、それ以外は最新のドライバーを適用。
  * 例外を作りたければ、スクリプトの最初のほうの配列を書き換えれば対応できます。
* Install_GPU_intel.bat : 表示に問題がなければ、ほかのドライバーのインストールがひと段落してからでもいい。
* Install_Assistant.bat : 最新ドライバーの更新を検出するのが目的。同じドライバを使うPCのうち1台に入っていれば検出できる。
* Install_Eizo.bat : Eizoのモニターを使っている場合のみ。Screen InStyleというソフト。

~~~
Driver\
├─ ☆ Install_0_Network.bat
├─ ☆ Install_Assistant.bat
├─ ☆ Install_Eizo.bat
├─ ☆ Install_GPU_intel.bat
├─ .ventoyignore
├── System_AnySystemName\
│   └── ☆ _Install_Chipset.js
│   └── Intel-chipset_10.1.00001.0001\
│       └─ SetupChipset.exe
├── New\
│   ├─ gfx_win_101.2141.exe
│   ├─ BT-24.40.0-64UWD-Win10-Win11.exe
│   ├─ Intel-Driver-and-Support-Assistant-Installer.exe
│   ├─ WiFi-24.40.0-Driver64-Win10-Win11.exe
│   └── RealtekGBE\
│       └─ Install_Win11_Win10_10076_06242025.exe
│   └── AC3165\
│       ├─ AC3165.txt
│       ├─ BT-23.40.0-64UWD-Win10-Win11.exe
│       └─ WiFi-23.40.0-Driver64-Win10-Win11.exe
│   └── AX200\
│       ├─ 20260324.txt
│       ├─ BT-24.10.0-64UWD-Win10-Win11.exe
│       └─ WiFi-24.20.2-Driver64-Win10-Win11.exe
└── Eizo\
    └── SIS1118_Setup.exe
~~~

### 仕様

以下の XXX はどんな文字列でも合致します。

* _Install_Chipset.js : Intel-chipset_XXX フォルダ内の SetupChipset.exe を実行。
* Install_0_Network.bat : New フォルダ内の RealtekGBE 内の Install_Win11_Win10_XXX.exe を実行。
* Install_GPU_intel.bat : New フォルダ内の gfx_win_1XXX.exe を実行。
* Install_Assistant.bat : New フォルダ内の Intel-Driver-and-Support-Assistant-Installer.exe を実行。
* Install_Eizo.bat : Eizo フォルダ内の SISXXX_Setup.exe を実行。

各bat/jsの中身を書き換えればどんなファイルでも対応します。

### Script フォルダ

* _del.js : 不要なファイルとフォルダを削除。delList.txtの各行が削除対象。
* _lnk.js : リンクを作成。送る (SendTo) に GetFullPath.js を登録。
* delList.txt : 削除したいファイルを1行ごとに書く。
* GetFullPath.js : ドロップしたファイルのフルパスをコピーする。delList.txt への登録を補助。

### ドライバーのダウンロード先
* [Windowsのインストール#ドライバー](https://github.com/maboroshin/Windows-Install/wiki/Windows%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB#%E3%83%89%E3%83%A9%E3%82%A4%E3%83%90%E3%83%BC)

