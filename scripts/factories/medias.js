function mediasFactory(data) {
    const { name, price} = data;

    function createGallery(medias) {
        const gallery = document.querySelector(".photograph-gallery");
        var totalLikes = 0; 

        // Création des posts pour chaque médias
        for (var i = 0; i < medias.length; i++) {
            let img = document.createElement( 'img' );
            let imgUrl = `assets/images/${name}/${medias[i].image}`;
        
            img.setAttribute("src", imgUrl);
            img.alt = medias[i].title;
            img.classList.add('photographer_gallery--element');

            totalLikes = totalLikes + medias[i].likes;
        }

        //Création de l'encart avec le nombre total de like et le prix
        let divRightBottom = document.querySelector('.photograph-price');

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

