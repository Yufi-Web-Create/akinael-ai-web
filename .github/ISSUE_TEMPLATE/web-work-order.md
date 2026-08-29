---
name: Web Work Order
about: AI制作エージェントへ渡すWeb制作・修正の仕事票
---

# Goal

[今回、ユーザーが最終的にできるようになること]

# Request

[要望をそのまま記載]

# Source of truth

必ず確認:
- `AGENTS.md`
- `docs/PROJECT_SPEC.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/COPY_GUIDE.md`
- `docs/ARCHITECTURE.md`
- `docs/QA.md`
- 関連する既存コード

# Scope

変更してよい範囲:
- [ ]

変更不要な範囲:
- [ ]

# Acceptance Criteria

- [ ] ユーザー要求を満たす
- [ ] desktop / tablet / mobileで成立する
- [ ] copy reviewで重大FAILなし
- [ ] Visual reviewで重大FAILなし
- [ ] `npm run qa` PASS

# Execution

1. 現状を調査する
2. 必要な実装方法を自分で判断する
3. 実装する
4. 実ブラウザと自動テストで検証する
5. FAILを自分で修正する
6. 全Acceptance Criteriaを満たすまで反復する

合理的に解決可能な技術判断について、人間への確認は不要。
仕様矛盾、事業判断、不明な事実、不可逆操作のみ確認する。
