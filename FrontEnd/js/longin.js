let login = document.getElementById('loginform');
login.addEventListener('submit', function(event) {
  event.preventDefault();  
  //  Récupération des valeurs des champs
    const email = document.getElementById('email').value;  
  const password = document.getElementById('password').value;

  //  Construction des données à envoyer
  const data = {
    email: email, 
    password: password
  };


  //  Envoi des données via fetch
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)  // transforme en JSON avant d’envoyer
  }) 
  
  .then(response => {
    if (response.status === 200) { 
        return response.json(); 
    } else  
      { throw new Error("identifient n nul");
       }
  })     
  .then(data => {
    // Enregistrer le token dans le localStorage
    localStorage.setItem('token', data.token);

    // Rediriger vers index.html
    window.location.href = 'index.html';
    })
  .catch(error => {
    //  Affichage du message d'erreur dans la page
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
      errorDiv.textContent = error.message;
      errorDiv.style.display = 'block';
    } else {
      alert(error.message); 
    }
  });
});



// pour ouvrire la modal que quand on est login 






// Pour ouvrire la modal 
  const openmodal = function(e) {
  e.preventDefault();

  // Récupérer la modal cible via data-target
  const target = document.querySelector(e.currentTarget.getAttribute('data-target'));

  if (!target) return; // sécurité si cible introuvable

  target.style.display = "flex";
  modal = target;

  // Fermer la modal si clic en dehors du contenu
  modal.addEventListener('click', closemodal);

  // Appelle ta fonction pour charger les images (à garder si tu veux)
  fetchimage();
};

// Fonction pour fermer la modal si clic en dehors du contenu
const closemodal = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
    modal = null;
  }
};




function logout() {
  localStorage.removeItem('token');  // Supprime le token
  window.location.href = indexp3.html 
}
document.getElementById('logout').addEventListener('click', logout); 
