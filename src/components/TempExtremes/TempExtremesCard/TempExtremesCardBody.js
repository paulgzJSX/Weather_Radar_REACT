import React from 'react'
import TempExtremesCardRow from './TempExtremesCardRow'

const TempExtremesCardBody = ({ rows }) => {
    return (
        <div className="card-body">
            {rows.map((row, idx) => (
                <TempExtremesCardRow key={idx} row={row} />
            ))}
        </div>
    )
}

export default TempExtremesCardBody
