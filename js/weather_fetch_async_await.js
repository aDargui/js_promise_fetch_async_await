let btn = document.getElementById('btnSend');
let cityField = document.getElementById('city');
let response = document.getElementById('response');

//Request options

let baseUrl = "https://api.openweathermap.org/data/2.5/weather";
let key = '0397fd0aa39e47fef4da89c2169584ec';


//Event listeners
btn.addEventListener('click',handleClick,false);

async function handleClick(e){
    let city = cityField.value;
    cityField.disabled = true;
    btn.disabled = true;
    updateUI(`<img src="images/spinner.gif" alt="spinner" id="spinner"`);
    try{
        let response = await fetch(buildUrl(city));
        let data = await handleErrors(response);
        await createSuccessHtml(data);
        await restForm();
    } catch(error){
        createErrorHtml(error);
    } finally{
        restForm();
    }
}
async function handleErrors(response){
    if(response.ok){
        return response.json()
    }else{
        let error = await response.json();
        throw error;
    }
}

function createSuccessHtml(data){
    let weather =data.weather[0]
    let html = `
        <h1>Le temps à ${data.name}<h1>
        <p class="weatherMain">
            <img src="http://openweathermap.org/img/${weather.icon}.png" alt="${weather.description}"/><span>${weather.description}</span>
        </p>
        <p>Température : ${data.main.temp.toFixed(1)} °C </p>
        
        `
    updateUI(html);
}

function createErrorHtml(data){
    let html = `
        <h1>Une erreur c'est produite ! </h1>
        <p>${data.message}</p>
    `;
    updateUI(html);
}

//Utilities
let buildUrl = city => `${baseUrl}?units=metric&lang=fr&q=${city}&APPID=${key}`;
let updateUI = html => {
    //empty response conatiner
    response.innerHTML = '';
    //remplace with htmlString
    //console.log(response)
    response.insertAdjacentHTML('beforeend', html);
    
};

function restForm(){
    //reset form
    cityField.disabled = false;
    btn.disabled = false;
}