async function getWeather() {
    const city = document.getElementById("textField").value;

    if (!city) {
        alert("Please enter a city name.");
        return; 
    }
    const apiKey = "441b80aef74b7b5788016f43fb9c6dbc";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        console.log('Request URL:', url); // Log URL for debugging

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Log the full response to see what the API returns

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

function getWeatherImage(weatherCondition) {
    if (weatherCondition === "Clear") {
        return "sunny.png"; 
    } else if (weatherCondition === "Clouds") {
        return "partially-clou.png";
    } else if (weatherCondition === "Rain") {
        return "rainning.png";
    } else {
        return "thunder.png";
    }
}
