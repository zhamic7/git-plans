const fill = "#ff0000";
const opacity = 0.4;
const line = "#FFFFFF";
const width = 1.5;

export const location_attrs = {
    "Gym" : { short: "gym", lat: 34.185171, lon : -118.953065, 
                fill : {'fill-color': fill, 'fill-opacity': opacity },
                line : { 'line-color': line, 'line-width': width } 
            }, 
    "Tennis Court" : { short: "tennis", lat: 34.185868, lon : -118.952700, 
                fill : {'fill-color': fill, 'fill-opacity': opacity },
                line : { 'line-color': line, 'line-width': width }  
            }, 
    "Pool" : { short: "pool", lat: 34.185143, lon : -118.952646, 
                fill : {'fill-color': fill, 'fill-opacity': opacity },
                line : { 'line-color': line, 'line-width': width } 
            }, 
    "Soccer Field" : { short: "soccer", lat: 34.184606, lon : -118.950419, 
                fill : {'fill-color': fill, 'fill-opacity': opacity },
                line : { 'line-color': line, 'line-width': width } 
            }, 
}