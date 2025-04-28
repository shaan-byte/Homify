mapboxgl.accessToken = mapToken;


const coords = listing.geometry.coordinates; // Use as-is

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coords,
    zoom: 12
});

const marker1 = new mapboxgl.Marker({color: "blue"})
    .setLngLat(coords)
    .addTo(map);

map.on('load', () => {
    map.resize();
    map.flyTo({
        center: coords,
        zoom: 12,
        essential: true
    });
});
