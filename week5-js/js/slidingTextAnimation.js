window.addEvent('domready'), function(){
        $('slidingText').getElements('li').each(function(el){
              new SlidingText(el);
        });
});
