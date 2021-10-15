window.addEventListener('load', () =>{
    const date = new Date();
    const clock = date.getHours();
    console.log(clock);
    if(clock >= 7 && clock <= 18){
        document.querySelector('body').style.backgroundImage = 'url("sun.jpg")';
        document.querySelector('body').style.backgroundRepeat = 'no-repeat'
        document.querySelector('body').style.backgroundAttachment = 'fixed';
        document.querySelector('body').style.backgroundSize = 'cover'
    }
    else{
        document.querySelector('body').style.backgroundImage = 'url("night.jpg")';
        document.querySelector('body').style.backgroundRepeat = 'no-repeat'
        document.querySelector('body').style.backgroundAttachment = 'fixed';
        document.querySelector('body').style.backgroundSize = 'cover'
    }
    let long;
    let lat;
    let cityName = document.querySelector('.city-name');
    let temperatureSection = document.querySelector('.temperature');
    let temperatura = document.querySelector('.temp');
    const temperatureSpan = document.querySelector('.temperature span')
    let dateTime = document.querySelector('.datetime');
    let uv = document.querySelector('.uv-index');
    let windSpeed = document.querySelector('.wind-speed');
    let description = document.querySelector('.desc');
    let icona = document.querySelector('.iconica');
    if(navigator.geolocation.getCurrentPosition(
        function(position){
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=1168e4b1378d4276831e8c35ff8ec267&include=minutely`
            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                cityName = data.data[0].city_name;
                temperature = data.data[0].temp;
                dateTime = data.data[0].datetime;
                uv = data.data[0].uv;               
                windSpeed = data.data[0].wind_spd;
                temperature = Math.floor(temperature);
                uv = Math.floor(uv);
                windSpeed = Math.floor(windSpeed);
                description = data.data[0].weather.description;
                document.querySelector('.city-name').innerHTML = cityName;
                document.querySelector('.temp').innerHTML = temperature;
                document.querySelector('.datetime').innerHTML = dateTime;
                document.querySelector('.uv-index').innerHTML= uv;
                document.querySelector('.wind-speed').innerHTML = windSpeed;
                document.querySelector('.desc').innerHTML = description;
                var icona = data.data[0].weather.icon;
                var iconUrl = "https://www.weatherbit.io/static/img/icons/" + icona + '.png';
                $('.iconica').html("<img src = '" + iconUrl + "'>");
                let fahreinheit = Math.floor((temperature * 1.8) + 32);
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === 'C'){
                        temperatureSpan.textContent = 'F';
                        temperatura.textContent = fahreinheit;
                    }
                    else{
                        temperatureSpan.textContent = 'C';
                        temperatura.textContent = temperature;
                    }
                })
            })
        }
    ));
})
