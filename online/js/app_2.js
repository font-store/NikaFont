
	
  


var textTest = " کلاغ فرز و چابک، ظهر هر روز با صدای ضخیم و عذاب‌ آورش، ب‍ه جستجوی یک مثقال گنج پنهان، در حیاط رژه می رفت و مژگانش که خواب از آن همچنان نپریده بود! معمار دوید و با شیرجه زنان به سمتش گریست و پرواز کرد با صدای خارچ و چروخ";
  changeSize();

function changeSize() {

	var cs = $('.UnitTest .TextSizeCompaire');

	cs.each(function(){
		var key = $(this).parent().attr('id');
		var useText =  window.sessionStorage.getItem(key+'.text') || textTest;
		var box = $(this);
		var size = $('.size', this);
		var pBox = $('.boxContainer',box);

		if (window.sessionStorage.getItem(key+'.total') != null) $('.total', this).val(window.sessionStorage.getItem(key+'.total'))
		if (window.sessionStorage.getItem(key+'.size') != null) $('.size', this).val(window.sessionStorage.getItem(key+'.size'))	
		
		size.on('input',function() {
			setSize(box)
			window.sessionStorage.setItem(key+'.size',$(this).val());
		});

		$('.resetText',box).click(function(){
			window.sessionStorage.setItem(key+'.text',textTest) 	
			useText = textTest;
			$('p',pBox).trigger('refreshed');
		})
		$('.total', box).on('change',function() {
			window.sessionStorage.setItem(key+'.total',$(this).val());
			makeP(box);
			setSize(box);
		});


		$(pBox).on('keyup',"p",function(){
			var text = $(this).text();
			if( useText !== text){
				useText = text;
				window.sessionStorage.setItem(key+'.text',text);
				$('p',pBox).not(this).trigger('refreshed');
			}
		})

		$(pBox).on('refreshed',"p",function(){
			
			$(this).text(useText);
			
		})


		function makeP(container){
			var total = $('.total',container).val();

			var p = $('<div>').addClass('textBox').append('<span>&nspb</span><p>'+useText+'</p>');
			$('p', p).attr('contenteditable','true');
					pBox.children().remove();
			for (var x = 0; x < total; x++) {
				

				pBox.prepend(p.clone());	
			}

		}


		function setSize(container){
			var total =  $('.total',container).val();
			var size =  $('.size',container)[0].value;
				pBox.map(function(i,e){
					
					var xsize =parseInt(size)+parseInt(total)-i-1;
					
					$('p',e).css('fontSize',xsize+"px");
					$('span',e).html(xsize+"px");
				})
			
		}

	});
	$('.total', cs).triggerHandler('change');


}


