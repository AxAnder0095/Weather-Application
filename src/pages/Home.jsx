import '../styles/Home.scss';
import { useState } from 'react';
import { Icons } from '../icons/Icons.jsx';
import { SearchBar } from '../components/SearchBar.jsx';

export const Home = () => {
    const [search, setSearch] = useState('');
    const [cityWeather, setCityWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getCityWeather = async (zipCode) => {
        try {
            setIsLoading(true);
            setError('');

            const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
            if (!apiKey) {
                throw new Error('Missing API key. Set VITE_OPENWEATHER_API_KEY in .env.');
            }

            const geoResponse = await fetch(
                `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`
            );
            const geoData = await geoResponse.json();

            if (!geoResponse.ok) {
                throw new Error(geoData?.message || 'Unable to find that zip code.');
            }

            // console.log('Geocoding data:', geoData);

            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${geoData.lat}&lon=${geoData.lon}&units=imperial&appid=${apiKey}`
            );
            const weatherData = await weatherResponse.json();

            if (!weatherResponse.ok) {
                throw new Error(weatherData?.message || 'Unable to fetch weather data.');
            }

            setCityWeather(weatherData);
            console.log('Weather data:', weatherData);
            return weatherData;
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
            setError(error.message || 'Something went wrong.');
            return null;
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        if (isLoading) {
            return;
        }

        if (!search.trim()) {
            setError('Enter a valid zip code.');
            return;
        }

        await getCityWeather(search.trim());
    };

    const iconCode = cityWeather?.current?.weather?.[0]?.icon;
    const iconDescription = cityWeather?.current?.weather?.[0]?.description;
    const mainDescription = cityWeather?.current?.weather?.[0]?.main;

    const hourtlyForecast = cityWeather?.hourly || [];
    const dailyForecast = cityWeather?.daily || [];

    return (
        <div className='home'>
            <div className='home-content'>
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                    error={error}
                />
                <main className='main'>
                    <section className='main-top'>
                        <div className='main-top-left'>
                            <div className='current-temp-container'>
                                <div className='current-temp'>
                                    <span className='main-icon'>
                                        {iconCode ? (
                                            <img
                                                src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
                                                alt={iconDescription || 'Current weather'}
                                                className='weather-main-icon'
                                            />
                                        ) : null}
                                    </span>
                                    <span className='main-temp'>
                                        <div>
                                            <div>
                                                {cityWeather ? `${cityWeather.current.temp.toFixed(0)}°F` : 'No data'}
                                            </div>
                                            <div>
                                                <p className='main-description'>{mainDescription}</p>
                                                <p className='sub-description'>{iconDescription}</p>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='main-top-right'>
                            <div className='misc-data'>
                                <div className='box'>
                                    <div className='weather-title'>{cityWeather ? (<span className='misc'>{Icons.feelsLike} Feels Like</span>) : 'No data'}</div>
                                    <div className='weather-icon'>{cityWeather ? `${cityWeather.current.feels_like.toFixed(0)}°F` : null}</div>
                                </div>
                                <div className='box'>
                                    <div className='weather-title'>{cityWeather ? (<span className='misc'>{Icons.dewPoint} Dew Point</span>) : 'No data'}</div>
                                    <div className='weather-icon'>{cityWeather ? `${cityWeather.current.dew_point.toFixed(0)}°F` : null}</div>
                                </div>
                                <div className='box'>
                                    <div className='weather-title'>{cityWeather ? (<span className='misc'>{Icons.visibility} Visibility</span>) : 'No data'}</div>
                                    <div className='weather-icon'>{cityWeather ? `${cityWeather.current.visibility} m` : null}</div>
                                </div>
                                <div className='box'>
                                    <div className='weather-title'>{cityWeather ? (<span className='misc'>{Icons.pressure} Pressure</span>) : 'No data'}</div>
                                    <div className='weather-icon'>{cityWeather ? `${cityWeather.current.pressure} hPa` : null}</div>
                                </div>
                                <div className='box'>
                                    <div className='weather-title'>{cityWeather ? (<span className='misc'>{Icons.windSpeed} Wind Speed</span>) : 'No data'}</div>
                                    <div className='weather-icon'>{cityWeather ? `${cityWeather.current.wind_speed.toFixed(0)} mph` : null}</div>
                                </div>
                                <div className='box'>
                                    <div className='weather-title'>{cityWeather ? (<span className='misc'>{Icons.windDegree} Wind Degree</span>) : 'No data'}</div>
                                    <div className='weather-icon'>{cityWeather ? `${cityWeather.current.wind_deg}°` : null}</div>
                                </div>
                                <div className='box'>
                                    <div className='weather-title'>{cityWeather ? (<span className='misc'>{Icons.clouds} Clouds</span>) : 'No data'}</div>
                                    <div className='weather-icon'>{cityWeather ? `${cityWeather.current.clouds}%` : null}</div>
                                </div>
                                <div className='box'>
                                    <div className='weather-title'>{cityWeather ? (<span className='misc'>{Icons.humidity} Humidity</span>) : 'No data'}</div>
                                    <div className='weather-icon'>{cityWeather ? `${cityWeather.current.humidity}%` : null}</div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='main-middle'>
                        <div className='hourly-forecast-container'>
                            {hourtlyForecast.map((hour, index) => (
                                <div key={index} className='hourly-forecast-box'>
                                    <div className='hourly-forecast-time'>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit'})}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className='main-bottom'>
                        <div className='daily-forecast-container'>
                            <div className='daily-forecast-wrapper'>
                                {dailyForecast.map((day, index) => (
                                <div key={index} className='daily-forecast-box'>
                                    <div className='daily-forecast-date'>{new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short', day: 'numeric' })}</div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
};
