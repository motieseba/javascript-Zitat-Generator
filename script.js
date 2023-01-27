const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const loader = document.getElementById("loader");
const quateContainer = document.getElementById("quote-container");
const copyBtn = document.getElementById("copy");






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

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2626166747mshcf49d082d785611p1cb8d5jsne81809b35591',
        'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
    }
};


async function getQuote(){
    loading();
    try {
        const response= await fetch('https://quotes15.p.rapidapi.com/quotes/random/?language_code=de', options);
        if (!response.ok) {
            throw new Error(`Getting error: ${response}`);
        }
        const data = await response.json(); 
        document.getElementById("quote").innerText = data.content;
		if (data.originator.name=== '') {
            document.getElementById("author").innerText = 'Unkonown';
        } else {
            document.getElementById("author").innerText = data.originator.name;}
        if (data.content.length > 120) {
            document.getElementById("quote").classList.add('long-quote');
        } else {                
            document.getElementById("quote").classList.remove('long-quote');
        }
        document.getElementById("quote").innerText = data.content;
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

// event listner

document.getElementById("new-quote").addEventListener('click', getQuote);
document.getElementById("twitter").addEventListener('click', tweetquote);
copyBtn.addEventListener("click", ()=>{navigator.clipboard.writeText(quoteText.innerText);});
//On load
document.getElementById("fb-share").setAttribute( 'data-href', document.URL);
getQuote();