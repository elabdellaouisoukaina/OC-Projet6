// import { setCurrentMedias } from "../state/state.js";

export function mediasFactory(data) {
    const { name, price} = data;

    // Ferme lightbox
    function initCloseButton() {
        document.querySelector('.close').addEventListener("click", () => {
            document.getElementById("lightbox").style.display = "none";
            document.querySelector('.lightbox-media').innerHTML = "";
        })
    }

    // Affiche lightbox
    function displayLightbox() {
        document.querySelector("#lightbox").style.display = "block";
        document.querySelector('.lightbox-media').innerHTML = "";
    }

    function initLightboxButtons(currentIndex, medias) {
        // Bouton précédent
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
                img.alt = medias[currentIndex].title;
                img.classList.add('photographer_gallery--element__img', 'photographer_gallery--element__media');
                lightboxMedia.appendChild(img);
    
                let title = document.querySelector('.lightbox-media__title')
                title.innerHTML = medias[currentIndex].alt; 
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
    
        // Bouton suivant
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
                img.alt = medias[currentIndex].title;
                img.classList.add('photographer_gallery--element__img', 'photographer_gallery--element__media');
                lightboxMedia.appendChild(img);
    
                let title = document.querySelector('.lightbox-media__title')
                title.innerHTML = medias[currentIndex].alt; 
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

    async function initEventListenerLightbox(){
        let medias = document.getElementsByClassName("photographer_gallery--element__media");
    
        initCloseButton();
    
        Array.prototype.forEach.call(medias, function(element, index) {
            element.addEventListener("click", () => { 
                let currentIndex = index;
    
                // Affiche la lightbox
                displayLightbox();
    
                // Mets à jour HTML pour image selectionnée
                const lightboxMedia = document.querySelector('.lightbox-media');
    
                if (element.classList.contains('photographer_gallery--element__img')){
                    const img = document.createElement('img');
                    img.classList.add('lighbox-img');
                    img.setAttribute('src', element.src);
                    img.alt = element.alt
    
                    let title = document.querySelector('.lightbox-media__title')
                    title.innerHTML = element.alt; 
    
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
    
                initLightboxButtons(currentIndex, medias);
            })
        })
    }

    async function initEventListenerLikes(){
        Array.prototype.forEach.call(document.getElementsByClassName("likable"), function(element) {
            element.addEventListener("click",() => { 
                element.previousSibling.innerHTML =  parseInt(element.previousSibling.innerHTML) + 1;
                document.querySelector('.photograph-price div p').innerHTML = parseInt(document.querySelector('.photograph-price div p').innerHTML) + 1;
            }, {once : true});
        })
    }  

    function createGallery(medias) {
        const gallery = document.querySelector(".photograph-gallery");
        let totalLikes = 0;


        // Création des posts pour chaque médias
        for (let i = 0; i < medias.length; i++) {
            let post = document.createElement( 'div' );
            post.classList.add('photographer_gallery--element');

            // Si le média est une image
            if (medias[i].hasOwnProperty('image')){
                let img = document.createElement( 'img' );
                let imgUrl = `assets/images/${name}/${medias[i].image}`;
                img.setAttribute("src", imgUrl);
                img.alt = medias[i].title;
                img.classList.add('photographer_gallery--element__img', 'photographer_gallery--element__media');
                post.appendChild(img);
            }

            // Si le média est une vidéo
            else if (medias[i].hasOwnProperty('video')) {
                let video = document.createElement('video');
                video.classList.add("photographer_gallery--element__video", "photographer_gallery--element__media");
                video.title = medias[i].title;
                let source = document.createElement('source');
                let videoUrl = `assets/images/${name}/${medias[i].video}`;
                source.setAttribute('src', videoUrl);
                source.setAttribute('type', "video/mp4");
                video.appendChild(source);
                post.appendChild(video);
            }
            

            let divInfos = document.createElement( 'div' );
            divInfos.classList.add('photographer_gallery--element__infos');

            let title = document.createElement( 'p' );
            title.textContent = medias[i].title;
            divInfos.appendChild(title);

            let likesDiv = document.createElement( 'div' );
            let likes = document.createElement( 'p' );
            likes.classList.add('number-likes');
            likes.textContent = medias[i].likes;
            likesDiv.appendChild(likes);

            let heartIcon = document.createElement('i');
            heartIcon.classList.add('fa-solid', 'fa-heart','likable');
            heartIcon.ariaLabel = medias[i].likes;
            likesDiv.appendChild(heartIcon);

            divInfos.appendChild(likesDiv);

            post.appendChild(divInfos);
            gallery.appendChild(post);

            totalLikes = totalLikes + medias[i].likes;
        }

        //Création de l'encart avec le nombre total de like et le prix
        let divRightBottom = document.querySelector('.photograph-price');
        
        if (divRightBottom.innerHTML === "") {  
            let totalLikesDiv = document.createElement( 'div' );
            let totalLikesP = document.createElement( 'p' );
            totalLikesP.textContent = totalLikes;
            totalLikesDiv.appendChild(totalLikesP);
    
            let heartIcon = document.createElement('i');
            heartIcon.classList.add('fa-solid', 'fa-heart');
            heartIcon.ariaLabel = totalLikes;
            totalLikesDiv.appendChild(heartIcon);
    
            divRightBottom.appendChild(totalLikesDiv);
    
            let priceP = document.createElement( 'p' );
            priceP.textContent = price + '€ / jour'
            divRightBottom.appendChild(priceP);
        }

        
        initEventListenerLikes();
        initEventListenerLightbox();

        return (gallery);
    }

    function getGalleryFilterByPopularity(mediasUnsorted){
        return mediasUnsorted.sort(function(a, b){
            return b.likes - a.likes;
        });
    }

    function getGalleryFilterByDate(mediasUnsorted){
        return mediasUnsorted.sort(function(a, b){
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }

    function getGalleryFilterByTitle(mediasUnsorted){
        return mediasUnsorted.sort(function(a, b) {    
            if (a.title > b.title) {    
                return 1;    
            } else if (a.title < b.title) {    
                return -1;    
            }    
                return 0;    
            }    
        )
    }
    

    return { initCloseButton, displayLightbox, initLightboxButtons, initEventListenerLightbox, initEventListenerLikes, createGallery, getGalleryFilterByPopularity, getGalleryFilterByDate, getGalleryFilterByTitle}
}

