"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
const NAV = [{href:"/shop",label:"Collection"},{href:"/atelier",label:"The atelier"}];
export function SiteHeader(){
 const pathname=usePathname();
 const dialog=useRef<HTMLDialogElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const close=()=>dialog.current?.close();
 useEffect(()=>{dialog.current?.close();},[pathname]);
 useEffect(()=>{const media=window.matchMedia("(min-width: 1000px)"); const resize=()=>{if(media.matches)dialog.current?.close();}; media.addEventListener("change",resize);return()=>{media.removeEventListener("change",resize);document.body.style.overflow="";};},[]);
 return <header className={`salon-header ${pathname === "/" ? "header-over-campaign" : ""}`}><div className="page-width header-inner">
  <nav className="desktop-nav" aria-label="Primary">{NAV.map(item=><Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href)?"page":undefined}>{item.label}</Link>)}</nav>
  <Link href="/" className="house-mark" aria-label="Burgundy Atelier home">BURGUNDY<span>ATELIER</span></Link>
  <nav className="desktop-nav header-right" aria-label="Inquiries"><Link href="/atelier#ordering">Inquiries</Link><a href="https://www.instagram.com/burgundyatelierofficial" target="_blank" rel="noopener noreferrer">Instagram ↗</a></nav>
  <button className="menu-trigger" ref={trigger} aria-haspopup="dialog" onClick={()=>{dialog.current?.showModal();document.body.style.overflow="hidden";}}>Menu +</button>
 </div><dialog ref={dialog} className="house-menu" aria-labelledby="menu-title" onClose={()=>{document.body.style.overflow="";trigger.current?.focus();}}>
  <div className="menu-top"><span id="menu-title" className="eyebrow">Burgundy Atelier</span><button autoFocus onClick={close}>Close</button></div>
  <nav aria-label="Mobile"><Link href="/" onClick={close}><small>01</small>The Salon</Link>{NAV.map((item,i)=><Link key={item.href} href={item.href} onClick={close}><small>0{i+2}</small>{item.label}</Link>)}<Link href="/atelier#ordering" onClick={close}><small>04</small>Inquiries</Link></nav><p className="menu-end">Fall 2026<br />Orders through Instagram.</p>
 </dialog></header>;
}
