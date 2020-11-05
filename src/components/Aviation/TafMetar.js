import React, { useState } from 'react'
import axios from 'axios'
import '../Aviation/aviation.css'
import TafRow from './TafRow'

const TafMetar = () => {
    const [airport, setAirport] = useState([])
    const [tafMetar, setTafMetar] = useState({})
    const [displayTafMetar, setDisplayTafMetar] = useState(false)


    const fetchTafMetar = () => {
        const date = new Date()
        const currentDate = date.toISOString().slice(0, 10)

        axios.get(`${process.env.REACT_APP_TAF_METAR_URL}?icao=${airport}&date=${currentDate}`)
            .then(({ data }) => {
                const parser = new DOMParser()
                const xml = parser.parseFromString(data, 'application/xml')

                const metarNodes = xml.getElementsByTagName('metno:meteorologicalAerodromeReport')
                const tafNodes = xml.getElementsByTagName('metno:terminalAerodromeForecast')

                setTafMetar({
                    metar: metarNodes[0].children[3].innerHTML,
                    taf: tafNodes[0].children[4].innerHTML
                })
                
                setDisplayTafMetar(true)
            })
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetchTafMetar()
    }

    return (
        <section className='aviation-container'>
            <h2>Get TAF/METAR Data</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input">ICAO Airport Code</label>
                <div className="input-group">
                    <input
                        type="text"
                        id='input'
                        autoComplete='off'
                        value={airport}
                        maxLength='4'
                        onChange={e => setAirport(e.target.value)}
                    />
                    <button type='submit'>Load</button>
                </div>
            </form>

            {tafMetar && 
                <TafRow tafMetar={tafMetar} displayTafMetar={displayTafMetar} />}

        </section>
    )
}

export default TafMetar
