import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { TextLink } from "@/components/text-link";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
 const featured = [PRODUCTS[3], PRODUCTS[4], PRODUCTS[2], PRODUCTS[0]];
 return <main id="main-content">
  <section className="campaign-hero" aria-labelledby="campaign-title">
   <Image src={PRODUCTS[3].image.src} alt={PRODUCTS[3].image.alt} fill priority sizes="100vw" className="campaign-photograph" />
   <div className="campaign-shade" aria-hidden="true" />
   <div className="campaign-copy"><p className="eyebrow">Burgundy Atelier / Fall 2026</p><h1 id="campaign-title">THE FALL <em>WARDROBE</em></h1><TextLink href="/shop">View the collection</TextLink></div>
   <div className="campaign-caption"><span>The Salon / Volume 01</span><span>Burgundy, worn your way.</span></div>
  </section>
  <section className="salon-introduction page-width"><p className="eyebrow">From the atelier</p><h2>A straight silhouette.<br />A little room to <em>breathe.</em></h2><p>shirts and co-ords, from ivory to deep burgundy.</p></section>
  <section className="home-selection page-width" aria-labelledby="selection-title"><div className="editorial-heading"><div><p className="eyebrow">The Fall 2026 collection</p><h2 id="selection-title">The house <em>selection.</em></h2></div><TextLink href="/shop">View all five pieces</TextLink></div><div className="home-products">{featured.map((product,index)=><ProductCard key={product.slug} product={product} index={index+1} />)}</div></section>
  <section className="salon-note"><div className="page-width salon-note-inner"><p className="eyebrow">A note on dressing</p><div><h2>A little colour.<br />A familiar <em>silhouette.</em></h2><p>Blush florals and sunflower prints. Straight tunics and wide trousers. Start with a shade; find the cut that suits your day.</p><TextLink href="/atelier">Inside the atelier</TextLink></div></div></section>
 </main>;
}
