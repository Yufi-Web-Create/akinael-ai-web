import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries } from "@/lib/site-config";
import { PageIntro, Closing, Flow } from "@/components/site";
export const dynamicParams = false;
export function generateStaticParams() { return industries.map(item => ({slug:item.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params; const item=industries.find(i=>i.slug===slug); if(!item)return {};
 return {title:`${item.name}のWeb・文章制作`,description:item.body,alternates:{canonical:`/industries/${slug}/`},openGraph:{title:`${item.name}のご相談｜アキナエルAI`,description:item.body,url:`/industries/${slug}/`}};
}
export default async function IndustryPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const item=industries.find(i=>i.slug===slug);if(!item)notFound();
 return <main id="main"><PageIntro label={`${item.name}のご相談`} title={item.request} lead={item.body}/><section className="section"><div className="container reading prose"><div className="content-block"><p className="eyebrow">相談例 / 制作実績ではありません</p><h2>たとえば、こんな制作・改善。</h2><ul>{item.tasks.map(t=><li key={t}>{t}</li>)}</ul><p>お店の状況に合わせて、必要なものから整理します。機能や連携の可否、費用は内容を確認してご案内します。</p></div><div className="content-block"><h2>相談の前に、あれば助かるもの。</h2><p>{item.prepare}</p><p>揃っていないものがあっても、まずは相談できます。</p></div><div className="content-block"><h2>まず試作を見て、確かめる。</h2><Flow /></div><div className="content-block"><h2>更新や追加の相談について。</h2><p>{item.faq}</p><Link prefetch={false} className="text-link" href="/pricing/">無料の範囲と料金を見る</Link></div><p style={{marginTop:28}}>業種が違っても、<Link prefetch={false} className="text-link" href="/cases/">ほかの相談例</Link>をご覧いただけます。</p></div></section><Closing/></main>;
}
