let btn = document.getElementById('btnSend');
let cityField = document.getElementById('city');
let response = document.getElementById('response');

//Request options

let baseUrl = "https://api.openweathermap.org/data/2.5/weather";
let key = '0397fd0aa39e47fef4da89c2169584ec';
let xhr;

//Event listeners
console.log(btn)
btn.addEventListener('click',handleClick,false);

function handleClick(e){
    let city = cityField.value;
    cityField.disabled = true;
    btn.disabled = true;
    updateUI(`<img src="images/spinner.gif" alt="spinner" id="spinner"`);
    xhr = new XMLHttpRequest();
    xhr.open('GET', buildUrl(city));
    xhr.onreadystatechange = handleResponse;
    xhr.send();
}

function handleResponse(){
    console.log(xhr.readyState)
    if(xhr.readyState == 4){
        console.log(xhr.status)
        if(xhr.status == 200){
            //success
        }else{
            //failure
        }

    }
}

//Utilities
let buildUrl = city => `${baseUrl}?units=metric&lang=fr&q=${key}`;
let updateUI = html => {
    //empty response conatiner
    response.innerHTML = '';
    //remplace with htmlString
    console.log(response)
    //response.insertAdjacentElement('beforeend', html);
    //reset form
    cityField.disabled = false;
    btn.disabled = false;
}