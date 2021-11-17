let _functions = {},
  winW, winH, winScr, isTouchScreen, isAndroid, isIPhone, is_Mac, is_IE, is_Chrome;

jQuery(function ($) {

  "use strict";

  /* function on page ready */
  isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
    isAndroid = navigator.userAgent.match(/Android/i),
    isIPhone = navigator.userAgent.match(/iPhone/i),
    is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
    is_IE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
    is_Chrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;

  const $body = $('body');

  setTimeout(function () {
    $body.addClass('loaded');
  }, 500);


  if (isTouchScreen) {
    $('html').addClass('touch-screen');
  }
  if (isAndroid) {
    $('html').addClass('android');
  }
  if (isIPhone) {
    $('html').addClass('ios');
  }
  if (is_Mac) {
    $('html').addClass('mac');
  }
  if (is_IE) {
    $('html').addClass('ie');
  }
  if (is_Chrome) {
    $('html').addClass('chrome');
  }


  _functions.pageCalculations = function () {
    winW = $(window).width();
    winH = $(window).height();
  }

  _functions.pageCalculations();


  //images preload
  _functions.imagesLazyLoad = function () {
    /* images load */
    $('img[data-i-src]:not(.imgLoaded)').each(function (i, el) {
      let loadImage = new Image();
      loadImage.src = $(el).data('i-src');

      loadImage.onload = function () {
        $(el).attr({
          'src': $(el).data('i-src')
        }).addClass('imgLoaded');
      };
      loadImage = null;
    });

    $('iframe[data-i-src]:not(.imgLoaded)').each(function (i, el) {
      $(el).attr({
        'src': $(el).data('i-src')
      }).addClass('imgLoaded');
    });

    $('[data-bg]:not(.bgLoaded)').each(function (i, el) {
      let loadImage = new Image();
      loadImage.src = $(el).data('bg');

      loadImage.onload = function () {
        $(el)
          .css({
            'background-image': 'url(' + $(el).data('bg') + ')'
          })
          .addClass('bgLoaded');
      }
      loadImage = null;
    });
  }

  //images preload
  setTimeout(function () {
    _functions.imagesLazyLoad();
  }, 100);



  //sidebar

  $(document).on('click', '.sidebar_hide-btn', function () {
    $(this).closest('.main-sidebar').toggleClass('closed');
    $('#main-sec').toggleClass('sidebar-hidden');
  });


  $(document).on('click', '.hamburger', function () {
    $(this).toggleClass('active');
  });


  $(document).on('click', '.switch-client_js', function () {
    let $this = $(this).closest('.main-sidebar_clients');

    $this.toggleClass('opened');
  });

  $(document).on('click', '.client-item', function () {
    let $this = $(this);
    if ($this.closest('.main-sidebar_clients').hasClass('opened')) {
      $this.siblings().removeClass('active');
      $this.addClass('active');
      $this.closest('.main-sidebar_clients').removeClass('opened');

      $this.closest('.main-sidebar_clients').find('.hamburger').toggleClass('active');
    }
  });
  


  $(document).on('click', '.main-nav li.has-child', function () {
    if(!$(this).closest('aside').hasClass('closed'))
      $(this).toggleClass('opened').children('ul').slideToggle();
  });



});