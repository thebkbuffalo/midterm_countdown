(function() {
  if (!navigator.geolocation)
    return;

  linkElectionInfo();

  function linkElectionInfo() {
    var links = document.getElementsByClassName("election-info-btn");

    Array.prototype.forEach.call(links, function(link) {
      link.classList.add('loading');
    });

    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude,
          // url = "//sheltered-escarpment-31930.herokuapp.com/local_election_links?lat=" + lat + "&lng=" + lng;
          url = "//localhost:3000/local_election_links?lat=" + lat + "&lng=" + lng;

      $.getJSON(url, function(data) {
        var senateDiv = document.getElementById("senate-link"),
            houseDiv = document.getElementById("house-link"),
            senateLink = senateDiv.querySelector('.election-info-btn'),
            houseLink = houseDiv.querySelector('.election-info-btn'),
            senateLinkText = senateLink.querySelector('.text'),
            houseLinkText = houseLink.querySelector('.text');

        senateLink.href = data.senate_url;
        houseLink.href = data.house_url;
        senateLinkText.innerText = data.senate_text;
        houseLinkText.innerText = data.house_text;

        senateLink.classList.remove('loading');
        houseLink.classList.remove('loading');
      });
    });
  }
})();
