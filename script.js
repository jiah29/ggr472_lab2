var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

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

var restaurant_icon_size = 1;
var parks_icon_size = 1;

map.on("load", () => {
  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  map.addControl(
    new mapboxgl.FullscreenControl({
      container: document.getElementById("fullscreen-section"),
    })
  );

  // Add parks geojson data source from uploaded github file
  map.addSource("parks-data", {
    type: "geojson",
    data: "https://jiah29.github.io/ggr472_lab2/data/parks.geojson",
  });

  // Add parks layer to map
  map.addLayer({
    id: "parks-point",
    type: "symbol", // set layer type to symbol
    source: "parks-data", // refer to source ID
    layout: {
      "icon-image": "park-alt1", // set icon image which is uploaded to mapbox studio style
      "text-field": "{name}", // set text field to display name property in geojson
      "text-size": 12, // set text size
      "text-offset": [0, 1.25], // set text offset (x, y)
      "icon-size": parks_icon_size, // set icon size
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

  // Add restaurants maptiles from mapbox studio
  map.addSource("restaurants-data", {
    type: "vector",
    url: "mapbox://jiahao29.9aobb48h",
  });

  // Add restaurants layer to map
  map.addLayer({
    id: "restaurants-point",
    type: "symbol",
    source: "restaurants-data", // refer to source ID
    "source-layer": "map-4w7t8n", // tileset name
    // similar layout format for symbol as parks-point layer
    layout: {
      "icon-image": "restaurant",
      "text-field": "{name}",
      "text-size": 12,
      "text-offset": [0, 1.25],
      "icon-size": restaurant_icon_size,
    },
    // similar paint format for symbol as parks-point layer
    paint: {
      "text-color": "red",
      "text-halo-color": "white",
      "text-halo-width": 1,
      "text-opacity": ["step", ["zoom"], 0, 10, 0.5, 14, 0.75, 18, 1],
    },
  });
});

map.on("idle", () => {
  const restaurantsToggle = document.getElementById("restaurants-focus");
  restaurantsToggle.onclick = () => {
    if (restaurant_icon_size === 1) {
      restaurant_icon_size = 2;
      map.setLayoutProperty(
        "restaurants-point",
        "icon-size",
        restaurant_icon_size
      );
      restaurantsToggle.innerHTML = `<i class="fa-solid fa-search-minus"></i>`;
    } else {
      restaurant_icon_size = 1;
      map.setLayoutProperty(
        "restaurants-point",
        "icon-size",
        restaurant_icon_size
      );
      restaurantsToggle.innerHTML = `<i class="fa-solid fa-search-plus"></i>`;
    }
  };

  const parksToggle = document.getElementById("parks-focus");
  parksToggle.onclick = () => {
    if (parks_icon_size === 1) {
      parks_icon_size = 2;
      map.setLayoutProperty("parks-point", "icon-size", parks_icon_size);
      parksToggle.innerHTML = `<i class="fa-solid fa-search-minus"></i>`;
    } else {
      parks_icon_size = 1;
      map.setLayoutProperty("parks-point", "icon-size", parks_icon_size);
      parksToggle.innerHTML = `<i class="fa-solid fa-search-plus"></i>`;
    }
  };

  const parksFavIcons = document.getElementById("parks-fav");
  parksFavIcons.onclick = () => {
    if (parksFavIcons.style.color === "red") {
      parksFavIcons.style.color = "white";

      map.flyTo({
        center: [-79.392463, 43.659055],
        zoom: 12,
      });
    } else {
      // change icon color to red
      parksFavIcons.style.color = "red";

      map.flyTo({
        center: [-79.359806, 43.666846],
        zoom: 18,
      });
    }
  };

  const restaurantsFavIcons = document.getElementById("restaurants-fav");
  restaurantsFavIcons.onclick = () => {
    if (restaurantsFavIcons.style.color === "red") {
      restaurantsFavIcons.style.color = "white";

      map.flyTo({
        center: [-79.392463, 43.659055],
        zoom: 12,
      });
    } else {
      // change icon color to red
      restaurantsFavIcons.style.color = "red";

      map.flyTo({
        center: [-79.386348, 43.661658],
        zoom: 18,
      });
    }
  };
});
