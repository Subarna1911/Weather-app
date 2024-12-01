// Function to fetch weather based on the selected city
async function getWeather() {
    const city = document.getElementById("textField").value;

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const weatherSection = document.querySelector(".weather");
    weatherSection.style.display = "block";

    const apiKey = "441b80aef74b7b5788016f43fb9c6dbc";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        console.log('Request URL:', url);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        if (data.cod === 200) {
            if (data.weather && data.weather[0]) {
                document.querySelector(".city").innerText = data.name;
                document.querySelector(".degree").innerText = `${data.main.temp}°C`;
                document.querySelector(".message").innerText = getWeatherMessage(data.weather[0].main);
                document.querySelector(".weather__img").src = getWeatherImage(data.weather[0].main);
                document.querySelector("#humidity").innerText = `${data.main.humidity}%`;
                document.querySelector("#windSpeed").innerText = `${data.wind.speed} m/s`;
                document.querySelector("#condition").innerText = data.weather[0].description;
            } else {
                alert("Weather data missing or malformed.");
            }
        } else {
            alert("City not found, please try again!");
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong! Please try again later.");
    }
}

// Function to display weather message based on condition
function getWeatherMessage(weatherCondition) {
    if (weatherCondition === "Clear") {
        return "It's a bright day!";
    } else if (weatherCondition === "Clouds") {
        return "It's cloudy today!";
    } else if (weatherCondition === "Rain") {
        return "Don't forget your umbrella!";
    } else {
        return "Have a nice day!";
    }
}

// Function to return weather image based on condition
function getWeatherImage(weatherCondition) {
    if (weatherCondition === "Clear") {
        return "/image/sunny.png";
    } else if (weatherCondition === "Clouds") {
        return "/image/partially-clou.png";
    } else if (weatherCondition === "Rain") {
        return "/image/raining.png";
    } else {
        return "/image/thunder.png";
    }
}

// Function to fetch city suggestions
async function getCitySuggestions() {
    const city = document.getElementById("textField").value;
    const suggestionsContainer = document.getElementById("suggestions");

    if (city.length >= 3) {
        const apiKey = "441b80aef74b7b5788016f43fb9c6dbc";
        const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log(data);

            suggestionsContainer.innerHTML = '';

            if (data.list && data.list.length > 0) {

                data.list.forEach(place => {
                    const suggestion = document.createElement('div');
                    suggestion.classList.add('suggestion-item');
                    suggestion.innerText = `${place.name}, ${place.sys.country}`;
                    suggestion.onclick = () => {
                        document.getElementById("textField").value = `${place.name}, ${place.sys.country}`;
                        suggestionsContainer.innerHTML = '';
                        getWeather();
                    };
                    suggestionsContainer.appendChild(suggestion);
                });
                suggestionsContainer.style.display = 'block';
            } else {

                suggestionsContainer.innerHTML = '<div>No cities found</div>';
            }
        } catch (error) {
            console.error("Error fetching city suggestions:", error);
        }
    } else {

        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';
    }
}

