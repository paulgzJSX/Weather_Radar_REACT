import React from 'react'

const TempExtremesCardRow = ({ row }) => {
    return (
        <div className="card-row">
            <p>{row.location}</p>
            <p>{row.value} {row.unit === 'celsius' ? `°` : row.unit}</p>
        </div>
    )
}

export default TempExtremesCardRow
