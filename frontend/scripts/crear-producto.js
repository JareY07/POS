import { fetchAPI } from "./api.js";

document
  .getElementById("form-producto")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const btnSubmit = e.target.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Guardando...";

    try {
      const producto = {
        nombreProducto: document.getElementById("nombre").value,
        precioUnitario: parseFloat(document.getElementById("precio").value),
        existencia: parseInt(document.getElementById("existencia").value),
        codigoBarras: document.getElementById("codigo").value || undefined,
      };

      const response = await fetchAPI("/api/productos", "POST", producto);

      alert(`Producto creado con ID: ${response.producto.id}`);
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.textContent = "Guardar Producto";
    }
  });
