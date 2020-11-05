import React, { useContext } from 'react'
import { WeatherContext } from '../../../context/WeatherContext'

const CurrentTemperature = () => {
    const { currentWeather, tenDaysData } = useContext(WeatherContext)

    return (
        <div className="current-temp">
            {currentWeather && <h1>{currentWeather.current.air_temperature}°</h1>}
            {tenDaysData &&
                <div className="high-low">
                    <p className='high'>High: {tenDaysData[0].max}°</p>
                    <p className='low'>Low: {tenDaysData[0].min}°</p>
                </div>}
        </div>
    )
}

export default CurrentTemperature
