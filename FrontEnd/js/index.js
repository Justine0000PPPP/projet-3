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

                const figcaptionModal = document.createElement('figcaption');
                figcaptionModal.textContent = work.title;

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.title = "Supprimer cette photo";

                const trashIcon = document.createElement('img');
                trashIcon.src = 'BacKend/images/Backend/images/yconepoubelle.jpg';    
                trashIcon.alt = 'Supprimer';
                trashIcon.style.width = '20px';
                trashIcon.style.height = '20px';

                deleteBtn.appendChild(trashIcon);
                deleteBtn.addEventListener('click', () => {
                    console.log("Supprimer id:", work.id);   
                    deleteimage(work.id, figureModal); 
                });

                figureModal.appendChild(imgModal);
                figureModal.appendChild(figcaptionModal);
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
}

// modal page 2
const fileInput = document.getElementById('fileInput');
const addPhotoBtn = document.getElementById('addphotobtn');
const previewImage = document.getElementById('previewImage');

addPhotoBtn.addEventListener('click', () => {
  fileInput.click();  // ouvre la boîte de dialogue fichier
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return; // pas de fichier sélectionné

  // Vérification du type MIME (jpg/jpeg/png)
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    alert("Format non supporté. Veuillez sélectionner un fichier JPG ou PNG.");
    fileInput.value = "";  // reset input
    return;
  }

  // Vérification taille max 4 Mo (4 * 1024 * 1024 octets)
  if (file.size > 4 * 1024 * 1024) {
    alert("Le fichier est trop lourd. La taille maximale est 4 Mo.");
    fileInput.value = "";  // reset input
    return;
  }

  // Afficher l'aperçu dans l'image
  const reader = new FileReader();
  reader.onload = e => {
    previewImage.src = e.target.result;
  };
  reader.readAsDataURL(file);

  // pour cahcer le input
  const addPhotoBtn = document.getElementById('addphotobtn');
const fileInput = document.getElementById('fileInput');

addPhotoBtn.addEventListener('click', () => {
  fileInput.click();  // ouvre la fenêtre de sélection des fichiers
});

  }
  );const selectElement = document.getElementById('categories');

  selectElement.addEventListener('click', fetchCategories);
  selectElement.addEventListener('focus', fetchCategories);

  } )


// ajout pour la validation a verifier 

const fileInput = document.getElementById('fileInput');
const titleInput = document.getElementById('titleInput'); // Assure-toi que c'est bien l'id de ton input titre
const selectCategory = document.getElementById('categories');
const submitBtn = document.getElementById('validateBtn');

submitBtn.disabled = true; // bouton désactivé au départ

function checkFormValidity() {
  const fileSelected = fileInput.files.length > 0;
  const titleFilled = titleInput.value.trim() !== '';
  const categorySelected = selectCategory.value !== '' && selectCategory.value !== 'all';

  if (fileSelected && titleFilled && categorySelected) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// Écouteurs sur tous les champs pour vérifier à chaque changement
fileInput.addEventListener('change', checkFormValidity);
titleInput.addEventListener('input', checkFormValidity);
selectCategory.addEventListener('change', checkFormValidity);




  