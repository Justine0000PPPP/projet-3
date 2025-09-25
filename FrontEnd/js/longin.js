function loginbtn() { 
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
}); }


// Cibler le bouton logout
function logoutBtn() {
const logoutBtn = document.getElementById('logout');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // Supprimer le token
    localStorage.removeItem('token');

  });
 }}









 document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const Login = document.getElementById('login');
  const Logout = document.getElementById('logout');
  const barelogin = document.getElementById('barelogin');

  if (token) {
    // Utilisateur connecté : afficher logout, cacher login
    Login.style.display = 'none';
    Logout.style.display = 'block';
    barelogin.style.display = 'block';
  } else {
    // Pas connecté : afficher login, cacher logout
    Login.style.display = 'block';
    Logout.style.display = 'none';
      barelogin.style.display = 'none';
  }

  // Gestion du clic sur logout
  if (logout) {
    logout.addEventListener('click', () => {
      localStorage.removeItem('token');
      // rafraîchir la page pour mettre à jour l'affichage
      window.location.reload();
    });
  }

   }
);


