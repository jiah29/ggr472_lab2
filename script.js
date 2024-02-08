mapboxgl.accessToken =
  "pk.eyJ1IjoiamlhaGFvMjkiLCJhIjoiY2xyNHhudjJsMDFrajJxbWp6ZHlqamR2MyJ9.GLj7pIC0m-_eGRtGH4AJww"; //Add default public map token from your Mapbox account

// Initialze a new map object into my-map div
// using custom style created with Mapbox Studio
// and set the starting position and zoom level
const map = new mapboxgl.Map({
  container: "my-map", // map container ID
  style: "mapbox://styles/jiahao29/clscokc0602v201qs1xkic4op", // custom style url
  center: [-79.392463, 43.659055], // starting position [lng, lat]
  zoom: 12, // starting zoom level
});

map.on("load", () => {
  //Add a data source containing GeoJSON data
  map.addSource("uoft-data", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Sidney Smith Hall",
          },
          geometry: {
            coordinates: [-79.39865237301687, 43.662343395037766],
            type: "Point",
          },
        },
      ],
    },
  });
  map.addLayer({
    id: "uoft-pnt",
    type: "circle",
    source: "uoft-data",
    paint: {
      "circle-radius": 6,
      "circle-color": "#B42222",
    },
  });
});
