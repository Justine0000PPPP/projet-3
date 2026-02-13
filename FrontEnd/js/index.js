
  let modal = null;

  // const
const API_WORKS = 'http://localhost:5678/api/works';

const portfolioSection = document.getElementById('portfolio');
const photomodalSection = document.getElementById('photomodal');
const API_CATEGORIES = 'http://localhost:5678/api/categories';
const filtresSection = document.getElementById('filtres');
const page1 = document.getElementById('modal-page1');
const page2 = document.getElementById('modal-page2');

async function works() {
  try {
    const response = await fetch(API_WORKS);
    if (!response.ok) throw new Error('Erreur HTTP ' + response.status);

    const data = await response.json();

    // Suppression des anciennes galeries
    const oldGallery = portfolioSection.querySelector('.gallery');
    if (oldGallery) oldGallery.remove();

    const oldModalGallery = photomodalSection.querySelector('.gallery-modal');
    if (oldModalGallery) oldModalGallery.remove();

    // Création des nouvelles galeries
    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('gallery');

    const galleryDivModal = document.createElement('div');
    galleryDivModal.classList.add('gallery-modal');

    data.forEach(work => {
      // ----- Galerie principale -----
      const figure = document.createElement('figure');
      figure.setAttribute('data-category-id', work.category.id);

      const img = document.createElement('img');
      img.src = work.imageUrl;
      img.alt = work.title;

      const figcaption = document.createElement('figcaption');
      figcaption.textContent = work.title;

      figure.append(img, figcaption);
      galleryDiv.appendChild(figure);

      // ----- Galerie modal -----
      const figureModal = document.createElement('figure');
      figureModal.setAttribute('data-category-id', work.category.id);

      const imgModal = document.createElement('img');
      imgModal.src = work.imageUrl;
      imgModal.alt = work.title;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.title = 'Supprimer cette photo';

      const trashIcon = document.createElement('img');
      trashIcon.src = './assets/images/icone-poubelle.webp';
      trashIcon.alt = 'Supprimer';
      trashIcon.style.width = '20px';
      trashIcon.style.height = '20px';

      deleteBtn.appendChild(trashIcon);
      deleteBtn.addEventListener('click', () => {
        deleteimage(work.id, figureModal);
      });

      figureModal.append(imgModal, deleteBtn);
      galleryDivModal.appendChild(figureModal);
    });

    portfolioSection.appendChild(galleryDiv);
    photomodalSection.appendChild(galleryDivModal);

    return data;

  } catch (error) {
    console.error('Erreur lors de la récupération des works :', error);
  }
}

works();
function createCategoryButtons(categories) {
  filtresSection.innerHTML = '';

  const btnAll = document.createElement('button');
  btnAll.textContent = 'Tous';
  btnAll.dataset.categoryId = 'all';
  btnAll.addEventListener('click', (e) => {
    filterWorks('all');
    setActiveButton(e.target);
  });
  filtresSection.appendChild(btnAll);


  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category.name;
    btn.dataset.categoryId = category.id;
    btn.addEventListener('click', (e) => {
      filterWorks(category.id);
      setActiveButton(e.target);
    });
    filtresSection.appendChild(btn);
  });
}


function setActiveButton(activeBtn) {
  const allButtons = document.querySelectorAll('#filtres button');
  allButtons.forEach(btn => btn.classList.remove('active')); // retire actif de tous
  activeBtn.classList.add('active'); // ajoute actif au bouton cliqué
}

  
function fetchCategories() {
  fetch(API_CATEGORIES)
    .then(async response => {
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Réponse API :', errorText);
        throw new Error(errorText);
      }
      return response.json();
    })
    .then(categories => {
      createCategoryButtons(categories);
    })
    .catch(error => {
      console.error('Erreur lors du fetch des catégories :', error);
    });
}
  fetchCategories();

function filterWorks(categoryId) {
  const allFigures = document.querySelectorAll('#portfolio .gallery figure');

  allFigures.forEach(figure => {
    const figureCatId = figure.getAttribute('data-category-id');

    if (categoryId === 'all' || figureCatId == categoryId) {
      figure.style.display = 'block';
    } else {
      figure.style.display = 'none';
    }
  });
} 

  // /: parite loguot
  

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


  function logout() {
    const logoutBtn = document.getElementById('logout');

    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      vuetoken(); 
    });
  }

  vuetoken();
  logout();


  function openmodal(e) {
    e.preventDefault();

    const target = document.querySelector(e.currentTarget.getAttribute('data-target'));
    if (!target) return; 

    target.style.display = "flex";
    modal = target;

    modal.addEventListener('click', closemodal);

    fetchimage();
  }

  function closemodal(e) {
    if (e.target === modal) {
      modal.style.display = "none";
      modal = null;
    }
  }

      function fermerModal() {
      if (modal) {
          modal.style.display = "none";
          modal = null;
      }
      }

      document.querySelectorAll('.js-modal').forEach(link => {
      link.addEventListener('click', openmodal);
      });

      const boutonsSortie = [document.getElementById('sortiep1'), document.getElementById('sortiep2')];


  boutonsSortie.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', fermerModal);
    }
  });


      document.getElementById('ajouterphoto').addEventListener('click', () => {
          page1.style.display = 'none';      
          page2.style.display = 'block'; 
        
          fetchselect();
      });

      document.getElementById('retourp2').addEventListener('click', () => { 
          page1.style.display = 'block';      
          page2.style.display = 'none'; 

      });

    


  //  modal page 1

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



  function deleteimage(id, figureElement) {  
      const token = localStorage.getItem('token'); 

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

      addPhotoBtn.addEventListener('click', () => {
        fileInput.click(); 
      });

      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0]; 


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
categoriesSelect.innerHTML = "";
    fetch('http://localhost:5678/api/categories')
      .then(response => {
        if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
        return response.json();
      })
      .then(categories => {
        const choix =document.createElement('option');
         choix.value = "";
         choix.innerHTML = "Choisir une catégorie";

        categoriesSelect.appendChild(choix);

          categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoriesSelect.appendChild(option);
          });
      
      
  } )}
  



  function validée() {
    const previewImage = document.getElementById('previewImage'); 
    const LoadedImage = previewImage && previewImage.src && previewImage.src.startsWith('blob:');
    const LoadedTitre = titreInput.value.trim().length > 0;
    const CategorySelected = categoriesSelect.value !== '' && categoriesSelect.value.toLowerCase() !== 'choisir une catégorie';

  if (LoadedImage && LoadedTitre && CategorySelected) {
    validateBtn.disabled = false;
    validateBtn.style.backgroundColor = '#1D6154';

  } else {
    validateBtn.disabled = true;
    validateBtn.style.backgroundColor = '#9a9a9a';

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

    fetchimage();   
    works();        
    fermerModal();  

    form.reset();
    fileInput.value = "";
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

const form = document.getElementById('addPhotoForm');

form.addEventListener('submit', function (e) {
  e.preventDefault(); 
  fetchValidée();
});



