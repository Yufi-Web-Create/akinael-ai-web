# RELEASE_GATE

## Goal
この文書は、AI制作工程の最終停止地点を定義する。
通常の案件は、Research・Direction・Build・QA・Review・Correctionを途中で人間確認せず自律的に完了し、**DEPLOY READY**で初めて人間へ返す。

実デプロイそのものは別工程とし、人間の明示承認なしに実行しない。

## DEPLOY READY definition
以下をすべて満たした状態を `DEPLOY READY` とする。

### Product / content
- [x] PROJECT_SPECのAcceptance Criteriaを満たす
- [x] 確定したinformation architecture・主要導線が実装済み
- [x] Reference Candidate本文に仮テキスト・TODO・placeholderが残っていない
- [x] 架空実績・架空顧客・架空数値・未確認事実がない
- [x] 正式法務・運営者情報はproduction publishのHuman Gateとして明示的に分離済み

### Research / direction
- [x] Research QA PASS
- [x] REFERENCE_ANALYSIS完了
- [x] COPY_RESEARCH完了
- [x] DESIGN_DIRECTION確定
- [x] COPY_DIRECTION確定
- [x] Reference模倣ではなく案件固有の設計へ変換済み

### UI / responsive
- [x] 360px PASS
- [x] 375px PASS
- [x] 390px PASS
- [x] 430px PASS
- [x] 768px PASS
- [x] 1024px PASS
- [x] 1280px PASS
- [x] 1440px PASS
- [x] horizontal overflowなし
- [x] Header / Footer / CTA / Typography統一
- [x] mobile navigation操作可能
- [x] Primary CTA操作可能

### Technical
- [x] lint PASS
- [x] typecheck PASS
- [x] unit tests PASS（3/3）
- [x] production build PASS（5 static pages）
- [x] E2E PASS（18/18、latest head Quality Gate Run 34466642179）
- [x] console error 0
- [x] page error 0
- [x] 404や壊れた内部リンクなし
- [x] secretがrepositoryや公開コードへ混入していない

### Independent review
- [x] Visual Reviewer重大FAILなし
- [x] Copy Reviewer重大FAILなし
- [x] Technical Reviewer重大FAILなし
- [x] SEO/A11y Reviewer重大FAILなし
- [x] 初回Reviewer findingsは修正・再確認済み

### Deployment preparation
- [x] environment variableは`PUBLIC_CORE_ORIGIN`のみ（既定`https://akinael-ai.com`）
- [x] 外部接続はCore Auth API / Customer Portalのみ
- [x] build / preview手順はREADMEとpackage scriptsに記録済み
- [x] 静的成果物`dist/`をhost rootへ配置する構成
- [x] DNS / custom domain / production publishはHuman Gateとして分離済み
- [x] DB migration不要。静的assetの旧releaseへの切戻しがrollback方針
- [x] production smoke testは8 viewport、CTA、register、Portal遷移、console/page error、metadata、内部link

## PHASE 7 verdict (2026-09-10)

`Status: REFERENCE SITE — RELEASE CANDIDATE / PREVIEW READY`

ローカル`astro preview`およびGitHub Actions browser QAで検証可能な静的候補は完成した。外部preview URLの作成、正式法務・運営者情報の確定、production publish、DNS切替はHuman Gateであり、この判定にproduction公開済みという意味は含めない。

## Automatic correction
このGateでFAILが出ても、原則として人間へ返さない。

1. FAIL原因を分類
2. 該当担当へ戻す
3. 修正
4. QA再実行
5. Reviewer再実行
6. Release Gate再確認

合理的に修正可能な限りこのループを続ける。

## BLOCKEDにしてよい条件
以下だけはAIが勝手に作らず、人間判断待ちとしてBLOCKEDにできる。

- 未提供の正式な会社情報・法務情報・料金・実績
- production credential / secret
- 外部サービスの新規有料契約
- DNS / domain / production deployment
- destructive migrationやproduction data削除
- Source of truthの重大な事業矛盾

BLOCKED項目があっても、影響しない範囲の制作・QAはすべて先に完了させる。

## Final output
通常の最終報告は以下とする。

`Status: DEPLOY READY`

- 完成内容
- QA結果
- Reviewer結果
- デプロイ時に必要な設定
- 本番公開後の確認項目
- 人間が承認・入力すべき項目

この報告前に「次へ進めますか？」と確認しない。
