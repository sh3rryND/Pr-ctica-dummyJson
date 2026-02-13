const buscar = document.getElementById("buscador-producto");
const detalle = document.getElementById("detalle-producto");
const catalogo = document.getElementById("catalogo");

// Trae los productos de la api
fetch("https://dummyjson.com/products?limit=10")
.then(function(response) {
  return response.json();
})
.then(function(data) {

  data.products.forEach(function(producto) {

    // se crea la tarjeta
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3 class="titulo">${producto.title}</h3>
      <img data-id="${producto.id}" src="${producto.thumbnail}" alt="${producto.title}" width="150">
      <p class="Precio">Precio: $${producto.price}</p>
      <p class="Categoria">Categoría: ${producto.category}</p>
      <p class="Raiting">Rating: ${producto.rating}</p>
      <p class="Stock">Stock: ${producto.stock}</p>
    `;

    catalogo.appendChild(card);
  });

 
  catalogo.addEventListener("click", function(e) {

    if (e.target.tagName === "IMG") {

      const producto = data.products.find(p => p.thumbnail === e.target.src);

      detalle.innerHTML = `
        <h2>Detalle del Producto</h2>
        <table border="1" cellpadding="5">
          <tr><th>Título</th><td>${producto.title}</td></tr>
          <tr>
            <th>Imagen</th>
            <td><img src="${producto.thumbnail}" width="150"></td>
          </tr>
          <tr><th>Descripción</th><td>${producto.description}</td></tr>
          <tr><th>Precio</th><td>$${producto.price}</td></tr>
          <tr><th>Marca</th><td>${producto.brand}</td></tr>
          <tr><th>Categoría</th><td>${producto.category}</td></tr>
          <tr><th>Rating</th><td>${producto.rating}</td></tr>
          <tr><th>Stock</th><td>${producto.stock}</td></tr>
        </table>
      `;

      detalle.scrollIntoView({ behavior: "smooth" });
    }
  });
});

buscar.addEventListener("keyup", function() {
  const texto = buscar.value.toLowerCase();
  const tarjetas = document.querySelectorAll(".card");

  tarjetas.forEach(function(card) {
    const titulo = card.querySelector(".titulo").textContent.toLowerCase();
    const categoria = card.querySelector(".Categoria").textContent.toLowerCase();

    card.style.display =
      titulo.includes(texto) || categoria.includes(texto)
        ? "block"
        : "none";
  });
});