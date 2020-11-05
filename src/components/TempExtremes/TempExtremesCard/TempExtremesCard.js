import React from 'react'
import TempExtremesCardBody from './TempExtremesCardBody';
import TempExtremesCardHeader from './TempExtremesCardHeader';


const TempExtremesCard = ({ entries }) => {
    return (
        <div className="card">
            <TempExtremesCardHeader header={entries[0]} />
            <TempExtremesCardBody rows={entries[1]}/>
        </div>
    )
}

export default TempExtremesCard
