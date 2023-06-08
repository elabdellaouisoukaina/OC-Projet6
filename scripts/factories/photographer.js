function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id} = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const linkToDetails = document.createElement('a');
        linkToDetails.title = "Lien vers la page de " + name;
        linkToDetails.href = "http://127.0.0.1:5500/photographer.html?id=" + id;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        linkToDetails.appendChild(img);     

        const nameElement = document.createElement( 'h2' );
        nameElement.textContent = name;

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
        article.appendChild(nameElement);
        article.appendChild(locationElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}