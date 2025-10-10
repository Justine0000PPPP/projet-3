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

      // === AJOUT options dans le select ===
      const select = document.getElementById('categories');
      if (select) {
        select.innerHTML = ''; // vide les options existantes

        const optionAll = document.createElement('option');
        optionAll.value = 'all';
        optionAll.textContent = 'Tous';
        select.appendChild(optionAll);

        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          select.appendChild(option);
        });
      }
    })
    .catch(console.error);
}

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

// Ajout de l'écouteur sur le select pour filtrer au changement
const selectElement = document.getElementById('categories');
if (selectElement) {
  selectElement.addEventListener('change', () => {
    filterWorks(selectElement.value);
  });
}

// Lancer la récupération des catégories pour créer les boutons et options
fetchCategories();







// parite modal 

let modal = null;  // variable globale pour la modal active
document.addEventListener('DOMContentLoaded', () => {

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



// Ajout des écouteurs sur tous les liens qui ouvrent la modal
document.querySelectorAll('.js-modal').forEach(link => {
  link.addEventListener('click', openmodal);
});



// Gestion de l'apparition des pages dans la modal
const page1 = document.getElementById('modal-page1');
const page2 = document.getElementById('modal-page2');


document.getElementById('ajouterphoto').addEventListener('click', () => {
    page1.style.display = 'none';      
    page2.style.display = 'block'; 
});

// Retour dans la modal
document.getElementById('retourp2').addEventListener('click', () => { 
    page1.style.display = 'block';      
    page2.style.display = 'none'; 

});
// /: parite loguot

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


const token = localStorage.getItem('token');

  const loginBtn = document.getElementById('login');
  const barelogin = document.getElementById('barelogin');
  const filtres = document.getElementById('filtres');
  const ouvremodal = document.getElementById('ouvremodal');

  if (token) {
    // Utilisateur connecté
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    barelogin.style.display = 'flex';
    filtres.style.display = 'none';  // cacher les filtres quand connecté
    ouvremodal.style.display = 'block';
  } else {
    // Utilisateur déconnecté
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    barelogin.style.display = 'none';
    filtres.style.display = 'flex'; // afficher les filtres quand déconnecté
    ouvremodal.style.display = 'none';
  }
logout()

  



//  modal page 1

// Fonction pour récupérer et afficher les images dans la modal
function fetchimage() { 
    fetch('http://localhost:5678/api/works')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const photomodalSection = document.getElementById('photomodal');

            // Vider le contenu avant d'ajouter (pour éviter duplication)
            photomodalSection.innerHTML = '';

            const galleryDivModal = document.createElement('div');
            galleryDivModal.classList.add('gallery-modal');

            data.forEach(work => {
                const figureModal = document.createElement('figure');
                figureModal.setAttribute('data-category-id', work.category.id);

                const imgModal = document.createElement('img');
                imgModal.src = work.imageUrl;
                imgModal.alt = work.title;
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.title = "Supprimer cette photo";

                const trashIcon = document.createElement('img');
                trashIcon.src = './assets/images/icone-poubelle.webp';    
                trashIcon.alt = 'Supprimer';
                trashIcon.style.width = '20px';
                trashIcon.style.height = '20px';

                deleteBtn.appendChild(trashIcon);
                deleteBtn.addEventListener('click', () => {
                    console.log("Supprimer id:", work.id);   
                    deleteimage(work.id, figureModal); 
                });

                figureModal.appendChild(imgModal);
                // On enlève l'ajout du figcaption
                // figureModal.appendChild(figcaptionModal);
                figureModal.appendChild(deleteBtn);

                galleryDivModal.appendChild(figureModal);
            });

            photomodalSection.appendChild(galleryDivModal);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des images:', error);
        });
}



// Fonction pour supprimer une image (requête DELETE)
function deleteimage(id, figureElement) {  
    const token = localStorage.getItem('token'); // Nécessaire pour l'authentification

    if (!token) {
        alert("Vous devez être connecté pour supprimer une image.");
        return;
    }

    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur HTTP ' + response.status);
        }
        // console.log('Work supprimé'); 
        figureElement.remove(); // Retire du DOM
    })      
    .catch(error => {
        console.error('Erreur de suppression', error);         
    });
}} )

// modal page 2

    const fileInput = document.getElementById('fileInput');      
    const addPhotoBtn = document.getElementById('addphotobtn');    
    const previewImage = document.getElementById('previewImage');  
    const titreInput = document.getElementById('titre');
    const categoriesSelect = document.getElementById('categories');
    const validateBtn = document.getElementById('validateBtn');
    function addimages() {

    // 2. Lorsqu'on clique sur le bouton visible, on simule un clic sur l'input caché
    addPhotoBtn.addEventListener('click', () => {
      fileInput.click(); // Ceci ouvre la fenêtre native de sélection de fichiers
    });

    // 3. Quand l'utilisateur sélectionne un fichier
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0]; // Récupère le premier fichier sélectionné

      // --- Vérifications de base ---
      if (!file) {
        alert("Aucun fichier sélectionné.");
        return;
      }

      // 3.1 Vérification du type MIME : uniquement PNG, JPG ou 
      const validTypes = ['image/png', 'image/jpg']; // Types autorisés
      if (!validTypes.includes(file.type)) {
        alert("Seules les images PNG ou JPG sont autorisées.");
        fileInput.value = ""; // Réinitialise l'input
        return;
      }

      // 3.2 Vérification de la taille : max 2 Ko (2048 octets)
      const maxSize = 4 * 1024 * 1024;  // 4mo max
      if (file.size > maxSize) {
        alert("L'image ne doit pas dépasser 2 Ko.");
        fileInput.value = ""; // Réinitialise l'input
        return;
      }

      // --- Si tout est bon, on prévisualise l'image ---

      // Crée une URL temporaire (blob) pour afficher l'image dans le navigateur
      const imageUrl = URL.createObjectURL(file);
  // Supprime l'icône si elle est présente
  const icon = document.querySelector('.upload-box i');
  if (icon) {
    icon.style.display = 'none';
  }

  // Vérifie si une balise <img id="previewImage"> existe déjà, sinon la créer
  let previewImage = document.getElementById('previewImage');
  if (!previewImage) {
    previewImage = document.createElement('img');
    previewImage.id = 'previewImage';
    previewImage.style.maxHeight = '200px';
    previewImage.style.objectFit = 'contain';
    previewImage.style.margin = '10px auto';
    previewImage.style.display = 'block';

    // L'insère dans .upload-box juste avant le <p>
    const uploadBox = document.querySelector('.upload-box');
    const fileInfo = uploadBox.querySelector('.file-info');
    uploadBox.insertBefore(previewImage, fileInfo);
  }

  // Met à jour la source de l'image de prévisualisation
  previewImage.src = imageUrl;


      // Applique l'image comme fond du bouton pour un effet visuel
      addPhotoBtn.style.backgroundImage = `url(${imageUrl})`;
      addPhotoBtn.style.backgroundSize = 'cover';
      addPhotoBtn.style.backgroundPosition = 'center';
      addPhotoBtn.style.color = 'transparent'; // Cache le texte du bouton

      // Optionnel : effet visuel pour indiquer que c’est chargé
      addPhotoBtn.style.opacity = '0.8';

      // Optionnel : désactive le bouton pour éviter un second clic sans validation
      addPhotoBtn.disabled = true;
    });}
    addimages()

// pour valider 

 
function validée() {
  const previewImage = document.getElementById('previewImage'); // Assure-toi que l'image de prévisualisation a bien cet ID
  // Vérifie que l'image a bien été chargée (et que ce n'est plus juste une icône)
  const LoadedImage = previewImage && previewImage.src && previewImage.src.startsWith('blob:');

  // Vérifie que le titre n'est pas vide
  const LoadedTitre = titreInput.value.trim().length > 0;

  // Vérifie qu'une catégorie autre que 'tous' ou vide est sélectionnée
  const CategorySelected = categoriesSelect.value !== 'tous' && categoriesSelect.value !== '';

  if (LoadedImage && LoadedTitre && CategorySelected) {
    validateBtn.disabled = false;            // Active le bouton (clic possible)
    validateBtn.style.backgroundColor = 'green';  // Change la couleur en vert
  } else {
    validateBtn.disabled = true;             // Désactive le bouton (clic impossible)
    validateBtn.style.backgroundColor = 'grey';   // Couleur grise pour montrer désactivé
  }
}

// Ajoute des écouteurs pour vérifier le formulaire à chaque changement
titreInput.addEventListener('input', validée);
categoriesSelect.addEventListener('change', validée);
validée()




// a comprendre si la futniton validée recuperbienles champ pour les sumaitre voir commentlier ca a api danslapelle fetch






// apelle a api au clik 
function fetchValidée() {
  fetch('http://localhost:5678/api/categories')
    .then(response => {
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      return response.json();
    })
    .then
    }