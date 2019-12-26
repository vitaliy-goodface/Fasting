$(window).resize(function () {

  // Прогресс скроллинга страницы

  scrollProgress();

});



$(document).ready(function () {

  // Прогресс скроллинга страницы

  scrollProgress();


  // Активный шаг квиза

  if ($('.quiz-line').length) {

    var activeStep = $('.quiz-line').attr('data-active-step');
    var stepsCount = $('.quiz-line').attr('data-steps-count');

    $('.quiz-step-active').text(activeStep);
    $('.quiz-steps-count').text(stepsCount);

  }


  // Чекбоксы

  if ($('.checkbox').length) {

    $('.checkbox').click(function () {

      if (!$(this).hasClass('checkbox_multiple')) {
        $(this).closest('.checkboxes').find('.checkbox_checked').removeClass('checkbox_checked');
      }

      $(this).toggleClass('checkbox_checked');

      $(this).mouseout();

    });

  }


  // Ввод только чисел

  $('.num').bind("change keyup input click", function (event) {

    let val = $(this).val();

    if (event.keyCode == 48) {
      if (val[0] == '0') {
        if (val.length > 1) {
          $(this).val('1' + val.slice(1));
        } else {
          $(this).val('1');
        }
      }
    }

    if (val[0] == '0') {
      $(this).val('1' + val.slice(1));
    }

    if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '');
    }
  });


  // Боковое меню

  if ($('.open-menu').length) {

    $('.open-menu, .hide-menu-bg').click(function () {

      $('.hide-menu-bg').toggleClass('hide-menu-bg_active');
      $('.hide-menu').toggleClass('hide-menu_active');

    });

  }

});



$(window).on('load', function () {

  if ($('#loader').length) {
    fillCircle();
  }

  if ($('.quiz-line').length) {
    setTimeout(function () {
      quizLineStatus();
    }, 100);
  }

  $(window).scroll();

});



$(window).on('scroll', function () {

  let scrollTop = $(this).scrollTop();

  // Прогресс скроллинга страницы

  scrollProgress();

  // Прячем шапку финала при скроллинге

  if ($('.final-page-header').length) {
    hideFinalHeader(scrollTop);
  }

  // Прячем шапку финала при скроллинге

  if ($('.final-schedule').length) {
    fillSchedule(scrollTop);
  }

  // Анимация чисел при скроллинге

  if ($('.animate-num').length) {
    animateNumbers(scrollTop);
  }

  // Анимация круга на полукруге

  if ($('.bmi__small-sircle').length) {
    startMoveBMI(scrollTop);
  }

});



// Переключение вкладок

if ($('.tabs__menu-item').length > 1) {

  $('.tabs__menu-item').click(function () {

    if ($(this).hasClass('tabs__menu-item_active')) {
      return;
    }

    $(this).closest('.tabs__menu').find('.tabs__menu-item_active').removeClass('tabs__menu-item_active');
    $(this).addClass('tabs__menu-item_active');

    let index = $(this).index();

    let activeItemHeight = $(this).closest('.tabs').find('.tabs__content-item_active').height();

    $(this).closest('.tabs').find('.tabs__content').css({
      height: activeItemHeight + 'px'
    });

    $('.tabs__content-item').css({
      position: 'absolute'
    });

    $(this).closest('.tabs').find('.tabs__content-item_active').removeClass('tabs__content-item_active');
    $(this).closest('.tabs').find('.tabs__content-item').eq(index).addClass('tabs__content-item_active');

  });

}



// Полоса состояния в квизе

function quizLineStatus() {

  let activeStep = $('.quiz-line').attr('data-active-step');
  let stepsCount = $('.quiz-line').attr('data-steps-count');

  if (activeStep > 1) {
    $('.quiz-line_disabled').removeClass('quiz-line_disabled');
  }

  let stepWidth = 100 / stepsCount;
  let lineWidth = (stepWidth * activeStep).toFixed(2);

  $('.quiz-line__line-progress').css({
    width: lineWidth + '%'
  });

}



// Лоадер с процентами

function fillCircle() {

  if ($('#loader').length) {

    let
      $circle = $('#loader'),
      $path = $circle.find('path'),
      pathLength = Math.round($path.get(0).getTotalLength()),
      offset = 1,
      textCount = $('.loader__list-item').length - 1,
      piceCount = Math.floor(100 / textCount);

    let fillPath = setInterval(function () {
      if (offset <= 100) {

        $path.attr('stroke-dasharray', (pathLength / 100) * offset + ',' + pathLength);
        $('.loader__status').html(offset + '%');

        if (offset >= piceCount) {
          $('.loader__list-item_active').removeClass('loader__list-item_active');
          $('.loader__list-item').eq(Math.floor(offset / piceCount)).addClass('loader__list-item_active');
        }

        offset++;

      } else {
        clearInterval(fillPath);
      }
    }, 75);

  }

}



// Прогресс бар скроллинга страницы

function scrollProgress() {

  if ($('.page-progress').length) {

    let documentHeight = $(document).height();
    let windowHeight = window.innerHeight;
    let scrollTrack = documentHeight - windowHeight;
    let currentScroll = $(document).scrollTop();

    let scrollStatus = (currentScroll / (scrollTrack / 100)).toFixed(2);

    $('.page-progress').css({
      width: scrollStatus + '%'
    });

  }

}



// Скролл до кнопки

$('.scrollToPlane').click(function (e) {

  e.preventDefault();

  let elementHeight = $('.get-a-plan').height();
  let windowHeight = window.innerHeight;
  let toTop = $('.get-a-plan').offset().top;
  let top = toTop - windowHeight + elementHeight + 25;

  $('html, body').animate({
    scrollTop: top + 'px'
  }, 900);

});



// Анимация чисел при скролинге

if ($('.animate-num').length) {

  function animateNumbers(scroll) {

    let windowHeight = window.innerHeight;

    $('.animate-num').each(function () {

      if ($(this).hasClass('return')) {
        return;
      }

      let toTop = $(this).offset().top;
      let elementHeight = $(this).height();
      let scrollCalculate = toTop - windowHeight + elementHeight + 20;

      if (scroll > scrollCalculate) {

        $(this).addClass('return');

        let num = +$(this).attr('data-num');
        var speed = 3000;

        if (num < 10 && (num ^ 0) === num) {
          speed = 500;
        }

        $(this).prop('Counter', 0).animate({
          Counter: num
        }, {
          duration: speed,
          easing: 'swing',
          step: function (now) {
            if ((num ^ 0) !== num) {
              $(this).text(roundPlus(now, 1).toFixed(1));
            } else {
              $(this).text(Math.ceil(now));
            }
          }
        });

      }

    });

  }

}

function roundPlus(x, n) {
  if (isNaN(x) || isNaN(n)) return false;
  var m = Math.pow(10, n);
  return Math.round(x * m) / m;
}



// Открытие доп информации в финале

if ($('.more-info-button').length) {

  $('.more-info-button').click(function () {
    $(this).siblings('.hide-info').addClass('hide-info_active');
  });

  $('.hide-info__close').click(function () {
    $(this).closest('.hide-info').removeClass('hide-info_active');
  });

}



// Заполнение графика

if ($('.final-schedule').length) {

  let finalScheduleOffset = $('.final-schedule').offset().top;
  let finalScheduleHeight = $('.final-schedule').height();
  let returnFinalSchedule = false;

  function fillSchedule(scroll) {

    if (returnFinalSchedule) {
      return;
    }

    let windowHeight = window.innerHeight;
    let scrollShow = finalScheduleOffset - windowHeight + finalScheduleHeight;

    if (scroll > scrollShow) {

      returnFinalSchedule = true;

      $('.final-schedule').addClass('final-schedule_visible');

      let
        $circle = $('.final-schedule'),
        $path = $circle.find('path'),
        pathLength = Math.round($path.get(0).getTotalLength()),
        offset = 1;

      let fillPath = setInterval(function () {
        if (offset <= 100) {

          $path.attr('stroke-dasharray', (pathLength / 100) * offset + ',' + pathLength);
          offset++;

        } else {
          clearInterval(fillPath);
        }
      }, 25);

    }

  }

}



// Анимация круга на полукруге

if ($('.bmi__small-sircle').length) {

  let BMIOffset = $('.bmi__half-circle-container').offset().top;
  let BMIHeight = $('.bmi__half-circle-container').height();
  let returnBMI = false;

  var counter = 0;

  var svgContainer = document.getElementById("outerWrapper");
  var ns = "http://www.w3.org/2000/svg";
  var svg = svgContainer.getElementsByTagNameNS(ns, "path");

  var straightLength = svg[0].getTotalLength();
  var curveLength = svg[0].getTotalLength();

  function moveBMI() {

    $('.bmi__small-sircle').addClass('bmi__small-sircle_active');

    counter += 0.003;

    if (counter * curveLength >= curveLength / 2) {
      return;
    }

    let translate = "translate(" + (svg[0].getPointAtLength(counter * curveLength).x - 15).toFixed(3) + "px," + (svg[0].getPointAtLength(counter * curveLength).y - 15).toFixed(3) + "px)";

    $('.bmi__small-sircle').attr('style', 'transform: ' + translate + ';');

    requestAnimationFrame(moveBMI);
  }

  function startMoveBMI(scroll) {

    if (returnBMI) {
      return;
    }

    let windowHeight = window.innerHeight;
    let scrollShow = BMIOffset - windowHeight + BMIHeight;

    if (scroll > scrollShow) {

      returnBMI = true;

      requestAnimationFrame(moveBMI);

    }

  }

}



// Прячем шапку финала при скроллинге

if ($('.final-page-header').length) {

  let getPlanButtonOffset = $('.get-a-plan').offset().top;
  let getPlanButtonHeight = $('.get-a-plan').height();

  function hideFinalHeader(scroll) {

    let windowHeight = window.innerHeight;
    let scrollHide = getPlanButtonOffset - windowHeight + getPlanButtonHeight;

    if (scroll > scrollHide) {
      $('.final-page-header').addClass('final-page-header_hide');
    } else {
      $('.final-page-header').removeClass('final-page-header_hide');
    }

  }

}



// FAQ

if ($('.questions__list-item').length) {

  $('.questions__list-item-title').click(function () {

    if ($(this).hasClass('return')) {
      return;
    } else {
      $(this).addClass('return');
    }

    let title = $(this);
    let description = $(this).closest('.questions__list-item').find('.questions__list-item-description-container');
    let activeClass = 'questions__list-item-title_active';

    if ($(this).hasClass(activeClass)) {
      $(this).removeClass(activeClass);
      description.animate({
        height: 'hide'
      }, 400, function () {
        title.removeClass('return');
      });
    } else {
      $(this).addClass(activeClass);
      description.animate({
        height: 'show'
      }, 400, function () {
        title.removeClass('return');
      });
    }

  });

}



// Отзывы

if ($('.reviews__list').length) {

  $('.reviews__list').slick({
    mobileFirst: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<div class="reviews__prev"></div>',
    nextArrow: '<div class="reviews__next"></div>',
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        variableWidth: true,
        adaptiveHeight: true
      }
    }]
  });

}