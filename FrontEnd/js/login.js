document.addEventListener("DOMContentLoaded", () => {
  initLogin();
});

function initLogin() {

  const form = document.getElementById("loginform");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Reset erreurs
    emailError.style.display = "none";
    passwordError.style.display = "none";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        // identifiants incorrects
        emailError.style.display = "block";
        passwordError.style.display = "block";
        return;
      }

      const data = await response.json();

      // Stockage du token
      localStorage.setItem("token", data.token);

      // Redirection
      window.location.href = "index.html";

    } catch (error) {
      console.error("Erreur login :", error);
      alert("Erreur serveur. Réessayez plus tard.");
    }
  });
}