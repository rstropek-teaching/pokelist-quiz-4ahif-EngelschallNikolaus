const pokemonList = document.getElementById('pokemons');
const loadingLabel = document.getElementById('loading');
let nextPokemon = '';
let previousPokemon = '';
window.onload = () => {
    getPokemon('https://pokeapi.co/api/v2/pokemon/');
}
$("#next").click(function () {
    if (nextPokemon != null) getPokemon(nextPokemon);
});
$("#previous").click(function () {
    if (previousPokemon != null) getPokemon(previousPokemon);
});
function getPokemon(url: string) {
    if (loadingLabel != null) loadingLabel.innerHTML = "Loading...";
    fetch(url).then(response => {
        response.json().then(pokelist => {
            let html = '';
            let id: number = 0;
            for (const pokemon of pokelist.results) {
                html +=
                    `<tr>
                    <td id="${pokemon.name}">
                        ${pokemon.name}
                    </td>
                    <td>
                        <button onclick="showDetail('${pokemon.name}')">Details</button>
                    </td>
                </tr>`
            }
            nextPokemon = pokelist.next;
            previousPokemon = pokelist.previous;
            if (pokemonList != null) pokemonList.innerHTML = html;
            if (loadingLabel != null) loadingLabel.innerHTML = "";
        });
    });
}
//function to show the Details for a certain pokemon
function showDetail(pokeName: string) {

    //information is fetched from the pokeapi
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokeName + '/').then(response => {
        response.json().then(pokemon => {
            //relevant data is saved into pre-made html-tags
            let details = '';
            details += document.getElementById('name').innerHTML = "Name: " + pokemon.name;
            details += document.getElementById('picture').innerHTML = `Image: <img src='${pokemon.sprites.front_default}'/>`
            details += document.getElementById('weight').innerHTML = "Weight: " + pokemon.weight;
            //going through all the abilities of a pokemon in a loop
            let abilities = 'Abilities: <ul>';
            for (const ability of pokemon.abilities) {
                abilities += `<li>${ability.ability.name}</li>`
            }
            abilities += '</ul>';
            details += document.getElementById('abilities').innerHTML = abilities;
        });
    });
    //make the pre-made html tags, which were invisible by now, visible
    document.getElementById('details').style.display = "block";
}