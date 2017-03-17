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
  $.getJSON("http://freegeoip.net/json/", function(data) {
    var state = data.region_name
    var time_zone = data.time_zone;
    var latitude = data.latitude;
    var longitude = data.longitude;
    var house_url = 'https://en.wikipedia.org/wiki/United_States_House_of_Representatives_elections,_2018#/' + state
    var senate_url = 'https://en.wikipedia.org/wiki/United_States_Senate_elections,_2018#/' + state
    var house_link = $('.house_btn');
    var senate_link = $('.senate_btn');

    house_link.attr('href', house_url);
    senate_link.attr('href', senate_url);
    $('.house_txt').append('(' + state + ')');
    $('.senate_txt').append('(' + state + ')');

  });
});
