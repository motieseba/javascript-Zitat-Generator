const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const loader = document.getElementById("loader");
const quateContainer = document.getElementById("quote-container");

function loading() {
    loader.hidden = false;
    quateContainer.hidden = true;
}
function complete() {
    if(!loader.hidden){
        quateContainer.hidden = false;
        loader.hidden = true ;
    }
}
//get quate from api

async function getQuote(){
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response= await fetch(proxyUrl + apiUrl);
        const data = await response.json(); 
        document.getElementById("quote").innerText = data.quoteText;
		if (data.quoteAuthor=== '') {
            document.getElementById("author").innerText = 'Unkonown';
        } else {
            document.getElementById("author").innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 120) {
            document.getElementById("quote").classList.add('long-quote');
        } else {
            document.getElementById("quote").classList.remove('long-quote');
            
        }
        document.getElementById("quote").innerText = data.quoteText;
        complete();
    } catch (error) {
        getQuote(); 
        console.log('whoops error no quote',error);
    }
    
}
function tweetquote() {
    const  quote =quoteText.innerText;
    const  author =authorText.innerText;
    const twitterUrl = 'https://twitter.com/intent/tweet?text='+quote+' - '+author;
    window.open(twitterUrl, '_blank');
}
function setUrl() {
    document.getElementById("fb-share").setAttribute( 'data-href', document.URL);
}

// event listner
//document.getElementById("facebook").addEventListener('click', setUrl);
document.getElementById("new-quote").addEventListener('click', getQuote);
document.getElementById("twitter").addEventListener('click', tweetquote);
//On load
document.getElementById("fb-share").setAttribute( 'data-href', document.URL);
getQuote();