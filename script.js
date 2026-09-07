const products=[
{id:1,brand:"DeWalt",name:"دریل 20V XR Brushless",cat:"ئامرازی کارەبا",price:249000,img:"product-dewalt.jpg"},
{id:2,brand:"Milwaukee",name:"ئیمپەکت M18 Brushless",cat:"ئامرازی کارەبا",price:279000,img:"product-milwaukee.jpg"},
{id:3,brand:"Ronix",name:"دریل 750W پیشەیی",cat:"ئامرازی کارەبا",price:89000,img:"product-ronix.jpg"},
{id:4,brand:"KNAUF",name:"سێت ترویل 3 دانە",cat:"ئامرازی دەستی",price:24000,img:"product-knauf.jpg"},
{id:5,brand:"P.H.Tools",name:"کڵاوی سەلامەتی پیشەیی",cat:"پاراستن",price:19000,img:"product-safety.jpg"},
{id:6,brand:"DeWalt",name:"DeWalt Toolbox",cat:"کەرەستەی پیشەسازی",price:59000,img:"product-dewalt.jpg"},
{id:7,brand:"VELLOO",name:"دریلی کارەبایی",cat:"ئامرازی کارەبا",price:99000,img:"product-velloo.jpg"},
{id:8,brand:"P.H.Tools",name:"سێتی ئامرازی دەستی",cat:"ئامرازی دەستی",price:65000,img:"product-knauf.jpg"},
{id:9,brand:"P.H.Tools",name:"دەستکێشی پاراستن",cat:"پاراستن",price:12000,img:"product-safety.jpg"},
{id:10,brand:"Ronix",name:"ئامرازی پیشەسازی",cat:"کەرەستەی پیشەسازی",price:110000,img:"product-ronix.jpg"},
{id:11,brand:"VELLOO",name:"ئیمپەکتی پیشەیی",cat:"ئامرازی کارەبا",price:135000,img:"product-velloo.jpg"},
{id:12,brand:"KNAUF",name:"ترویل و ئامرازی دیوار",cat:"ئامرازی دەستی",price:30000,img:"product-knauf.jpg"}];

let cart=JSON.parse(localStorage.getItem("phtools-cart")||"[]"), query="", category="هەموو";
const grid=document.querySelector("#productGrid"), no=document.querySelector("#noResults"), count=document.querySelector("#cartCount"), cart=document.querySelector("#cart"), backdrop=document.querySelector("#backdrop"), body=document.querySelector("#cartBody"), totalEl=document.querySelector("#cartTotal"), toast=document.querySelector("#toast");

const money=n=>new Intl.NumberFormat("ku-IQ").format(n)+" د.ع";
function render(){
 let list=products.filter(p=>(category==="هەموو"||p.cat===category)&&`${p.name} ${p.brand} ${p.cat}`.toLowerCase().includes(query.toLowerCase()));
 grid.innerHTML=list.map(p=>`<article class="product-card"><span class="product-badge">پێشنیار</span><div class="product-photo"><img src="${p.img}" alt="${p.name}"></div><div class="product-info"><div class="brand-name">${p.brand}</div><div class="product-title">${p.name}</div><div class="stars">★★★★★</div><div class="price">${money(p.price)}</div><button class="add" data-add="${p.id}">زیادکردن بۆ سەبەتە</button></div></article>`).join("");
 no.hidden=list.length>0;
}
function renderCart(){
 const qty=cart.reduce((a,x)=>a+x.qty,0), total=cart.reduce((a,x)=>a+x.price*x.qty,0);
 count.textContent=qty; totalEl.textContent=money(total);
 body.innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><img src="${x.img}" alt=""><div><h4>${x.name}</h4><small>${money(x.price)}</small><div class="qty"><button data-q="${x.id}" data-d="-1">−</button><b>${x.qty}</b><button data-q="${x.id}" data-d="1">+</button></div></div><button data-r="${x.id}" style="border:0;background:none;color:#e11">×</button></div>`).join(""):`<div class="empty-cart">🛒<p>سەبەتەکەت بەتاڵە.</p></div>`;
 localStorage.setItem("phtools-cart",JSON.stringify(cart));
}
function show(t){toast.textContent=t;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2000)}
function openCart(){cart.classList.add("open");backdrop.classList.add("open")}
function closeCart(){cart.classList.remove("open");backdrop.classList.remove("open")}
document.querySelector("#cartOpen").onclick=openCart;document.querySelector("#cartClose").onclick=closeCart;backdrop.onclick=closeCart;

grid.onclick=e=>{const b=e.target.closest("[data-add]");if(!b)return;const p=products.find(x=>x.id==b.dataset.add), old=cart.find(x=>x.id==p.id);old?old.qty++:cart.push({...p,qty:1});renderCart();show("بەرهەمەکە خرایە سەبەتە.");};
body.onclick=e=>{const q=e.target.closest("[data-q]"),r=e.target.closest("[data-r]");if(q){const x=cart.find(i=>i.id==q.dataset.q);x.qty+=+q.dataset.d;if(x.qty<1)cart=cart.filter(i=>i.id!=x.id);renderCart()}if(r){cart=cart.filter(i=>i.id!=r.dataset.r);renderCart()}};

document.querySelector("#searchInput").oninput=e=>{query=e.target.value;render()};
document.querySelector("#searchButton").onclick=()=>document.querySelector(".search-box").classList.toggle("open");
document.querySelector("#showAll").onclick=()=>{category="هەموو";query="";document.querySelector("#searchInput").value="";render()};
document.querySelectorAll(".category-card").forEach(b=>b.onclick=()=>{category=b.dataset.category;document.querySelector("#products").scrollIntoView({behavior:"smooth"});render()});
document.querySelector(".mobile-toggle").onclick=()=>document.querySelector("#navBar").classList.toggle("open");
document.querySelector("#checkout").onclick=()=>show(cart.length?"داواکارییەکەت ئامادەی ناردنە. بۆ پارەدان backend پێویستە.":"سەبەتەکەت بەتاڵە.");

render();renderCart();
