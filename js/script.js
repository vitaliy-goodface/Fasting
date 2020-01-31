$(window).resize(function() {
  // Прогресс скроллинга страницы

  scrollProgress();
});

$(document).ready(function() {

  // Прогресс скроллинга страницы

  scrollProgress();



  // Активный шаг квиза

  if ($(".quiz-line").length) {
    var activeStep = $(".quiz-line").attr("data-active-step");
    var stepsCount = $(".quiz-line").attr("data-steps-count");

    $(".quiz-step-active").text(activeStep);
    $(".quiz-steps-count").text(stepsCount);
  }



  // Чекбоксы

  if ($(".checkbox").length) {
    $(".checkbox").click(function() {
      if (!$(this).hasClass("checkbox_multiple")) {
        $(this)
          .closest(".checkboxes")
          .find(".checkbox_checked")
          .removeClass("checkbox_checked");
      }

      $(this).toggleClass("checkbox_checked");

      $(this).mouseout();
    });
  }



  // Ввод только чисел

  $(".num").bind("change keyup input click", function(event) {
    let val = $(this).val();

    if (event.keyCode == 48) {
      if (val[0] == "0") {
        if (val.length > 1) {
          $(this).val("1" + val.slice(1));
        } else {
          $(this).val("1");
        }
      }
    }

    if (val[0] == "0") {
      $(this).val("1" + val.slice(1));
    }

    if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, "");
    }
  });



  // Боковое меню

  if ($(".open-menu").length) {
    $(".open-menu, .hide-menu-bg").click(function() {
      $(".hide-menu-bg").toggleClass("hide-menu-bg_active");
      $(".hide-menu").toggleClass("hide-menu_active");
      blockBody();
    });
  }



  // Отключение кнопки в чекбоксах

  if ($(".button-for-checkboxes").length) {
    $(".checkbox").click(function() {
      if ($(".checkbox_checked").length == 0) {
        $(".button-for-checkboxes").addClass("button_disabled");
      } else {
        $(".button-for-checkboxes").removeClass("button_disabled");
      }
    });
  }



  // Слайдер на странице прайсинга

  if ($(".pricing-slider__list").length && window.innerWidth < 1260) {
    $(".pricing-slider__list").slick({
      variableWidth: true,
      centerMode: true,
      initialSlide: 1,
      dots: true,
      arrows: false,
      infinite: false
    });
  }



  // Закрытие окон

  $('.windows').on('click', '.close', function() {
    closeWindow();
  });

  $(document).mouseup(function(e) {

    var element = $('.window-area');

    if (!element.is(e.target) && element.has(e.target).length === 0) {

      closeWindow();

    }
  });

  $(".windows__thanks-content .button").click(function() {
    closeWindow();
  });



  // Копия ссылки из инпута

  $('.copy-link').click(function() {

    let copyText = '<input id="copyText" value="' + $('.input-link').val() + '">';
    $('body').append(copyText);

    document.getElementById('copyText').select();
    document.execCommand('copy');

    $('#copyText').remove();

    $('.input-link-container').addClass('input_sucsess');

  });



  // Открытие списка стран

  $('.countries-input__open-area').click(function() {

    $('.phone-window').toggleClass('phone-window_active');

  });

  $(document).mouseup(function(e) {

    var element = $('.countries-input__open-area');

    if (!element.is(e.target) && element.has(e.target).length === 0) {

      $('.phone-window').removeClass('phone-window_active');

    }
  });



  // Выбор страны в выпадающем списке

  $('.countries-list__item').click(function() {

    let src = $(this).find('img').attr('src');
    let code = $(this).find('.countries-list__country p').text().trim();

    $('.countries-input__open-area img').attr('src', src);
    $('.countries-input__open-area p').html(code);

  });



  // Открыть окно с выбором телефонов

  $('.open-window-phones').click(function() {
    showWindow('.phone-window');
  });



  // Переключение дней недели

  $('.meal-plan-weeks__days-list-item').click(function() {
    $(this).siblings('li').removeClass('meal-plan-weeks__days-list-item_active');
    $(this).addClass('meal-plan-weeks__days-list-item_active');
  });


  // Выпадающий список

  if ($('.select').length) {

    $('.select').click(function() {
      $(this).toggleClass('select_active');
    });

    $('.select__list li').click(function() {

      let val = $(this).text().trim();

      $(this).closest('.select').find('.select__value p').html(val);

    });

    $(document).mouseup(function(e) {
      var element = $('.select');
      if (!element.is(e.target) && element.has(e.target).length === 0) {
        $('.select').removeClass('select_active');
      }
    });

  }


  // Переключение дней

  if ($('.days-list').length) {

    $('.days-list li').click(function() {

      if ($(this).hasClass('days-list__active')) {
        return;
      }

      $(this).siblings('.days-list__active').removeClass('days-list__active');
      $(this).addClass('days-list__active');

    });

  }


  // Открытие рицепта

  $('.recipe__button').click(function() {

    let button = $(this);
    let content = $(this).closest('.recipe').find('.recipe__hide-content');

    if (button.hasClass('recipe__button_active')) {
      button.removeClass('recipe__button_active');
    } else {
      button.addClass('recipe__button_active');
    }

    content.slideToggle(500);

  });


  // Выбор недели

  if ($('.meal-plan__weeks').length) {

    $('.select__list li').click(function() {

      let index = $(this).index();

      $('.meal-plan__week-item_active').removeClass('meal-plan__week-item_active');
      $('.meal-plan__week-item').eq(index).addClass('meal-plan__week-item_active');

    });

  }


  // Выбор дня

  if ($('.days').length) {

    $('.days-list li').click(function() {

      let index = $(this).index();
      let days = $(this).closest('.meal-plan__week-item').find('.days__item');

      days.removeClass('days__item_active');
      days.eq(index).addClass('days__item_active');

    });

  }


  // Открытие таблиц

  if ($('.tables__button').length) {

    $('.tables__button').click(function() {

      let tablesContainer = $(this).closest('.tables').find('.tables-content');
      let tablesHeight = 0;

      tablesContainer.find('.table-container').each(function(element, i) {

        let height = $(this).outerHeight(true);
        tablesHeight += height;

      });

      if ($(this).hasClass('tables__button_active')) {

        tablesContainer.attr('style', '');

        $('.tables-content').removeClass('tables-content_active');
        $(this).removeClass('tables__button_active');

      } else {

        tablesContainer.css({
          height: tablesHeight + 'px'
        });

        $('.tables-content').addClass('tables-content_active');
        $(this).addClass('tables__button_active');

      }

    });

  }



  // Ховер блюд в милплане на PC

  if ($('.days__item').length) {

    $('.days__item .recipe').mouseover(function() {

      if (window.innerWidth >= 1024) {

        let daysList = $(this).closest('.days');
        let recipesList = $(this).closest('.days__item');
        let recipeIndex = $(this).index();
        let dayIndex = $(this).closest('.days__item').index();

        $(this).addClass('recipe-hover');
        $('.meal-plan__recipes-captions p').eq(recipeIndex).addClass('recipe-hover');
        $('.meal-plan__days-captions div').eq(dayIndex).addClass('recipe-hover');

        for (let i = 0; i < recipeIndex; i++) {
          recipesList.find('.recipe').eq(i).addClass('recipe-hover');
        }

        for (let i = 0; i < dayIndex; i++) {
          daysList.find('.days__item').eq(i).find('.recipe').eq(recipeIndex).addClass('recipe-hover');
        }

      }

    });

    $('.days__item .recipe').mouseout(function() {

      $('.recipe, .meal-plan__recipes-captions p, .meal-plan__days-captions div').removeClass('recipe-hover');

    });

  }



  // Открытие окна при выборе блюда в милплане на PC

  $('.days__item .recipe').click(function() {

    if (window.innerWidth > 1024) {

      let thisHTML = $(this).clone();

      $('.recipe-window').html(thisHTML);

      $('.recipe-window .recipe').addClass('window-area');
      $('.recipe-window .recipe').prepend('<div class="close"></div>');

      showWindow('.recipe-window');

    }

  });



  // Выбор типа оплаты

  $('.select-payment-method__card').click(function () {

    $('.select-payment-method').css({display: 'none'});
    $('.payment-frame').addClass('payment-frame_active');

  });


});

$(window).on("load", function() {
  if ($("#loader").length) {
    fillCircle();
  }

  if ($(".quiz-line").length) {
    setTimeout(function() {
      quizLineStatus();
    }, 100);
  }

  $(window).scroll();
});

$(window).on("scroll", function() {
  let scrollTop = $(this).scrollTop();

  // Прогресс скроллинга страницы

  scrollProgress();

  // Прячем шапку финала при скроллинге

  if ($(".final-page-header").length) {
    hideFinalHeader(scrollTop);
  }

  // Анимация графика

  if ($(".final-schedule").length) {
    fillSchedule(scrollTop);
  }

  // Анимация чисел при скроллинге

  if ($(".animate-num").length) {
    animateNumbers(scrollTop);
  }

  // Анимация круга на полукруге

  if ($(".bmi__small-sircle").length) {
    startMoveBMI(scrollTop);
  }

  // Подплывание элементов при скроллинге

  scrollAnimation(scrollTop);
});

// Переключение вкладок

if ($(".tabs__menu-item").length > 1) {
  $(".tabs__menu-item").click(function() {
    if ($(this).hasClass("tabs__menu-item_active")) {
      return;
    }

    $(this)
      .closest(".tabs__menu")
      .find(".tabs__menu-item_active")
      .removeClass("tabs__menu-item_active");
    $(this).addClass("tabs__menu-item_active");

    let index = $(this).index();

    let activeItemHeight = $(this)
      .closest(".tabs")
      .find(".tabs__content-item_active")
      .height();

    $(this)
      .closest(".tabs")
      .find(".tabs__content")
      .css({
        height: activeItemHeight + "px"
      });

    $(".tabs__content-item").css({
      position: "absolute"
    });

    $(this)
      .closest(".tabs")
      .find(".tabs__content-item_active")
      .removeClass("tabs__content-item_active");
    $(this)
      .closest(".tabs")
      .find(".tabs__content-item")
      .eq(index)
      .addClass("tabs__content-item_active");
  });
}

// Полоса состояния в квизе

function quizLineStatus() {
  let activeStep = $(".quiz-line").attr("data-active-step");
  let stepsCount = $(".quiz-line").attr("data-steps-count");

  if (activeStep > 1) {
    $(".quiz-line_disabled").removeClass("quiz-line_disabled");
  }

  let stepWidth = 100 / stepsCount;
  let lineWidth = (stepWidth * activeStep).toFixed(2);

  $(".quiz-line__line-progress").css({
    width: lineWidth + "%"
  });
}

// Лоадер с процентами

function fillCircle() {
  if ($("#loader").length) {
    let $circle = $("#loader"),
      $path = $circle.find("path"),
      pathLength = Math.round($path.get(0).getTotalLength()),
      offset = 1,
      textCount = $(".loader__list-item").length - 1,
      piceCount = Math.floor(100 / textCount);

    let fillPath = setInterval(function() {
      if (offset <= 100) {
        $path.attr(
          "stroke-dasharray",
          (pathLength / 100) * offset + "," + pathLength
        );
        $(".loader__status").html(offset + "%");

        if (offset >= piceCount) {
          $(".loader__list-item_active").removeClass(
            "loader__list-item_active"
          );
          $(".loader__list-item")
            .eq(Math.floor(offset / piceCount))
            .addClass("loader__list-item_active");
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
  if ($(".page-progress").length) {
    let documentHeight = $(document).height();
    let windowHeight = window.innerHeight;
    let scrollTrack = documentHeight - windowHeight;
    let currentScroll = $(document).scrollTop();

    let scrollStatus = (currentScroll / (scrollTrack / 100)).toFixed(2);

    $(".page-progress").css({
      width: scrollStatus + "%"
    });
  }
}

// Скролл до кнопки

$(".scrollToPlane").click(function(e) {
  e.preventDefault();

  let elementHeight = $(".get-a-plan").height();
  let windowHeight = window.innerHeight;
  let toTop = $(".get-a-plan").offset().top;
  let top = toTop - windowHeight + elementHeight + 25;

  $("html, body").animate({
      scrollTop: top + "px"
    },
    900
  );
});

// Анимация чисел при скролинге

if ($(".animate-num").length) {

  function animateNumbers(scroll) {

    let windowHeight = window.innerHeight;

    $(".animate-num").each(function() {
      if ($(this).hasClass("return")) {
        return;
      }

      let toTop = $(this).offset().top;
      let elementHeight = $(this).height();
      let scrollCalculate = toTop - windowHeight + elementHeight;

      if (scroll > scrollCalculate) {
        $(this).addClass("return");

        let num = +$(this).attr("data-num");
        var speed = 3000;

        if ((num < 10 && (num ^ 0) !== num) || num < 10) {
          speed = 1000;
        }

        $(this)
          .prop("Counter", 0)
          .animate({
            Counter: num
          }, {
            duration: speed,
            easing: "swing",
            step: function(now) {
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

  function roundPlus(x, n) {
    if (isNaN(x) || isNaN(n)) return false;
    var m = Math.pow(10, n);
    return Math.round(x * m) / m;
  }
}

// Открытие доп информации в финале

if ($(".more-info-button").length) {
  $(".more-info-button").click(function() {
    $(this)
      .siblings(".hide-info")
      .addClass("hide-info_active");
  });

  $(".hide-info__close").click(function() {
    $(this)
      .closest(".hide-info")
      .removeClass("hide-info_active");
  });
}

// Заполнение графика

if ($(".final-schedule").length) {
  var finalScheduleOffset = $(".final-schedule-nums").offset().top;
  var finalScheduleHeight = $(".final-schedule-nums").height();
  var returnFinalSchedule = false;

  function fillSchedule(scroll) {
    if (returnFinalSchedule) {
      return;
    }

    let windowHeight = window.innerHeight;
    let scrollShow = finalScheduleOffset - windowHeight + finalScheduleHeight;

    if (scroll > scrollShow) {
      returnFinalSchedule = true;

      $(".final-schedule").addClass("final-schedule_visible");

      let $circle = $(".final-schedule"),
        $path = $circle.find("path"),
        pathLength = Math.round($path.get(0).getTotalLength()),
        offset = 1;

      let fillPath = setInterval(function() {
        if (offset <= 100) {
          $path.attr(
            "stroke-dasharray",
            (pathLength / 100) * offset + "," + pathLength
          );
          offset++;
        } else {
          clearInterval(fillPath);
        }
      }, 25);
    }
  }
}

// Анимация круга на полукруге

if ($(".bmi__small-sircle").length) {
  var BMIOffset = $(".bmi__half-circle-container").offset().top;
  var BMIHeight = $(".bmi__half-circle-container").height();
  var returnBMI = false;

  var counter = 0;

  var svgContainer = document.getElementById("outerWrapper");
  var ns = "http://www.w3.org/2000/svg";
  var svg = svgContainer.getElementsByTagNameNS(ns, "path");

  var straightLength = svg[0].getTotalLength();
  var curveLength = svg[0].getTotalLength();

  function moveBMI() {
    $(".bmi__small-sircle").addClass("bmi__small-sircle_active");

    counter += 0.003;

    if (counter * curveLength >= curveLength / 2) {
      return;
    }

    let translate =
      "translate(" +
      (svg[0].getPointAtLength(counter * curveLength).x - 15).toFixed(3) +
      "px," +
      (svg[0].getPointAtLength(counter * curveLength).y - 15).toFixed(3) +
      "px)";

    $(".bmi__small-sircle").attr("style", "transform: " + translate + ";");

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

if ($(".final-page-header").length) {
  var getPlanButtonOffset = $(".get-a-plan").offset().top;
  var getPlanButtonHeight = $(".get-a-plan").height();

  function hideFinalHeader(scroll) {
    let windowHeight = window.innerHeight;
    let scrollHide = getPlanButtonOffset - windowHeight + getPlanButtonHeight;

    if (scroll > scrollHide) {
      $(".final-page-header").addClass("final-page-header_hide");
    } else {
      $(".final-page-header").removeClass("final-page-header_hide");
    }
  }
}

// FAQ

if ($(".questions__list-item").length) {
  $(".questions__list-item-title").click(function() {
    if ($(".questions__list-item-title").hasClass("return")) {
      return;
    } else {
      $(this).addClass("return");
    }

    let returnFunction = false;

    let questionsList = $(this).closest(".questions__list");
    let title = $(this);
    let description = $(this)
      .closest(".questions__list-item")
      .find(".questions__list-item-description-container");
    let activeClass = "questions__list-item-title_active";

    if (questionsList.find(".opened_description").length) {
      if ($(this).hasClass(activeClass)) {
        returnFunction = true;
      }
      questionsList.find("." + activeClass).removeClass(activeClass);
      questionsList.find(".opened_description").animate({
          height: "hide"
        },
        400,
        function() {
          $(this).removeClass("opened_description");
          title.removeClass("return");
        }
      );
    }

    if (returnFunction) {
      return;
    }

    title.addClass("return");
    title.addClass(activeClass);
    description.animate({
        height: "show"
      },
      400,
      function() {
        $(this).addClass("opened_description");
        title.removeClass("return");
      }
    );
  });
}

// Отзывы

if ($(".reviews__list").length) {
  $(".reviews__list").slick({
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

// Блокировка скроллинга body

function blockBody() {
  if ($("body").hasClass("no-scroll")) {
    let scrollTop = $("body").attr("data-scroll");

    $("body").removeClass("no-scroll");
    $(document).scrollTop(scrollTop);
  } else {
    let scrollTop = $(document).scrollTop();

    $("body").addClass("no-scroll");
    $("body").css({
      top: "-" + scrollTop + "px"
    });
    $("body").attr("data-scroll", scrollTop);
  }
}

// Подплывания элементов при скроллинге

function scrollAnimation(scroll) {
  if (!$(".animate").length && !$(".animate-mobile").length) {
    return;
  }

  let windowHeight = window.innerHeight;

  $(".animate").each(function(index, element) {
    if ($(this).hasClass("return")) {
      return;
    }

    let offsetTop = $(this).offset().top + 70;

    if (scroll > offsetTop - windowHeight) {
      $(this).addClass("animate-active");
      $(this).addClass("return");
    }
  });

  if (window.innerWidth < 760) {
    $(".animate-mobile").each(function(index, element) {
      if ($(this).hasClass("return")) {
        return;
      }

      let offsetTop = $(this).offset().top + 50;

      if (scroll > offsetTop - windowHeight) {
        $(this).addClass("animate-active");
        $(this).addClass("return");
      }
    });
  }
}

// Показ окон

function showWindow(name) {

  blockBody();

  $(".windows").animate({
    opacity: "show"
  }, 350, function() {

    $(name).animate({
        opacity: "show"
      }, 350,
      function() {
        $(this).addClass("opened-window");
      }
    );

  });

}

function closeWindow() {

  $(".opened-window").animate({
    opacity: "hide"
  }, 350, function() {

    $(this).removeClass("opened-window");

    $(".windows").animate({
      opacity: "hide"
    }, 350, function() {
      if ($(".windows__thanks-content").length) {
        $(".windows__thanks-content").css({
          display: "none"
        });
        $(".window-email__content").css({
          display: "block"
        });
      }
      blockBody();
    });

  });

}

function thanksForEmail() {

  $(".window-email__content").animate({
    opacity: "hide"
  }, 350, function() {

    $(".windows__thanks-content").animate({
      opacity: "show"
    }, 350);

  });

}
