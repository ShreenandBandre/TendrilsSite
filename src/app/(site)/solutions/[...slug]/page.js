import {notFound} from "next/navigation"; import {client} from "@/lib/sanity/client"; import {solutionsQuery,solutionBySlugQuery,solutionHierarchyQuery} from "@/lib/sanity/queries"; import SolutionPageRenderer from "@/components/solutions/SolutionPageRenderer";
export const revalidate=60;
export async function generateStaticParams(){
  const items=await client.fetch(solutionHierarchyQuery)||[];
  const byId=new Map(items.map(x=>[x._id,x]));
  const pathFor=(item,seen=new Set())=>{
    if(!item||seen.has(item._id)) return item?.slug;
    const next=new Set(seen); next.add(item._id);
    const parent=item.parentId?byId.get(item.parentId):null;
    return [parent?pathFor(parent,next):"",item.slug].filter(Boolean).join("/");
  };
  return items.map(x=>({slug:pathFor(x).split("/").filter(Boolean)}));
}
export async function generateMetadata({params}){const{slug:segments}=await params;const slug=Array.isArray(segments)?segments[segments.length-1]:segments;const x=await client.fetch(solutionBySlugQuery,{slug});if(!x)return{};return{title:x.seo?.metaTitle||x.seo?.title||x.title,description:x.seo?.metaDescription||x.seo?.description||x.shortDescription||x.summary,robots:x.seo?.noIndex?{index:false,follow:false}:undefined}}
export default async function SolutionPage({params}){const{slug:segments}=await params;const slug=Array.isArray(segments)?segments[segments.length-1]:segments;const x=await client.fetch(solutionBySlugQuery,{slug});if(!x)notFound();return <SolutionPageRenderer solution={x}/>} 
