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

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    const infos = await photographerInfo(data, id);
    const medias = await photographerMedia(data, id);

    console.log(infos);
    console.log("=====================");
    console.log(medias);
};



init();


