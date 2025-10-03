
 document.addEventListener('DOMContentLoaded', () => {
function loginbtn() { 
let login = document.getElementById('loginform');
login.addEventListener('submit', async(event) => {
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
loginbtn()


// Cibler le bouton logout 
// function logout() {
const logoutBtn = document.getElementById('logout');

 
  logoutBtn.addEventListener('click', async() => {
    // Supprimer le token
    localStorage.removeItem('token');
     loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    barelogin.style.display = 'none';
    filtres.style.display = 'block'; // afficher les filtres quand déconnecté
  ouvremodal.style.display = 'none';

  });
//  }




const token = localStorage.getItem('token');

  const loginBtn = document.getElementById('login');
  const barelogin = document.getElementById('barelogin');
  const filtres = document.getElementById('filtres');
  const ouvremodal = document.getElementById('ouvremodal');

  if (token) {
    // Utilisateur connecté
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    barelogin.style.display = 'block';
    filtres.style.display = 'none';  // cacher les filtres quand connecté
    ouvremodal.style.display = 'block';
  } else {
    // Utilisateur déconnecté
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    barelogin.style.display = 'none';
    filtres.style.display = 'block'; // afficher les filtres quand déconnecté
  ouvremodal.style.display = 'none';
  }
logout()
    });
  
