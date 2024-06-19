const container = document.querySelector(".container");
const search = document.querySelector(".searchcontainer button");
const weatherContainer = document.querySelector(".weathercontainer");
const details = document.querySelector(".details");

search.addEventListener("click", () => {
    const apikey = "e3a6f376782deaf4e7d06fcd92519084";
    const city = document.querySelector(".searchcontainer input").value;

    if (city === "")
        return;

    removeAnimations();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod !== 200) {
                displayError();
                return;
            }

            const image = document.querySelector(".weathercontainer img");
            const temp = document.querySelector(".weathercontainer .temp");
            const content = document.querySelector(".weathercontainer .content");
            const humidity = document.querySelector(".details .humi-info span");
            const wind = document.querySelector(".details .wind-info span");
            const cityName = document.querySelector(".weathercontainer .city");
            const countryName = document.querySelector(".weathercontainer .country");
            const todayDate = document.querySelector(".weathercontainer .today");

            // Set temperature, description, humidity, wind speed, city name, country, and date
            temp.innerHTML = `${json.main.temp} <span>°C</span>`;
            content.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed} Km/h`;
            cityName.textContent = json.name;
            countryName.textContent = json.sys.country;
            todayDate.textContent = formatDate(new Date());

            // Set the weather icon
            switch (json.weather[0].main.toLowerCase()) {
                case "clear":
                    image.src = "images/clear.png";
                    break;
                case "rain":
                    image.src = "images/rain.png";
                    break;
                case "clouds":
                    image.src = "images/cloud.png";
                    break;
                case "mist":
                case "haze":
                    image.src = "images/mist.png";
                    break;
                case "snow":
                    image.src = "images/snow.png";
                    break;
                default:
                    image.src = "images/cloud.png";
                    break;
            }

            addAnimations();
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            displayError();
        });
});

function displayError() {
    const image = document.querySelector(".weathercontainer img");
    const temp = document.querySelector(".weathercontainer .temp");
    const content = document.querySelector(".weathercontainer .content");
    const humidity = document.querySelector(".details .humi-info span");
    const wind = document.querySelector(".details .wind-info span");
    const cityName = document.querySelector(".weathercontainer .city");
    const countryName = document.querySelector(".weathercontainer .country");
    const todayDate = document.querySelector(".weathercontainer .today");

    image.src = "images/404.png"; 
    temp.innerHTML = `N/A <span>°C</span>`;
    content.textContent = "Location not found";
    humidity.textContent = `N/A%`;
    wind.textContent = `N/A Km/h`;
    cityName.textContent = "Unknown";
    countryName.textContent = "Unknown";
    todayDate.textContent = formatDate(new Date());

    addAnimations();
}

function formatDate(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
}

function addAnimations() {
    weatherContainer.classList.add("animate");
    document.querySelector(".details .humi").classList.add("animate");
    document.querySelector(".details .wind").classList.add("animate");
}

function removeAnimations() {
    weatherContainer.classList.remove("animate");
    document.querySelector(".details .humi").classList.remove("animate");
    document.querySelector(".details .wind").classList.remove("animate");
}
