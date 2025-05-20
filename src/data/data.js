
export class Location {
//   name: string;
//   latitude : float;
//   longitude : float;
//   day : int;
//   view : bool;
//   etc.

    constructor(name, lat, lng, day, order, view) {
        this.name = name;
        this.latitude = lat;
        this.longitude = lng;
        this.day = day;
        this.order = order;
        this.view = view;
    }

    setView(new_view) {
        this.view = new_view
    } 
}

export function getRoute(locations, day) {
    var filtered_locations = [];
    for (var i = 0; i < locations.length; i++) {
        var cur_loc = locations[i];
        if (cur_loc.day == day && cur_loc.view == true) {
            filtered_locations.push(cur_loc);
        }
    }
    return filtered_locations.sort(function(loc_a, loc_b) {return loc_a.order - loc_b.order});
}