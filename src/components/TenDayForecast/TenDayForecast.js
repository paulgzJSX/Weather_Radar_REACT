import React from 'react'
import TenDayCardsContainer from './TenDayCardsContainer'
import './tenDayForecast.css'

const TenDayForecast = () => {
    return (
        <section className='ten-day-forecast'>
            <h3 className='ten-day-title'>10-Day Forecast</h3>
            <TenDayCardsContainer />
        </section>
    )
}

export default TenDayForecast
