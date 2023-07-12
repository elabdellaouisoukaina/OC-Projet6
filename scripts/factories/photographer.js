export function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id} = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const linkToDetails = document.createElement('a');
        linkToDetails.title = name;
        linkToDetails.href = "http://127.0.0.1:5500/photographer.html?id=" + id;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.alt = "";
        img.classList.add('photographer_profile_picture');


        const nameElement = document.createElement( 'h2' );
        nameElement.textContent = name;

        linkToDetails.appendChild(img);     
        linkToDetails.appendChild(nameElement);     


        const locationElement = document.createElement('p');
        locationElement.textContent = city + ', ' + country;
        locationElement.classList.add('photographer_section--location');

        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        taglineElement.classList.add('photographer_section--tagline');

        const priceElement = document.createElement('p');
        priceElement.textContent = price + '€/jour';
        priceElement.classList.add('photographer_section--price');

        article.appendChild(linkToDetails);
        article.appendChild(locationElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return (article);
    }

    function getHeaderInfos() {
        const photographerInfos = document.createElement( 'div' );

        const nameElement = document.createElement( 'h1' );
        nameElement.textContent = name;
        nameElement.classList.add('photographer-page--h1');

        const locationElement = document.createElement('p');
        locationElement.textContent = city + ', ' + country;
        locationElement.classList.add('photograph_header--location');

        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        taglineElement.classList.add('photograph_header--tagline');

        photographerInfos.classList.add('photograph-header--div-infos');

        photographerInfos.appendChild(nameElement);
        photographerInfos.appendChild(locationElement);
        photographerInfos.appendChild(taglineElement);

        return (photographerInfos);
    }

    function getProfilePicture() {
        const photographerProfilePicture = document.createElement( 'div' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.alt = name;
        img.classList.add('photographer_profile_picture');

        photographerProfilePicture.appendChild(img);
        photographerProfilePicture.classList.add('photograph-header--div-img');

        return (photographerProfilePicture);
    }

    return { name, picture, getUserCardDOM, getHeaderInfos, getProfilePicture }
}