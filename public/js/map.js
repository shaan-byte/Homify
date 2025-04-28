mapboxgl.accessToken = mapToken;

console.log('Listing coordinates:', listing.geometry.coordinates); // Debug: check order

const coords = listing.geometry.coordinates; // Use as-is

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coords,
    zoom: 12
});

const marker1 = new mapboxgl.Marker({color: "orange"})
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
