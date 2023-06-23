import {getCurrentMedias, setCurrentMedias} from "../state/state.js"
import {photographerFactory} from "../factories/photographer.js"
import {mediasFactory} from "../factories/medias.js"


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

async function initEventListenerFilter (){
    var filterSelected = 4; // 4 = aucun filtre selectionné
    let previousFilter = "";
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    const medias = await photographerMedia(data, id);
    const infos = await photographerInfo(data, id);
    
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
            }

            previousFilter = element;
        });
    });
    
    // document.getElementsByClassName("filter-btn").forEach((element, index) => {
    //     element.addEventListener("click",() => { 
    //         filterMedias(index);
    //     });
    // });
}

async function initEventListenerLikes(){
    Array.prototype.forEach.call(document.getElementsByClassName("likable"), function(element) {
        element.addEventListener("click",() => { 
            element.previousSibling.innerHTML =  parseInt(element.previousSibling.innerHTML) + 1;
            document.querySelector('.photograph-price div p').innerHTML = parseInt(document.querySelector('.photograph-price div p').innerHTML) + 1;
        }, {once : true});
    })
}

// Affiche lightbox
function displayLightbox() {
    document.querySelector("#lightbox").style.display = "block";
}

// Ferme lightbox
function initCloseButton() {
    document.querySelector('.close').addEventListener("click", () => {
        document.getElementById("lightbox").style.display = "none";
    })
}  
  

async function initEventListenerLightbox(){
    let medias = document.getElementsByClassName("photographer_gallery--element__img");

    initCloseButton();

    Array.prototype.forEach.call(medias, function(element, index) {
        element.addEventListener("click", () => { 
            let currentIndex = index;

            // Affiche la lightbox
            displayLightbox();

            // Mets à jour HTML pour image selectionnée
            document.querySelector('.lighbox-img').src = element.src;  
            document.querySelector('.lightbox-img__title').innerHTML = element.alt;  

            // Bouton précédent
            document.querySelector('.prev').addEventListener("click", () => {
                if (currentIndex != 0) {
                    currentIndex = currentIndex - 1;
                } else {
                    currentIndex = medias.length - 1; // Affiche la dernière image après la première
                }
                document.querySelector('.lighbox-img').src = medias[currentIndex].src;
                document.querySelector('.lightbox-img__title').innerHTML = medias[currentIndex].alt;  

            })

            // Bouton suivant
            document.querySelector('.next').addEventListener("click", () => {
                if (currentIndex !=  medias.length - 1) {
                    currentIndex = currentIndex + 1;
                } else {
                    currentIndex = 0; // Affiche la première image après la dernière
                }
                document.querySelector('.lighbox-img').src = medias[currentIndex].src;
                document.querySelector('.lightbox-img__title').innerHTML = medias[currentIndex].alt;  

            });
        })
    })
}

async function init() {
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    const medias = await photographerMedia(data, id);
    const infos = await photographerInfo(data, id);
    
    displayHeader(data, id);
    displayGallery(infos, medias);
    initEventListenerFilter();
    initEventListenerLikes();
    initEventListenerLightbox();
}



init();


