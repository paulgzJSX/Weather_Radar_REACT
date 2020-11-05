import React from 'react'
import { legends } from '../../data/legends'

const TenDayCard = ({ dayData }) => {
    const processDescription = (code) => {
        let symbolDesc = ''

        Object.entries(legends).forEach(legend => {
            if (legend[0] === code.replace(/_day/gi, '')) {
                symbolDesc = legend[1]['desc_en']
            }
        })
        return symbolDesc
    }


    return (
        <div className="ten-day-card">
            <p>{dayData.dayOfWeek}</p>
            <p className='ten-day-date'>{dayData.date}</p>
            {dayData.symbolCode && 
                <img src={require(`../../images/icons/weathericon/png/${dayData.symbolCode}.png`)} alt="" />}
            <h3>{dayData.max}°</h3>
            <p className='ten-day-low'>{dayData.min}°</p>
            <p className='ten-day-description'>{processDescription(dayData.symbolCode)}</p>
        </div>
    )
}

export default TenDayCard
