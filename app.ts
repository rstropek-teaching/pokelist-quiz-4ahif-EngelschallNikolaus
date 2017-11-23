const pokemonList = document.getElementById('pokemons');
let nextPokemon='';
let lastPokemon='';
window.onload = () => {
    getPokemon('https://pokeapi.co/api/v2/pokemon/');
}
$("#next").click(function(){
    getPokemon(nextPokemon);
});
$("#previous").click(function(){
    getPokemon(lastPokemon);
});
function getPokemon(url: string){
    fetch(url).then(response => {
        response.json().then(pokelist => {
            let html = '';
            let id: number=0;
            for (const pokemon of pokelist.results) {
                html += `<li>${pokemon.name}<button onclick="showDetail('${pokemon.name}')">Details</button></li>`
            }
            nextPokemon=pokelist.next;
            lastPokemon=pokelist.previous;
            pokemonList.innerHTML = html;
        });
    });
}
function showDetail(pokeName: string){
    
    const name=document.getElementById('name');             //sollte auf die details seite zugreifen
    const weight=document.getElementById('weight');
    const picture=document.getElementById('picture');
    fetch('https://pokeapi.co/api/v2/pokemon/'+pokeName+'/').then(response => {
        response.json().then(pokeList =>{
            alert("Name: "+pokeList.name+"\nWeight: "+pokeList.weight);
        });
    });
    
}