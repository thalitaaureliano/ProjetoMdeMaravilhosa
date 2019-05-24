let box = document.querySelector('.maravilhosas__box');
let button = document.getElementById("button");

button.addEventListener('click', () => {

    let nome = document.getElementById("nome").value;
    let imagem = document.getElementById("imagem").value;

    fetch('http://localhost:5001/maravilhosas/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'title': nome,
            'metadata': {
                'image':{
                    'url': imagem,
                }
            }

        }),
    })
})


fetch('http://localhost:5001/maravilhosas/')
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

        // if (mulher.metadata) {
        //     if (mulher.metadata.image) {
        //         if (mulher.metadata.image.url) {
        //             img.setAttribute('src', mulher.metadata.image.url);
        //         }
        //     } else {
        //         img.setAttribute('src', './img/img-mulher.png');
        //     }
        // } else {
        //     img.setAttribute('src', './img/img-mulher.png');
        // }

        if(mulher.metadata == undefined || mulher.metadata.image == ""){
            img.setAttribute('src', './img/img-mulher.png');
        } else{ 
            img.setAttribute('src', mulher.metadata.image.url);
        }




        ancora.appendChild(img);

        let name = document.createElement('p');
        name.textContent = mulher.title;
        ancora.appendChild(name);

        let btn = document.createElement('button');
        btn.textContent = 'X';
        btn.setAttribute('data-id', mulher.id)
        card.appendChild(btn);

        btn.addEventListener('click', () => {
            const thisCard = btn.parentElement;
            const cardPai = thisCard.parentElement;


            fetch(`http://localhost:5001/maravilhosas/${mulher.id}`, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': btn.getAttribute("data-id")
                })
            })
            .then(() =>{
                cardPai.removeChild(thisCard)
            })
        })


        
    });

})
.catch(function(erro){
    console.log(erro);
})
