const api_key = "7ddc0ca5-b2e5-4c38-a723-ae4dbc85e762"

const randomGenerator = Math.floor(Math.random() * 100) + 1;

const api_url = `https://api.pokemontcg.io/v2/cards?page=${randomGenerator}&pageSize=250&select=images`

let cartas = [];

document.addEventListener("DOMContentLoaded", () => {
    console.log("Iniciando...")
    fetch(api_url, {
        headers: { "X-Api-Key": api_key }
    })
        .then(res => res.json())
        .then(data => {
            data.data.forEach(card => {
                cartas.push(card);
            })
            console.log(cartas)
        })
        .catch(err => console.error("Erro na requisição.", err))
})



document.getElementById("containerButton").addEventListener("click", () => {

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
})