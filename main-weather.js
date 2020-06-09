main();


function main () {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
}


function getWeather (latitude, longitude) {
    const url = 'https://api.weatherbit.io/v2.0/current?key=b6c342321e2f4657b56ad5258418d598&lat='+ latitude  + '&lon=' + longitude
    // throw new Error();
  return fetch(url)
  .then(response => {
      if (!response.ok) {
          throw new Error(response.status);
      }
      return response.json();
  })
  
 }



const render = (myJson, error) => {
    const containerCard = document.createElement("div");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    let containerCardArray = [h2, article];

    
    if (error) {
        const notificationBar = document.createElement("div");
        const notificationText = document.createTextNode("Hay un problema");
        notificationBar.className = "notification";
        notificationBar.appendChild(notificationText);
        containerCardArray = [h2, notificationBar, article];
    }

    const articleElement = [img, h3, h4];
    const containerBox = document.querySelector("#containerBox");
    const { city_name, temp, weather} = myJson || { city_name : '-', temp : '-' , weather : { description : '', icon : "uunknown"} } 

   

    containerCard.className = "container-card";
    h2.textContent = city_name;
    h3.textContent = temp;
    h4.textContent = weather.description;

    const icon = weather.icon;
    img.src = `icons/${icon.substr(1)}.png`;

    articleElement.forEach(element => {
        article.appendChild(element);
    });

    containerCardArray.forEach(element => {
        containerCard.appendChild(element);
    });

    containerBox.appendChild(containerCard);
    document.body.appendChild(containerBox);


}

function locationError (error) {
    render(null, error); 
}

async function locationSuccess (position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    try {
    const dateWeather = await getWeather (latitude, longitude);
    console.log(dateWeather);
    
    render(dateWeather.data[0])
} catch (error) {
    render(null, error); 
  }

}


