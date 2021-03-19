const input =  document.querySelector('input');
const resultDiv =  document.querySelector('.result-div');

const clientID = 'cclk5hafv1i7lksfauerry4w7ythu2';

let currentlySearching = false;

let starterName = location.search.substring(1);

if (starterName) {
    input.value = starterName.toLowerCase();
    history.pushState(null, null, `?${input.value.toLowerCase()}`);
    getDataFromAPI(starterName);
}

input.onkeydown = event => {
    if (event.which === 13) {
        input.value = input.value.toLowerCase();
        history.pushState(null, null, `?${input.value.toLowerCase()}`);
        getDataFromAPI(input.value);
    }
}