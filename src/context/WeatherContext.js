import React, { createContext, useState } from 'react'
import axios from 'axios'

export const WeatherContext = createContext()


const WeatherContextProvider = (props) => {
    const [currentWeather, setCurrentWeather] = useState()
    const [locationDetails, setLocationDetails] = useState()
    const [coordinates, setCoordinates] = useState({})
    const [tenDaysData, setTenDaysData] = useState([])
    const [closeCities, setCloseCities] = useState([])


    function getLocationForecast(lat, lon) {
        if (lat && lon) {
            axios.get(`${process.env.REACT_APP_LOCATION_FORECAST_URL}?lat=${lat}&lon=${lon}`)
            .then(({ data }) => {
                setCurrentWeather({
                    latitude: data.geometry.coordinates[0],
                    longitude: data.geometry.coordinates[1],
                    current: data.properties.timeseries[0].data.instant.details,
                    symbolCode: data.properties.timeseries[0].data.next_1_hours.summary.symbol_code,
                    highTemp: data.properties.timeseries[0].data.next_6_hours.details.air_temperature_max,
                    lowTemp: data.properties.timeseries[0].data.next_6_hours.details.air_temperature_min,
                })

                const newObj = data.properties.timeseries
                    .map(el => {
                        const date = new Date(el.time)

                        return {
                            time: date.toDateString(),
                            temp: el.data.instant.details.air_temperature,
                        }
                    })
                    .reduce((newObj, el) => {
                        newObj[el.time] = [...newObj[el.time] || [], el.temp]
                        return newObj
                    }, {})


                let final = []
                let replacementSymbolCode = ''

                Object.entries(newObj).forEach(value => {
                    const newDate = new Date(value[0])

                    let symbolCode = ''

                    data.properties.timeseries.forEach(el => {
                        const objDate = new Date(el.time)

                        if (objDate.getDate() === newDate.getDate()) {
                            if (el.data.next_12_hours) {
                                symbolCode = el.data.next_12_hours.summary.symbol_code
                                replacementSymbolCode = symbolCode

                            } else if (el.data.next_6_hours) {
                                symbolCode = el.data.next_6_hours.summary.symbol_code
                                replacementSymbolCode = symbolCode

                            } else if (el.data.next_1_hours) {
                                symbolCode = el.data.next_1_hours.summary.symbol_code
                                replacementSymbolCode = symbolCode

                            } else {
                                symbolCode = replacementSymbolCode
                            }
                        }
                    })


                    return final = [...final, {
                        dayOfWeek: value[0].split(' ')[0],
                        date: value[0].split(' ').splice(1, 2).join(' '),
                        max: Math.max(...value[1]),
                        min: Math.min(...value[1]),
                        symbolCode: symbolCode.replace(/_night/gi, '_day'),
                    }]
                })

                setTenDaysData(final)
            })


        // fetch(`${process.env.REACT_APP_REVERSE_GEOCODE_CLIENT_URL}?latitude=${lat}&longitude=${lon}&key=${process.env.REACT_APP_REVERSE_GEOCODE_APY_KEY}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setLocationDetails({
        //             city: data.city,
        //             countryName: data.countryName,
        //             continent: data.continent,
        //             locality: data.locality,
        //             principalSubdivision: data.principalSubdivision,
        //             administrative: data.localityInfo
        //         })
        //     })


        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_GET_NEAREST_CITIES_URL}?latitude=${lat}&longitude=${lon}&range=0`,
            headers: {
                "x-rapidapi-host": `${process.env.REACT_APP_RAPID_API_HOST}`,
                "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_KEY}`
            }
        })
            .then(({ data }) => {
                setLocationDetails({
                    city: data[0].City,
                    country: data[0].Country,
                    population: data[0].Population,
                    distance: data[0].Distance
                })
            })
            .catch(err => console.error(err))


        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_GET_LARGEST_CITIES_URL}?latitude=${lat}&longitude=${lon}&range=0`,
            headers: {
                "x-rapidapi-host": `${process.env.REACT_APP_RAPID_API_HOST}`,
                "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_KEY}`
            }
        })
            .then(({ data }) => {
                setCloseCities([
                    { name: data[0].City, lat: data[0].Latitude, lon: data[0].Longitude },
                    { name: data[1].City, lat: data[1].Latitude, lon: data[1].Longitude },
                    { name: data[2].City, lat: data[2].Latitude, lon: data[2].Longitude },
                    { name: data[3].City, lat: data[3].Latitude, lon: data[3].Longitude },
                    { name: data[4].City, lat: data[4].Latitude, lon: data[4].Longitude },
                ])
            })
            .catch(err => console.error(err));
        }
           
    }


    return (
        <WeatherContext.Provider value={{ closeCities, tenDaysData, currentWeather, setCoordinates, getLocationForecast, locationDetails }}>
            {props.children}
        </WeatherContext.Provider>
    )
}

export default WeatherContextProvider