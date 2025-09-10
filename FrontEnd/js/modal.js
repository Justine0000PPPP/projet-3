        let modal = null;  // la variable est vide pour l'instant

        const openmodal = function (e) {
            e.preventDefault();  // empêcche de rediriger autre par dans le fichier 
            
            // on récupère l'attribut href du lien cliqué pour cibler la modal correspondante
            const target = document.querySelector(e.target.getAttribute('href')); 
            
            target.style.display = "flex";  // on rend la modal visible
            
            modal = target;  // on stocke la modal dans la variable globale pour la manipuler plus tard
            
            // on ajoute un écouteur sur la modal pour fermer si on clique en dehors du contenu
            modal.addEventListener('click', closemodal);
             fetchimage();
            
            };

        const closemodal = function (e) {
            // on vérifie que le clic a été fait sur la modal (pas sur son contenu)
            if (e.target === modal) {
                modal.style.display = "none";  // on cache la modal

                modal = null;  // on réinitialise la variable
            }
        };

        // on ajoute un écouteur sur tous les liens avec la classe js-modal pour ouvrir la modal au clic
        document.querySelectorAll('.js-modal').forEach(a => { 
            a.addEventListener('click', openmodal);
        });


        //  gestillon daparition des pages modal 
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
// retoure

        document.getElementById('retourp2').addEventListener('click', () => {
         page1.style.display = 'block';      
         page2.style.display = 'none'; 
        });
        document.getElementById('retourp3').addEventListener('click', () => {
         page2.style.display = 'block';      
         page3.style.display = 'none'; 
        });







        // modal page 1  rajouter une class pour les modal toute les metre dan un bloque  pour redimentionner
        //  diférentier lapel model de lapel modal des images en rejouter modal eu vretelement  

         // gestion des photo de la modal importation des phtos 

       function fetchimage (){ 


        fetch('http://localhost:5678/api/works')
            .then(response => {
            if (!response.ok) {
                throw new Error('Erreur HTTP ' + response.status);
            }
            return response.json(); // Convertir la réponse en JSON
            })
            .then(data => {
            console.log(data); // Affiche les données reçues dans la console

            // Cibler la section existante dans  HTML
            const photomodalSection = document.getElementById('photomodal');

            //  Créer la div.gallery
            const galleryDivModal = document.createElement('div');
            galleryDivModal.classList.add('gallery');

            // Parcourir chaque œuvre reçue
            data.forEach(work => {
                // Création de la figure
                const figureModal = document.createElement('figure');
                figureModal.setAttribute('data-category-id', work.category.id); // Important pour filtrer

                const imgModal = document.createElement('img');
                imgModal.src = work.imageUrl;
                imgModal.alt = work.title;

                const figcaptionModal = document.createElement('figcaption');
                figcaptionModal.textContent = work.title;
                
                // Bouton poubelle
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn'); // Pour le style
                deleteBtn.title = "Supprimer cette photo";

                // Icône poubelle 
                const trashIcon = document.createElement('img');
                trashIcon.src = 'BacKend/images/yconepoubelle.png';  
                trashIcon.alt = 'Supprimer';
                trashIcon.style.width = '20px';
                trashIcon.style.height = '20px';

                deleteBtn.appendChild(trashIcon);
                deleteBtn.addEventListener('click', () => {
            
               deleteimage(work.id, figureModal); 
                });

                // Ajouter image + légende dans figure
                figureModal.appendChild(imgModal);
                figureModal.appendChild(figcaptionModal);
                figureModal.appendChild(deleteBtn);

                // Ajouter la figure à la div.gallery
                galleryDivModal.appendChild(figureModal);
            });
                // Ajouter un event listener au bouton supprimer



            //  Ajouter la div.gallery à la section portfolio
            photomodalSection.appendChild(galleryDivModal);
            });
        }
 

         // surpimer les Work metre lapelle dans une  function plus id dans parentaise plus ajout html pour activer lapelle



        function deleteimage (id, figureElement) { 
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE'
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

























        
        // // modal page 2  le lier a un bouton en html 
        // const form = e.target; 
        // const formData = new FormData(form);  
        // const formObject = Object.fromEntries(formData.entries());  

        // try {
        //     const response = await fetch('http://localhost:5678/api/works, {
        //         method: 'POST',  
        //         headers: { 'Content-Type': 'application/json' }, 
        //         body: JSON.stringify(formObject)  
        //     });

        //     if (!response.ok) {  // si la réponse n'est PAS ok, on lance une erreur
        //         throw new Error('Erreur');
        //     }

        //     alert('Formulaire envoyé');
        //     loadForm();

        // } catch (error) {  
        //     alert('Une erreur est survenue');
        //     console.error(error);
        // }
  

            
