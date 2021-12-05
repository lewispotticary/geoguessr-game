import RandomLocations from "./RandomLocations.js";


    const arrayLength = RandomLocations.RandomLocations.length - 1;
    const startIndex = Math.floor(Math.random() * arrayLength);
    const locationLat = RandomLocations.RandomLocations[startIndex][0];
    const locationLng = RandomLocations.RandomLocations[startIndex][1];
    const streetviewLocation = { lat: locationLat, lng: locationLng};
    

    //Map Function
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 32.397, lng: -25.644 },
        zoom: 2,
    });

    //Street View Function
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        position: streetviewLocation,
        pov: {
          heading: 34,
          pitch: 10,
        },
      }
    );

    //Place Marker Function

    var marker;

    function placeMarker(location) {
        if ( marker ) {
          marker.setPosition(location);
        } 
        else {
            checkButton.disabled = false;
            marker = new google.maps.Marker({
            position: location,
            map: map,
          });
        }
    }

    
    function nextRound(){
        nextButton.disabled = true;
        const randomIndex = Math.floor(Math.random() * arrayLength);
        const locationLat = RandomLocations.RandomLocations[randomIndex][0];
        const locationLng = RandomLocations.RandomLocations[randomIndex][1];
        const streetviewLocation = { lat: locationLat, lng: locationLng};
        panorama.setPosition(streetviewLocation);
    }


    function checkLocation(){
        checkButton.disabled = true;
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
        console.log(lat)
        console.log(lng)
    }

    //Event Listeners
      
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
        console.log(event.latLng)
    }); 

    var nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", nextRound);

    var checkButton = document.getElementById("check-button");
    checkButton.addEventListener("click", checkLocation);
    checkButton.disabled = true;


