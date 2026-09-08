import type { MetadataRoute } from "next";
import {industries,siteConfig} from "@/lib/site-config";
export default function sitemap():MetadataRoute.Sitemap{if(process.env.SITE_INDEXABLE!=="true")return [];return ["/","/service/","/pricing/","/faq/","/cases/","/about/",...industries.map(i=>`/industries/${i.slug}/`)].map(path=>({url:`${siteConfig.url}${path}`}));}
