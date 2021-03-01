window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.temperature');
    let locationHumidity = document.querySelector('.location-humidity');
    const temperatureSpan = document.querySelector('.temperature span');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary,icon,humidity} = data.currently;
                    //set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    let celsius = (temperature - 32) * (5 / 9);
                    locationTimeZone.textContent = data.timezone;
                    setIcons(icon, document.querySelector('.icon'));
                    locationHumidity.textContent = humidity;
                    
                    //Change temp to celsius/fahrenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                        }                    
                    })
                });
        });
    }
    //formula for celsius
    
    
    function setIcons(icon, iconId)
    {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});