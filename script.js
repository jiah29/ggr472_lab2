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
  // Add parks geojson data source from uploaded github file
  map.addSource("parks-data", {
    type: "geojson",
    data: "https://jiah29.github.io/ggr472_lab2/data/parks.geojson",
  });

  map.addImage("park-alt1");

  // Add parks layer to map
  map.addLayer({
    id: "parks-point",
    type: "symbol", // set layer type to symbol
    source: "parks-data",
    layout: {
      "icon-image": "park-alt1", // set icon image from mapbox style
      "icon-size": 1.5, // set icon size
    },
    minzoom: 10,
    maxzoom: 22,
  });
});
