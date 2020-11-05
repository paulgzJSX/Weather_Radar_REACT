import React, { useContext } from 'react'
import TenDayCard from './/TenDayCard'
import { WeatherContext } from '../../context/WeatherContext'

const TenDayCardsContainer = () => {
    const { tenDaysData } = useContext(WeatherContext)

    return (
        <div className="cards-container">
            {tenDaysData && tenDaysData.map(dayData =>
                <TenDayCard key={dayData.date} dayData={dayData} />)}
        </div>
    )
}

export default TenDayCardsContainer
