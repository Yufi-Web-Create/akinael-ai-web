# RELEASE_GATE

## Goal
この文書は、AI制作工程の最終停止地点を定義する。
通常の案件は、Research・Direction・Build・QA・Review・Correctionを途中で人間確認せず自律的に完了し、**DEPLOY READY**で初めて人間へ返す。

実デプロイそのものは別工程とし、人間の明示承認なしに実行しない。

## DEPLOY READY definition
以下をすべて満たした状態を `DEPLOY READY` とする。

### Product / content
- [ ] PROJECT_SPECのAcceptance Criteriaを満たす
- [ ] 必須ページ・主要導線が実装済み
- [ ] 公開文言に仮テキスト・TODO・placeholderが残っていない
- [ ] 架空実績・架空顧客・架空数値・未確認事実がない
- [ ] 法務・料金・会社情報など必要な事実が確定している、または明示的BLOCKEDとして分離されている

### Research / direction
- [ ] Research QA PASS
- [ ] REFERENCE_ANALYSIS完了
- [ ] COPY_RESEARCH完了
- [ ] DESIGN_DIRECTION確定
- [ ] COPY_DIRECTION確定
- [ ] Reference模倣ではなく案件固有の設計へ変換済み

### UI / responsive
- [ ] 360px PASS
- [ ] 375px PASS
- [ ] 390px PASS
- [ ] 430px PASS
- [ ] 768px PASS
- [ ] 1024px PASS
- [ ] 1280px PASS
- [ ] 1440px PASS
- [ ] horizontal overflowなし
- [ ] Header / Footer / CTA / Typography統一
- [ ] mobile navigation操作可能
- [ ] Primary CTA操作可能

### Technical
- [ ] lint PASS
- [ ] typecheck PASS
- [ ] unit tests PASS
- [ ] production build PASS
- [ ] E2E PASS
- [ ] console error 0
- [ ] page error 0
- [ ] 404や壊れた内部リンクなし
- [ ] secretがrepositoryや公開コードへ混入していない

### Independent review
- [ ] Visual Reviewer重大FAILなし
- [ ] Copy Reviewer重大FAILなし
- [ ] Technical Reviewer重大FAILなし
- [ ] SEO/A11y Reviewer重大FAILなし
- [ ] Reviewer FAILは修正・再確認済み

### Deployment preparation
- [ ] 必要なenvironment variables一覧が整理されている
- [ ] 必要な外部サービス接続一覧が整理されている
- [ ] build / start手順が明確
- [ ] デプロイ先で必要な設定が整理されている
- [ ] DNS / custom domainで必要な作業が整理されている
- [ ] migrationが必要な場合は手順・rollback方針が整理されている
- [ ] 本番公開後のsmoke test項目が整理されている

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
