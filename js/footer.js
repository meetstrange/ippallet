$(document).ready(function(){

	var visible = false;

	var togglePopup = function(hover){
		if(hover && !visible){
			$('.popup').fadeIn(200);
			visible = true;
		}
		if(!hover && visible){
			$('.popup').fadeOut(200);
			visible = false;
		}
	}

	$('.popup-container, popup').hover(function(){
		togglePopup(true);
	},function(){
		togglePopup(false);
	});
});