
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
      if (windowWidth() <= 639) {
        $(elem).appendTo($($(elem).data('mobile')));
      } else if (windowWidth() <= 991 && $(elem).data('tablet')) {
        $(elem).appendTo($($(elem).data('tablet')));
      } else {
        parent = $($(elem).data('desktop'));
        $(elem).appendTo(parent);
      }
    });
  })();


  var toggleHeadMenu;

  toggleHeadMenu = function() {
    if ($('.toggleButton').hasClass('active')) {
      if (windowWidth() <= 992) {
        $('html, body').addClass('overlayed');
      }
      $('.fixed-menu').addClass('active');
    } else {
      if (windowWidth() <= 992) {
        $('html, body').removeClass('overlayed');
      }
      $('.fixed-menu').removeClass('active');
    }
  };


  $('.toggleButton').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    toggleHeadMenu();
  });

  $('.toggleButtonClose').click(function(e) {
    e.preventDefault();
    $('.toggleButton').removeClass('active');
    toggleHeadMenu();
  });


  $('[data-scrollto]').click(function(e) {
    var offset, too;
    e.preventDefault();
    offset = $('.fake-header').height();
    too = $($(this).attr('data-scrollto'));
    $('html, body').animate({
      scrollTop: too.offset().top - offset
    }, 1000);
    setTimeout(function() {
      return too.find('.input').eq(0).focus();
    }, 1000);
  });

  var setFooter;

  (setFooter = function() {
    var height;
    height = $('.main-footer').outerHeight();
    $('main').css('padding-bottom', height + 'px');
    $('.main-footer').css('margin-top', -height + 'px');
  })();

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

  
  $(window).resize(function() {
    waitForFinalEvent((function() {
      teleport();
    }), 200, '');
  });
});
