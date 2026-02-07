import '../styles/Home.scss';
import { useEffect, useState } from 'react';
import { Icons } from '../icons/Icons.jsx';
import { SearchBar } from '../components/SearchBar.jsx';

export const Home = () => {
    const [search, setSearch] = useState('');
    const [cityWeather, setCityWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

    useEffect(() => {
        console.log('VITE_API_BASE_URL:', apiBaseUrl || '(empty)');
    }, [apiBaseUrl]);

    const getCityWeather = async (zipCode) => {
        try {
            setIsLoading(true);
            setError('');

            const weatherResponse = await fetch(
                `${apiBaseUrl}/api/weather?zip=${encodeURIComponent(zipCode)}`
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
                                    <div className='hourly-forecast-time'>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit' })}</div>
                                    <div>
                                        {hour.weather?.[0]?.icon ? (
                                            <img
                                                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                                                alt={hour.weather[0].description}
                                                className='daily-weather-icon'
                                            />
                                        ) : null}
                                    </div>
                                    <div className='hourly-forecast-temp'>{`${hour.temp.toFixed(0)}°F`}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className='main-bottom'>
                        <div className='daily-forecast-container'>
                            <div className='daily-forecast-wrapper'>
                                {dailyForecast.map((day, index) => (
                                    <div key={index} className='daily-forecast-box'>
                                        <div className='daily-forecast-date'>
                                            <div>
                                                {new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
                                            </div>
                                            <div>
                                                {new Date(day.dt * 1000).toLocaleDateString([], { day: 'numeric' })}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                {day.weather?.[0]?.icon ? (
                                                    <img
                                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                                        alt={day.weather[0].description}
                                                        className='daily-weather-icon'
                                                    />
                                                ) : null}
                                            </div>
                                            <div className='daily-forecast-highlow'>
                                                <div className='daily-forecast-min'>{`${day.temp.min.toFixed(0)}°F`}</div>
                                                <div className='daily-forecast-max'>{`${day.temp.max.toFixed(0)}°F`}</div>
                                            </div>
                                        </div>
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
