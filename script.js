       // Lista inicial de produtos
       let products = JSON.parse(localStorage.getItem("products")) || [
           { id: 1, name: "Produto 1", price: 50, img: "img/produto1.jpg" },
           { id: 2, name: "Produto 2", price: 75, img: "img/produto2.jpg" },
           { id: 3, name: "Produto 3", price: 100, img: "img/produto3.jpg" }
       ];
       // Função para mostrar a página correspondente
       function showPage(page) {
           document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
           document.getElementById(page).classList.add("active");
       }
       // Carregar a lista de produtos na página de produtos
       function loadProducts() {
           let productList = document.getElementById("product-list");
           productList.innerHTML = "";
           products.forEach(product => {
               let div = document.createElement("div");
               div.classList.add("product");
               div.innerHTML = `
<img src="${product.img}" alt="${product.name}">
<h3>${product.name}</h3>
<p>R$ ${product.price},00</p>
<button onclick="addToCart(${product.id})">Comprar</button>
               `;
               productList.appendChild(div);
           });
       }
       // Função para adicionar um produto ao carrinho
       function addToCart(id) {
           let cart = JSON.parse(localStorage.getItem("cart")) || [];
           let product = products.find(p => p.id === id);
           cart.push(product);
           localStorage.setItem("cart", JSON.stringify(cart));
           alert(product.name + " adicionado ao carrinho!");
           loadCart(); // Atualiza o carrinho na tela
       }
       // Carregar os produtos no carrinho
       function loadCart() {
           let cart = JSON.parse(localStorage.getItem("cart")) || [];
           let cartList = document.getElementById("cart-items");
           cartList.innerHTML = "";
           cart.forEach(item => {
               let li = document.createElement("li");
               li.textContent = `${item.name} - R$ ${item.price}`;
               cartList.appendChild(li);
           });
       }
       // Finalizar compra
       function finalizePurchase(method) {
           alert("Compra finalizada com " + method + "!");
           localStorage.removeItem("cart");
           loadCart();
           showPage('home');
       }
       // Função para adicionar um novo produto via painel de administração
       function addProduct() {
           let name = document.getElementById("admin-name").value;
           let price = document.getElementById("admin-price").value;
           let img = document.getElementById("admin-img").value;
           let newProduct = { id: products.length + 1, name, price, img };
           products.push(newProduct);
           localStorage.setItem("products", JSON.stringify(products));
           loadProducts();
           alert("Produto adicionado!");
       }
       // Carregar os dados quando a página for carregada
       window.onload = function() {
           loadProducts();
           loadCart();
       };