// import {getCurrentMedias, setCurrentMedias} from "../state/state.js"
import {photographerFactory} from "../factories/photographer.js"
import {mediasFactory} from "../factories/medias.js"
import {initContactForm} from "../utils/contactForm.js"


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

async function displayGallery(infos, medias) {
    // Vide la gallery pour pouvoir afficher si fonction de tri
    document.querySelector(".photograph-gallery").innerHTML = "";

    // Affiche la gallerie
    const galleryModel = mediasFactory(infos);
    galleryModel.createGallery(medias);
}


async function filterMedias(filter) {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    const infos = await photographerInfo(data, id);
    const galleryModel = mediasFactory(infos);

    let medias = await photographerMedia(data, id);    

    if (filter === 0) {
        medias = galleryModel.getGalleryFilterByPopularity(medias);
        displayGallery(infos, medias);
    } 
    
    else if (filter === 1) {
        medias = galleryModel.getGalleryFilterByDate(medias);
        displayGallery(infos, medias);    
    } 
    
    else if (filter === 2) {
        medias = galleryModel.getGalleryFilterByTitle(medias);
        displayGallery(infos, medias);    
    } 
    
    else {
        // return erreur : tri impossible
        alert("Tri des photos impossible");
    }
   
}

async function initEventListenerFilter(){
    var filterSelected = 4; // 4 = aucun filtre selectionné
    let previousFilter = "";
    var dropOpen = false;
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    const medias = await photographerMedia(data, id);
    const infos = await photographerInfo(data, id);

    document.querySelector("#dropbtn").addEventListener('click', () => {
        if (!dropOpen) {
            Array.prototype.forEach.call(document.getElementsByClassName("filter-btn"), function(element) {
                element.classList.remove('hidden');
            })
            document.querySelector('#dropbtn').classList.add("hidden");
            dropOpen = true;
        } else {
            Array.prototype.forEach.call(document.getElementsByClassName("filter-btn"), function(element) {
                element.classList.add('hidden');
            })
            document.querySelector('#dropbtn').classList.remove('hidden');
            dropOpen = false;
        }       
    })

    Array.prototype.forEach.call(document.getElementsByClassName("filter-btn"), function(element, index) {
        element.addEventListener("click",() => { 

            if (filterSelected !== index) {
                if (previousFilter !== "") {
                    previousFilter.classList.remove('photograph-gallery--filter__selected');
                }
                element.classList.add('photograph-gallery--filter__selected');
                filterMedias(index);
                filterSelected = index;                
            } 

            else if (filterSelected === index) {
                element.classList.remove('photograph-gallery--filter__selected');
                displayGallery(infos, medias);
                filterSelected = 4;
                Array.prototype.forEach.call(document.getElementsByClassName("filter-btn"), function(element) {
                    element.classList.add('hidden');
                })
                document.querySelector('#dropbtn').classList.remove('hidden');
                dropOpen = false;
            }

            previousFilter = element;
        });
    });
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


