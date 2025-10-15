

// parite modal 

let modal = null;  // variable globale pour la modal active
document.addEventListener('DOMContentLoaded', () => {
let modal = null;  // variable globale pour la modal active

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
    document.getElementById('sortie').addEventListener('click', fermerModal);// Gestion de l'apparition des pages dans la modal
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
    logoutBtn.style.display = 'flex';
    barelogin.style.display = 'flex';
    filtres.style.display = 'none';  // cacher les filtres quand connecté
    ouvremodal.style.display = 'block';
  } else {
    // Utilisateur déconnecté
    loginBtn.style.display = 'flex';
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

// parite pour le selecte 

function fetchselect() {
  fetch('http://localhost:5678/api/categories')
    .then(response => {
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      return response.json();
    })
    .then(categories => {
    
      // === AJOUT options dans le select ===
    
      const select = document.getElementById('categories');


        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          select.appendChild(option);
        });
    
     
} )}
 



// pour valider a finir 
function validée() {
  const previewImage = document.getElementById('previewImage'); 
  const LoadedImage = previewImage && previewImage.src && previewImage.src.startsWith('blob:');
  const LoadedTitre = titreInput.value.trim().length > 0;
  const CategorySelected = categoriesSelect.value !== '' && categoriesSelect.value.toLowerCase() !== 'choisir une catégorie';
  const separator = document.querySelector('.separator');

if (LoadedImage && LoadedTitre && CategorySelected) {
  validateBtn.disabled = false;
  validateBtn.style.backgroundColor = 'green';
  if (separator) separator.style.backgroundColor = 'green';
} else {
  validateBtn.disabled = true;
  validateBtn.style.backgroundColor = 'grey';
  if (separator) separator.style.backgroundColor = 'grey';
}
}

// Ajoute des écouteurs pour vérifier le formulaire à chaque changement
titreInput.addEventListener('input', validée);
categoriesSelect.addEventListener('change', validée);
validée();



// apelle a api au clik 
function fetchValidée() {
  const file = fileInput.files[0]; // Récupère le fichier image
  const title = titreInput.value.trim();
  const category = categoriesSelect.value;
  const token = localStorage.getItem('token');  
  // Vérification des champs
  if (!file || !title || !category || category === 'all') {
    alert("Tous les champs doivent être remplis.");
    return;
  }

  // Préparer les données à envoyer avec FormData
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("category", category);

  // Requête POST vers l’API
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


    //   // Optionnel : recharger la galerie après ajout
    //   fetchimage();

    //   // Réinitialiser le formulaire
    //   document.querySelector('.form-section').reset();
    //   const preview = document.getElementById('previewImage');
    //   if (preview) preview.remove();
    //   document.querySelector('.upload-box i').style.display = 'block';
    //   addPhotoBtn.disabled = false;
    //   addPhotoBtn.style = ""; // reset style

    })
    .catch(error => {
      console.error(error);
      alert("Erreur lors de l'ajout.");
    });
}


// a verifier si vraiment nesessaire 
document.getElementById('validateBtn').addEventListener('click', fetchValidée);