const pokemonName = document.querySelector('.pokemonName')
const pokemonNumber = document.querySelector('.pokemonNumber')
const pokemonImage = document.querySelector('.pokemonImage')

const form = document.querySelector('.form')
const input = document.querySelector('.inputSearch')

const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')
let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data
    } 
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading...'
    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = ''

    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase());
    input.value = '';
})
renderPokemon(searchPokemon)

prev.addEventListener('click', () => {
    searchPokemon -= 1;
    if(searchPokemon <= 0){
        searchPokemon = 1
    } else{
        renderPokemon(searchPokemon);
    }
})
next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})