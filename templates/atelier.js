const products = {"burgundy-co-ord": ["BURGUNDY CO-ORD", "Price on request", "A deep burgundy tunic with a narrow split neckline, full sleeves and a wide-leg trouser. Sold as a set."], "ivory-co-ord": ["IVORY CO-ORD", "Price on request", "An ivory tunic with a covered placket, small buttons and full sleeves, paired with a wide-leg trouser. Sold as a set."], "blush-baggy": ["BLUSH BAGGY", "Rs. 5,500 \u00b7 shirt", "A loose shirt in blush floral on ivory, with a straight hem and full sleeves. With skinny shalwar: Rs. 7,500."], "lavender-vanilla": ["LAVENDER VANILLA", "Rs. 5,500 \u00b7 shirt", "Lavender sprigs on ivory. A straight-cut V-neck shirt with full sleeves. With skinny shalwar: Rs. 7,500."], "sunflower-ivory": ["SUNFLOWER IVORY", "Rs. 7,000 \u00b7 shirt", "Small sunflowers on ivory, with a notched neckline and gold buttons. With skinny shalwar: Rs. 9,500."]};
const dialog = document.querySelector('dialog');
for (const anchor of document.querySelectorAll('[data-product]')) {
 anchor.addEventListener('click', event => {
  if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const slug = anchor.dataset.product;
  const piece = products[slug];
  if (!piece || !dialog.showModal) return;
  event.preventDefault();
  document.querySelector('#piece-title').textContent = piece[0];
  document.querySelector('#piece-price').textContent = piece[1];
  document.querySelector('#piece-description').textContent = piece[2];
  const image = document.querySelector('#piece-image');
  image.src = '../public/images/products/' + slug + '.jpg';
  image.alt = piece[2];
  dialog.showModal();
 });
}
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom)dialog.close();}});
for(const anchor of document.querySelectorAll('.mobile-menu a')) anchor.addEventListener('click',()=>anchor.closest('details').removeAttribute('open'));
document.addEventListener('keydown',event=>{if(event.key==='Escape') document.querySelector('.mobile-menu').removeAttribute('open');});
