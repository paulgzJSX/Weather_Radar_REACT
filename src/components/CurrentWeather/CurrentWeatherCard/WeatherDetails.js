import React, { useContext } from 'react'
import { WeatherContext } from '../../../context/WeatherContext'

const WeatherDetails = () => {
    const { currentWeather } = useContext(WeatherContext)

    return (
        <div className="weather-details">
            <div className="details-item">
                <p>Wind: </p>
                <p>{currentWeather.current.wind_speed} m/s</p>
            </div>
            <div className="details-item">
                <p>Relative Humidity: </p>
                <p>{currentWeather.current.relative_humidity}%</p>
            </div>
            <div className="details-item">
                <p>Cloud Cover:</p>
                <p>{currentWeather.current.cloud_area_fraction}%</p>
            </div>
            <div className="details-item">
                <p>Wind Direction:</p>
                <p>{currentWeather.current.wind_from_direction} deg</p>
            </div>
        </div>
    )
}

export default WeatherDetails
