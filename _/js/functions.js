var cw = 0;
var ch = 0;
var w = 0;
var h = 0;
var h2 = 0;
var l = 0;
var vh = 0;
var vw = 0;


jQuery(document).ready(function($) {

if ( document.location.href.indexOf('#vision') > -1 ) {
	$('html,body').animate({
		scrollTop: $("#vision").offset().top  
		},10);
    }

	
$('#backtotop').click(function(event) {
  	event.preventDefault();
	$('body,html').animate({scrollTop:0},1000);
});


$('#playButton').click(function(event) {
  	event.preventDefault();
  	videoPlay();
});

$('#playButton2').click(function(event) {
  	event.preventDefault();
  	videoPlay();
});


$("li a.jump").click(function(e){
	e.preventDefault();
	var thelink = $(this).attr("href");
	thelink = thelink.toLowerCase();
	goToByScroll(thelink);
});


$('#toe').click(function() {
  	if($('#site-credits').hasClass('open')){
		footClose();
	}
	else{
  		footOpen();
	}
});




$("#site-credits").hover(
	  function () {
	    if(!$(this).hasClass('open')){
	    	$(this).animate({height:50},200);
	    	$('html,body').animate({scrollTop: document.height},200);	    	
	    }
	  },
	  function () {
	    if(!$(this).hasClass('open')){	  
	   	 $(this).animate({height:44},200);
	    }
	  }
);



function footOpen(){  		
	$("#site-credits").animate({"height": 250}, 300);	 
	$('html,body').animate({
			 scrollTop: document.height
	},'slow');
	$("#site-credits").addClass('open');			 
}	


function footClose(){ 
	console.log('footclose');
	 $("#site-credits").animate({"height": 44}, 300);	 
	 $("#site-credits").removeClass('open');			 
}			 



});//end document.ready




$(window).ready(function() {




});//end window.ready




$(window).resize(function() {

	scaleMain();
	
});//end window.resize




$(window).scroll(function() { 
        
	if($(this).scrollTop() >= 130 && $("header").hasClass('before')){
		$("header").removeClass('before');
		$("header").addClass('after');
		
	} 
	else if($(this).scrollTop() < 130 && $("header").hasClass('after')){
		$("header").removeClass('after');
		$("header").addClass('before');		 		 		
	}    

});//end window.scroll



function scaleMain(){
	
	cw = $(window).width();
	ch = $(window).height();
	
	w = cw * 1; 	
	
	if(w >= 1280){
 		w = 1280; 
 		h = w * .5;
 		l = (cw - 960)/2;		
	}
	else if(w < 768){
		l = w * .05;
	 	h = w * .5625;
	}
	else{
		l = w * .1;
	 	h = w * .5625;		
	}
	

 	h2 = w * .525;
 	
 	vh = h * .8;
 	vw = vh * 1.77777;
 	vt = h * .1;

	$("#video").height(h);	
	$("#vimeo").height(h);		

	if(cw > ch){
	
		$("#vision").height(h2);
		$("#studio2").height(h2);
		$("#studio3").height(h2);

	}
	else{
		$("#vision").height('auto');
		$("#studio2").height('auto');
		$("#studio3").height('auto');
		$("#isb").height('auto');		
	}
	
	
}//scalemain


function goToByScroll(locale){

	$('html,body').animate({
		scrollTop: $(locale).offset().top -110
		},'slow');
}

function videoPlay(){
 	
 	$("#video").addClass('playing');	
    $('body,html').animate({scrollTop:0},1000);

}

function ready(player_id) {
    // Keep a reference to Froogaloop for this player
    var player = $f(player_id),

    playButton = document.getElementById('playButton');
    playButton2 = document.getElementById('playButton2');

  
  	$("#playButton").css('display', 'block');  

    /**
     * Attach event listeners.
     *
     * If you're using a javascript framework like jQuery or Mootools
     * you'll probably use their addEvent method to add the click events.
     * Here we're just using the standard W3C addEventListener method. If
     * you need IE8 support, you'll need to use attachEvent for IE8 and
     * addEventListener for everything else (or just use jQuery or MooTools).
     */

    playButton.addEventListener('click', function() {
        player.api('play');

    });

    playButton2.addEventListener('click', function() {
        player.api('play');

    });

}

window.addEventListener('load', function() {
    //Attach the ready event to the iframe
    $f(document.getElementById('vimeo')).addEvent('ready', ready);
});
