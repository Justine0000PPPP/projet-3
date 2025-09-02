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












//   .then(response => {
//     if (response.status !== 200) {
//       return response.json();
//       } else { 
//         const error = document.querySelector (".errorr");
//         error.style.display = "block";

//       throw new Error('Identifiants incorrects');
//     }
//   })   

//   .then((Data) => {
//     // Stocke le token/localStorage
//     localStorage.setItem("Token", data.token);
//     const error = document.querySelector (".errorr");
//     error.style.display = "none";
    
//     window.location.href = 'index.html';
//   })
//   .catch((error  ) =>  {
//     // Affiche le message d’erreur
//     console.error(error); 
//   });

//   const form = document.querySelector("form");
//   form.addEventListener ("submit", (e) => {
//     e.preventDefault ();
//     login (); 
  
// } ); 
//  }  )