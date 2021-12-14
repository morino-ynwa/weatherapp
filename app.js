window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=185f612d91e3f81234cbe35acf203e11`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const temp = data.current.temp;
                    const weather = data.current.weather[0].description;
                    const icon_id = data.current.weather[0].icon;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = weather;
                    locationTimezone.textContent = data.timezone;

                    let celsius = temp - 273.15;
                    let fahrenheit = (temp - 273.15) * 9 / 5 + 32;

                    document.getElementById('icon').src = `http://openweathermap.org/img/w/${icon_id}.png`

                    //change temperature to Celsius/F
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "K"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else if (temperatureSpan.textContent === "C"){
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = Math.floor(fahrenheit);
                        }else{
                            temperatureSpan.textContent = "K";
                            temperatureDegree.textContent = temp;
                        }
                    });
                });
        });

    }
    

});
