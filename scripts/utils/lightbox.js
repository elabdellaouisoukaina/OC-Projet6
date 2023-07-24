// Ferme lightbox
function initCloseButton(currentMedia) {
    document.querySelector('.close').addEventListener("click", () => {
        document.getElementById("lightbox").style.display = "none";
        document.querySelector('.lightbox-media').innerHTML = "";

        // Accessibilité
        const body = document.querySelector('#body');
        const main = document.querySelector('#main');
        const header = document.querySelector('#header');
        const lightbox =  document.querySelector('#lightbox');
        const dropbtn = document.querySelector('#dropbtn');
        const homeLink = document.querySelector('#homeLink');
        
        main.ariaHidden = 'false';
        header.ariaHidden = 'false';
        dropbtn.tabIndex = '0';
        homeLink.tabIndex = '0';
        lightbox.ariaHidden = 'true';
        body.classList.remove('no-scroll');

        currentMedia.focus();
    })
}

// Affiche lightbox
function displayLightbox() {
    document.querySelector("#lightbox").style.display = "block";
    document.querySelector('.lightbox-media').innerHTML = "";

    // Accessibilité
    const body = document.querySelector('#body');
    const main = document.querySelector('#main');
    const header = document.querySelector('#header');
    const lightbox =  document.querySelector('#lightbox');
    const closeLightbox = document.querySelector('#closeLightbox');
    const dropbtn = document.querySelector('#dropbtn');
    const homeLink = document.querySelector('#homeLink');
        
    body.classList.add('no-scroll')
    main.ariaHidden = 'true';
    header.ariaHidden = 'true';
    dropbtn.tabIndex = '-1';
    homeLink.tabIndex = '-1';
    lightbox.ariaHidden = 'false';
    closeLightbox.focus();
}

function initLightboxButtons(currentIndex, medias, currentMedia) {
    // Navigation clavier
    const lightbox =  document.querySelector('#lightbox');

    lightbox.addEventListener("keydown", e => {
        const keyCode = e.keyCode ? e.keyCode : e.which
        // const lightbox =  document.querySelector('#lightbox');
        
        // Fermer avec échap
        if (keyCode === 27) {
            document.getElementById("lightbox").style.display = "none";
            document.querySelector('.lightbox-media').innerHTML = "";

            const body = document.querySelector('#body');
            const main = document.querySelector('#main');
            const header = document.querySelector('#header');
            const lightbox =  document.querySelector('#lightbox');
            const dropbtn = document.querySelector('#dropbtn');
            const homeLink = document.querySelector('#homeLink');
            
            main.ariaHidden = 'false';
            header.ariaHidden = 'false';
            dropbtn.tabIndex = '0';
            homeLink.tabIndex = '0';
            lightbox.ariaHidden = 'true';
            body.classList.remove('no-scroll');

            currentMedia.focus();
        }

        // Précédent avec flèche de gauche 
        if (keyCode === 37) {
            if (currentIndex != 0) {
                currentIndex = currentIndex - 1;
            } else {
                currentIndex = medias.length - 2; // Affiche la dernière image après la première
            }
        
            let isImg = medias[currentIndex].classList.contains('photographer_gallery--element__img');
            let isVideo = medias[currentIndex].classList.contains('photographer_gallery--element__video');
            const lightboxMedia = document.querySelector('.lightbox-media');
            lightboxMedia.innerHTML = "";
        
            if (isImg) { 
                let img = document.createElement( 'img' );
                let imgUrl = medias[currentIndex].src;
                img.setAttribute("src", imgUrl);
                img.alt = medias[currentIndex].alt.substr(14);
                img.classList.add('photographer_gallery--element__img', 'photographer_gallery--element__media');
                lightboxMedia.appendChild(img);
        
                let title = document.querySelector('.lightbox-media__title')
                title.innerHTML = medias[currentIndex].alt.substr(14); 
            } 
            
            else if (isVideo) {           
                let video = document.createElement('video');
                video.classList.add("photographer_gallery--element__video", "photographer_gallery--element__media");
                let source = document.createElement('source');
                let videoUrl = medias[currentIndex].firstChild.src;
                source.setAttribute('src', videoUrl);
                source.setAttribute('type', "video/mp4");
                video.setAttribute('controls', true);
                video.appendChild(source);
                lightboxMedia.appendChild(video);
        
                let title = document.querySelector('.lightbox-media__title')
                title.innerHTML = medias[currentIndex].title; 
            }
        }

        // Suivant avec flèche de droite
        if (keyCode === 39) {
            if (currentIndex !=  medias.length - 2) {
                currentIndex = currentIndex + 1;
            } else {
                currentIndex = 0; // Affiche la première image après la dernière
            }
        
            let isImg = medias[currentIndex].classList.contains('photographer_gallery--element__img');
            let isVideo = medias[currentIndex].classList.contains('photographer_gallery--element__video');
            const lightboxMedia = document.querySelector('.lightbox-media');
            lightboxMedia.innerHTML = "";
        
            if (isImg) { 
                let img = document.createElement( 'img' );
                let imgUrl = medias[currentIndex].src;
                img.setAttribute("src", imgUrl);
                img.alt = medias[currentIndex].alt.substr(14);
                img.classList.add('photographer_gallery--element__img', 'photographer_gallery--element__media');
                lightboxMedia.appendChild(img);
        
                let title = document.querySelector('.lightbox-media__title')
                title.innerHTML = medias[currentIndex].alt.substr(14); 
            } 
            
            else if (isVideo) {           
                let video = document.createElement('video');
                video.classList.add("photographer_gallery--element__video", "photographer_gallery--element__media");
                video.title = medias[currentIndex].title;
                let source = document.createElement('source');
                let videoUrl = medias[currentIndex].firstChild.src;
                source.setAttribute('src', videoUrl);
                source.setAttribute('type', "video/mp4");
                video.setAttribute('controls', true);
                video.appendChild(source);
                lightboxMedia.appendChild(video);
        
                let title = document.querySelector('.lightbox-media__title')
                title.innerHTML = medias[currentIndex].title;
            }
        }
    })

    // Bouton clickable précédent
    document.querySelector('.prev').addEventListener('click', () => {
        if (currentIndex != 0) {
            currentIndex = currentIndex - 1;
        } else {
            currentIndex = medias.length - 2; // Affiche la dernière image après la première
        }

        let isImg = medias[currentIndex].classList.contains('photographer_gallery--element__img');
        let isVideo = medias[currentIndex].classList.contains('photographer_gallery--element__video');
        const lightboxMedia = document.querySelector('.lightbox-media');
        lightboxMedia.innerHTML = "";

        if (isImg) { 
            let img = document.createElement( 'img' );
            let imgUrl = medias[currentIndex].src;
            img.setAttribute("src", imgUrl);
            img.alt = medias[currentIndex].alt.substr(14);
            img.classList.add('photographer_gallery--element__img', 'photographer_gallery--element__media');
            lightboxMedia.appendChild(img);

            let title = document.querySelector('.lightbox-media__title')
            title.innerHTML = medias[currentIndex].alt.substr(14); 
        } 
        
        else if (isVideo) {           
            let video = document.createElement('video');
            video.classList.add("photographer_gallery--element__video", "photographer_gallery--element__media");
            let source = document.createElement('source');
            let videoUrl = medias[currentIndex].firstChild.src;
            source.setAttribute('src', videoUrl);
            source.setAttribute('type', "video/mp4");
            video.setAttribute('controls', true);
            video.appendChild(source);
            lightboxMedia.appendChild(video);

            let title = document.querySelector('.lightbox-media__title')
            title.innerHTML = medias[currentIndex].title; 
        }
    })

    // Bouton clickable suivant
    document.querySelector('.next').addEventListener("click", () => {
        if (currentIndex !=  medias.length - 2) {
            currentIndex = currentIndex + 1;
        } else {
            currentIndex = 0; // Affiche la première image après la dernière
        }

        let isImg = medias[currentIndex].classList.contains('photographer_gallery--element__img');
        let isVideo = medias[currentIndex].classList.contains('photographer_gallery--element__video');
        const lightboxMedia = document.querySelector('.lightbox-media');
        lightboxMedia.innerHTML = "";

        if (isImg) { 
            let img = document.createElement( 'img' );
            let imgUrl = medias[currentIndex].src;
            img.setAttribute("src", imgUrl);
            img.alt = medias[currentIndex].alt.substr(14);
            img.classList.add('photographer_gallery--element__img', 'photographer_gallery--element__media');
            lightboxMedia.appendChild(img);

            let title = document.querySelector('.lightbox-media__title')
            title.innerHTML = medias[currentIndex].alt.substr(14); 
        } 
        
        else if (isVideo) {           
            let video = document.createElement('video');
            video.classList.add("photographer_gallery--element__video", "photographer_gallery--element__media");
            video.title = medias[currentIndex].title;
            let source = document.createElement('source');
            let videoUrl = medias[currentIndex].firstChild.src;
            source.setAttribute('src', videoUrl);
            source.setAttribute('type', "video/mp4");
            video.setAttribute('controls', true);
            video.appendChild(source);
            lightboxMedia.appendChild(video);

            let title = document.querySelector('.lightbox-media__title')
            title.innerHTML = medias[currentIndex].title;
        }
    });
}

export async function initEventListenerLightbox(){
    let medias = document.getElementsByClassName("photographer_gallery--element__media");

    Array.prototype.forEach.call(medias, function(element, index) {
        element.addEventListener("click", () => { 

            // Affiche la lightbox
            displayLightbox();

            // Fermer la lightbox 
            initCloseButton(element);

            // Init boutons
            initLightboxButtons(index, medias, element);

            // Mets à jour HTML pour image selectionnée
            const lightboxMedia = document.querySelector('.lightbox-media');

            if (element.classList.contains('photographer_gallery--element__img')){
                const img = document.createElement('img');
                img.classList.add('lighbox-img');
                img.setAttribute('src', element.src);
                img.alt = element.alt.substr(14); // Récupère le titre du média à la fin du alt

                let title = document.querySelector('.lightbox-media__title')
                title.innerHTML = element.alt.substr(14); 

                lightboxMedia.appendChild(img);
            }
            else if (element.classList.contains('photographer_gallery--element__video')){                
                let video = document.createElement('video');
                let source = document.createElement('source');
                let videoUrl = element.firstChild.src;
                video.title = element.title;
                source.setAttribute('src', videoUrl);
                source.setAttribute('type', 'video/mp4');
                video.setAttribute('controls', true);
                video.classList.add('lighbox-video');
                video.appendChild(source);
                lightboxMedia.appendChild(video);

                let title = document.querySelector('.lightbox-media__title')
                title.innerHTML = element.title; 
            }
        })

    })

    
}