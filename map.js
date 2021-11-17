mapboxgl.accessToken = "pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0d2FsdWRpMmkxbDMxcnJ4eTNsMmFlMiJ9.dUju5BD_HqseLNWGIGvXpg";

// define basemap
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mlnow/ckunawnac3rtn17s7xksr52md',
  zoom: 15.5,
  center: [-80.184, 25.81],
});

// function to define map layers information
function mapDetailsFunction(mapID, visibility) {
  mapDetails = {
    id: mapID,
    type: "circle",
    source: {
      type: "geojson",
      data: "BayPoint.geojson",
    },
    layout: {
      'visibility': visibility
      },
    paint: {
      "circle-color": "blue",
      "circle-opacity": 0.7,
      "circle-radius": {
        'base':1.75,
        'stops': [
          [12,6],
          [22,220]
        ]
      }
    },
  }
  return mapDetails;
}

// load my map layers
map.on("load", function () {
  mapDetailsFunction("purchase_id", "visible");
    map.addLayer(mapDetails);
});

// Create the popup - population
map.on('click', 'purchase_id', function (e) {
    var headline = e.features[0].properties.Headline;
    var buyer = e.features[0].properties.Buyer;
    var seller = e.features[0].properties.Seller;
    var sale_price = e.features[0].properties.Sale_Price;
    var date = e.features[0].properties.Date;
    var address = e.features[0].properties.Address;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h3>'+headline+'</h3>' + '<h3><hr>'
            + '<p>Bought by: '+buyer+'</p>' + '<h3><hr>'
            + '<p>Sold by: '+seller+'</p>' + '<h3><hr>'
            + '<p>Date last sold: '+date+'</p>' + '<h3><hr>'
            + '<p>Address: '+address+'</p>' + '<h3><hr>'
            + '<p>Sold for: '+formatter.format(sale_price)+'</p>'
            )
        .addTo(map);
});
map.on('mouseenter', 'purchase_id', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'purchase_id', function () {
    map.getCanvas().style.cursor = '';
});
// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
// this.map.once('load', () => {
//   this.map.resize();
// });