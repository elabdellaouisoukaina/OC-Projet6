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
    const photographerModel = photographerFactory(infos);
    
    // Construction du header
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerInfos = photographerModel.getHeaderInfos();
    const photographerProfilePicture = photographerModel.getProfilePicture();

    photographerHeader.insertBefore(photographerInfos, photographerHeader.firstChild);
    photographerHeader.appendChild(photographerProfilePicture);



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


