import React from 'react'

const TafRow = ({ tafMetar, displayTafMetar }) => {
    return (
        <div className={displayTafMetar ? "taf-container active" : 'taf-container'}>
            <div className="taf-row">
                <div className="row-title">
                    <p>TAF</p>
                </div>
                <div className="taf-data">
                    <p>{tafMetar.taf}</p>
                </div>
            </div>

            <div className="taf-row">
                <div className="row-title">
                    <p>METAR</p>
                </div>
                <div className="taf-data">
                    <p>{tafMetar.metar}</p>
                </div>
            </div>
        </div>
    )
}

export default TafRow
