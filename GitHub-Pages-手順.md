# GitHub Pages 公開手順

## 1. GitHubアカウント作成（既にある場合はスキップ）
https://github.com/ で無料アカウント作成

## 2. 新しいリポジトリを作成
1. https://github.com/new にアクセス
2. Repository name: `dividend-tracker`（任意）
3. **Public** を選択（Privateは無料プランではGitHub Pages使用不可）
4. 「Create repository」をクリック

## 3. ファイルをアップロード
1. 作成したリポジトリページで「uploading an existing file」リンクをクリック
2. `Desktop/dividend-tracker-site/` フォルダ内の **すべてのファイル** をドラッグ&ドロップ
   - index.html
   - manifest.json
   - sw.js
   - icon-192.png
   - icon-512.png
3. 下の「Commit changes」をクリック

## 4. GitHub Pages を有効化
1. リポジトリの「Settings」タブをクリック
2. 左メニューの「Pages」をクリック
3. 「Source」で「Deploy from a branch」を選択
4. Branch: `main`、Folder: `/ (root)` を選択
5. 「Save」をクリック

## 5. URLの確認（1〜2分待つ）
`https://【あなたのユーザー名】.github.io/dividend-tracker/`

## 6. スマホでアクセス
上記URLをスマホのブラウザで開く

## 7. スマホのホーム画面に追加（PWA）
**iPhone (Safari):**
- 共有ボタン → 「ホーム画面に追加」

**Android (Chrome):**
- メニュー → 「ホーム画面に追加」 または 「アプリをインストール」

これでアプリのようにホーム画面から起動できます。

## データ同期について
- データはブラウザごとのlocalStorageに保存されます
- PC↔スマホ間でデータを共有するには、ヘッダーの📱ボタン（QR共有）を使用してください
