import puppeteer from 'puppeteer-core';
import {existsSync,mkdirSync,writeFileSync} from 'node:fs';
const executablePath=['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const browser=await puppeteer.launch({executablePath,headless:true});
const results=[];mkdirSync('templates/previews',{recursive:true});
for(const concept of ['index','residence','salon','folio']){
 const page=await browser.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,375,430,600,768,900,1024,1440,1920]){
  await page.setViewport({width,height:1000});await page.goto(`http://127.0.0.1:4173/templates/${concept}.html`,{waitUntil:'networkidle2'});
  const audit=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.loading!=='lazy'&&(!i.complete||!i.naturalWidth)).map(i=>i.src),badAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).map(a=>a.href)}));
  results.push({concept,width,...audit,errors:[...errors]});
  if(width===1440||width===375){await page.evaluate(async()=>{for(const im of document.images){im.loading='eager';await im.decode().catch(()=>{});}});await page.screenshot({path:`templates/previews/${concept}-${width}.png`,fullPage:true});}
 }
 if(concept!=='index'){
  await page.click('[data-product]');
  if(!await page.$eval('dialog',d=>d.open))throw Error('Dialog did not open');
  await page.keyboard.press('Escape');if(await page.$eval('dialog',d=>d.open))throw Error('Escape failed');
  await page.setViewport({width:375,height:812});await page.locator('summary').click();await page.click('.mobile-menu a');
  if(await page.$eval('.mobile-menu',d=>d.open))throw Error('Menu did not close');
 }
 await page.close();
}
await browser.close();
writeFileSync('templates/previews/audit.json',JSON.stringify(results,null,2));
const bad=results.filter(r=>r.overflow||r.broken.length||r.badAnchors.length||r.errors.length);console.log(JSON.stringify({checks:results.length,failures:bad,interactions:'Product dialogs, Escape dismissal and mobile menu passed.'},null,2));
if(bad.length)process.exitCode=1;

