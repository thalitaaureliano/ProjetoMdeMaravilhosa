let box = document.querySelector('.maravilhosas__box');

fetch('https://theblackwomanhistory.firebaseio.com/.json')
.then(function(response){
    return response.json();
})
.then(function(data){

    data.content.forEach(mulher => {

        let card = document.createElement('div');
        card.setAttribute('class', 'maravilhosas__perfil');
        box.appendChild(card);

        let ancora = document.createElement('a');
        ancora.setAttribute('href', '#');
        card.appendChild(ancora);

        let img = document.createElement('img');
        img.setAttribute('class', 'img-responsive');

        if (mulher.metadata) {
            if (mulher.metadata.image) {
                if (mulher.metadata.image.url) {
                    img.setAttribute('src', mulher.metadata.image.url);
                }
            } else {
                img.setAttribute('src', './img/img-mulher.png');
            }
        } else {
            img.setAttribute('src', './img/img-mulher.png');
        }

        ancora.appendChild(img);

        let name = document.createElement('p');
        name.textContent = mulher.title;
        ancora.appendChild(name);

        
    });

})
.catch(function(erro){
    console.log(erro);
})
