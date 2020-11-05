import React from 'react'
import CurrentWeather from '../components/CurrentWeather/CurrentWeather'
import TenDayForecast from '../components/TenDayForecast/TenDayForecast'
import TempExtremes from '../components/TempExtremes/TempExtremes'

const Home = () => {
    return (
        <main>
            <CurrentWeather />
            <TenDayForecast />
            <TempExtremes />
        </main>
    )
}

export default Home
