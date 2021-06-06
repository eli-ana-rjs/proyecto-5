const keyPrivate = 'cbdf661fcb1cb7101bf4be26755ee96bcec09d46';
const keyPublic ='161cf80a899f70cf088beb8b424fd631';
const timestamp = Date.now();

const hash = md5(timestamp + keyPrivate + keyPublic);

const totalResult = document.getElementById("total-result");

const previousPage = document.getElementById('previous-page');
const nextPage = document.getElementById('next-page');

const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page') || 1;
console.log({page});

const offset = ( page - 1)*20;
console.log({offset})
let total = 0;



const  fetchData = async() => {
  const url = `https://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${keyPublic}&hash=${hash}`;
  /* try{
    const response = await fetch(url);
    const parseResponse =  response.json();
    return parseResponse;
  }catch(error){
    console.error(error);
  } */
  fetch(url)
    .then(response => response.json())
    .then(Object => {
      prinData(Object.data.results)
      console.log(Object.data.results);
      total = Object.data.total
      totalResult.innerHTML = total;
      printPagination(total);
      const totalPage = Math.ceil(total/20);
      createOptions(totalPage);
    })
    .catch(response => console.error(response))
    return total
}; 

fetchData();


//Get Comics

let idComic = "";
const getIdComic = (id) => {
  const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${keyPublic}&hash=${hash}`
  fetch(url)
    .then(response => response.json())
    .then(Object => printDataComic(Object.data.results))
    .catch(err => console.error(err))
    idComic = id
    getIdCharacterComic(idComic)
    return idComic
};

const getIdCharacterComic = (id) =>{
  const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?ts=${timestamp}&apikey=${keyPublic}&hash=${hash}`
  fetch(url)
    .then(response => response.json())
    .then(Object => showCharacterComic(Object.data.results))
    .catch(err => console.error(err))
};


//Get Characters

let idCharacter ="";
const getIdCharacter = (id) =>{
  const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${keyPublic}&hash=${hash}`
  fetch(url)
    .then(response => response.json())
    .then(Object => printDataCharacter(Object.data.results))
    .catch(err => console.error(err))
    idCharacter = id
    getIdComicCharacter(idCharacter)
    return idCharacter
};

const getIdComicCharacter = (id) =>{
  const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${timestamp}&apikey=${keyPublic}&hash=${hash}`
  fetch(url)
    .then(response => response.json())
    .then(Object => printDataComicCharacter(Object.data.results))
    .catch(err => console.error(err))
};

