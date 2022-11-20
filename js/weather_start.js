let btn = document.getElementById('btnSend');
let cityField = document.getElementById('city');
let response = document.getElementById('response');

//Request options

let baseUrl = "https://api.openweathermap.org/data/2.5/weather";
let key = '0397fd0aa39e47fef4da89c2169584ec';


//Event listeners
btn.addEventListener('click',handleClick,false);

function handleClick(e){
    let city = cityField.value;
    cityField.disabled = true;
    btn.disabled = true;
    updateUI(`<img src="images/spinner.gif" alt="spinner" id="spinner"`);
    console.log(makeRequest(city));
    makeRequest(city)
        //.then(data => createSuccessHtml(data), error => createErrorHtml(error))
        //avec methode catch pour les erreurs
        .then(data => createSuccessHtml(data))
        .catch(error => createErrorHtml(error))

}

function makeRequest(city){
    return new Promise((resolve, reject) => {
        let xhr;
        xhr = new XMLHttpRequest();
        xhr.open('GET', buildUrl(city));
        xhr.onreadystatechange = () =>{
            //console.log(xhr.readyState)
            if(xhr.readyState == 4){
                //console.log(xhr.status)
                if(xhr.status == 200){
                    //success
                    console.log(xhr.responseText)
                    let response = JSON.parse(xhr.responseText)
                    //console.log(response);
                    // createSuccessHtml(response)
                    resolve(response )
                }else{
                    //failure
                    //console.log(xhr.responseText)
                    let response = JSON.parse(xhr.responseText)
                    //console.log(response.message);
                    //createErrorHtml(response);
                    reject(response )
                }

            }
            
        };
        xhr.send();

    });
}

/*
function handleResponse(){
    console.log(xhr.readyState)
    if(xhr.readyState == 4){
        console.log(xhr.status)
        if(xhr.status == 200){
            //success
            console.log(xhr.responseText)
            let response = JSON.parse(xhr.responseText)
            console.log(response);
            createSuccessHtml(response)
        }else{
            //failure
            console.log(xhr.responseText)
            let response = JSON.parse(xhr.responseText)
            console.log(response.message);
            createErrorHtml(response);
        }

    }
}
*/

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
    console.log(response)
    response.insertAdjacentHTML('beforeend', html);
    //reset form
    cityField.disabled = false;
    btn.disabled = false;
}