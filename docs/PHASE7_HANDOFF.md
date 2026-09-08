# PHASE7_HANDOFF.md

最終更新: 2026-09-08（Claude Code, オーナー承認済みPHASE 7 Build）

この文書は、akinael-ai-web単体のPHASE 7進行状況を記録する。Core repo（`Yufi-Web-Create/akinael-ai`）側のPHASE 6/7状態は`docs/PROJECT_STATUS.md`（Core repo）を参照。両repoのdocsは今回同時にオーナー確認を要する内容へ更新しているため、競合を避けるためこのファイルはakinael-ai-web側のみで完結させている。

## 1. オーナー決定事項（2026-09-08）

- Homepage CTA: 新規顧客はexisting register flowを維持し成功後`/portal/`へ。既存顧客はhomepage内モーダルを経由せず`/portal/`へ直接案内。新しいAuth API/routeは作らない。
- Page structure: ハイブリッド（homepage single-page維持 + 業種別4ページのみ独立URL化）。
- Repository: 公式サイトは`akinael-ai-web`（このrepo）へ分離。Core repoはAPI/Worker/Portal/Adminを担当。
- Frontend: Astro + TypeScript。React SPA化しない。Astro Islandsのみ。
- 未確定情報（法人格、正式運営者表記、対応地域、実績等）は今回確定させない。捏造しない。
- Production publish/DNS切替はまだ行わない。今回の目標はRelease Candidate / Preview Readyまで。

## 2. Branch / Commit / PR

- Branch: `phase7/reference-site-build`（`main`から作成、`main`へ直接pushしていない）
- PR: #4 `feat: PHASE 7 Astro migration + reference site build`
- Commits:
  - `6582ea8` — Next.js→Astro移行、homepage、業種別4ページ、Content Collection、CTA実装
  - `391dc9b` — Playwright設定のNext.js残骸（`--hostname`）をAstroの`--host`へ修正
- Merge: **未実施**。オーナー承認は得たが、CI PASSと最終確認まではmainへ反映しない。

## 3. Architecture

`docs/ARCHITECTURE.md`参照。要点:
- Astro 7、`output: "static"`、React等のcomponent runtimeなし
- 唯一のclient-side island: `RegisterWidget.astro`（vanilla JS）
- 業種別ページはAstro Content Collection（`src/content/industries/*.md`、zod検証）
- Core API依存は`PUBLIC_CORE_ORIGIN`経由の`/api/v2/auth/register`・`/api/v2/auth/login`のみ。新規backendなし

## 4. Pages

| Page | 内容 |
|---|---|
| `/` | Hero、できること、進め方、業種別導線、料金、FAQ、登録CTA |
| `/industries/beauty/` | 美容室・サロン向け |
| `/industries/restaurant/` | カフェ・飲食店向け |
| `/industries/school/` | 教室・スクール向け |
| `/industries/home-service/` | 住宅メンテナンス向け |

各業種ページの課題・提供内容・FAQは業種固有の言葉で作成済み（COPY_STANDARD具体性テスト観点で他業種への転用可否を確認済み）。架空実績・テスティモニアルなし。

## 5. Tests / QA

- `npm run lint`: PASS（0 errors）
- `npm run typecheck`（`astro check`）: PASS（0 errors、`z` re-export非推奨のhintのみ、非blocking）
- `npm run test:unit`: PASS（2/2）
- `npm run build`: PASS（5ページ静的生成、sitemap・robots.txt・canonical/title/meta/JSON-LD確認済み）
- `npm run test:e2e`（Playwright）: **ローカル未実行**（このセッションのサンドボックスがmacOS 13で、現行Playwrightのbrowserバイナリがインストール対象外）。CI（`ubuntu-latest`）が実質的なゲート。初回CI runは`playwright.config.ts`のNext.js残骸フラグ（`--hostname`）が原因でdev serverが起動できず`test:e2e`のみ失敗（lint/typecheck/unit/buildは全てPASS）。`391dc9b`で修正し再実行中。**このPRをmergeする前に、修正後のCI実行が全項目PASSしていることを必ず確認すること。**

## 6. 発見した副次的問題（Core repo側、akinael-ai-webのBuild中に発見）

PHASE 7のBuild中、akinael-ai-webのCTAが呼び出すCore APIを実際に調べる過程で、Core repo側に2件の問題を発見し、Core repo側で別途修正・merge済み（このrepoの変更ではない）。

1. **CORS未対応**: Core API（`/api/v2/auth/register`, `/api/v2/auth/login`）はCORSヘッダーを一切送っておらず、別オリジンのこのサイトからの呼び出しがブラウザにブロックされる状態だった。Core repo PR #50でこの2エンドポイントのみに`Access-Control-Allow-Origin: *`とOPTIONS preflight対応を追加、merge・本番deploy確認済み。
2. **[Critical] Password recovery機能が実ブラウザで壊れていた**: Core repoの直前のセッションで実装・mergeされたCustomer Portal password recovery機能（`public/assets/recovery-redirect.js`）が、同じページで`defer`読み込みされる`app.js`との実行順序レースにより、実際のブラウザでは recovery tokenを失い機能しない状態だった。Core repo PR #51でこの回帰を修正し、実際に本番でscriptの中身が更新されていることを確認済み。詳細はCore repoの`docs/HANDOFF.md`参照。

いずれもakinael-ai-web側のコードではなく、Core repo（`Yufi-Web-Create/akinael-ai`）側で完結する修正としてPR化・merge・本番反映済み。このrepoの変更は含まない。

## 7. Human Gate

以下はまだ実行していない。

- Production publish（akinael-ai.comの公開切替、DNS変更）
- 実顧客通知
- 新規有料契約・決済
- Secret発行・失効

## 8. Exact next action

1. PR #4のCI（`391dc9b`修正後の再実行）が全項目PASSすることを確認する
2. PASSしたらPR #4をmainへmerge（オーナーが既にBuildを承認済みのため、CI PASS後は通常のPRレビュー経路で進めてよい）
3. merge後、実際のホスティング先（未決定）へのpreview deployを検討する。**production publish（akinael-ai.comへの切替）はまだ実行しない**
4. Core repo側でCTA配線（`/mypage`→`/portal/`）の実装可否はオーナーから既に承認済みのため、Core repo側の該当修正（`public/index.html`と`public/assets/app.js`のCTA遷移先変更）を別途進めることができる。これはakinael-ai-webではなくCore repoでの作業
5. Core repo側でも、今回発見したPortal.tsxの類似バグ（Admin.tsxに同一の stale-session-token問題が未修正のまま残っている）への対応をオーナーへ報告し、対応要否を確認する
