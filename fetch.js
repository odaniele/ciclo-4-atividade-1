const charsContainer = document.querySelector('.chars-container');
const searchNameInput = document.querySelector('#search');
const speciesFilter = document.querySelector('#species');
const genderFilter = document.querySelector('#gender');
const statusFilter = document.querySelector('#status');
const loadMoreButton = document.querySelector('#load-more');

const apiUrl = 'https://rickandmortyapi.com/api/character';
const defaultFilters = {
  name: '',
  species: '',
  gender: '',
  status: '',
  page: 1,
};

async function getCharacters({ name, species, gender, status, page = 1 }) {
  const response = await fetch(`${apiUrl}/?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);

  const characters = await response.json();
  return characters.results;
}

async function render(characters) {
  charsContainer.innerHTML = '';
  characters.forEach(character => {
    const charHTML = `
      <div class='char'>
        <img src='${character.image}'>
        <div class='char-info'>
          <h3>${character.name}</h3>
          <span>${character.species}</span>
          <span>${character.status}</span>
        </div>
      </div>`;
    charsContainer.innerHTML += charHTML;
  });
}

function handleFilterChange(type, event) {
  return () => {
    defaultFilters[type] = event.target.value;
    render(getCharacters(defaultFilters));
  };
}

async function handleLoadMore() {
  defaultFilters.page += 1;
  render(await getCharacters(defaultFilters));
}

function addListeners() {
  searchNameInput.addEventListener('keyup', handleFilterChange('#name'));
  speciesFilter.addEventListener('change', handleFilterChange('#species'));
  genderFilter.addEventListener('change', handleFilterChange('#gender'));
  statusFilter.addEventListener('change', handleFilterChange('#status'));
  loadMoreButton.addEventListener('click', handleLoadMore);
}

async function main() {
  const characters = await getCharacters(defaultFilters);
  addListeners();
  render(characters);
}

main();
