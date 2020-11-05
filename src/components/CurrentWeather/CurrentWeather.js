import React from 'react'
import Map from './Map'
import CurrentWeatherCard from './CurrentWeatherCard/CurrentWeatherCard';
import './currentWeather.css'

const CurrentWeather = () => {
    return (
        <section className='current-weather'>
            <Map />
            <CurrentWeatherCard />
        </section>
    )
}

export default CurrentWeather
