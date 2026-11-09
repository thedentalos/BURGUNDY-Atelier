"use client";
import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";
const ordered=[PRODUCTS[4],PRODUCTS[3],PRODUCTS[0],PRODUCTS[1],PRODUCTS[2]];
const filters=["All pieces","Co-ords","Printed shirts"] as const;
export function CollectionGallery(){
 const [filter,setFilter]=useState<(typeof filters)[number]>("All pieces");
 const shown=ordered.filter(p=>filter==="All pieces"||(filter==="Co-ords"?p.slug.endsWith("co-ord"):!p.slug.endsWith("co-ord")));
 return <><div className="collection-toolbar"><div role="group" aria-label="Filter collection">{filters.map(label=><button key={label} aria-pressed={filter===label} onClick={()=>setFilter(label)}>{label}</button>)}</div><p role="status" aria-live="polite">{String(shown.length).padStart(2,"0")} pieces</p></div><div className={`collection-products ${filter==="All pieces"?"collection-composed":""}`}>{shown.map((product,index)=><ProductCard key={product.slug} product={product} index={ordered.indexOf(product)+1} priority={index<2} sizes="(min-width: 700px) 44vw, 90vw" />)}</div></>;
}
