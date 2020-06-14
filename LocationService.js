export function getWeather (latitude, longitude) {
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

