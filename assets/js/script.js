const api_key = "7ddc0ca5-b2e5-4c38-a723-ae4dbc85e762"

let cartas = [];

document.addEventListener("DOMContentLoaded", () => {
    const api_url_2 = `https://api.pokemontcg.io/v2/cards?page=7&pageSize=250&select=images`

    fetch(api_url_2, {
        headers: { "X-Api-Key": api_key }
    })
        .then(res => res.json())
        .then(data => {
            data.results.forEach(data => {
                cartas.push(cartas);
            })
        })
})

console.log(cartas)

document.getElementById("containerButton").addEventListener("click", () => {
    const randomGenerator = Math.floor(Math.random() * 100) + 1;
    const api_url = `https://api.pokemontcg.io/v2/cards?page=${randomGenerator}&pageSize=5&select=images`

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
        .catch(err => console.log("Erro na busca.", err));
})