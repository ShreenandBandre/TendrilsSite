import {client} from "@/lib/sanity/client";
import {siteSettingsQuery} from "@/lib/sanity/queries";
import FloatingNavbar from "@/components/layout/FloatingNavbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
export default async function SiteChrome({children}){let settings=null;try{settings=await client.fetch(siteSettingsQuery)}catch(error){console.warn("Site settings unavailable:",error.message)}return <><FloatingNavbar settings={settings}/><MobileNav settings={settings}/><div className="min-h-screen">{children}</div><Footer settings={settings}/></>}
