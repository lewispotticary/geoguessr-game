import RandomLocations from "./RandomLocations.js";

    const arrayLength = RandomLocations.RandomLocations.length - 1;
    var randomIndex = Math.floor(Math.random() * arrayLength);
    var randomLat = RandomLocations.RandomLocations[randomIndex][0];
    var randomLng = RandomLocations.RandomLocations[randomIndex][1];
    var streetviewLocation = { lat: randomLat, lng: randomLng};
    var roundValue = 1;
    var score = 0;
    

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
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
    }

    //Next Round Function 
    
    function nextRound(){   
        roundValue = roundValue + 1;
        roundNumber.innerHTML = "Round: " + roundValue + "/" + "6";
        path.setMap(null);
        marker.setMap(null);
        marker = null;
        guessMarker.setMap(null);
        resultMarker.setMap(null);
        guessMarker = null;
        resultMarker = null;
        nextButton.disabled = true;
        randomIndex = Math.floor(Math.random() * arrayLength);
        randomLat = RandomLocations.RandomLocations[randomIndex][0];
        randomLng = RandomLocations.RandomLocations[randomIndex][1];
        streetviewLocation = { lat: randomLat, lng: randomLng};
        panorama.setPosition(streetviewLocation);
    }

    //Check Location Function

    function checkLocation(){
        checkButton.disabled = true;
        nextButton.disabled = false;
        var guessLat = marker.getPosition().lat();
        var guessLng = marker.getPosition().lng();
        var guessLocation = { lat: guessLat, lng: guessLng};
        calcCrow(guessLat, guessLng, randomLat, randomLng);
        showResults(guessLocation, guessLat, guessLng);
    }

    var guessMarker;
    var resultMarker;
    var path;

    function showResults(guessLocation, guessLat, guessLng){
        resultMarker = new google.maps.Marker({
        position: streetviewLocation,
        map: map,
        });
        guessMarker = new google.maps.Marker({
          position: guessLocation,
          map: map,
        });

        const polylineCoordinates = [
          { lat: guessLat, lng: guessLng },
          { lat: randomLat, lng: randomLng },
        ];

        path = new google.maps.Polyline({
          path: polylineCoordinates,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
      
        path.setMap(map);

      resultMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
      guessMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
    }

    //Calculate Distance between two coordinates

    var distance;

    function calcCrow(guessLat, guessLng) 
    {
      var R = 6371; // km
      var dLat = toRad(guessLat-randomLat);
      var dLon = toRad(guessLng-randomLng);
      var lat1 = toRad(randomLat);
      var lat2 = toRad(guessLat);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      distance = Math.round(d * 0.62137);
      alert("You were " + distance + " miles away");
      if(score === 0){
        score = distance;
        scoreNumber.innerHTML = "Score: " + score + " miles";
      }
      else{
        score = score + distance;
        scoreNumber.innerHTML = "Score: " + score + " miles";
      }
      
    }

    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

    //Event Listeners
      
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    }); 

    var scoreNumber = document.getElementById("score-number");
    scoreNumber.innerHTML = "Score: " + score + " miles";

    var roundNumber = document.getElementById("round-number");
    roundNumber.innerHTML = "Round: " + roundValue + "/" + "6";

    var nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", nextRound);
    nextButton.disabled = true;

    var checkButton = document.getElementById("check-button");
    checkButton.addEventListener("click", checkLocation);
    checkButton.disabled = true;


