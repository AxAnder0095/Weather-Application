export const getWeatherByZip = async (req, res) => {
    const zip = req.query.zip;
    if (!zip) {
        return res.status(400).json({ message: 'Zip code is required.' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ message: 'Missing server API key.' });
    }

    try {
        const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/zip?zip=${encodeURIComponent(zip)},US&appid=${apiKey}`
        );
        const geoData = await geoResponse.json();

        if (!geoResponse.ok) {
            return res.status(geoResponse.status).json({
                message: geoData?.message || 'Unable to find that zip code.'
            });
        }

        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${geoData.lat}&lon=${geoData.lon}&units=imperial&appid=${apiKey}`
        );
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            return res.status(weatherResponse.status).json({
                message: weatherData?.message || 'Unable to fetch weather data.'
            });
        }

        return res.json(weatherData);
    }
    catch (error) {
        console.error('Weather API error:', error);
        return res.status(500).json({ message: 'Server error fetching weather.' });
    }
};
