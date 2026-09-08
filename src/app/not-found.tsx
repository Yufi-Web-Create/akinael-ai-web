import Link from "next/link";
import { ConsultationLink } from "@/components/site";
export default function NotFound(){return <main id="main" className="section not-found"><div className="container"><p className="eyebrow">404</p><h1>ページが見つかりませんでした。</h1><p style={{marginBlock:28}}>URLをご確認いただくか、トップページからご覧ください。</p><Link prefetch={false} className="text-link" href="/">トップページへ戻る</Link><div style={{marginTop:30}}><ConsultationLink/></div></div></main>}
