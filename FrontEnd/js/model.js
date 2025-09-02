

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


    // géré les filtres
const filtresSection = document.getElementById('filtres');  
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    categories.forEach(category => {
      const button = document.createElement('button');
      button.textContent = category.name;            
      button.setAttribute('data-id', category.id);      
    filtresSection.appendChild(button);                // Ajoute le bouton à la section filtres
    button.setAttribute('data-id', category.id); // Stocke l'id de la catégorie dans un attribut data-id du bouton
    button.addEventListener('click', () => {
  // Ici tu mettras la fonction qui filtrera les images selon category.id
  filterImagesByCategory(category.id);
});
});
const btntous = document.createElement('button');
    btntous.textContent = 'tous';
    filtresSection.appendChild(btntous);   
    btntous.addEventListener('click', () => {
    filterImagesByCategory(0);
        }); 

    
  });

  // Fonction pour filtrer les images selon l'id de catégorie  

function filterImagesByCategory(categoryId) {
  // Sélectionner toutes les figures (tes images dans la galerie)
  const allFigures = document.querySelectorAll('.gallery figure');

  allFigures.forEach(figure => {
      const figureCategoryId = figure.getAttribute('data-category-id');

    if (categoryId === 0 || figureCategoryId == categoryId) {
      figure.style.display = 'block';  // Affiche la figure si la catégorie correspond ou si id = 0 (Tous)
    } else {
      figure.style.display = 'none';   // Cache la figure sinon
    }   
      });
}
// oublie pas de recomprende tous le code plus maitre sur github 

 