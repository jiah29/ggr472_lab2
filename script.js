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

  // Add parks layer to map
  map.addLayer({
    id: "parks-point",
    type: "symbol", // set layer type to symbol
    source: "parks-data",
    layout: {
      "icon-image": "park-alt1", // set icon image which is uploaded to mapbox studio style
      "text-field": "{name}", // set text field to display name property in geojson
      "text-size": 12, // set text size
      "text-offset": [0, 1.25], // set text offset
    },
    paint: {
      "text-color": "green", // set text color
      "text-halo-color": "white", // set text halo color to white to make the text stand out more
      "text-halo-width": 1, // set text halo width so that halo is visible
      // set text opacity based on zoom level in step formats (not linear change)
      // >= level 10 = 0.5, >= level 14 = 0.75, >= level 18 = 1
      "text-opacity": ["step", ["zoom"], 0, 10, 0.5, 14, 0.75, 18, 1],
    },
    minzoom: 10, // set minimum zoom level to display the layer
    maxzoom: 22, // set maximum zoom level to display the layer
  });
});
