import {getJson, photographerInfo} from "../pages/photographer.js"

// Affiche la modale
function displayModal() {
    document.querySelector(".contact-modal").style.display = "block";
    document.querySelector(".contact-form--title").style.display =  "flex";
    document.querySelector("#closeForm").style.display =  "flex";
}

// Ferme la modale au click sur la X
function closeModal() {
    document.querySelector(".contact-modal").style.height = "800px";
    document.querySelector(".contact-modal").style.display = 'none';
    document.querySelector(".contact-form--form-sent").style.display = "none";  
    document.getElementById("contactForm").style.display = "block";  
    document.querySelector("#contactForm").reset();
    Array.prototype.forEach.call(document.getElementsByClassName("errorMessage"), function(element) {
        element.style.display = "none";
    })
    
}

// Valide le champs Prénom : retourne true si minimum 2 caractères / n'est pas vide
function firstValid(first){ 
    // Validation champs prénom et affichage du message d'erreur si saisie incorrecte
    if (first.length >= 2) { // Saisie prénom minimum deux caractères, n'est pas vide
        document.getElementById("firstError").style.display = "none";
        return true;
    } else { // Affichage du message d'erreur si saisie incorrecte
        document.getElementById("firstError").style.display = "block";
        return false;
    }
}

// Valide le champs Nom : retourne true si minimum 2 caractères / n'est pas vide
function lastValid(last){
    if (last.length >= 2) {
        document.getElementById("lastError").style.display = "none";
        return true;
    } else { // Affichage du message d'erreur si saisie incorrecte
        document.getElementById("lastError").style.display = "block";
        return false;
  
    }
}

// Valide le champs E-mail : retourne true si suit le format aa@aa.aa ou aa.aa@aa.aa
function emailValid(email){
    const emailMatchPattern = email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9._%+-]/); // accepte les formats aa@aa.aa / aa.aa@aa.aa / etc
  
    if (emailMatchPattern !== null) { // emailMatchPattern = null lorsque la saisie ne respecte pas le pattern
        document.getElementById("emailError").style.display = "none";
        return true;
    } else { // Affichage du message d'erreur si saisie incorrecte
        document.getElementById("emailError").style.display = "block";
        return false;
    }
}

// Valide le champs message : retourne true si remmpli
function messageValid(message){
    // Validation champs prénom et affichage du message d'erreur si saisie incorrecte
    if (message.length > 0) { // Saisie prénom minimum deux caractères, n'est pas vide
        document.getElementById("messageError").style.display = "none";
        return true;
    } else { // Affichage du message d'erreur si saisie incorrecte
        document.getElementById("messageError").style.display = "block";
        return false;
    }
}

// Vérifie la validité des champs saisis et renvoi true si formulaire correctement complété
function validateAll(){
    // Vérifie que tous les champs sont valides et retourne un bouléen pour dire si entierté du form valide ou non
    const isFirstValid = firstValid(document.getElementById("first").value);
    const isLastValid = lastValid(document.getElementById("last").value);
    const isEmailValid = emailValid(document.getElementById("email").value);
    const isMessageValid = messageValid(document.getElementById("message").value);

    if (isFirstValid && isLastValid && isEmailValid && isMessageValid){ 
        return true;
    } 

    document.querySelector(".contact-modal").style.height = "875px";
    document.querySelector('.messageSent').style.margin = "50% 0";
    return false;
    
}

// Validation finale du formulaire
export async function initContactForm() {
    document.querySelector(".contact_button").addEventListener("click", () => {
        displayModal();
    })

    Array.prototype.forEach.call(document.getElementsByClassName("contact-form--close-button"), function(element) {
        element.addEventListener("click", () => { 
            closeModal();
        })
    })

    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const data = await getJson();
    const infos = await photographerInfo(data, id);
    
    document.querySelector('.contact-form--title').innerHTML = "Contactez-moi " + infos.name;

    document.querySelector("#contactForm").addEventListener("submit", (event)=>{
        event.preventDefault(); // Evite rechargement de la page (comportement par défault)
        if (validateAll()) {
            console.log("prénom: "+document.getElementById("first").value+", nom: "+document.getElementById("last").value+", e-mail: "+document.getElementById("email").value+", message: "+document.getElementById("message").value);
            
            document.querySelector("#contactForm").reset(); // Réinitialise le formulaire
            document.querySelector("#contactForm").style.display =  "none";
            document.querySelector(".contact-form--title").style.display =  "none";
            document.querySelector("#closeForm").style.display =  "none";
        
            // Affiche message de confirmation d'envoi du formulaire
            document.querySelector(".contact-form--form-sent").style.display = "flex";
        } else {
            // Supprime message de confirmation lorsqu'envoi d'un deuxième formulaire à la suite mais invalide
            document.querySelector(".contact-form--form-sent").style.display = "none";  
        }
      
    })
}
