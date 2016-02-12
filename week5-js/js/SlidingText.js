/*
SlidingText

Version: 1.0 alpha

License:
	MIT-style license. (http://opensource.org/licenses/mit-license.php)

Copyright:
	Copyright (c) 2008 [Nathan White](http://nwhite.net/).

Author:
	Nathan White
	
Redistributions of source code must retain the above license, copyright and author notice
*/

var SlidingText = new Class({

	Implements : [Options],
	
	index : 0,
	animated : false,
	text : '',
	
	options : {
		delay : 50
	},

	initialize : function(el,options){
		this.setOptions(options);
		this.element = $(el).addEvent('mouseover',this.over.bind(this));
		this.text = $A(this.element.get('text').split(""));
	},
	
	addLetter : function(){
		if( this.index ) this.element.set('text', this.element.get('text') + this.text[this.index] );
		else this.element.set('text', this.text[this.index]);
		if( (this.index + 1) < this.text.length ){
			this.index++;
			this.addLetter.delay(this.options.delay,this);
		} else {
			this.index = 0;
			this.animated = false;
		}
	},
	
	over : function(){
		if(this.animated) return;
		this.animated = true;
		this.addLetter();
	}

});