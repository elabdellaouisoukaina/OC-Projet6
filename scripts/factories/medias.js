// import { setCurrentMedias } from "../state/state.js";
import { initEventListenerLikes, initEventListenerLightbox} from "../pages/photographer.js";

export function mediasFactory(data) {
    const { name, price} = data;

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

    return { createGallery, getGalleryFilterByPopularity, getGalleryFilterByDate, getGalleryFilterByTitle}
}

