$(document).ready(function(){
  var date = new Date("November 06, 2018 12:01:00");
  var now = new Date();
  var diff = (date.getTime()/1000) - (now.getTime()/1000);

  var clock = $('.clock').FlipClock(diff,{
    clockFace: 'DailyCounter',
    countdown: true
  });
});
