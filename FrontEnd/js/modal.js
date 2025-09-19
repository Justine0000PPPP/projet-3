let modal = null;  // variable globale pour la modal active
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;

  const filtresSection = document.getElementById('filtres'); // ta section ou tes boutons filtres
  const modifierBtn = document.getElementById('modifier-btn'); // bouton modifier déjà existant dans ton HTML

  if (isLoggedIn) {
    // connecté → cacher filtres, afficher modifier
    if (filtresSection) filtresSection.style.display = 'none';
    if (modifierBtn) modifierBtn.style.display = 'inline-block'; // ou 'flex' selon ton CSS
  } else {
    // pas connecté → afficher filtres, cacher modifier
    if (filtresSection) filtresSection.style.display = 'flex'; // ou 'block' selon ton layout
    if (modifierBtn) modifierBtn.style.display = 'none';
  }
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



