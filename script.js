var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiaWt1cm9rYW5nZXRoZSIsImEiOiJjbGFnczFmZngwejNmM3VsMnJ0Znl2amd1In0.RrC6ixJjog5eaf8NvJzZ7A',

}).addTo(map);

var control = L.Routing.control({
    waypoints: [
        null
        // L.latLng(47.246587, -122.438830),
        // L.latLng(47.318017, -122.542970),
        // L.latLng(47.258024, -122.444725)
    ],
     routeWhileDragging: true,
     router: L.Routing.mapbox('pk.eyJ1IjoiaWt1cm9rYW5nZXRoZSIsImEiOiJjbGFnczFmZngwejNmM3VsMnJ0Znl2amd1In0.RrC6ixJjog5eaf8NvJzZ7A'),
     units:'imperial',
     collapsible: true,
     geocoder: L.Control.Geocoder.photon(),
}).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

    L.DomEvent.on(startBtn, 'click', function() {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });

    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        control.show();
        map.closePopup();
    });
 });
