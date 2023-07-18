import {getJson, photographerInfo, photographerMedia, displayGallery} from "../pages/photographer.js"
import {mediasFactory} from "../factories/medias.js"


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

export async function initEventListenerFilter(){
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

    document.querySelector("#chevronSelected").addEventListener("click", () => {
        Array.prototype.forEach.call(document.getElementsByClassName("filter-btn"), function(element) {
            element.classList.add('hidden');
        })
        document.querySelector('#dropbtn').classList.remove('hidden');
        dropOpen = false;
    })

    Array.prototype.forEach.call(document.getElementsByClassName("filter-btn"), function(element, index) {
        element.addEventListener("click",() => { 
            const dropdown = document.querySelector('.dropdown-content');

            if (filterSelected !== index) {
                if (previousFilter !== "") {
                    previousFilter.classList.remove('photograph-gallery--filter__selected');
                    dropdown.ariaActiveDescendant = "false";
                }
                element.classList.add('photograph-gallery--filter__selected');
                dropdown.ariaActiveDescendant = "true";
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

        element.addEventListener('keybord', (e) => {
            const keyCode = e.keyCode ? e.keyCode : e.which;
            const dropdown = document.querySelector('.dropdown-content');

            if (keyCode === 32){ // Si touche espace, agir comme click
                if (filterSelected !== index) {
                    if (previousFilter !== "") {
                        previousFilter.classList.remove('photograph-gallery--filter__selected');
                        dropdown.ariaSelected = "false";
                    }
                    element.classList.add('photograph-gallery--filter__selected');
                    dropdown.ariaSelected = "true";
    
                    filterSelected = index;                
                } 
    
                else if (filterSelected === index) {
                    element.classList.remove('photograph-gallery--filter__selected');
                    previousFilter.classList.remove('photograph-gallery--filter__selected');
                    displayGallery(infos, medias);
                    filterSelected = 4;
                    Array.prototype.forEach.call(document.getElementsByClassName("filter-btn"), function(element) {
                        element.classList.add('hidden');
                    })
                    document.querySelector('#dropbtn').classList.remove('hidden');
                    dropOpen = false;
                }
    
                previousFilter = element;
            }
        })
    });
}
