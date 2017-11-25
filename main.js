$(document).ready(function(){
  var date = new Date("November 06, 2018 12:01:00");
  var now = new Date();
  var diff = (date.getTime()/1000) - (now.getTime()/1000);

  var clock = $('.clock').FlipClock(diff,{
    clockFace: 'DailyCounter',
    countdown: true
  });

  $('.house_txt').empty();
  $('.senate_txt').empty();
  $.getJSON("http://ipinfo.io/", function(data) {
    var state = data.region
    var house_url = 'https://en.wikipedia.org/wiki/United_States_House_of_Representatives_elections,_2018#/' + state
    var senate_url = 'https://en.wikipedia.org/wiki/United_States_Senate_elections,_2018#/' + state
    var house_link = $('.house_btn');
    var senate_link = $('.senate_btn');

    house_link.attr('href', house_url);
    senate_link.attr('href', senate_url);
    $('.house_txt').append('(' + state + ')');
    $('.senate_txt').append('(' + state + ')');

    var zip = data.postal

    // working but gotta figure out how to hide api key with just JS
    var civic_api_key = ''

    $.getJSON('https://www.googleapis.com/civicinfo/v2/representatives?address=' + zip + '&roles=legislatorLowerBody' + '&roles=legislatorUpperBody' + '&key=' + civic_api_key + '&callback=?', function(rep_data){
      rep_data = rep_data['officials']
      // rep_data = rep_data.results
      $.each(rep_data, function(k, v){

        name = v.name
        party = v.party
        addy = v.address[0].line1
        city = v.address[0].city
        state = v.address[0].state
        zip = v.address[0].zip
        fbook = 'https://www.facebook.com/' + v.channels[0].id
        twitter = 'https://twitter.com/' + v.channels[1].id
        website = v.urls[0]
        phone = v.phones[0]

        list = $('.rep_list');
        list.append('<p style="font-weight:bold;">' + name + '</p>');
        list.append('<p>' + party + '</p>');
        list.append('<p>' + addy + '</p>');
        list.append('<p>' + city + ', ' + state + '</p>');
        list.append('<p>' + zip + '</p>');
        list.append('<p><a target=_blank href=tel:' + phone + '>' + phone + '</a></p>');
        list.append('<p><a target=_blank href=' + website + '>Website</a></p>');
        list.append('<p><a target=_blank href=' + fbook + '>Facebook</a></p>');
        list.append('<p><a target=_blank href=' + twitter + '>Twitter</a></p>');
        list.append('<hr>')
        list.append('<br/>')
      });
    });


  });
  function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
});
