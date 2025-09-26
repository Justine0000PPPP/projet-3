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

  
  const addPhotoBtn = document.getElementById('addphotobtn');
const fileInput = document.getElementById('fileInput');

addPhotoBtn.addEventListener('click', () => {
  fileInput.click();  // ouvre la fenêtre de sélection des fichiers
});

  }
);

} )



// etape pour fais la page modal 3
// avoir de quoi chercher limage en local via apis sur le boutton plus ajouter avec une taille et un format definie 
// les deux xhamps
// un pour le tire un champ basique 
// un deuxieme avec les categorie apeller par la funtion deja faite 
// puis lier le boutton viider a la futnion content laip de  addxorks 
// pour ensuite que sa ajout a la page principal 


