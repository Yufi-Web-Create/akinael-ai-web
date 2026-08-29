import { siteConfig } from "@/lib/site-config";

const services = [
  "Webサイトの制作・修正",
  "SNSや文章の制作",
  "画像・バナーの制作",
  "集客や導線の調査・改善",
] as const;

const flow = [
  ["01", "相談", "やりたいことを、そのままチャットで伝えます。"],
  ["02", "整理・試作", "必要なことを整理し、まず確認できる形まで進めます。"],
  ["03", "確認", "内容や費用を確認してから、次へ進むか決められます。"],
  ["04", "制作・改善", "制作と検査を分け、確認しながら仕上げます。"],
] as const;

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label={`${siteConfig.name} トップ`}>
            {siteConfig.name}
          </a>
          <nav aria-label="メインナビゲーション">
            <ul className="nav-list">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="button button-small" href={siteConfig.primaryCta.href}>
            {siteConfig.primaryCta.label}
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">小さな店舗や事業の、Webまわりの相談役。</p>
              <h1>「こんなことができたらいいな」を<br className="desktop-break" />小さな相談から、形にしていきます。</h1>
              <p className="hero-lead">
                Webサイトの修正、SNS投稿、画像制作、ちょっとした調査まで。
                専門の担当者を探すほどではない仕事も、チャットから相談できます。
              </p>
              <div className="actions">
                <a className="button" href="#contact">無料で相談する</a>
                <a className="text-link" href="#service">できることを見る</a>
              </div>
            </div>
            <aside className="hero-note" aria-label="アキナエルAIの進め方">
              <p className="note-label">いきなり契約ではありません</p>
              <p>相談内容を整理し、簡易試作や提案を確認してから、必要なら契約を検討できます。</p>
            </aside>
          </div>
        </section>

        <section className="section" id="service">
          <div className="container split-heading">
            <div>
              <p className="eyebrow">できること</p>
              <h2>頼む先を探すほどでもない仕事から、相談できます。</h2>
            </div>
            <div className="service-list">
              {services.map((service) => <p key={service}>{service}</p>)}
            </div>
          </div>
        </section>

        <section className="section section-muted" id="flow">
          <div className="container">
            <p className="eyebrow">進め方</p>
            <h2>相談して、見てから決める。</h2>
            <div className="flow-grid">
              {flow.map(([number, title, body]) => (
                <article className="flow-item" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="quality">
          <div className="container quality-grid">
            <div>
              <p className="eyebrow">品質管理</p>
              <h2>作るAIと、確かめるAIを分けています。</h2>
            </div>
            <div>
              <p>
                制作したものをそのまま出すのではなく、表示崩れ、文章、操作、技術面を別工程で確認します。
                公開や課金など重要な操作は、人の確認を通してから進めます。
              </p>
            </div>
          </div>
        </section>

        <section className="section section-muted" id="faq">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow">よくある質問</p>
              <h2>相談だけでも大丈夫ですか？</h2>
            </div>
            <p>はい。まず相談内容を整理して、できることや進め方を確認するところから始められます。</p>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container contact-inner">
            <div>
              <p className="eyebrow">まずは相談から</p>
              <h2>小さなことでも、そのまま書いてください。</h2>
            </div>
            <p className="contact-note">相談機能の本番接続は、バックエンド連携工程で実装します。</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>{siteConfig.name}</p>
          <p>AI Web Production Reference Project</p>
        </div>
      </footer>
    </>
  );
}
