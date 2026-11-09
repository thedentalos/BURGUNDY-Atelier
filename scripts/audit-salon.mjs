import puppeteer from 'puppeteer-core';
import {existsSync,mkdirSync,writeFileSync} from 'node:fs';
const browser=await puppeteer.launch({executablePath:['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync),headless:true});
const page=await browser.newPage();page.setDefaultNavigationTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
const root='http://127.0.0.1:4180';const results=[];
mkdirSync('tests/salon',{recursive:true});
for(const route of ['/','/shop','/atelier','/shop/ivory-co-ord','/shop/burgundy-co-ord','/shop/blush-baggy','/shop/lavender-vanilla','/shop/sunflower-ivory']){
 const response=await page.goto(root+route,{waitUntil:'networkidle2'});await page.evaluate(()=>document.fonts.ready);
 for(const width of [320,375,430,600,768,900,1024,1440,1920]){
  await page.setViewport({width,height:900});await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  const audit=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,missingMain:!document.getElementById('main-content'),smallTargets:[...document.querySelectorAll('a,button')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<44||r.width<44)}).map(e=>e.textContent.trim().slice(0,50))}));
  results.push({route,width,status:response.status(),...audit});console.log(route,width,audit.overflow?'OVERFLOW':'ok');
  if(process.env.QUICK !== '1' && [375,1440].includes(width)&&['/','/shop','/atelier','/shop/ivory-co-ord'].includes(route)){
   await page.evaluate(async()=>{for(const im of document.images)im.loading='eager';await Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,8000))]);});await new Promise(r=>setTimeout(r,1000));
   const broken=await page.evaluate(()=>[...document.images].some(i=>!i.naturalWidth));if(broken)throw Error('Broken image '+route);
   await page.screenshot({path:`tests/salon/${route==='/'?'home':route.replaceAll('/','-')}-${width}.png`,fullPage:true});
  }
 }
}
await page.setViewport({width:375,height:812});await page.goto(root+'/shop',{waitUntil:'networkidle2'});
for(const [label,count] of [['Co-ords',2],['Printed shirts',3],['All pieces',5]]){await page.evaluate(label=>[...document.querySelectorAll('.collection-toolbar button')].find(e=>e.textContent===label).click(),label);await page.waitForFunction(count=>document.querySelectorAll('.collection-products article').length===count,{},count);}
await page.click('.menu-trigger');await page.waitForSelector('dialog[open]');await page.keyboard.press('Escape');if(await page.$eval('dialog',d=>d.open))throw Error('Escape failed');if(!await page.$eval('.menu-trigger',e=>e===document.activeElement))throw Error('Focus restore failed');
await page.click('.menu-trigger');await page.click('dialog a[href="/atelier"]');await page.waitForFunction(()=>location.pathname==='/atelier');if(await page.$eval('dialog',d=>d.open))throw Error('Navigation close failed');
await page.click('.menu-trigger');await page.setViewport({width:1440,height:900});await page.waitForFunction(()=>!document.querySelector('dialog').open);if(await page.$eval('body',e=>e.style.overflow==='hidden'))throw Error('Resize scroll lock failed');
await page.setViewport({width:667,height:375});await page.goto(root,{waitUntil:'networkidle2'});await page.click('.menu-trigger');await page.screenshot({path:'tests/salon/menu-landscape.png'});await page.keyboard.press('Escape');
const bad=results.filter(r=>r.status!==200||r.overflow||r.h1!==1||r.missingMain||r.smallTargets.length);
writeFileSync('tests/salon/audit.json',JSON.stringify({results,errors,interactions:'Filters, menu, Escape, focus return, routing and resize passed'},null,2));
console.log(JSON.stringify({checks:results.length,failures:bad,errors},null,2));await browser.close();if(bad.length||errors.length)process.exitCode=1;


