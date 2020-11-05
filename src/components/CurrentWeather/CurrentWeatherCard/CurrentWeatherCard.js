import React, { useContext, useEffect } from 'react'
import { WeatherContext } from '../../../context/WeatherContext';
import { getMyCoordinates } from '../../../helpers/Helpers'
import CurrentTemperature from './CurrentTemperature';
import LocationDetails from './LocationDetails';
import WeatherDetails from './WeatherDetails';

const CurrentWeatherCard = () => {
    const { getLocationForecast, currentWeather, locationDetails } = useContext(WeatherContext)

    useEffect(() => {
        getMyCoordinates
            .then(position => getLocationForecast(position.coords.latitude, position.coords.longitude))
            .catch(err => alert(err))
    }, [])

    return (
        <>
            {currentWeather && locationDetails &&
                <div className="current-card">
                    <LocationDetails />
                    <CurrentTemperature />
                    <WeatherDetails />
                </div>
            }
        </>
    )
}

export default CurrentWeatherCard
