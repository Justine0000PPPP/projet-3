        let modal = null;  // la variable est vide pour l'instant

        const openmodal = function (e) {
            e.preventDefault();  // empêcche de rediriger autre par dans le fichier 
            
            // on récupère l'attribut href du lien cliqué pour cibler la modal correspondante
            const target = document.querySelector(e.target.getAttribute('href')); 
            
            target.style.display = "flex";  // on rend la modal visible
            
            modal = target;  // on stocke la modal dans la variable globale pour la manipuler plus tard
            
            // on ajoute un écouteur sur la modal pour fermer si on clique en dehors du contenu
            modal.addEventListener('click', closemodal);
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


        // modal page 1 

        //  // gestion des pohto de la modal importation des phtos 


        // fetch('http://localhost:5678/api/works')
        //     .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Erreur HTTP ' + response.status);
        //     }
        //     return response.json(); // Convertir la réponse en JSON
        //     })
        //     .then(data => {
        //     console.log(data); // Affiche les données reçues dans la console

        //     // Cibler la section existante dans  HTML
        //     const photomodalSection = document.getElementById('photomodal');

        //     //  Créer la div.gallery
        //     const galleryDiv = document.createElement('div');
        //     galleryDiv.classList.add('gallery');

        //     // Parcourir chaque œuvre reçue
        //     data.forEach(work => {
        //         // Création de la figure
        //         const figure = document.createElement('figure');
        //         figure.setAttribute('data-category-id', work.category.id); // Important pour filtrer

        //         const img = document.createElement('img');
        //         img.src = work.imageUrl;
        //         img.alt = work.title;

        //         const figcaption = document.createElement('figcaption');
        //         figcaption.textContent = work.title;

        //         // Ajouter image + légende dans figure
        //         figure.appendChild(img);
        //         figure.appendChild(figcaption);

        //         // Ajouter la figure à la div.gallery
        //         galleryDiv.appendChild(figure);
        //     });

        //     //  Ajouter la div.gallery à la section portfolio
        //     photomodalSection.appendChild(galleryDiv);
        //     });

            
