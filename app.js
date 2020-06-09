const apiKey = 'b6c342321e2f4657b56ad5258418d598';
const URL = 'https://api.weatherbit.io/v2.0/current';
let latitude;
let longitude;
const notification = document.getElementsByClassName('notification')[0];
let weather;

getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
}

function kelvinToCelsius(temp) {
    return temp - 273.15;
}

function onSuccess(position) {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    const weatherCall = fetch(URL + '?'
                            + 'lat=' + latitude
                            + '&lon=' + longitude
                            + '&key=' + apiKey);

    weatherCall.then(response => response.json())
            .then(weatherInfo => {
                console.log(weatherInfo);
                let tempIcon = document.querySelector("#temp-value");
                tempIcon.innerHTML = weatherInfo.data[0].temp;

                
                console.log(weatherInfo.data[0].temp);
                console.log(weatherInfo.data[0].weather.icon);
                console.log(weatherInfo.data[0].weather.description);
                console.log(weatherInfo.data[0].city_name);
                //console.log(kelvinToCelsius(weatherInfo.main.temp).toFixed(1));
                //console.log(weatherInfo.weather[0].main);
                //console.log(weatherInfo.name);
            });
}

function onError(error) {
    console.error('No no no ', error);
    // 1. take message and put it in a p
    const p = document.createElement('p');
    p.innerHTML = error.message;
    // 2. display: block (notification div)
    notification.style.display = 'block';
    // 3. append p inside notification
    notification.appendChild(p);
}

