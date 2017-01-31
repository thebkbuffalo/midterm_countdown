(function() {
  if (!navigator.geolocation)
    return;

  linkElectionInfo();

  var BING_MAPS_KEY = "AusoQe0fW-ZhtN1stnl6fFlxLoyhItjtHiTfhYanMYRCZhgUKabmmawuazS9kBEB",
      BING_MAP_BASE_URL = "//dev.virtualearth.net/REST/v1/Locations/",
      SENATE_ELECTION_BASE_URL = "https://en.wikipedia.org/wiki/United_States_Senate_election_in_",
      HOUSE_ELECTION_BASE_URL = "https://en.wikipedia.org/wiki/United_States_House_of_Representatives_elections,_2018#";

  function linkElectionInfo() {
    var links = document.getElementsByClassName("election-info-btn");

    Array.prototype.forEach.call(links, function(link) {
      link.classList.add('loading');
    });

    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude;

      var url = BING_MAP_BASE_URL + lat + "," + lng + "?key=" + BING_MAPS_KEY;

      $.ajax({
        url: url,
        dataType: "jsonp",
        jsonp: "jsonp",
        success: displayLocalizedLinks,
        error: handleError,
      });
    });
  }

  function displayLocalizedLinks(data, status, xhr) {
    var stateAbbr = data.resourceSets[0].resources[0].address.adminDistrict;

    $.getJSON("states.json", function(states) {
      var stateName = states[stateAbbr],

          senateUrl = SENATE_ELECTION_BASE_URL + stateName.replace(' ', '_') + ",2018",
          houseUrl = HOUSE_ELECTION_BASE_URL + stateName.replace(' ', '_'),

          senateLinkText = "2018 " + stateName + " Senate Elections",
          houseLinkText = "2018 " + stateName + " House Elections";

      replaceGenericLink('senate-link', senateUrl, senateLinkText);
      replaceGenericLink('house-link', houseUrl, houseLinkText);
    });
  }

  function replaceGenericLink(wrapperId, url, text) {
    var checkUrlExistsUrl = "//sheltered-escarpment-31930.herokuapp.com/response/?url=" + url,
        wrapper = document.getElementById(wrapperId),
        link = wrapper.querySelector('.election-info-btn');

    $.get(checkUrlExistsUrl, function(data) {
      if (data.status !== "404") {
        var linkText = link.querySelector('.text');
        link.href = url;
        linkText.innerText = text;
      }

      link.classList.remove('loading');
    })
  }

  function handleError(err) {
    //TODO: no error case is handled
  }
})();
