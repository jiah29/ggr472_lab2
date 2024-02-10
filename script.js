// ============================================================================
// This script is used for index.html and suggestions.html.
// Some functions are from Bootstrap v5.0 documentation to support
// Bootstrap-specific features, such as popovers.
// Reference: https://getbootstrap.com/docs/5.0/
// Created by Jia Hao Choo for GGR472 Lab 2 (Winter 2024)
// ============================================================================

// These functions is used to enable popovers on thwe webpage from Bootstrap v5.0
// Reference: https://getbootstrap.com/docs/5.0/components/popovers/
var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

// access token for mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiamlhaGFvMjkiLCJhIjoiY2xyNHhudjJsMDFrajJxbWp6ZHlqamR2MyJ9.GLj7pIC0m-_eGRtGH4AJww"; //Add default public map token from your Mapbox account

// Initialze a new map object into my-map div using custom style created
// with Mapbox Studio and set the starting position and zoom level
const map = new mapboxgl.Map({
  container: "my-map", // map container ID
  style: "mapbox://styles/jiahao29/clscokc0602v201qs1xkic4op", // custom style url
  center: [-79.370729, 43.719518], // starting position [lng, lat]
  zoom: 10, // starting zoom level
});

// variable for dynamic icon sizes for restaurants and parks
var restaurant_icon_size = 1;
var parks_icon_size = 1;

// functions that trigger when the map is loaded
map.on("load", () => {
  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  // Add enter full screen control to allow the section
  // with id = fullscreen-section to enter full screen
  map.addControl(
    new mapboxgl.FullscreenControl({
      container: document.getElementById("fullscreen-section"),
    })
  );

  // Add a scale control to the map
  map.addControl(new mapboxgl.ScaleControl(), "top-right");

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
      "icon-size": parks_icon_size, // set icon size according to variable
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
    url: "mapbox://jiahao29.9aobb48h", // maptiles url from mapbox studio
  });

  // Add restaurants layer to map
  map.addLayer(
    {
      id: "restaurants-point",
      type: "symbol",
      source: "restaurants-data", // refer to source ID
      "source-layer": "map-4w7t8n", // tileset name from mapbox studio
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
      minzoom: 10, // set minimum zoom level to display the layer
      maxzoom: 22, // set maximum zoom level to display the layer
    },
    "parks-point"
  ); // make ure to add restaurants layer after parks layer

  // Add naighbourhood maptiles from mapbox studio
  map.addSource("neighbourhood-data", {
    type: "vector",
    url: "mapbox://jiahao29.74mlfl6m", // maptiles url from mapbox studio
  });

  // Add neighbourbood layer to map
  map.addLayer(
    {
      id: "neighbourhood-polygon",
      type: "fill", // set layer type to fill
      source: "neighbourhood-data", // refer to source ID
      "source-layer": "toneighshape-7z4bus", // tileset name from mapbox studio
      paint: {
        "fill-color": "rgba(255, 0, 0, 0.05)", // set fill color with opacity
        "fill-outline-color": "rgba(0, 0, 0, 0.5)", // set fill outline color with opacity
      },
      minzoom: 10, // set minimum zoom level to display the layer
      maxzoom: 12, // set maximum zoom level to display the layer
    },
    "restaurants-point" // make sure to add neighbourhood layer after restaurants layer
  );
});

// functions that trigger when the map is idle after load
map.on("idle", () => {
  // Add an onclick event listener on the "restaurants-focus" element
  // to change the icon size of restaurants
  const restaurantsToggle = document.getElementById("restaurants-focus");
  restaurantsToggle.onclick = () => {
    if (restaurant_icon_size === 1) {
      // make the icon size bigger
      restaurant_icon_size = 2;
      map.setLayoutProperty(
        "restaurants-point",
        "icon-size",
        restaurant_icon_size
      );
      // change the icon to zoom out sign
      restaurantsToggle.innerHTML = `<i class="fa-solid fa-search-minus"></i>`;
    } else {
      // make the icon size smaller
      restaurant_icon_size = 1;
      map.setLayoutProperty(
        "restaurants-point",
        "icon-size",
        restaurant_icon_size
      );
      // change the icon to zoom in sign
      restaurantsToggle.innerHTML = `<i class="fa-solid fa-search-plus"></i>`;
    }
  };

  // similar function as above to change parks icon size
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

  // Event listener function to zoom in and out of my most favourite park when
  // the "parks-fav" element is clicked
  const parksFavIcons = document.getElementById("parks-fav");
  parksFavIcons.onclick = () => {
    // if the icon color is red, change it to white and zoom out
    if (parksFavIcons.style.color === "red") {
      parksFavIcons.style.color = "white";

      map.flyTo({
        center: [-79.370729, 43.719518],
        zoom: 10,
      });
    } else {
      // change icon color to red and zoom in to the park
      parksFavIcons.style.color = "red";

      map.flyTo({
        center: [-79.359806, 43.666846],
        zoom: 18,
      });
    }
  };

  // similar function as above to zoom in and out of my most favourite restaurant
  const restaurantsFavIcons = document.getElementById("restaurants-fav");
  restaurantsFavIcons.onclick = () => {
    if (restaurantsFavIcons.style.color === "red") {
      restaurantsFavIcons.style.color = "white";

      map.flyTo({
        center: [-79.370729, 43.719518],
        zoom: 10,
      });
    } else {
      restaurantsFavIcons.style.color = "red";

      map.flyTo({
        center: [-79.386348, 43.661658],
        zoom: 18,
      });
    }
  };

  // event listener to change cursor to pointer when entering
  // the neighbourhood polygon layer
  map.on("mouseenter", "neighbourhood-polygon", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // event listener to change cursor to default when leaving
  // polygon layer
  map.on("mouseleave", "neighbourhood-polygon", () => {
    map.getCanvas().style.cursor = "";
  });

  // event listener to create a popup when clicking on the neighbourhood polygon
  // showing the name of the neighbourhood
  map.on("click", "neighbourhood-polygon", (e) => {
    // get the name property of the clicked polygon
    const neighbourhoodName = e.features[0].properties.NAME;
    // create a new popup with the name of the neighbourhood
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(neighbourhoodName)
      .addTo(map);
  });
});
