import { location_attrs } from "./constants.js";
import { addMarker } from "./map_layout.js";

// Create map and add markers
const map_center = {
    "lat": 34.18334035884417, 
    "lon": -118.95258684698637,
    "zoom": 16
}
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=pXC2MulBPSvEsgk84x5E', // Your style URL
    center: [map_center.lon, map_center.lat], // Starting position [lng, lat]
    zoom: map_center.zoom // Starting zoom level
});
// When the map is fully loaded, start adding GeoJSON data
map.on('load', function() {
    const markers = [
        [34.18518367221783, -118.95283325589428],
        [34.18324442509275, -118.9525757638468],
        [34.18329323964055, -118.95214661043437]
    ];
    markers.forEach(coord => addMarker(coord).addTo(map) );

    // Create polygons
    fetch("js/locations.geojson") // fetch geojson data
    .then(polygons => { return polygons.json(); }) // check data
    .then(polygons => { // process data
        polygons.features.forEach(poly => {
            let polygon_name = poly.properties.name;
            map.addSource(polygon_name, {
                'type': 'geojson',
                'data': poly
            });
            map.addLayer({
                'id': polygon_name,
                'type': 'fill',
                'source': polygon_name,
                'paint': location_attrs[polygon_name].fill
            });
            map.addLayer({
                'id': polygon_name + " line",
                'type': 'line',
                'source': polygon_name,
                'paint': location_attrs[polygon_name].line
            });
        });
     })
    .catch(function(error) {
        console.log("An error occurred: ", error);
    });
});