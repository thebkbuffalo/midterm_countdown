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
    $.getJSON('https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zip, function(rep_data){
      rep_data = rep_data.results
      $.each(rep_data, function(k, v){
        name = v.first_name +  ' ' + v.last_name;
        chamber = v.chamber;
        office = v.office
        state = v.state_name
        fbook = 'https://www.facebook.com/' + v.facebook_id
        twitter = 'https://twitter.com/' + v.twitter_id
        website = v.website
        contact = v.contact_form
        phone = v.phone

        list = $('.rep_list');

        list.append('<p>' + name + '</p>');
        list.append('<p>' + chamber + '</p>');
        list.append('<p>' + state + '</p>');
        list.append('<p>' + office + '</p>');
        list.append('<p><a target=_blank href=tel:' + phone + '>' + phone + '</a></p>');
        list.append('<p><a target=_blank href=' + contact + '>Contact</a></p>');
        list.append('<p><a target=_blank href=' + website + '>Website</a></p>');
        list.append('<p><a target=_blank href=' + fbook + '>Facebook</a></p>');
        list.append('<p><a target=_blank href=' + twitter + '>Twitter</a></p>');
        list.append('<hr>')
        list.append('<br/>')

      });
    });


  });
});
