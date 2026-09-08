import type { MetadataRoute } from "next";
import {siteConfig} from "@/lib/site-config";
export default function robots():MetadataRoute.Robots{return process.env.SITE_INDEXABLE==="true"?{rules:{userAgent:"*",allow:"/",disallow:["/start/","/legal/","/portal/","/admin/"]},sitemap:`${siteConfig.url}/sitemap.xml`}:{rules:{userAgent:"*",disallow:"/"}};}
