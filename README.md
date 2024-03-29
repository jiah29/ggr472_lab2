# ggr472_lab2
GGR472 Lab 2 - Jia Hao Choo

This repository contains my work for Lab 2 of GGR472: Developing Web Maps (Winter 2024), which focuses on creating a web map using Mapbox GL JS on a custom basemap styled using Mapbox Studio. The web map consists of two different data sources: GeoJSON and maptiles.

The purpose of the web map is to introduce some of my favourite locations in Toronto, namely parks and restaurants, which are both provided as point features from GeoJSON source and vector maptile respectively. Basic features like subway stops and neighbourhoods are also provided in the custom basemap style and as a vector maptile polygons respectively.

In this lab, I experimented with several design and interactivity features, such as:
- Different sidebar layout on different screen sizes
- On click event on an icon outside the map area to change symbol size in the map (the zoom in/out icon)
- On click event on an icon outside the map area to fly to and focus on my favourite feature for each category (the favourite/heart icon)
- Show layers as symbol, text or polygon, which have different visibility zoom levels. Symbols are custom imported to Mapbox Studio style, which the web map uses.
- Show different basemap style and features at different zoom levels (this is customized in Mapbox Studio)
- Adding custom paint and layout styles to polygons and symbol layers
- Changing cursor style to pointer to indicate that polygon layer is clickable
- Show map popup for neighbourhood polygon layer showing neighbourhood name
- Add map control like navigation, scale and full screen to the top right corner of the map
