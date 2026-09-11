import {Playfair_Display,Inter} from "next/font/google";
import "./globals.css";
const display=Playfair_Display({subsets:["latin"],variable:"--font-display",weight:["600","700"]});
const body=Inter({subsets:["latin"],variable:"--font-body"});
export const metadata={metadataBase:new URL("https://www.tendrils.com"),title:{default:"Tendrils — Shopify Growth Partner",template:"%s | Tendrils"},description:"Build, integrate, automate, and scale Shopify businesses end-to-end."};
export default function RootLayout({children}){return <html lang="en" className={`${display.variable} ${body.variable}`}><body className="font-body bg-ivory text-ink antialiased overflow-x-hidden">{children}</body></html>}
