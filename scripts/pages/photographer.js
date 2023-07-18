import {photographerFactory} from "../factories/photographer.js"
import {mediasFactory} from "../factories/medias.js"
import {initContactForm} from "../utils/contactForm.js"
import {initEventListenerFilter} from "../utils/filter.js"


export async function getJson() {
    const response = await fetch('../../../data/photographers.json');
    const data = await response.json();
    return data;
}

export async function photographerInfo(data, id) {
    let photographers = data.photographers;
    const result = photographers.find(photographer =>  photographer.id === parseInt(id));

    if (!result) {
        alert("Photographe non défini")
    }

    return result;
}

export async function photographerMedia(data, id) {
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

export async function displayGallery(infos, medias) {
    // Vide la gallery pour pouvoir afficher si fonction de tri
    document.querySelector(".photograph-gallery").innerHTML = "";

    // Affiche la gallerie
    const galleryModel = mediasFactory(infos);
    galleryModel.createGallery(medias);
}

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    const medias = await photographerMedia(data, id);
    const infos = await photographerInfo(data, id);
    
    displayHeader(data, id);
    displayGallery(infos, medias);
    initContactForm();
    initEventListenerFilter();
}


init();


