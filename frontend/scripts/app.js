import { fetchAPI } from "./api.js";
document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const productosContainer = document.getElementById("productos-container");
  const carritoItems = document.getElementById("carrito-items");
  const totalElement = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Estado del carrito
  let carrito = [];

  // Cargar productos desde el backend
  async function cargarProductos() {
    try {
      const respuesta = await fetchAPI("/api/productos");
      console.log("Respuesta del API:", respuesta); // ← Añade esto
      const productos = Array.isArray(respuesta)
        ? respuesta
        : respuesta.data || respuesta.productos || [];
      console.log("Productos a renderizar:", productos);
      renderProductos(productos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  // Renderizar productos
  function renderProductos(productos) {
    productosContainer.innerHTML = productos
      .map((producto) => {
        // Asegúrate que los campos existan
        const id = producto.Id || producto.ID || producto.productoId;
        const nombre =
          producto.nombre || producto.NombreProducto || "Sin nombre";
        const precio = producto.precio || producto.PrecioUnitario || 0;
        const stock = producto.Existencia || producto.stock || 0;

        return `
        <div class="producto-card" data-id="${id}">
          <h3>${nombre}</h3>
          <p>$${precio.toFixed(2)}</p>
          <p>Stock: ${stock}</p>
        </div>
      `;
      })
      .join("");

    // Eventos para agregar al carrito
    document.querySelectorAll(".producto-card").forEach((card) => {
      card.addEventListener("click", () =>
        agregarAlCarrito(
          parseInt(card.dataset.id),
          card.querySelector("h3").textContent,
          parseFloat(card.querySelector("p").textContent.replace("$", ""))
        )
      );
    });
  }

  // Agregar producto al carrito
  function agregarAlCarrito(id, nombre, precio) {
    const itemExistente = carrito.find((item) => item.id === id);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    renderCarrito();
  }

  // Renderizar carrito
  function renderCarrito() {
    carritoItems.innerHTML = carrito
      .map(
        (item) => `
        <div class="carrito-item">
          <span>${item.nombre} x${item.cantidad}</span>
          <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
      `
      )
      .join("");

    // Calcular total
    const total = carrito.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  // Evento para finalizar venta
  checkoutBtn.addEventListener("click", async () => {
    if (carrito.length === 0) return;

    try {
      const ventaData = {
        productos: carrito.map((item) => ({
          productoId: item.id,
          cantidad: item.cantidad,
          precioUnitario: item.precio,
        })),
      };

      const respuesta = await fetchAPI("/api/ventas", "POST", ventaData);
      alert(`Venta registrada con ID: ${respuesta.ventaId}`);
      carrito = [];
      renderCarrito();
      cargarProductos(); // Actualizar stock
    } catch (error) {
      console.error("Error al registrar venta:", error);
      alert("Error al procesar la venta");
    }
  });

  // Inicializar
  cargarProductos();
});

document.getElementById("search").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const productos = document.querySelectorAll(".producto-card");

  productos.forEach((producto) => {
    const nombre = producto.querySelector("h3").textContent.toLowerCase();
    producto.style.display = nombre.includes(term) ? "block" : "none";
  });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "../../frontend/login.html";
});
