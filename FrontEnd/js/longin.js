let login = document.getElementById('login');
login.addEventListener('submit', function(event) {
  event.preventDefault();  
    filterImagesByCategory(0); 
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
    if (!response.ok) {
      throw new Error('Identifiants incorrects');
    }
    return response.json();  // Convertit la réponse en objet JS
  })}  ) 







//   fetch('https://api.example.com/login', { // 🔁 Remplace par ton URL API
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, password })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Identifiants incorrects'); // Faux identifiants
//     }
//     return response.json();
//   })
//   .then(userData => {
//     // Stocke le token/localStorage
//     localStorage.setItem('userToken', userData.token);
//     localStorage.setItem('userId', userData.userId);

//     // Redirige vers la page d’accueil
//     window.location.href = 'index.html';
//   })
//   .catch(error => {
//     // Affiche le message d’erreur
//     errorMessage.textContent = error.message;
//   });
// });
  