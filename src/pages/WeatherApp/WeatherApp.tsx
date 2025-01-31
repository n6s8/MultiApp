import styles from "./WeatherApp.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface WeatherData {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
    };
    forecast: {
        forecastday: Array<{
            date: string;
            day: {
                condition: {
                    text: string;
                    icon: string;
                };
                maxtemp_c: number;
                mintemp_c: number;
                avghumidity: number;
                daily_chance_of_rain: number;
            };
        }>;
    };
}

export default function WeatherApp() {
    const [city, setCity] = useState<string>("Astana");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const navigate = useNavigate();

    const fetchWeather = async (selectedCity: string) => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${selectedCity}&days=5`
            );
            const data: WeatherData = await response.json();
            setWeather(data);
        } catch (error) {
            console.error("Weather API fetch error:", error);
        }
    };


    useEffect(() => {
        fetchWeather(city);
    }, []);

    return (
        <div className={styles.main}>
            <h2>Weather App</h2>
            <div className={styles.search}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name..."
                />
                <button onClick={() => fetchWeather(city)}>Search</button>
            </div>

            {weather && (
                <div className={styles.result}>
                    <h3>
                        {weather.location.name}, {weather.location.country}
                    </h3>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>{weather.current.condition.text}</p>
                    <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                </div>
            )}

            {weather && weather.forecast && (
                <div className={styles.forecast}>
                    <h3>5-Day Forecast</h3>
                    <div className={styles.forecastContainer}>
                        {weather.forecast.forecastday.map((day, index) => (
                            <div key={index} className={styles.forecastItem}>
                                <h4>{day.date}</h4>
                                <img src={day.day.condition.icon} alt="Day Condition" />
                                <p>{day.day.condition.text}</p>
                                <p>Макс: {day.day.maxtemp_c}°C / Мин: {day.day.mintemp_c}°C</p>
                                <p>Влажность: {day.day.avghumidity}%</p>
                                <p>Вероятность осадков: {day.day.daily_chance_of_rain}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={() => navigate("/")}
                className={styles.home}
            >
                Return to Home
            </button>
        </div>
    );
}
