function mediasFactory(data) {
    const { name } = data;

    function getGallery(medias) {
        console.log(medias)
        const gallery = document.createElement( 'div' );
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

    return { getGallery }
}

