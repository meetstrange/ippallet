var ip_api = "http://jsonip.com/";

var draw = function(ip) {
  $('#ip').html(ip);
  $("#pallet").empty();
  a_genesis(ip);
};

// get the ip address
$.get(ip_api,function(data){ 
  draw(data.ip); 
}).error(function() { 
  draw("<span style='color:red;'>We can't find it... Sorry!</span>"); 
});

// utility to append a color to the pallet
var bc = function($el, colour_name, rgb) {
  $el.append('<li id="'+colour_name+'" style="background-color:rgb('+rgb.r+','+rgb.g+','+rgb.b+');"></li>');
};

// set the primary, and all other colours (triads, etc)
var all = function(id, rgb) { 
  var $el = $('#pallet');
  var d3_rgb = d3.rgb(rgb[0], rgb[1], rgb[2]);
  bc($el, 'Primary', d3_rgb);
  var d3hsl = d3_rgb.hsl();
  var comp = d3.hsl(d3hsl.h - 180, d3hsl.s, d3hsl.l);
  bc($el, 'Complementary', comp.rgb());
  var triad1 = d3.hsl(d3hsl.h - 120, d3hsl.s, d3hsl.l);
  bc($el, 'Triad1', triad1.rgb());
  var triad2 = d3.hsl(d3hsl.h - 240, d3hsl.s, d3hsl.l);
  bc($el, 'Triad2', triad2.rgb());
};

// Algo 'genesis': the first, second and third numbers of the IP address
var a_genesis = function(ip) {
  var rgb = ip.split('.');
  console.log(rgb);
  all("Genesis", rgb);
};

// Algo 'shifted genesis': the second, third and fourth numbers of the IP address
var a_shiftedgenesis = function(ip) {
  var rgb = ip.split('.').splice(1,3);
  all("ShiftedGenesis", rgb);
};

// Algo 'half genesis': the first, second and third numbers of the IP address, all halved
var a_halfgenesis = function(ip) {
  var rgb = ip.split('.');
  all("HalfGenesis", [rgb[0]/2, rgb[1]/2, rgb[2]/2]);
};
