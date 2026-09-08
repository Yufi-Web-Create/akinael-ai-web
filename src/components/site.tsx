import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { siteConfig, questions, plans } from "@/lib/site-config";

export function ConsultationLink({ small = false }: { small?: boolean }) {
  return <Link prefetch={false} className={`button${small ? " button-small" : ""}`} href={siteConfig.primaryCta.href}>{siteConfig.primaryCta.label}<span aria-hidden="true">↗</span></Link>;
}
export function Header() {
  return <><Link prefetch={false} className="skip-link" href="#main">本文へ移動</Link><header className="site-header"><div className="container header-inner"><Link prefetch={false} className="brand" href="/" aria-label="アキナエルAI トップ"><span className="brand-type">アキナエル<span className="brand-ai">AI</span></span></Link><nav className="desktop-nav" aria-label="メインナビゲーション">{siteConfig.nav.map(item => <Link prefetch={false} key={item.href} href={item.href}>{item.label}</Link>)}</nav><div className="header-tools"><Link prefetch={false} className="login-link" href={siteConfig.portalUrl}>ログイン</Link><div className="header-cta"><ConsultationLink small /></div><MobileMenu><summary>メニュー</summary><nav aria-label="モバイルナビゲーション">{siteConfig.nav.map(item => <Link prefetch={false} key={item.href} href={item.href}>{item.label}</Link>)}<Link prefetch={false} href="/cases/">相談例を見る</Link><Link prefetch={false} href="/about/">アキナエルAIについて</Link><ConsultationLink /></nav></MobileMenu></div></div></header></>;
}
export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div><Link prefetch={false} className="brand" href="/">アキナエルAI</Link><p>商いの願いを叶えるAI</p></div><nav aria-label="フッターナビゲーション"><Link prefetch={false} href="/service/">できること</Link><Link prefetch={false} href="/pricing/">料金</Link><Link prefetch={false} href="/cases/">相談例</Link><Link prefetch={false} href="/faq/">よくある質問</Link><Link prefetch={false} href="/about/">アキナエルAIについて</Link><Link prefetch={false} href="/legal/">運営・法務情報</Link><Link prefetch={false} href={siteConfig.portalUrl}>ログイン</Link></nav></div><div className="footer-bottom"><p>© 2026 アキナエルAI</p><p>小さな相談から、お店の次へ。</p></div></div></footer>;
}
export function Closing() {
  return <section className="section closing"><div className="container closing-inner"><div><p className="eyebrow">まずは、相談から</p><h2>「こんなの作れたら」を、<br />聞かせてください。</h2><p>まとまっていなくても大丈夫。<br />今、気になっていることから始めましょう。</p></div><div><ConsultationLink /><p className="caption">無料登録の進め方をご案内します。<br />相談だけでは契約になりません。</p></div></div></section>;
}
export function PageIntro({ label, title, lead }: { label: string; title: string; lead: string }) {
  return <section className="page-intro"><div className="container"><Link prefetch={false} className="breadcrumb" href="/">トップ</Link><p className="eyebrow">{label}</p><h1>{title}</h1><p className="lead">{lead}</p></div></section>;
}
export function FaqList({ limit }: { limit?: number }) {
  return <div className="faq-list">{questions.slice(0, limit).map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div>;
}
export function PlanList() {
  return <div className="plan-list">{plans.map((plan, i) => <article className="plan-row" key={plan.name}><div className="plan-title"><span className="index">0{i + 1}</span><h3>{plan.name}</h3></div><p className="plan-price">{plan.price}<span>{plan.unit}</span></p><p>{plan.body}</p></article>)}</div>;
}
export function Flow() {
  const steps = [ ["相談する", "今の困りごとや、作りたいものを普段の言葉で。必要なことは会話の中で整理します。"], ["無料の試作を見る", "簡易試作や提案を見ながら、方向性を確認します。仕上がりを想像だけで決める必要はありません。"], ["内容と費用を確かめる", "対象範囲と費用を確認し、納得してから契約を検討します。有料作業は明確な承認の後に。"], ["制作し、確認して仕上げる", "制作と検査を分け、修正を重ねて仕上げます。公開は承認後。対象プランでは継続改善も相談できます。"] ];
  return <ol className="flow-list">{steps.map(([title, body], i) => <li key={title}><span className="index">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>;
}
