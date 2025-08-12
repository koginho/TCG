const api_key = "7ddc0ca5-b2e5-4c38-a723-ae4dbc85e762"

const randomGenerator = Math.floor(Math.random() * 20) + 1;

const api_url = `https://api.pokemontcg.io/v2/cards?page=${randomGenerator}&pageSize=15`

let cards = [];

const embaralharCards = cards => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cards[i]; // [cartas[i], cartas[j]] = [cartas[j]. cartas[i]]
        cards[i] = cards[j];
        cards[j] = temp
    }
}

const abrirBooster = () => {
    if (cards.length < 5 ) {
        alert("Não existem cartas suficientes para abrir um pacote.")
        return;
    }

    embaralharCards(cartas);

    const booster = cartas.splice(0, 5);
    console.log("Booster aberto", booster)  
    console.log(`Restam ${cartas.length} cartas pokemon`)

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
            cards = data.data
            console.log(`Cartas carregadas: ${cards.length}`);
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