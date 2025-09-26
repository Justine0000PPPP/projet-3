// Récupération des works et affichage
fetch('http://localhost:5678/api/works')
  .then(response => {
    if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
    return response.json();
  })
  .then(data => {
    const portfolioSection = document.getElementById('portfolio');
    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('gallery');

    data.forEach(work => {
      const figure = document.createElement('figure');
      figure.setAttribute('data-category-id', work.category.id);

      const img = document.createElement('img');
      img.src = work.imageUrl;
      img.alt = work.title;

      const figcaption = document.createElement('figcaption');
      figcaption.textContent = work.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);

      galleryDiv.appendChild(figure);
    });

    portfolioSection.appendChild(galleryDiv);
  })
  .catch(console.error);



// Récupération des catégories et création des boutons
function fetchCategories() {
  fetch('http://localhost:5678/api/categories')
    .then(response => {
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      return response.json();
    })
    .then(categories => {
      createCategoryButtons(categories);
    })
    .catch(console.error);
}
// creation des bouttons
function createCategoryButtons(categories) {
  const filtresSection = document.getElementById('filtres');


  // Bouton "Tous"
  const btnAll = document.createElement('button');
  btnAll.textContent = "Tous";
  btnAll.dataset.categoryId = 'all';
  btnAll.addEventListener('click', () => filterWorks('all'));
  filtresSection.appendChild(btnAll);

  // Boutons par catégories
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category.name;
    btn.dataset.categoryId = category.id;
    btn.addEventListener('click', () => filterWorks(category.id));
    filtresSection.appendChild(btn);
  });
}

// Fonction filtre
function filterWorks(categoryId) {
  const allFigures = document.querySelectorAll('#portfolio .gallery figure');

  allFigures.forEach(figure => {
    const figureCatId = figure.getAttribute('data-category-id');

    if (categoryId === 'all' || figureCatId == categoryId) {
      figure.style.display = 'block'; // afficher
    } else {
      figure.style.display = 'none'; // cacher
    }
  });
}

// Lancer la récupération des catégories pour créer les boutons
fetchCategories();