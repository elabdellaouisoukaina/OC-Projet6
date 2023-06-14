async function getJson() {
    const response = await fetch('../../../data/photographers.json');
    const data = await response.json();
    return data;
}

async function photographerInfo(data, id) {
    let photographers = data.photographers;
    const result = photographers.find(photographer =>  photographer.id === parseInt(id));

    if (!result) {
        alert("Photographe non défini")
    }

    return result;
}

async function photographerMedia(data, id) {
    let medias = data.media;

    return medias.filter(media =>  media.photographerId === parseInt(id));
}

async function displayHeader(data, id){
    const infos = await photographerInfo(data, id);
    const photographerModel = photographerFactory(infos);
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerInfos = photographerModel.getHeaderInfos();
    const photographerProfilePicture = photographerModel.getProfilePicture();

    photographerHeader.insertBefore(photographerInfos, photographerHeader.firstChild);
    photographerHeader.appendChild(photographerProfilePicture);
}

async function displayGallery(data, id) {
    const infos = await photographerInfo(data, id);
    const galleryModel = mediasFactory(infos);
    const medias = await photographerMedia(data, id);
    const photographerMedias = galleryModel.getGallery(medias);

    const photographerGallery = document.querySelector(".photograph-gallery");
    photographerGallery.appendChild(photographerMedias);
};


async function filterMedias(filter) {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    
    const infos = await photographerInfo(data, id);
    const galleryModel = mediasFactory(infos);
    let medias = await photographerMedia(data, id);    


    if (filter === 'popularity') {
        medias = galleryModel.getGalleryFilterByPopularity(medias);
        // displayGallery(data, id);
        console.log(galleryModel.getGalleryFilterByPopularity(medias));
    } 

    if (filter === 'date') {
        medias = galleryModel.getGalleryFilterByDate(medias);
        console.log(galleryModel.getGalleryFilterByDate(medias));
    }

    if (filter === 'title') {
        medias = galleryModel.getGalleryFilterByTitle(medias);
        console.log(galleryModel.getGalleryFilterByTitle(medias));
    }
    // return erreur 
}

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();

    displayHeader(data, id);
    displayGallery(data, id);
};



init();


