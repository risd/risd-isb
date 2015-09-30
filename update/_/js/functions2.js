var cw = 0;
var ch = 0;
var w = 0;
var h = 0;
var h2 = 0;
var hd = 0;

var pBody = 0;


jQuery(document).ready(function($) {

	
$('#backtotop').click(function(event) {
  	event.preventDefault();
	$('body,html').animate({scrollTop:0},1000);
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
        
	if($(this).scrollTop() >= 110 && $("header").hasClass('before')){
		$("header").removeClass('before');
		$("header").addClass('after');
		
	} 
	else if($(this).scrollTop() < 110 && $("header").hasClass('after')){
		$("header").removeClass('after');
		$("header").addClass('before');		 		 		
	}    
	
});//end window.scroll



function scaleMain(){
	
	cw = $(window).width();
	ch = $(window).height();
	
	w = cw * 1; 	

 	h = w * .5625;
	
	if(w >= 1280){
 		w = 1280; 
 		h = w * .5625;
	}


	hd = h - 2;	 

	$("#gallery").height(h);	
	$("#gallery .dots").css('top',hd);
		

	if(cw > ch){
	

	}
	else{
	
	}
	
	
}//scalemain


function goToByScroll(locale){

	$('html,body').animate({
		scrollTop: $(locale).offset().top +110
		},'slow');

}

(function (window) {
    // This library re-implements setTimeout, setInterval, clearTimeout, clearInterval for iOS6.
    // iOS6 suffers from a bug that kills timers that are created while a page is scrolling.
    // This library fixes that problem by recreating timers after scrolling finishes (with interval correction).
    // This code is free to use by anyone (MIT, blabla).
    // Original Author: rkorving@wizcorp.jp
    var timeouts = {};
    var intervals = {};
    var orgSetTimeout = window.setTimeout;
    var orgSetInterval = window.setInterval;
    var orgClearTimeout = window.clearTimeout;
    var orgClearInterval = window.clearInterval;
    // To prevent errors if loaded on older IE.
    if (!window.addEventListener) return false;
    function createTimer(set, map, args) {
        var id, cb = args[0],
            repeat = (set === orgSetInterval);

        function callback() {
            if (cb) {
                cb.apply(window, arguments);
                if (!repeat) {
                    delete map[id];
                    cb = null;
                }
            }
        }
        args[0] = callback;
        id = set.apply(window, args);
        map[id] = {
            args: args,
            created: Date.now(),
            cb: cb,
            id: id
        };
        return id;
    }

    function resetTimer(set, clear, map, virtualId, correctInterval) {
        var timer = map[virtualId];
        if (!timer) {
            return;
        }
        var repeat = (set === orgSetInterval);
        // cleanup
        clear(timer.id);
        // reduce the interval (arg 1 in the args array)
        if (!repeat) {
            var interval = timer.args[1];
            var reduction = Date.now() - timer.created;
            if (reduction < 0) {
                reduction = 0;
            }
            interval -= reduction;
            if (interval < 0) {
                interval = 0;
            }
            timer.args[1] = interval;
        }
        // recreate
        function callback() {
            if (timer.cb) {
                timer.cb.apply(window, arguments);
                if (!repeat) {
                    delete map[virtualId];
                    timer.cb = null;
                }
            }
        }
        timer.args[0] = callback;
        timer.created = Date.now();
        timer.id = set.apply(window, timer.args);
    }
    window.setTimeout = function () {
        return createTimer(orgSetTimeout, timeouts, arguments);
    };
    window.setInterval = function () {
        return createTimer(orgSetInterval, intervals, arguments);
    };
    window.clearTimeout = function (id) {
        var timer = timeouts[id];
        if (timer) {
            delete timeouts[id];
            orgClearTimeout(timer.id);
        }
    };
    window.clearInterval = function (id) {
        var timer = intervals[id];
        if (timer) {
            delete intervals[id];
            orgClearInterval(timer.id);
        }
    };
    //check and add listener on the top window if loaded on frameset/iframe
    var win = window;
    while (win.location != win.parent.location) {
        win = win.parent;
    }
    win.addEventListener('scroll', function () {
        // recreate the timers using adjusted intervals
        // we cannot know how long the scroll-freeze lasted, so we cannot take that into account
        var virtualId;
        for (virtualId in timeouts) {
            resetTimer(orgSetTimeout, orgClearTimeout, timeouts, virtualId);
        }
        for (virtualId in intervals) {
            resetTimer(orgSetInterval, orgClearInterval, intervals, virtualId);
        }
    });
}(window));



