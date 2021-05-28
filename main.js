const main = async() => {
    const getData = await fetchData();
    console.log(getData.data);
};

main();

const boxComics = document.getElementById("box-comics");
const boxContainer = document.getElementById("box-container");
const boxComicData = document.getElementById("box-comic-data");
const comicData = document.getElementById("comic-data");
const comicCharacterTotal = document.getElementById("comic-character-total");
const comicCharacterData = document.getElementById("comic-character-data");
const boxCharacterData = document.getElementById("box-character-data");
const characterData = document.getElementById("character-data");
const characterComicTotal = document.getElementById("character-comic-total");
const characterComicData = document.getElementById("character-comic-data");


const prinData = arr =>{
    let box ="";
    arr.forEach(comic =>{
        const {title, thumbnail: {extension, path}, id } = comic;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        box += `
        <div class="column is-one-fifth" onclick="getIdComic(${id})">
            <figure>
                <a>
                    <img class="height_img" src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
                    <p class="has-text-centered">${title}</p>
                </a>
            </figure>
        </div>
        `
    });
    boxContainer.innerHTML = box
};

//Show and hide data 

const printDataComic = arr =>{
    boxComics.classList.add("is-hidden");
    boxCharacterData.classList.add("is-hidden");
    boxComicData.classList.remove("is-hidden");
    let box ="";
    arr.forEach(comic =>{
        const {title, thumbnail: {extension, path}, creators, description, dates, characters: {items}} = comic;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        const premiere = new Intl.DateTimeFormat('es-AR').format(new Date(dates?.find(el => el.type === 'onsaleDate').date))
        const creator = creators?.items?.filter(el => el.role === 'writer').map((creator) => creator.name)
        .join(', ')
        box += `
        <div class="columns">
            <div class="column is-one-quarter">
                <figure>
                <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
                </figure>
            </div>
            <div class="column is-size-5 px-6 py-4">
                <h3 class ="has-text-weight-bold">${title}</h3>
                <h4 class="has-text-weight-bold m-0 mb-2">Publicado:</h4>
                <p>${premiere}</p>
                <h4 class="has-text-weight-bold m-0 mt-3 mb-2">Guionistas:</h4>
                <p>${creator ? creator : 'Sin Datos'}</p>
                <h4 class="has-text-weight-bold m-0 mt-3 mb-2">Descripción:</h4>
                <p class="has-text-justified pr-6">${description ? description : 'Sin Datos'}</p>
            </div>
        </div>
        `
    });
    comicData.innerHTML = box
};

const showCharacterComic = arr =>{
    if(arr.length === 0){
        comicCharacterTotal.innerHTML = `
        <h4 class="is-size-6 has-text-weight-bold mt-0">Personajes</h4>
            <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Datos</p>
            <p class="subtitle has-text-weight-bold mt-6">No hay datos 😕</p>
        `
    }
    let box ="";
    arr.forEach(character =>{
        const {name, thumbnail: {extension, path}, id} = character;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        comicCharacterTotal.innerHTML = `
        <h4 class="is-size-6 has-text-weight-bold mt-0">Personajes</h4>
                <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Datos</p>`
        box += `<div class="column is-one-fifth" onclick="getCharacterId(${id})">
                    <div>
                        <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${name}">
                        <span></span>
                        <p class="name is-size-5 has-text-weight-bold has-text-centered mt-1 p-3">${name}</p>
                    </div>
                </div> 
        `
    });
    comicCharacterData.innerHTML = box
};

const printDataCharacter = (arr) =>{
    boxComics.classList.add("is-hidden");
    boxComicData.classList.add("is-hidden");
    boxCharacterData.classList.remove("is-hidden");
    let box ="";
    arr.forEach(character =>{
        const {name, thumbnail: {extension, path}, description} = character;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        box += `
        <div class="columns">
            <div class="column is-one-quarter">
                <figure>
                <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${name}">
                </figure>
            </div>
            <div class="column is-size-5 px-6 py-4">
                <h2>${name}</h2>
                <h3 class="has-text-weight-bold m-0 mt-3 mb-2">Descripción:</h3>
                <p class="has-text-justified pr-6">${description ? description : 'No hay Datos 😕'}</p>
            </div>
        </div>
        `
    })
    characterData.innerHTML = box;

    if(arr[0].comics.available == 0){
        characterComicTotal.innerHTML = `
        <h2 class="title mb-2">Comics</h2>
            <p class="is-size-6 has-text-weight-bold mt-0">${arr[0].comics.available} Datos</p>
            <p class="subtitle has-text-weight-bold mt-6">No hay datos 😕</p>
        `
    }else{
        characterComicTotal.innerHTML = `
        <h2 class="title mb-2">Comics</h2>
        <p class="is-size-6 has-text-weight-bold mt-0">${arr[0].comics.available} Datos</p>
        `
    }
};
const showComicCharacter = arr =>{
    let box ="";
    arr.forEach(comic =>{
        const {title, thumbnail: {extension, path}, id} = comic;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        box += `
        <div class="column is-one-fifth" onclick="getIdComic(${id})">
            <figure>
                <a>
                    <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
                    <p class="has-text-centered">${title}</p>
                </a>
            </figure>
        </div>
        `
    })
    characterComicData.innerHTML = box;
};
