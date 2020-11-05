import React, { useContext, useLayoutEffect, useState, useEffect, memo } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { WeatherContext } from '../../context/WeatherContext';

const Map = () => {
    const [coordinates, setCoordinates] = useState({})
    const { getLocationForecast } = useContext(WeatherContext)

    useEffect(() => {
        coordinates && getLocationForecast(coordinates.latitude, coordinates.longitude)
    }, [coordinates])


    useLayoutEffect(() => {
        const map = am4core.create("chartdiv", am4maps.MapChart);
        map.geodata = am4geodata_worldLow;
        map.projection = new am4maps.projections.NaturalEarth1();
        map.homeZoomLevel = 2
        map.homeGeoPoint = {
            latitude: 44,
            longitude: -5
        };
        map.zoomControl = new am4maps.ZoomControl();

        const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ["AQ", "GL", 'PS'];

        const polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#3546E2");
        // polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
        polygonTemplate.propertyFields.fill = "fill";

        const hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#F05C5C");

        polygonTemplate.events.on("hit", function (ev) {

            setCoordinates(map.svgPointToGeo(ev.svgPoint))
        });

        const button = map.chartContainer.createChild(am4core.Button);
        button.label.text = '.'
        button.padding(5, 5, 5, 5);
        button.width = 20;
        button.align = "right";
        button.marginRight = 12;
        button.events.on("hit", () => map.goHome());

        return () => map.dispose()
    }, [])


    return (
        <div className="map">
            <div id="chartdiv"></div>
        </div>
    );
}

export default memo(Map)
