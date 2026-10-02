const items=[
 {name:"Jalapeños Panés",desc:"Breaded jalapeños",price:2200,cat:"tapas"},
 {name:"Terrine de Poisson et Crevette",desc:"Fish and shrimp terrine",price:2500,cat:"tapas"},
 {name:"Poulpe Frit",desc:"Fried octopus",price:2100,cat:"tapas"},
 {name:"Pan con Tomate",desc:"Tomato and olive oil toast",price:800,cat:"tapas"},
 {name:"Boulettes du Pacha (Boeuf)",desc:"Beef Pacha meatballs",price:1500,cat:"tapas"},
 {name:"Houmous Rouge (Betterave)",desc:"Red hummus (beetroot)",price:1100,cat:"tapas"},
 {name:"Houmous Vert (Pesto)",desc:"Green hummus (pesto)",price:1200,cat:"tapas"},
 {name:"Duo de Houmous",desc:"Duo of hummus",price:1100,cat:"tapas"},
 {name:"Calamar à la Romaine",desc:"Fried squid rings",price:1900,cat:"tapas"},
 {name:"Gambas Panées",desc:"Breaded shrimp",price:2500,cat:"tapas"},
 {name:"Trilogie de Moules",desc:"Mussels trilogy",price:2400,cat:"tapas"},
 {name:"Toasts de Foie Gras",desc:"Foie gras toasts",price:2400,cat:"tapas"},
 {name:"Sandwich d’Émincé de Boeuf",desc:"Grilled beef sandwich",price:3500,cat:"sandwiches"},
 {name:"Sandwich au Poulet",desc:"Chicken sandwich",price:2700,cat:"sandwiches"},
 {name:"Burger New Mexico",desc:"New Mexico burger",price:3300,cat:"sandwiches"},
 {name:"Smash Burger",desc:"Smash cheeseburger",price:3100,cat:"sandwiches"},
 {name:"Petite Planche Mixte",desc:"Small mixed board · charcuterie & cheese",price:4000,cat:"sharing"},
 {name:"Grande Planche Mixte",desc:"Big mixed board · charcuterie & cheese",price:6900,cat:"sharing"},
 {name:"Boule de Glace (unité)",desc:"Single scoop of ice cream",price:600,cat:"desserts"},
 {name:"Coupe Colonel",desc:"Colonel’s cup",price:2000,cat:"desserts"},
 {name:"Sorbet (Framboise / Citron)",desc:"Raspberry or lemon sorbet",price:600,cat:"desserts"},
 {name:"Coupe du Gers",desc:"Gers cup",price:2000,cat:"desserts"},
 {name:"Dame Blanche",desc:"White lady",price:1900,cat:"desserts"},
 {name:"Banana Split",desc:"Banana split",price:2200,cat:"desserts"},
 {name:"Nougat Glacé",desc:"Iced nougat",price:2500,cat:"desserts"},
 {name:"Tiramisu Glacé",desc:"Iced tiramisu",price:2500,cat:"desserts"}
];
const grid=document.querySelector('#menu-grid');let cart={};let category='all';const fmt=n=>n.toLocaleString('en-US');
function renderMenu(){grid.innerHTML='';items.filter(x=>category==='all'||x.cat===category).forEach((item)=>{const i=items.indexOf(item);const el=document.createElement('article');el.className='menu-item';el.innerHTML=`<div><h3>${item.name}</h3><p>${item.desc}</p></div><div class="item-price"><strong>${fmt(item.price)} DJF</strong><button class="add-btn" data-add="${i}">＋ Add</button></div>`;grid.append(el)});}
function renderCart(){const entries=Object.entries(cart).filter(([,q])=>q>0);document.querySelector('#cart-count').textContent=entries.reduce((s,[,q])=>s+q,0);document.querySelector('#cart-total').textContent='DJF '+fmt(entries.reduce((s,[i,q])=>s+items[i].price*q,0));const box=document.querySelector('#cart-items');box.innerHTML=entries.length?'':'<p class="empty-cart">Your basket is waiting for something delicious.</p>';entries.forEach(([i,q])=>{const item=items[i],row=document.createElement('div');row.className='cart-row';row.innerHTML=`<div><strong>${item.name}</strong><small>${fmt(item.price)} DJF each</small></div><div class="quantity"><button data-qty="${i}" data-delta="-1">−</button><span>${q}</span><button data-qty="${i}" data-delta="1">＋</button></div>`;box.append(row)})}
grid.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b){const i=b.dataset.add;cart[i]=(cart[i]||0)+1;renderCart();b.textContent='Added ✓';setTimeout(()=>b.textContent='＋ Add',900)}});document.querySelector('#cart-items').addEventListener('click',e=>{const b=e.target.closest('[data-qty]');if(b){const i=b.dataset.qty;cart[i]=(cart[i]||0)+Number(b.dataset.delta);if(cart[i]<=0)delete cart[i];renderCart()}});document.querySelector('#categories').addEventListener('click',e=>{const b=e.target.closest('button[data-category]');if(!b)return;category=b.dataset.category;document.querySelectorAll('.category-tabs button').forEach(x=>x.classList.toggle('active',x===b));renderMenu()});function cartOpen(open){document.body.classList.toggle('cart-open',open);document.querySelector('#cart-panel').setAttribute('aria-hidden',String(!open))}document.querySelector('#cart-open').onclick=()=>cartOpen(true);document.querySelector('#cart-close').onclick=()=>cartOpen(false);document.querySelector('#cart-overlay').onclick=()=>cartOpen(false);document.querySelector('#checkout').onclick=()=>{const entries=Object.entries(cart).filter(([,q])=>q>0);if(!entries.length){alert('Please add at least one item to your order.');return}const lines=entries.map(([i,q])=>`${q} x ${items[i].name} — ${fmt(items[i].price*q)} DJF`);const total=entries.reduce((s,[i,q])=>s+items[i].price*q,0);const msg=`Hello Le Longchamp! I would like to place an order:\n\n${lines.join('\n')}\n\nSubtotal: ${fmt(total)} DJF\nPlease confirm availability. Thank you!`;window.open('https://wa.me/25377104949?text='+encodeURIComponent(msg),'_blank','noopener')};document.querySelector('.menu-toggle').onclick=()=>document.querySelector('#nav').classList.toggle('show');document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('#nav').classList.remove('show')));renderMenu();renderCart();
