let btn = document.getElementById('btnSend');


//Request options

let baseUrl = "https://api.openweathermap.org/data/2.5/weather";
let key = '0397fd0aa39e47fef4da89c2169584ec';
let promises = [];


//Event listeners
btn.addEventListener('click',handleClick,false);

function handleClick(e){
    btn.disabled = true;
    let elsArray = document.querySelectorAll('.form-field');
    elsArray.forEach((element,index) => {
        let cityField = document.getElementById(`city-${index}`);
        let city = cityField.value;
        cityField.disabled = true;
        updateUI(`<img src="images/spinner.gif" alt="spinner" id="spinner"`, index);
        let promise = makeRequest(city);
        promises.push(promise);
        promise.then(data=>createSuccessHtml(data, index))
            .catch(error => createErrorHtml(error, index))
            .finally(()=> restCityField(cityField))
    });
    //console.log(promises);
    /*
    Promise.all(promises)
        .then(()=> {btn.disabled = false})
        .then(()=>{promises = []})
    */

    Promise.allSettled(promises)
        .then(()=> {btn.disabled = false})
        .then(()=>{promises = []})
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

function createSuccessHtml(data, index){
    let weather =data.weather[0]
    let html = `
        <h1>Le temps à ${data.name}<h1>
        <p class="weatherMain">
            <img src="http://openweathermap.org/img/${weather.icon}.png" alt="${weather.description}"/><span>${weather.description}</span>
        </p>
        <p>Température : ${data.main.temp.toFixed(1)} °C </p>
        
        `
    updateUI(html, index);
}

function createErrorHtml(data, index){
    let html = `
        <h1>Une erreur c'est produite ! </h1>
        <p>${data.message}</p>
    `;
    updateUI(html, index);
}

//Utilities
let buildUrl = city => `${baseUrl}?units=metric&lang=fr&q=${city}&APPID=${key}`;
let updateUI = (html, index) => {
    let response = document.getElementById(`response-${index}`);

    //empty response conatiner
    response.innerHTML = '';
    //remplace with htmlString
    //console.log(response)
    response.insertAdjacentHTML('beforeend', html);
    
};

function restCityField(cityField){
    //reset form
    cityField.disabled = false;
    cityField.value = '';
    //btn.disabled = false;
}