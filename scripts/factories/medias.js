function mediasFactory(data) {
    const { name } = data;

    function createGallery(medias) {
        const gallery = document.querySelector(".photograph-gallery");

        for (var i = 0; i < medias.length; i++) {
            let img = document.createElement( 'img' );
            let imgUrl = `assets/images/${name}/${medias[i].image}`;
        
            img.setAttribute("src", imgUrl);
            img.alt = medias[i].title;
            img.classList.add('photographer_gallery--element');

            gallery.appendChild(img);
        }
        return (gallery);
    }

    function getGalleryFilterByPopularity(mediasUnsorted){
        return mediasUnsorted.sort(function(a, b){
            return b.likes - a.likes;
        });
    }

    function getGalleryFilterByDate(mediasUnsorted){
        let medias = mediasUnsorted.sort(function(a, b){
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        medias = medias.reverse();
        return medias
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

