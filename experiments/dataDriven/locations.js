
markers = [];
infoWindows = [];
//------------------------------------------------------------------------------------------------------------------------
function createMarkers(map, markerSpec)
{
    console.log("=== markerSpec")
    console.log(markerSpec.length);

    for(var i=0; i < markerSpecs.length; i++){
        console.log("=== adding mapMarker " + i);
        var markerSpec = markerSpecs[i];
        var center = new google.maps.LatLng(markerSpec.lat, markerSpec.lon);
        console.log("  center: ");
        console.log(center);
        var newMapMarker = new google.maps.Circle({
           strokeColor: markerSpec.color,
           strokeOpacity: 0.8,
           strokeWeight: 1,
           fillColor: '#FFAAAA',
           fillOpacity: 0.35,
           center: center,
           radius: markerSpec.radius,
           title: 'Ground Zero',
           map: map
           });
        markers.push(newMapMarker)
        var newInfoWindow = new google.maps.InfoWindow({
            content: "<h3> markersSpec " + markerSpec.title + " </h3>",
            position: new google.maps.LatLng(markerSpec.lat, markerSpec.lon)
            });
        infoWindows[newMapMarker.title] = newInfoWindow;
        console.log("=== about to call addListener");
        console.log("=== infoWindows")
        console.log(infoWindows);
        console.log("=== adding event listener for mapMarker " + i);
        console.log(newMapMarker)
        google.maps.event.addListener(newMapMarker, 'click', function (){
            //if(currentInfoWindow != null)
            //  currentInfoWindow.close()
            console.log("=== infoWindows element number " + i);
            console.log(newInfoWindow);
            //newInfoWindow.setPosition(center);
            //newInfoWindow.open(map);
            //newInfoWindow.open(map);
            iw = infoWindows[newMapMarker.title]
            iw.setPosition(center);
            iw.open(map);
            iw.open(map);
            // currentInfoWindow = infoWindow;
            });
        console.log("=== bottom of loop " + i);
        console.log("   length of markerSpec: " + markerSpecs.length);
   } // for i

} // createMarkers
//------------------------------------------------------------------------------------------------------------------------
function oldCreateMarkers()
{
  var mapCenter = new google.maps.LatLng(mapSpec.centerLat, mapSpec.centerLon);

  marker1 = new google.maps.Circle({
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 1,
                  fillColor: '#FFAAAA',
                  fillOpacity: 0.35,
                  center: mapCenter,
                  radius: 20,
                  title: 'Ground Zero',
                  map: map
                  });

  var markup = ['<div id="infoWindow1_tabs" class="infoWindowTab">',
                '  <ul>',
		'    <li><a href="#tab_1">Description</a>',
		'    <li><a href="#tab_2">Video</a>',
		'    <li><a href="#tab_3">Photo</a>',
                '  </ul>',
                '<div id="tab_1">',
                ' <ul>',
		'   <li><b> Name:<b> <i> name of site goes here</i>',
		'   <li><b> Date of first report:<b> <i> 23 oct 2017</i>',
		'   <li><b> Status: <b> <i> tentative die-off, to be confirmed next May</i>',
		'   <li><b> Size:<b> <i> 1/4 acre</i>',
		'   <li> <a href="http://nytimes.com">More info</a> ',
		' </ul>',
		'</div>',
                '<div id="tab_2">',
                '<iframe width="470" height="230" src="http://www.youtube.com/embed/vG4vr83Ffd4" frameborder="0" allowfullscreen></iframe>',
		'</div>',
                '<div id="tab_3">',
                '<img src="https://www.systemsbiology.org/wp-content/uploads/paul-shannon-web-300x300.jpg">',
		'</div>',
                '</div>'].join('');

  infoWindow1 = new google.maps.InfoWindow({
                   content: markup
                   });

  var centerLat  =   47.55364950712636;
  var centerLong = -122.2468900680542;

  infoWindow2 = new google.maps.InfoWindow({
                 content:
                    '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon"><b>2</b>' +
                    '<iframe width="300" height="215" src="http://www.youtube.com/embed/vG4vr83Ffd4" frameborder="0" allowfullscreen></iframe>',
                 position: new google.maps.LatLng(centerLat, centerLong)
                 });

   google.maps.event.addListener(infoWindow1, 'domready', function() {
     $("#infoWindow1_tabs").tabs();
     $("a[href='#tab_1']").click()
     });

  google.maps.event.addListener(marker1, 'click', function (){
     if(currentInfoWindow != null)
        currentInfoWindow.close()
     infoWindow1.setPosition(mapCenter);
     infoWindow1.open(map);
     currentInfoWindow = infoWindow1;
     });

  var delta = 0.0005;

  locs = [new google.maps.LatLng(centerLat - delta, centerLong - delta),
          new google.maps.LatLng(centerLat - delta, centerLong + delta),
          new google.maps.LatLng(centerLat + delta, centerLong + delta),
          new google.maps.LatLng(centerLat + delta, centerLong - delta)]

  marker2 =  new google.maps.Polygon({
                  paths: locs,
                  strokeColor: '#0000FF',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#AAAAFF',
                  fillOpacity: 0.35,
                  title: 'Compost Piles',
                  map: map
                  });

  google.maps.event.addListener(marker2, 'click', function (){
     if(currentInfoWindow != null)
        currentInfoWindow.close()
     infoWindow2.setPosition(new google.maps.LatLng(centerLat, centerLong));
     infoWindow2.open(map);
     currentInfoWindow = infoWindow2;
     });

  google.maps.event.addListener(map, "click", function(event){
     console.log(event.latLng.lat() + " " + event.latLng.lng());
     });

} // createMarkers
//----------------------------------------------------------------------------------------------------
