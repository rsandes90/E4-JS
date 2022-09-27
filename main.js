const form = document.getElementById("form");
const idPokemon = document.getElementById("input");
const card = document.querySelector(".card");

const requestPokemon = async(pokemon) => {
    try {
        const baseURL = `https://pokeapi.co/api/v2/pokemon/`;
        const response = await fetch(`${baseURL}${pokemon}`);
        const data = await response.json();
        return data;
    } catch (error) {
        alert("El pokemon ingresado no existe");
        return;
    }
};

const renderPokemon = (pokemon) => {
        const { id, name, sprites, height, weight, types, base_experience } = pokemon;

        return `
    <img src="${sprites.other.home.front_default}" alt="" id="logo" />
    <h2 id="nombre">${name.toUpperCase()}</h2>
    <p>EXP: ${base_experience}</p>
    <p>Type: ${types.map((tipo) => {
      return `<span>${tipo.type.name}</span>`;
    })}</p>
    <p>#${id}</p>
    <p>Height: ${height / 10}</p>
    <p>Weight: ${weight / 10}</p>
    `;
};

const renderPokemonCard = (pokemon) => {
  card.innerHTML = renderPokemon(pokemon);
};

const buscarPokemon = async (e) => {
  e.preventDefault();
  const pokemonBuscado = idPokemon.value.trim();

  if (pokemonBuscado === "") {
    alert("Por favor ingresa un valor");
    return;
  }

  const fetchedPokemon = await requestPokemon(pokemonBuscado);

  renderPokemonCard(fetchedPokemon);
  form.reset();
};

const init = () => {
  form.addEventListener("submit", buscarPokemon);
};

init();