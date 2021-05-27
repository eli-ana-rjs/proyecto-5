const keyPrivate = 'cbdf661fcb1cb7101bf4be26755ee96bcec09d46';
const keyPublic ='161cf80a899f70cf088beb8b424fd631';
const timestamp = Date.now();

const hash = md5(timestamp + keyPrivate + keyPublic);

const previousPage = document.getElementById('previous-page');
const nextPage = document.getElementById('next-page');
let offset = 0;



const  fetchData = async() => {
  const url = `https://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${keyPublic}&hash=${hash}`;
  try{
    const response = await fetch(url);
    const parseResponse =  response.json();
    return parseResponse;
  }catch(error){
    console.error(error);
  }
}

