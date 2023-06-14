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

async function displayGallery(id, medias) {
    // Vide la gallery pour pouvoir afficher si fonction de tri
    document.querySelector(".photograph-gallery").innerHTML = "";

    // Affiche la gallerie
    const data = await getJson();
    const infos = await photographerInfo(data, id);
    const galleryModel = mediasFactory(infos);
    galleryModel.createGallery(medias);
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
        displayGallery(id, medias);
    } 
    
    else if (filter === 'date') {
        medias = galleryModel.getGalleryFilterByDate(medias);
        displayGallery(id, medias);    
    } 
    
    else if (filter === 'title') {
        medias = galleryModel.getGalleryFilterByTitle(medias);
        displayGallery(id, medias);    
    } 
    
    else {
        // return erreur : tri impossible
        alert("Tri des photos impossible");
    }
   
}

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    const medias = await photographerMedia(data, id);

    displayHeader(data, id);
    displayGallery(id, medias);
};



init();


