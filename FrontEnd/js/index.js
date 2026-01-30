// Déclaration globale pour la modal
let modal = null;

async function works() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (!response.ok) throw new Error('Erreur HTTP ' + response.status);

    const data = await response.json();

    const portfolioSection = document.getElementById('portfolio');
    const photomodalSection = document.getElementById('photomodal');

    // Supprime l'ancienne galerie principale si elle existe
    const oldGallery = portfolioSection.querySelector('.gallery');
    if (oldGallery) oldGallery.remove();

    // Supprime l'ancienne galerie de la modal si elle existe
    const oldModalGallery = photomodalSection.querySelector('.gallery-modal');
    if (oldModalGallery) oldModalGallery.remove();

    // 🌟 Création de la galerie principale
    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('gallery');

    // 🌟 Création de la galerie modal page 1
    const galleryDivModal = document.createElement('div');
    galleryDivModal.classList.add('gallery-modal');

    data.forEach(work => {
      // Galerie principale
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

      // Galerie modal
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
        deleteimage(work.id, figureModal);
      });

      figureModal.appendChild(imgModal);
      figureModal.appendChild(deleteBtn);

      galleryDivModal.appendChild(figureModal);
    });

    portfolioSection.appendChild(galleryDiv);
    photomodalSection.appendChild(galleryDivModal);

    return data; // utile si tu veux filtrer ensuite
  } catch (error) {
    console.error('Erreur lors de la récupération des works :', error);
  }
}

// Appel initial
works();

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
   .then(async response => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Réponse API :", errorText);
    throw new Error(errorText);
  }
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



// Fonction pour ouvrir la modal
function openmodal(e) {
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
}

// Fonction pour fermer la modal si clic sur le fond
function closemodal(e) {
  if (e.target === modal) {
    modal.style.display = "none";
    modal = null;
  }
}

    // Fonction pour fermer la modal directement (bouton croix)
    function fermerModal() {
    if (modal) {
        modal.style.display = "none";
        modal = null;
    }
    }

    // Ajout des écouteurs sur les éléments qui ouvrent la modal
    document.querySelectorAll('.js-modal').forEach(link => {
    link.addEventListener('click', openmodal);
    });

    // Ajout de l'écouteur pour fermer la modal avec le bouton "sortie"
    const boutonsSortie = [document.getElementById('sortiep1'), document.getElementById('sortiep2')];

// Ajoute l'écouteur à chacun s'il existe
boutonsSortie.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', fermerModal);
  }
});

    // Gestion de l'apparition des pages dans la modal
    const page1 = document.getElementById('modal-page1');
    const page2 = document.getElementById('modal-page2');


    document.getElementById('ajouterphoto').addEventListener('click', () => {
        page1.style.display = 'none';      
        page2.style.display = 'block'; 
        fetchselect();
    });

    // Retour dans la modal
    document.getElementById('retourp2').addEventListener('click', () => { 
        page1.style.display = 'block';      
        page2.style.display = 'none'; 

    });

  


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
  console.error("Erreur API détaillée :", error.message);
  alert(error.message);
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
        figureElement.remove();
        works();
        filterWorks();
    })      
    .catch(error => {
        console.error('Erreur de suppression', error);         
    });
}

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


      if (!file) {
        alert("Aucun fichier sélectionné.");
        return;
      }
const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if (!validTypes.includes(file.type)) {
        alert("Seules les images PNG ou JPG sont autorisées.");
        fileInput.value = "";         return;
      }
      const maxSize = 4 * 1024 * 1024;  
      if (file.size > maxSize) {
        alert("L'image ne doit pas dépasser 2 Ko.");
        fileInput.value = ""; 
        return;
      }

  
      const imageUrl = URL.createObjectURL(file);
  
  const icon = document.querySelector('.upload-box i');
  if (icon) {
    icon.style.display = 'none';
  }
  let previewImage = document.getElementById('previewImage');
  if (!previewImage) {
    previewImage = document.createElement('img');
    previewImage.id = 'previewImage';

    const uploadBox = document.querySelector('.upload-box');
    const fileInfo = uploadBox.querySelector('.file-info');
    uploadBox.insertBefore(previewImage, fileInfo);
  }
  previewImage.src = imageUrl;


      addPhotoBtn.style.backgroundImage = `url(${imageUrl})`;
      addPhotoBtn.style.backgroundSize = 'cover';
      addPhotoBtn.style.backgroundPosition = 'center';
      addPhotoBtn.style.color = 'transparent'; // Cache le texte du bouton

      addPhotoBtn.style.opacity = '0.8';

      addPhotoBtn.disabled = true;
    });}
    addimages()


function fetchselect() {
  fetch('http://localhost:5678/api/categories')
    .then(response => {
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      return response.json();
    })
    .then(categories => {
    
    
      const select = document.getElementById('categories');


        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          select.appendChild(option);
        });
    
     
} )}
 



function validée() {
  const previewImage = document.getElementById('previewImage'); 
  const LoadedImage = previewImage && previewImage.src && previewImage.src.startsWith('blob:');
  const LoadedTitre = titreInput.value.trim().length > 0;
  const CategorySelected = categoriesSelect.value !== '' && categoriesSelect.value.toLowerCase() !== 'choisir une catégorie';

if (LoadedImage && LoadedTitre && CategorySelected) {
  validateBtn.disabled = false;
  validateBtn.style.backgroundColor = 'green';

} else {
  validateBtn.disabled = true;
  validateBtn.style.backgroundColor = 'grey';

}
}

titreInput.addEventListener('input', validée);
categoriesSelect.addEventListener('change', validée);
validée();



function fetchValidée() {
  const file = fileInput.files[0]; 
  const title = titreInput.value.trim();
  const category = categoriesSelect.value;
  const token = localStorage.getItem('token');  

  if (!file || !title || !category || category === 'all') {
    alert("Tous les champs doivent être remplis.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
formData.append("category", Number(category));

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}` // Auth avec token
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'image.");
      }
      return response.json();
    })
.then(data => {
  console.log("Image ajoutée :", data);
  alert("Photo ajoutée avec succès !");

  fetchimage();   // 🔹 recharge la galerie de la modal
  works();        // 🔥 recharge la galerie PRINCIPALE
  fermerModal();  // 🔥 ferme la modal et retour page principale

  document.querySelector('.form-section').reset();
  const preview = document.getElementById('previewImage');
  if (preview) preview.remove();
  document.querySelector('.upload-box i').style.display = 'block';
  addPhotoBtn.disabled = false;
  addPhotoBtn.style = "";
})
.catch(error => {
  console.error("Erreur API :", error);
  alert("Erreur lors de l'ajout (voir console)");
});
}


document.getElementById('validateBtn').addEventListener('click', fetchValidée);


