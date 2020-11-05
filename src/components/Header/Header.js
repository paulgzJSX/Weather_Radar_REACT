import React, { useState, useEffect, memo } from 'react'
import { Link } from "react-router-dom";
import { getMyCoordinates } from '../../helpers/Helpers'
import axios from 'axios'
import './header.css'


const Header = () => {
    const [localBrief, setLocalBrief] = useState()

    useEffect(() => {
        getMyCoordinates
            .then(position => {
                axios.get(`${process.env.REACT_APP_LOCATION_FORECAST_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                    .then(({ data }) => setLocalBrief({
                        currentTemp: data.properties.timeseries[0].data.instant.details.air_temperature,
                        symbolCode: data.properties.timeseries[0].data.next_1_hours.summary.symbol_code
                    }))
            })
            .catch(err => alert(err))
    }, [])

    return (
        <header>
            <Link to='/'><h2>Weather Wise</h2></Link>
            <ul>
                <li><Link to='/aviation'>Aviation</Link></li>
                {localBrief &&
                    <div className="header-brief">
                        <h3>{localBrief.currentTemp}°</h3>
                        <img src={require(`../../images/icons/weathericon/png/${localBrief.symbolCode}.png`)} alt="" />
                    </div>}
            </ul>
        </header>
    )
}

export default memo(Header)
