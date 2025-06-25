// scripts/login.js
import { fetchAPI } from "./api.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Mostrar estado de carga
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = "<span>Verificando...</span>";
  btn.disabled = true;

  try {
    const response = await fetchAPI("/api/auth/login", "POST", {
      email,
      password,
    });

    if (!response.token) {
      throw new Error("El servidor no devolvió un token válido");
    }

    // Guardar token y datos de usuario
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user || { email }));

    // Redirigir al dashboard
    window.location.href = "../../frontend/index.html";
  } catch (error) {
    // Mostrar error al usuario
    const errorElement =
      document.getElementById("login-error") || createErrorElement();
    errorElement.textContent = error.message.includes("Failed to fetch")
      ? "No se pudo conectar al servidor"
      : error.message;

    console.error("Error en login:", error);
  } finally {
    // Restaurar botón
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
});

function createErrorElement() {
  const element = document.createElement("div");
  element.id = "login-error";
  element.style.color = "#e63946";
  element.style.marginTop = "15px";
  element.style.textAlign = "center";
  document.getElementById("login-form").appendChild(element);
  return element;
}
