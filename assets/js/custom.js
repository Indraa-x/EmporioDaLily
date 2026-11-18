(function ($) {
	
	"use strict";

	var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	$("#contact").on("submit", function(event) {
		event.preventDefault();
		var fields = new FormData(this);
		var period = this.elements.namedItem("time").selectedOptions[0].textContent;
		var message = [
			"Olá! Gostaria de pedir uma reserva de mesa no Empório da Lily.",
			"",
			"Nome: " + fields.get("name").trim(),
			"Telefone: " + fields.get("phone").trim(),
			"Número de pessoas: " + fields.get("number-guests"),
			"Data: " + fields.get("date").trim(),
			"Período: " + period
		];

		var notes = fields.get("message").trim();
		if (notes) {
			message.push("Observações: " + notes);
		}

		var whatsapp = new URL(document.getElementById("reservation-whatsapp").href);
		whatsapp.searchParams.set("text", message.join("\n"));
		window.location.assign(whatsapp.href);
	});

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	
	$.fn.datepicker.dates["pt-BR"] = {
		days: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
		daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
		daysMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
		months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
		today: "Hoje",
		clear: "Limpar"
	};

	$('#date').datepicker({
		language: "pt-BR",
		format: "dd/mm/yyyy",
		autoclose: true,
		todayHighlight: true
	}).on("click", function() {
		$(this).datepicker("show");
	});
	

	$('.filters ul li').click(function(){
	  $('.filters ul li').removeClass('active');
	  $(this).addClass('active');
	  
	  var data = $(this).attr('data-filter');
	  $grid.isotope({
	    filter: data
	  })
	});

	var $grid = $(".grid").isotope({
	  itemSelector: ".all",
	  percentPosition: true,
	  masonry: {
	    columnWidth: ".all"
	  }
	})

	$(".Modern-Slider").slick({
	    autoplay: !reducedMotion.matches,
	    autoplaySpeed:10000,
	    speed: reducedMotion.matches ? 0 : 600,
	    slidesToShow:1,
	    slidesToScroll:1,
	    pauseOnHover:false,
	    dots:true,
	    pauseOnDotsHover:true,
	    cssEase:'linear',
	   // fade:true,
	    draggable:false,
	    prevArrow:'<button class="PrevArrow"></button>',
	    nextArrow:'<button class="NextArrow"></button>', 
	  });

	$('.search-icon a').on("click", function(event) {
	    event.preventDefault();
	    $("#search").addClass("open");
	    $('#search > form > input[type="search"]').focus();
	  });

	  $("#search, #search button.close").on("click keyup", function(event) {
	    if (
	      event.target == this ||
	      event.target.className == "close" ||
	      event.keyCode == 27
	    ) {
	      $(this).removeClass("open");
	    }
	  });

	  $("#search-box").submit(function(event) {
	    event.preventDefault();
	    return false;
	  });


	$('.owl-menu-item').owlCarousel({
		items:5,
		loop:true,
		dots: true,
		nav: true,
		autoplay: !reducedMotion.matches,
		smartSpeed: reducedMotion.matches ? 0 : 250,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:5
			  }
		  }
	  })

	// Window Resize Mobile Menu Fix
	mobileNav();


	if ("IntersectionObserver" in window && !reducedMotion.matches) {
		var revealObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("motion-enter");
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });

		document.querySelectorAll(
			".section .section-heading, #about .right-content, #chefs .chef-item, #reservation .contact-form, .footer-main"
		).forEach(function(element) {
			revealObserver.observe(element);
		});
	}
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(reducedMotion.matches ? 0 : 200);
		});
	}


	$('.scroll-to-section a[href^="#"]').on('click', function() {
		if ($(window).width() < 767) {
			$('.menu-trigger').removeClass('active');
			$('.header-area .nav').slideUp(reducedMotion.matches ? 0 : 200);
		}
	});
	$(document).on('scroll', onScroll);

	function onScroll(event){
	    var scrollPos = $(document).scrollTop() + 81;
	    $('.main-nav .nav a[href^="#"]').each(function () {
	        var currLink = $(this);
	        var section = document.getElementById(this.hash.slice(1));
	        if (!section) return;
	        var sectionTop = $(section).offset().top;
	        currLink.toggleClass("active", sectionTop <= scrollPos && sectionTop + $(section).outerHeight() > scrollPos);
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		if (reducedMotion.matches) {
			$("#preloader").hide();
			return;
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			$("#top .hero-logo, #top .main-white-button").addClass("motion-enter");
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);
