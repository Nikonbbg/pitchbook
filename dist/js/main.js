
$(document).ready(function() {
	var waitForFinalEvent;
	waitForFinalEvent = (function() {
		var timers;
		timers = {};
		return function(callback, ms, uniqueId) {
			if (!uniqueId) {
				uniqueId = 'Don\'t call this twice without a uniqueId';
			}
			if (timers[uniqueId]) {
				clearTimeout(timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();




	var teleport;

	(teleport = function() {
		$('[data-tablet]').each(function(i, elem) {
			var parent;
			if (windowWidth() <= 991) {
				$(elem).appendTo($($(elem).data('tablet')));
			} else {
				parent = $($(elem).data('desktop'));
				$(elem).appendTo(parent);
			}
		});
		$('[data-mobile]').each(function(i, elem) {
			var parent;
			if (windowWidth() <= 767) {
				$(elem).appendTo($($(elem).data('mobile')));
			} else if (windowWidth() <= 991 && $(elem).data('tablet')) {
				$(elem).appendTo($($(elem).data('tablet')));
			} else {
				parent = $($(elem).data('desktop'));
				$(elem).appendTo(parent);
			}
		});
	})();



	$('.toggle-main-menu').click(function(e) {
		e.preventDefault();
		$('html, body').toggleClass('overlayed');
		$('.head-menu-outer').toggleClass('active');
		$(this).toggleClass('close');
		$('.tabs-head li').eq(0).addClass('active');
		$('#head-tabs .tab').eq(0).addClass('active');
	});



	var setFooter;

	(setFooter = function() {
		var height;
		height = $('.main-footer').outerHeight();
		$('main').css('padding-bottom', height + 'px');
		$('.main-footer').css('margin-top', -height + 'px');
	})();

	$('.click-mob').click(function(e) {
		$(this).toggleClass('active');
		$(this).parents('.price-deatail').siblings('.price-info').slideToggle();
	});
	/*
				tabs
	 */
	var setActiveTab;

	setActiveTab = function(list, index) {
		var current;
		list.find('[data-tab]').removeClass('active');
		current = list.find('[data-tab]').eq(index);
		current.addClass('active');
	};


	$('.tabs-item li').click(function(e) {
		if (!$(this).parent().hasClass('active')) {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			setActiveTab($($(this).parents('.tabs-item').data('for')), $(this).index());
		}
		if ((e.target.nodeName.toLowerCase() !== 'label') || (e.target.nodeName.toLowerCase() !== 'input')) {
			e.preventDefault();
		}
	});

	$('.tabs-head a').click(function(e) {
			e.preventDefault();
	});
	
	$('.tabs-head li').mouseenter(function(e) {
		if (!$(this).parent().hasClass('active')) {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			setActiveTab($($(this).parents('.tabs-head').data('for')), $(this).index());
		}
		if ($('#head-tabs .tab').hasClass('active')) {
			 setActiveTab($($(this).parents('.tabs-head').data('for')), $(this).index());
		}
	});

	$('.tabs-header').mouseleave(function(e) {
		console.log('leave');
		$('.nav-menu li').removeClass('active');
		$('.hidden-nav .tab').removeClass('active');
	});


	function carouselCustom(sizeItem,spaceRight,viewImage){
			var step = sizeItem + spaceRight;
			var sliderBoxWidth = viewImage * step - spaceRight;
			var countImage = $(".slider-list li").length;
			var valueMainLeft = 0;
			var maxValueLeft = countImage * step;

			$(".slider-row").width(sliderBoxWidth);

			$(".slider-list li").width(sizeItem).css("margin-right",spaceRight);

			$(".left-arrow").click(function(){
				if(valueMainLeft == 0){
						valueMainLeft = -maxValueLeft + viewImage * step;
				} else{
						valueMainLeft = valueMainLeft + step;
				}
				$(".slider-row .slider-list").css("margin-left",valueMainLeft + "px");
			});
			$(".right-arrow").click(function(){
				if(- valueMainLeft == maxValueLeft - viewImage * step){
						valueMainLeft = 0;
				} else{
						valueMainLeft = valueMainLeft - step;
				}
				$(".slider-row  .slider-list").css("margin-left",valueMainLeft + "px");
			});
	}



	var counted = function(e) {
		var number;
		if (windowWidth() <= 639) {
			number = 1;
		}
		else if (windowWidth() <= 768) {
			number = 2;
		}
		else {
			number = 3;
		}
		return number 
	};

	var getWidthForSlider = function(width) {
			var sliderWidth = document.getElementById("caro");
			var vWidht = $(sliderWidth).width();
			var number;
			if (windowWidth() <= 639) {
				number = 1;
			}
			else if (windowWidth() <= 768) {
				number = 2;
				vWidht = vWidht / number;
			}
			else {
				number = 3;
				vWidht = vWidht / number;
				console.log(number + ' get');
			}
			return parseInt(vWidht, 10) 
	};

	carouselCustom(getWidthForSlider(),0,counted());

	
	$(window).resize(function() {
		carouselCustom(getWidthForSlider(),0,counted());
		waitForFinalEvent((function() {
			teleport();
			setFooter();
		}), 200, '');
	});
});
