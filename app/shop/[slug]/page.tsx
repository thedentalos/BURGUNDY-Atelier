import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/products";
import { formatPkr } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { TextLink } from "@/components/text-link";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return PRODUCTS.map(product=>({slug:product.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const product=getProduct(slug);return product?{title:product.name,description:product.description}:{title:"Not found"};}
export default async function ProductPage({params}:Props){
 const {slug}=await params;const product=getProduct(slug);if(!product)notFound();
 const related=PRODUCTS.filter(p=>p.slug!==slug).slice(0,3);
 return <main id="main-content" className="page-width"><nav aria-label="Breadcrumb" className="piece-breadcrumb"><Link href="/shop">Collection</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
 <div className="piece-layout"><figure><div className="piece-photo"><Image src={product.image.src} alt={product.image.alt} fill priority sizes="(min-width: 700px) 48vw, 90vw" /></div><figcaption className="product-number" style={{marginTop:"16px"}}>Burgundy Atelier / {product.collection}</figcaption></figure>
 <div className="piece-copy"><p className="eyebrow">The Fall wardrobe / {String(PRODUCTS.indexOf(product)+1).padStart(2,"0")}</p><h1>{product.name}</h1>
 <div className="piece-prices">{product.prices.length ? product.prices.map(price=><div key={price.label}><span>{price.label}</span><span>{formatPkr(price.amountPkr)}</span></div>):<div><span>The complete set</span><span>Price on request</span></div>}</div>
 <p className="piece-description">{product.description}</p><dl className="piece-facts"><dt>Print</dt><dd>{product.print}</dd><dt>Cut</dt><dd>{product.cut}</dd></dl>
 <a className="piece-order" href="https://www.instagram.com/burgundyatelierofficial" target="_blank" rel="noopener noreferrer">Inquire about this piece</a><p className="piece-advice">Send the piece name and your usual size. Availability, fabric and delivery details are confirmed over Instagram.<br /><Link href="/atelier#fit-and-care">A note on fit &amp; care</Link></p></div></div>
 <section className="piece-related" aria-labelledby="related-title"><div className="editorial-heading"><div><p className="eyebrow">Elsewhere in the wardrobe</p><h2 id="related-title">In good <em>company.</em></h2></div><TextLink href="/shop">The full collection</TextLink></div><div className="related-grid">{related.map(p=><ProductCard key={p.slug} product={p} index={PRODUCTS.indexOf(p)+1} sizes="(min-width: 700px) 30vw, 44vw" />)}</div></section></main>;
}
