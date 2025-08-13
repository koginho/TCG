const api_key = "7ddc0ca5-b2e5-4c38-a723-ae4dbc85e762"

const randomGenerator = Math.floor(Math.random() * 100) + 1;

const api_url = `https://api.pokemontcg.io/v2/cards?page=${randomGenerator}&pageSize=100`

let cardsArray = [];

// Tentativa de consumir API assim q a pagina carrega, volta um array vazio.
/*  document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM sendo carregada...')
    fetch(api_url, {
        headers: {"X-Api-Key": api_key}
    })
        .then(res => res.json())
        .then(data => {
            console.log(cardsArray);
        })
        .catch(error => {
            console.error("Deu ruim aqui:", error);
        })
})   */

const embaralharCards = cardsArray => {
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cardsArray[i]; // [cardsArray[i], cardsArray[j]] = [cardsArray[j]. cardsArray[i]]
        cardsArray[i] = cardsArray[j];
        cardsArray[j] = temp
    }
}

const abrirBooster = () => {
    if (cardsArray.length < 5 ) {
        alert("Não existem cartas suficientes para abrir um pacote.")
        return;
    }

    embaralharCards(cardsArray);

    const booster = cardsArray.splice(0, 5);
    console.log("Booster aberto", booster)  
    console.log(`Restam ${cardsArray.length} cartas pokemon`)

    const cardsImg = document.getElementById("cardsContainer")
    if (cardsImg) {
        cardsImg.innerHTML = "";
        booster.forEach(card => {
            const img = document.createElement("img");
                img.src = card.images.small;
                cardsImg.appendChild(img);
        })
    }
}

document.getElementById("containerButton").addEventListener("click", () => {
    console.log("Iniciando...")
    
    fetch( api_url, {
        headers: { "X-Api-Key": api_key }
    })
        .then(res => res.json())
        .then(data => {
            cardsArray = data.data
            console.log(`Cartas carregadas: ${cardsArray.length}`);
            abrirBooster()
        })
        .catch(err => console.error("Erro na requisição.", err))
})

/* document.getElementById("containerButton").addEventListener("click", () => {

    fetch(api_url, {
        headers: { "X-Api-Key": api_key }
    })
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("cardsContainer");
            container.innerHTML = "";

            data.data.forEach(card => {
                const img = document.createElement("img");
                img.src = card.images.small;
                img.classList.add("card");
                container.appendChild(img);
            });
        })
        .catch(err => console.error("Erro na busca.", err));
}) */

