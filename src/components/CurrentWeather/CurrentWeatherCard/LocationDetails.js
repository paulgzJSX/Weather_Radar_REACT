import React, { useContext } from 'react'
import { WeatherContext } from '../../../context/WeatherContext';
import ClosestCity from './ClosestCity';

const LocationDetails = () => {
    const { currentWeather, locationDetails, closeCities } = useContext(WeatherContext)

    return (
        <div className="card-header">
            <div className="left-header">
                <h3>{locationDetails.city}, {locationDetails.country}</h3>
                <div className="closest-cities">
                    {closeCities && closeCities.map(closeCity =>
                        <ClosestCity key={closeCity.name} closeCity={closeCity} />)}
                </div>
            </div>
            <div className="right-header">
                <img src={require(`../../../images/icons/weathericon/png/${currentWeather.symbolCode}.png`)} alt="" />
            </div>
        </div>
    )
}

export default LocationDetails
