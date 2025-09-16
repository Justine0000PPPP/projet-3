let modal = null;  // variable globale pour la modal active

const openmodal = function(e) {
    e.preventDefault();

    // Vérifier la présence du token (indique si connecté)
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Vous devez être connecté pour ouvrir cette fenêtre.");
        return;  // Bloque l'ouverture de la modal si pas connecté
    }

    // Récupérer la modal cible via l'attribut href du lien
    const target = document.querySelector(e.target.getAttribute('href'));
    if (!target) return; // sécurité si cible introuvable

    target.style.display = "flex";
    modal = target;

    // Fermer la modal si clic en dehors du contenu
    modal.addEventListener('click', closemodal);

    // Charger les images dans la modal (fonction existante)
    fetchimage();
};

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
const page3 = document.getElementById('modal-page3');

document.getElementById('ajouterphoto').addEventListener('click', () => {
    page1.style.display = 'none';      
    page2.style.display = 'block'; 
});

document.getElementById('ajouterphotop2').addEventListener('click', () => {
    page2.style.display = 'none';  
    page3.style.display = 'block'; 
});

// Retour dans la modal
document.getElementById('retourp2').addEventListener('click', () => {
    page1.style.display = 'block';      
    page2.style.display = 'none'; 
});

document.getElementById('retourp3').addEventListener('click', () => {
    page2.style.display = 'block';      
    page3.style.display = 'none'; 
});


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
            galleryDivModal.classList.add('gallery');

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
                trashIcon.src = 'BacKend/images/yconepoubelle.png';  
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
        console.log('Work supprimé');
        figureElement.remove(); // Retire du DOM
    })      
    .catch(error => {
        console.error('Erreur de suppression', error);         
    });
}

// modal page 2
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const addPhotoBtn = document.getElementById('addphotobtn');
    const previewImage = document.getElementById('previewImage');

    if (!fileInput || !addPhotoBtn || !previewImage) {
        console.error("Certains éléments ne sont pas trouvés dans le DOM");
        return;
    }

    // Quand on clique sur le bouton, on ouvre la fenêtre de sélection de fichier
    addPhotoBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // Quand un fichier est sélectionné
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            previewImage.src = imageUrl;
            previewImage.style.display = 'block';
        }
    });
});
const form = document.querySelector('.form-section');
const page2 = document.getElementById('modal-page2');
const page3 = document.getElementById('modal-page3');

const previewFinalImage = document.getElementById('previewFinalImage');
const finalTitre = document.getElementById('finalTitre');
const finalCategorie = document.getElementById('finalCategorie');
const backToPage2Btn = document.getElementById('backToPage2');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const file = fileInput.files[0];
  const titre = titreInput.value.trim();
  const categorie = categorieSelect.value;

  if (!file || !titre || categorie === 'tous') {
    alert("Merci de remplir tous les champs correctement.");
    return;
  }

  // Injecter les infos dans les éléments de la page 3
  previewFinalImage.src = URL.createObjectURL(file);
  previewFinalImage.style.display = 'block';

  finalTitre.textContent = titre;
  finalCategorie.textContent = categorie;

  // Afficher la page 3
  page2.style.display = 'none';
  page3.style.display = 'block';
});

// Retour à la page 2 depuis page 3
backToPage2Btn.addEventListener('click', () => {
  page3.style.display = 'none';
  page2.style.display = 'block';
});