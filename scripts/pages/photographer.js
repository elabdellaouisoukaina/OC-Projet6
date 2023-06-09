async function getJson() {
    const response = await fetch('../../../data/photographers.json');
    const data = await response.json();
    return data;
}

async function photographerInfo(data, id) {
    let photographers = data.photographers;
    for (var i = 0; i < photographers.length; i++) {
        if (photographers[i].id == id) {
            return photographers[i];
        }
    }
}

async function photographerMedia(data, id) {
    let medias = data.media;
    let photographerMedias = [];
    for (var i = 0; i < medias.length; i++) {
        if (medias[i].photographerId == id) {
            photographerMedias.push(medias[i]);
        }
    }
    return photographerMedias;
}


async function displayData(data, id) {
    const infos = await photographerInfo(data, id);
    
    // Construction du header
    const photographerModel = photographerFactory(infos);
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerInfos = photographerModel.getHeaderInfos();
    const photographerProfilePicture = photographerModel.getProfilePicture();

    photographerHeader.insertBefore(photographerInfos, photographerHeader.firstChild);
    photographerHeader.appendChild(photographerProfilePicture);

    // Construction de la gallerie
    const galleryModel = mediasFactory(infos);
    const medias = await photographerMedia(data, id);
    const photographerMedias = galleryModel.getGallery(medias);

    const photographerGallery = document.querySelector(".photograph-gallery");
    photographerGallery.appendChild(photographerMedias);

};

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    // const medias = await photographerMedia(data, id);

    // console.log(medias);

    displayData(data, id);
};



init();


