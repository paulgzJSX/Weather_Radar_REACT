import React, { useContext } from 'react'
import { WeatherContext } from '../../../context/WeatherContext'

const ClosestCity = ({ closeCity }) => {
    const { getLocationForecast } = useContext(WeatherContext)

    const handleClick = () => {
            getLocationForecast(closeCity.lat, closeCity.lon)
    }

    return (
        <>
            <a href="#" onClick={handleClick}>{closeCity.name}</a>
        </>
    )
}

export default ClosestCity
