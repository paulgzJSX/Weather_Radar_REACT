import React, { useEffect, useState } from 'react'
import TempExtremesCard from './TempExtremesCard/TempExtremesCard'
import { parseXML } from '../../helpers/Helpers'
import './TempExtremes.css'


const TempExtremes = () => {
    const [extremes, setExtremes] = useState({})

    useEffect(() => {
        fetch(process.env.REACT_APP_EXTREMES_URL)
            .then(res => res.text())
            .then(extremesDataXML => setExtremes(parseXML(extremesDataXML)))
            .catch(err => alert(err))
    }, [])

    return (
        <section className='day-record'>
            {extremes &&
                <>
                    <h3>Norwegene Weather Extremes</h3>
                    <div className="card-container">
                        {Object.entries(extremes).map((entries, idx) => (
                            <TempExtremesCard key={idx} entries={entries} />))}
                    </div>
                </>
            }

        </section>
    )
}

export default TempExtremes
