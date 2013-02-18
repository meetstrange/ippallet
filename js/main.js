var ip_api = "http://jsonip.com/";

var draw = function(ip) {
  $('#ip').html(ip);
  $("#pallet").empty();
  a_genesis(ip);
};

// get the ip address
$(document).ready(function(){
  $.get(ip_api,function(data){ 
    console.log(typeof(data));
    if(typeof(data) != "object"){
      data = JSON.parse(data);
    }
    var ips = data.ip.split(',');
    var ip = ips[0];
    if(ips.length>1){
      var total1 = eval(ips[0].split('.').join('+'));
      var total2 = eval(ips[1].split('.').join('+'));
      if(total2>total1){
        ip = ips[1];
      }
    }
    draw(ip); 
  }).error(function() { 
    draw("<span style='color:red;'>We can't find it... Sorry!</span>"); 
  });
});

var getHexForColor = function(rgb, k){
  var hsl = rgb.hsl();
  var newHsl = hsl.darker(k);
  if(hsl.l<=0.5){
    newHsl = hsl.brighter(k);
  }
  return newHsl.rgb().toString();
}

// utility to append a color to the pallet
var bc = function($el, colour_name, rgb) {

  palletColorStr = rgb.toString();
  labelColorStr = getHexForColor(rgb, 1.6);

  labelColorStyle='style="color:'+labelColorStr+';"';
  palletColorStyle='style="background-color:'+palletColorStr+'"';

  nameHtml ='<span class="name">'+colour_name+'</span>';
  hexHtml = '<span class="hex">Hex: '+palletColorStr+'</span>';
  rgbHtml = '<span class="rgb">RGB: '+rgb.r+','+rgb.g+','+rgb.b+'</span>';
  labelHtml = '<div class="label" '+labelColorStyle+'>'+nameHtml+hexHtml+rgbHtml+'</div>';
  $el.append('<li id="'+colour_name+'" '+palletColorStyle+'>'+labelHtml+'</li>');
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
  bc($el, 'Triad 1', triad1.rgb());
  var triad2 = d3.hsl(d3hsl.h - 240, d3hsl.s, d3hsl.l);
  bc($el, 'Triad 2', triad2.rgb());;
};

// Algo 'genesis': the first, second and third numbers of the IP address
var a_genesis = function(ip) {
  var rgb = ip.split('.');
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
