// pour genérer les images et leur texste
  
       fetch('http://localhost:5678/api/works')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur HTTP ' + response.status);
        }
        return response.json(); // Convertir la réponse en JSON
      })
      .then(data => {
        console.log(data); // Affiche les données reçues dans la console

        // Cibler la section existante dans  HTML
        const portfolioSection = document.getElementById('portfolio');

        //  Créer la div.gallery
        const galleryDiv = document.createElement('div');
        galleryDiv.classList.add('gallery');

        // Parcourir chaque œuvre reçue
        data.forEach(work => {
          // Création de la figure
          const figure = document.createElement('figure');
          figure.setAttribute('data-category-id', work.category.id); // Important pour filtrer

          const img = document.createElement('img');
          img.src = work.imageUrl;
          img.alt = work.title;

          const figcaption = document.createElement('figcaption');
          figcaption.textContent = work.title;

          // Ajouter image + légende dans figure
          figure.appendChild(img);
          figure.appendChild(figcaption);

          // Ajouter la figure à la div.gallery
          galleryDiv.appendChild(figure);
        });

      //  Ajouter la div.gallery à la section portfolio
      portfolioSection.appendChild(galleryDiv);
    }); 


// mise enplace des filtres 
// apelle fetch pour les filtres 

  function fetchCategories() {
  fetch('http://localhost:5678/api/categories')
    .then(response => {
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      return response.json();
    })
    .then(categories => {
      createCategoryButtons(categories);
    })
    .catch(error => {
      console.error('Erreur lors du chargement des catégories:', error);
    });
}

  // Mise enplace des bouttons

  // function createCategoryButtons() {
  //   const filtresSection = document.getElementById('filtres');
  //   filtresSection.innerHTML = ''; // vide avant d'ajouter les boutons

  //   // Bouton "Tous"
  //   const btnAll = document.createElement('button');
  //   btnAll.textContent = "Tous";
  //   btnAll.dataset.categoryId = 0;
  //   btnAll.addEventListener('click', () => {
  //     fetchCategories();
  //   });
  //   filtresSection.appendChild(btnAll);

  //   // Bouton "Objets"
  //   const btnObjets = document.createElement('button');
  //   btnObjets.textContent = "Objets";
  //   btnObjets.dataset.categoryId = 1;  
  //   btnObjets.addEventListener('click', () => {
  //     fetchCategories();
  //   });
  //   filtresSection.appendChild(btnObjets);

  //   // Bouton "Appartement"
  //   const btnAppartement = document.createElement('button');
  //   btnAppartement.textContent = "Appartement";
  //   btnAppartement.dataset.categoryId = 2; 
  //   btnAppartement.addEventListener('click', () => {
  //     fetchCategories();
  //   });
  //   filtresSection.appendChild(btnAppartement);

  //   // Bouton "Hotels restaurant"
  //   const btnHotelsrestau = document.createElement('button');
  //   btnHotelsrestau.textContent = "Hotels restaurant";
  //   btnHotelsrestau.dataset.categoryId = 3; 
  //   btnHotelsrestau.addEventListener('click', () => {
  //     fetchCategories();
  //   });
  //   filtresSection.appendChild(btnHotelsrestau);
  // }


function createCategoryButtons(categories) {
  const filtresSection = document.getElementById('filtres');

  // Supprimer tous les anciens boutons sauf le bouton "Tous"
  const boutons = filtresSection.querySelectorAll('button');
  boutons.forEach(btn => {
    if (btn.id !== 'btn-tous') {
      btn.remove();
    }
  });

  // Ajouter les boutons à partir des catégories récupérées
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category.name;
    btn.dataset.categoryId = category.id;

    btn.addEventListener('click', () => {
      fetchCategories()
    });

    filtresSection.appendChild(btn);
  });
}

