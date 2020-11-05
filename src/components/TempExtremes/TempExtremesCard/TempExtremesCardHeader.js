import React from 'react'
import CloudsIcon from './../Icons/CloudsIcon'
import LowTempsIcon from './../Icons/LowTempsIcon'
import HighTempsIcon from './../Icons/HighTempsIcon'
import { trimHeaderTitle } from '../../../helpers/Helpers'

const TempExtremesCardHeader = ({ header }) => {
    return (
        <div className="card-header">
            <p>{trimHeaderTitle(header)}</p>
            <div className="card-icon">
                {header === 'maximumPrecipitations' && <CloudsIcon />}
                {header === 'lowestTemperatures' && <LowTempsIcon />}
                {header === 'highestTemperatures' && <HighTempsIcon />}

            </div>
        </div>

    )
}

export default TempExtremesCardHeader
