import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPkr } from "@/lib/format";
export function ProductCard({product,priority=false,index,sizes="(min-width: 1000px) 23vw, 45vw"}:{product:Product;priority?:boolean;index?:number;sizes?:string}){
 return <article className="salon-product"><Link href={`/shop/${product.slug}`}><div className="product-image"><Image src={product.image.src} alt={product.image.alt} fill priority={priority} sizes={sizes} /></div><div className="product-caption"><p className="product-number">{String(index??1).padStart(2,"0")} / {product.collection}</p><h3>{product.name}<span aria-hidden="true">↗</span></h3><p className="product-price">{product.prices.length ? `${formatPkr(product.prices[0].amountPkr)} · shirt` : "Price on request"}</p></div></Link></article>;
}
