import SectionHeading from "./SectionHeading";
import {useState, useEffect} from "react";
import { WEATHER_API_KEY } from "./Helpers";

export default function WeatherSection() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Fetch weather data through API
    const cities = ["Galkot", "Kathmandu", "Tokyo", "Melbourne"];
    Promise.all([fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=` + cities[0]).then(res => res.json()),
                  fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=` + cities[1]).then(res => res.json()),
                  fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=` + cities[2]).then(res => res.json()),
                  fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=` + cities[3]).then(res => res.json())
                ])
    .then(res => setWeatherData(res))
    .catch(err => console.log(err))
  }, []);

  return (
    <section className="weather-section">
      <div className="container">
        <SectionHeading value="Climate" headingStyle="centered" />
        <div className="row d-flex align-items-center mt-5 weather-item-container">
          <div className="col-lg-3 column1">
            <h5 className="text-weather">Weather</h5>
            <p className="text-forecast">Today's Forecast</p>
          </div>
          <div className="col-lg-9 column2">
            <div className="row">
              {weatherData && weatherData.map(weatherItem => (
                <article className="weather-item col-6 col-lg-3" key={weatherItem.location.name}>
                  <p className="current-weather-text">{weatherItem.current.condition.text}</p>
                  <div className="current-weather-info">
                    <img className="img-fluid" src={weatherItem.current.condition.icon} />
                    <p className="current-temp">{weatherItem.current.temp_c}<sup>o</sup>C</p>
                  </div>
                  <p className="current-weather-location">{weatherItem.location.name}</p>           
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}