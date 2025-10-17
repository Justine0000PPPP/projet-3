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
          portfolioSection.appendChild(galleryDiv);

    });

  })
  .catch(console.error);



function createCategoryButtons(categories) {
  const filtresSection = document.getElementById('filtres');

  // Vide la section avant d'ajouter les boutons (optionnel)
  filtresSection.innerHTML = '';

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

// Récupération des catégories, création des boutons et des options dans le select
function fetchCategories() {
  fetch('http://localhost:5678/api/categories')
    .then(response => {
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      return response.json();
    })
    .then(categories => {
      createCategoryButtons(categories);
} )}


// Fonction filtre qui affiche/masque les works selon la catégorie sélectionnée
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


// Lancer la récupération des catégories pour créer les boutons et options
fetchCategories();



// /: parite loguot
 
// Fonction qui met à jour l'affichage en fonction de l'état de connexion
function vuetoken() {
  const token = localStorage.getItem('token');

  const loginBtn = document.getElementById('login');
  const logoutBtn = document.getElementById('logout');
  const barelogin = document.getElementById('barelogin');
  const filtres = document.getElementById('filtres');
  const ouvremodal = document.getElementById('ouvremodal');

  if (token) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'flex';
    barelogin.style.display = 'flex';
    filtres.style.display = 'none';
    ouvremodal.style.display = 'block';
  } else {
    loginBtn.style.display = 'flex';
    logoutBtn.style.display = 'none';
    barelogin.style.display = 'none';
    filtres.style.display = 'flex';
    ouvremodal.style.display = 'none';
  }
}

// Fonction logout qui supprime le token et met à jour l'interface
function logout() {
  const logoutBtn = document.getElementById('logout');

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    vuetoken(); 
  });
}

vuetoken();
logout();


