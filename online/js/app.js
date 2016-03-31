
   var ss = window.sessionStorage;	
  



function changeSize() {

	var testPanel = $('#TestPanel');
 
	var size = $('.textSize', testPanel);
	var sizeNumber = $('.textSizeNumber', testPanel);
	var key = $(this).parent().attr('id');
	var langs = $("input[name='lang']");
	var lineType = $("input[name='linetype']");
	var features = $("input[name='feature[]'");
	var baseline = $("#baseline");
	var Box = $('#TextContainer',testPanel);
	var Shadow = $('.shadow');
	var Blur = $('.blurRange')
	var me = $('.me');


/*
Hotkey Evenets
*/
	$(document).bind('keydown', 'ctrl+]', function(){
		var val = ss.getItem('TestPanel.size');
		val = parseInt(val) +5;
		ss.setItem('TestPanel.size',val);
		
		refresh();

	});

	$(document).bind('keydown', 'ctrl+[', function(){
		let val = size.val();
		val = val -5;
		ss.setItem('TestPanel.size',val);
		refresh();
	});


	baseline.click(function(){
		var res = $(this).prop('checked');
		ss.setItem('TestPanel.baseline',res);
		refresh()
	})

	lineType.click(function(){
			ss.setItem('TestPanel.lineType', $(this).val());	
			refresh();
	});
	
	features.on('click',function(){
		var f = [];
		features.filter(':checked').each(function(){
			f.push(  $(this).val() ) ;
		});
		ss.setItem('TestPanel.features',f);
		refresh();	
	})
	
	me.on('keyup',function(){
		var text = $(this).html();
	
		ss.setItem('TestPanel.text',text);
		
	})

	size.on('input',function() {
		var val = $(this).val();
		ss.setItem('TestPanel.size',val);
		refresh();
	});

	sizeNumber.on('input',function() {
		var val = $(this).val();
		ss.setItem('TestPanel.size',val);
		refresh();
	});

	Shadow.on('input',function() {
		var val = $(this).val();
		ss.setItem('TestPanel.shadow',val);
	 	refresh();
	});

	Blur.on('input',function() {
		var val = $(this).val();
		ss.setItem('TestPanel.blur',val);
		refresh();
	});

	langs.change(function(){
		var x = $(this).val();
		ss.setItem('TestPanel.lang',x);
		refresh();
	})



		 function refresh(){
		 	var _lang = ss.getItem('TestPanel.lang') || 'fa';
		 	var _size = ss.getItem('TestPanel.size') || '40';
		 	var _lineType = ss.getItem('TestPanel.lineType') || 'normal';
		 	var _shadow = ss.getItem('TestPanel.shadow') || 0;
		 	var _blur = ss.getItem('TestPanel.blur') || 0;
		 	var _text = ss.getItem('TestPanel.text') || 'متن دلخواه شما';
		 	var _fea = ss.getItem('TestPanel.features') || "kern,liga";
		 	var _base = ss.getItem('TestPanel.baseline') || 'true';
		 	var _scroll = ss.getItem('TestPanel.scroll')  || 0;

		 	var textStyles = {}
		 	//langs
		 	 langs.filter('[value='+_lang+']').prop('checked', true);
		 	 Box.find('.'+_lang).addClass('show').siblings().removeClass('show');

		 	 // set test\
		 	 me.html(_text);

		 	 //set size

		 	 size.prop('value',_size);
		 	 sizeNumber.prop('value',_size);
		 	 textStyles['font-size'] = _size+'px';
		 	 //enable baseline grid


		 	 if(_base =='true') {
		 	 		Box.addClass('grid-line') ;
		 	 	//baseline.prop('checked', true);

		 	 } else{

		 	 	Box.removeClass('grid-line') ;
		 	 }

		 	 _fea = _fea.split(',');
		 	 var _feaStyle=[]
		 	 features.each(function(){
		 	 	var val = $(this).val();
		 	 	if ( _fea.includes(val)) {
		 	 		$(this).prop('checked',true);
		 	 		_feaStyle.push('"'+val+'"');		
		 	 	} else{
		 	 		_feaStyle.push('"'+val+'" off');	
		 	 	}
		 	 	
		 	 	
		 	 });
		 	 textStyles['-moz-font-feature-settings'] = _feaStyle.join(' ,');
		 	 textStyles['-webkit-font-feature-settings'] = _feaStyle.join(' ,');
			 
			 Shadow.prop('value',_shadow);
			 Blur.prop('value',_blur)
			textStyles['text-shadow'] = 'initial';
			textStyles['filter'] = "initial";
			langs.filter('[value='+_lineType+']').prop('checked', true);
			Box.find('p').css('white-space', _lineType);
		 		textStyles['-webkit-filter'] = "initial";
		 		textStyles['color'] = '#4a4a4a';
		 	if(_shadow != 0 ){
		 		
		 		var shadowBlur = _shadow *(_size /50);
		 		var pos =  _shadow *(_size /100) ;
		 		var shadowColler = "#333";
		 		if(shadowBlur < 5){
		 			//shadowBlur =  5;
		 		}	

		 		textStyles['text-shadow'] = `0px ${pos  }px  ${shadowBlur}px ${shadowColler}, 
		 			${pos  }px 0px  ${shadowBlur}px ${shadowColler},
		 			0px -${pos }px  ${shadowBlur}px ${shadowColler},
		 			-${pos }px 0px ${shadowBlur}px ${shadowColler}`;
		 			textStyles['color'] = '#fff';
		 	} 
		 		
		 	
		 	if(_blur != 0 ){
		 		textStyles['filter'] = "blur("+_blur+"px)";
		 		textStyles['-webkit-filter'] = "blur("+_blur+"px)";
		 	} 

		 	//console.log(textStyles);
			 	 Box.css(textStyles);

		 	
		 	 
		 }


	refresh();
}


$(window).on('beforeunload', function(){
    	 var scroll = $(".boxContainer")[0].scrollTop;
    	 
    			ss.setItem('TestPanel.scroll',scroll);
	
});

$(window).on('load', function(){
	  changeSize();
	    	 var scroll = ss.getItem('TestPanel.scroll');

	    	  $(".boxContainer")[0].scrollTop = scroll || 0;
    	 
    			

});
