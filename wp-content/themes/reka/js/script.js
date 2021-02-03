/*------------------------------------------------------------------
[Master Scripts]

Project:    Reka Theme
Version:    1.3.0

[Table of contents]

[Components]

	-Preloader
	-Stick sidebar
	-Dropdown img
	-Equal Height function
	-Navigation open
	-Search
	-Mobile menu
	-Fixed header
	-Screen rezise events
	-Fix centered container
	-Blog items & filtering
	-Full sreen navigation
	-Animation
	-Animation
	-Load more
	-Comment reply
	-Popup image
	-Parallax
	-Tabs
	-Quantity
	
-------------------------------------------------------------------*/

"use strict";

/*------------------------------------------------------------------
[ Preloader ]
*/
jQuery(window).on('load', function () {
    jQuery(window).trigger('resize').trigger('scroll');
    jQuery('body').addClass('loaded');

    jQuery('.owl-carousel').each(function(){
		jQuery(this).trigger('refresh.owl.carousel');
	});
});

/*------------------------------------------------------------------
[ Equal Height function ]
*/
function equalHeight(group) {
    if(jQuery(window).width() > '768') {
		var tallest = 0;
       	jQuery(group).each(function() {
            var thisHeight = jQuery(this).css('height', '').outerHeight();
            if(thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        jQuery(group).css('height', tallest);
    } else {
    	jQuery(group).css('height', '');
    }
}

jQuery('.tabs').each(function(){
	var item = jQuery(this).find('.item'),
		tabs_head = jQuery(this).find('.tabs-head');
	item.each(function() {
		var name = jQuery(this).data('name');
		tabs_head.append('<div class="item"><div class="cell">'+name+'</div></div>');
	});
	tabs_head.find('.item:first-of-type').addClass('active-tab');
	jQuery(this).find('.tabs-body .item:first-of-type').css('display', 'block');

	jQuery('.tabs-head').on('click', '.item:not(.active-tab)', function() {  
		jQuery(this).addClass('active-tab').siblings().removeClass('active-tab').parents('.tabs').find('.tabs-body .item').eq(jQuery(this).index()).fadeIn(150).siblings().hide();  
	});
});

jQuery('.tabs-type2').each(function(){
	var item = jQuery(this).find('.item'),
		tabs_head = jQuery(this).find('.tabs-head');
	item.each(function() {
		var name = jQuery(this).data('name');
		tabs_head.find('.row').append('<div class="item"><div class="cell">'+name+'</div></div>');
	});
	tabs_head.find('.item:first-of-type').addClass('active-tab');
	jQuery(this).find('.tabs-body .item:first-of-type').css('display', 'block');

	jQuery('.tabs-head').on('click', '.item:not(.active-tab)', function() {  
		jQuery(this).addClass('active-tab').siblings().removeClass('active-tab').parents('.tabs-type2').find('.tabs-body .item').eq(jQuery(this).index()).fadeIn(150).siblings().hide();  
	});
});

jQuery('.tabs-type3').each(function(){
	var item = jQuery(this).find('.item'),
		tabs_head = jQuery(this).find('.tabs-head');
	item.each(function() {
		var icon = jQuery(this).data('icon'),
			heading = jQuery(this).data('heading');
		tabs_head.append('<div class="item"><div class="icon-box-item"><div class="icon '+icon+'"></div><h6 class="h">'+heading+'</h6></div></div>');
	});
	tabs_head.find('.item:first-of-type').addClass('active-tab');
	jQuery(this).find('.tabs-body .item:first-of-type').css('display', 'block');

	jQuery('.tabs-head').on('click', '.item:not(.active-tab)', function() {  
		jQuery(this).addClass('active-tab').siblings().removeClass('active-tab').parents('.tabs-type3').find('.tabs-body .item').eq(jQuery(this).index()).fadeIn(150).siblings().hide();  
	});
});

jQuery('.price-list-type2').each(function() {
	var item = jQuery(this).find('.item'),
		tabs_head = jQuery(this).find('.price-list-tabs'),
		row = jQuery(this).find('.row'),
		tabs_array = [],
		tabs_array_end = [];

	item.each(function() {
		var tab = jQuery(this).data('tab'),
			tab_class = jQuery(this).data('tab-class');

		tabs_array.push([tab,tab_class]);
	});

	for(var $i=0;$i<tabs_array.length;$i++){
		var $currentPair = tabs_array[$i];
		var $pos = null;
		for(var $j=0;$j<tabs_array_end.length;$j++){
			if(tabs_array_end[$j][0] == $currentPair[0] &&tabs_array_end[$j][1] == $currentPair[1]){
				$pos = $j;
			}
		}
		if($pos == null){
			tabs_array_end.push($currentPair);
		}
	}

	for(var $i=0;$i<tabs_array_end.length;$i++){
		var active_class = '';
		if($i == 0) {
			active_class = ' class="active"';
		}
		tabs_head.append('<button'+active_class+' data-filter=".category-'+tabs_array_end[$i][1]+'">'+tabs_array_end[$i][0]+'</button>');
	}

	var $grid = row.isotope({
		itemSelector: '.item',
		filter: '.category-'+tabs_array_end[0][1]
	});

	tabs_head.on( 'click', 'button:not(.active)', function() {
		jQuery(this).addClass('active').siblings().removeClass('active');

		var filterValue = jQuery(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
		jQuery(window).trigger('resize').trigger('scroll');
		return false;
	});
});

jQuery(document).ready(function() {

    if(jQuery('.navigation > ul > li').length > 6) {
		jQuery('.navigation').addClass('min');
	}

	jQuery('#wpadminbar').addClass('wpadminbar');

	/*------------------------------------------------------------------
	[ Project slider ]
	*/
	jQuery('.project-slider').each(function(){
		var head_slider = jQuery(this);
		if(head_slider.find('.item').length == 1) {
			head_slider.parent().removeClass('with-carousel-nav');
		}
		if(jQuery(this).find('.item').length > 1){
			head_slider.addClass('owl-carousel').owlCarousel({
				loop:true,
				items:1,
				nav: true,
				dots: false,
				autoplay: false,
				navClass: ['owl-prev basic-icons-left-arrow-forward','owl-next basic-icons-right-arrow-forward'],
				navText: false,
				responsive:{
					0:{
						nav: false,
					},
					480:{

					},
					768:{
						nav: true,
					},
				},
			});

			var child_carousel = head_slider.next('.project-slider-carousel');

			var i = 0;
			var flag = false;
			var c_items = '4';

			if(head_slider.find('.owl-item:not(.cloned)').find('.item').length < 4) {
				c_items = head_slider.find('.owl-item:not(.cloned)').find('.item').length;
			}

			var child_carousel_c = child_carousel.addClass('owl-carousel').owlCarousel({
				loop:true,
				items:1,
				nav: true,
				dots: false,
				autoplay: false,
				navClass: ['owl-prev basic-icons-left-arrow-forward','owl-next basic-icons-right-arrow-forward'],
				navText: false,
				margin: 15,
				responsive:{
					0:{
						nav: false,
					},
					480:{

					},
					768:{
						nav: true,
						items: c_items
					},
				},
			}).on('click initialized.owl.carousel', '.item', function(e) {
				e.preventDefault();    	
				head_slider.trigger('to.owl.carousel', [jQuery(e.target).parents('.owl-item').index(), 300, true]);
				jQuery(e.target).parents('.owl-item').addClass('active-item').siblings().removeClass('active-item');
			}).data('owl.carousel');

			var child_carousel_item = child_carousel.find('.owl-item.active');



			head_slider.on('change.owl.carousel', function(e) {
				if (e.namespace && e.property.name === 'position' && !flag) {
					flag = true;
					child_carousel_c.to(e.relatedTarget.relative(e.property.value), 300, true);
					head_slider.parent().find('.banner-carousel .owl-item.active').first().addClass('active-item').siblings().removeClass('active-item');
					flag = false;
				}
			}).data('owl.carousel');

		}
	});


    /*------------------------------------------------------------------
	[ Search ]
	*/

	jQuery('.site-header .search-button').on("click", function(){
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.search-popup').fadeOut();
		} else {
			jQuery(this).addClass('active');
			jQuery('.search-popup').fadeIn();
		}
	});

	jQuery('.search-popup .close').on("click", function(){
		jQuery('.site-header .search-button').removeClass('active');
		jQuery('.search-popup').fadeOut();
	});
	
	/*------------------------------------------------------------------
	[ Navigation ]
	*/

	jQuery('.nav-button.hidden_menu, .nav-button.visible_menu').on('click', function() {
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.navigation').removeClass('active');
		} else {
			jQuery(this).addClass('active');
			jQuery('.navigation').addClass('active');
		}
	});

	jQuery('.nav-button.full_screen').on('click', function() {
		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.full-screen-nav').fadeOut();
		} else {
			jQuery(this).addClass('active');
			jQuery('.full-screen-nav').fadeIn();
		}
	});

	jQuery('.full-screen-nav .close').on("click", function(){
		jQuery('.nav-button.full_screen').removeClass('active');
		jQuery('.full-screen-nav').fadeOut();
	});

	jQuery('.full-screen-nav .menu-item-has-children > a').on("click", function(){
		if(!jQuery(this).hasClass('active')) {
			jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().parent().siblings().children('a').removeClass('active').next('.sub-menu').slideUp();
			return false;
		}
	});

	jQuery('.side-navigation ul li.menu-item-has-children > a,.side-navigation ul li.page_item_has_children > a').on('click', function(){
		jQuery(this).parents('li').addClass('active-child');
		return false;
	});

	jQuery('.side-navigation .sub-menu .back,.side-navigation .children .back').on('click', function(){
		jQuery(this).parent().parent().removeClass('active-child');
		return false;
	});
	
	/*------------------------------------------------------------------
	[ Side bar ]
	*/

	jQuery('.sidebar-button').on('click', function() {
		jQuery('.side-bar-area').addClass('active');
	});

	jQuery('.side-bar-area .close').on("click", function(){
		jQuery('.side-bar-area').removeClass('active');
	});

	/*------------------------------------------------------------------
	[ Fixed header ]
	*/

	jQuery(window).on("load resize scroll", function(){
		if ( jQuery(document).scrollTop() > 0 ) {
			jQuery('.site-header').addClass('fixed');
		} else {
			jQuery('.site-header').removeClass('fixed');
		}
	});


	/*------------------------------------------------------------------
	[ Price list ]
	*/

	jQuery(document).on('click', ".price-list .item .options .button-style1", function(){
		if(jQuery(this).parent().hasClass('active')) {
			jQuery(this).removeClass('active').parent().removeClass('active').find('.wrap').slideUp();
		} else {
			jQuery(this).addClass('active').parent().addClass('active').find('.wrap').slideDown();
		}
		return false;
	});

	/*------------------------------------------------------------------
	[ Screen rezise events ]
	*/
	
	var nav_el = '';
	if(jQuery('.navigation').hasClass('visible_menu')) {
		nav_el = 'yes';
	}
	jQuery(window).on("load resize", function(){
		jQuery('.banner-area').each(function() {
			if((jQuery(this).offset().top-jQuery('#wpadminbar').outerHeight()) == 0) {
				jQuery(this).addClass('on-top').find('.container > .cell').css('padding-top', parseInt(30+jQuery('#wpadminbar').outerHeight()+jQuery('.site-header').outerHeight()))
			}
		});

		/*------------------------------------------------------------------
		[ Mobile menu ]
		*/
		if(jQuery(window).width() <= 993) {
			jQuery('.navigation .menu-item-has-children > a').on("click", function(){
				if(!jQuery(this).hasClass('active')) {
					jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp();
					return false;
				}
			});
		}


	    jQuery('.header-space').css('height', jQuery('.site-header').outerHeight()+jQuery('.header + .navigation').outerHeight()+jQuery('.ypromo-site-bar').outerHeight());

	    jQuery('main.main-row').css('min-height', jQuery(window).outerHeight()-jQuery('.site-footer').outerHeight()-jQuery('.header-space:not(.hide)').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight());

		jQuery('.banner:not(.fixed-height)').each(function(){
			var coef = 0;
			jQuery(this).css('height', jQuery(window).outerHeight()-jQuery('.header-space:not(.hide)').outerHeight()-jQuery('#wpadminbar').outerHeight()-coef);
			jQuery(this).find('.cell').css('height', jQuery(this).height());
		});
		jQuery('.banner.fixed-height').each(function(){
			jQuery(this).find('.cell').css('height', jQuery(this).height());
		});

		jQuery('.full-screen-nav .cell').css('height', jQuery(window).height()-20-jQuery('#wpadminbar').height());

		if (nav_el == "yes") {
			if(jQuery(window).width() >= 993) {
				jQuery('.navigation').addClass('visible_menu');
				jQuery('.nav-button').addClass('hidden');
			} else {
				jQuery('.navigation').removeClass('visible_menu');
				jQuery('.nav-button').removeClass('hidden').removeClass('active');
			}
		}

		jQuery('div[data-vc-full-width-mod="true"]').each(function() {
			var coef = (jQuery('.container').outerWidth()-jQuery('#all').width())/2;
			jQuery(this).css('left', coef).css('width', jQuery('#all').width());
		});

		jQuery('.blog-type-grid').each(function(){
			equalHeight(jQuery(this).find('.blog-item .wrap'));
			equalHeight(jQuery(this).find('.blog-item h5'));
		});

		jQuery('.blog-type-horizontal').each(function(){
			equalHeight(jQuery(this).find('.blog-item h5'));
		});

		jQuery('.testimonials').each(function(){
			equalHeight(jQuery(this).find('.testimonial-item'));
			equalHeight(jQuery(this).find('.image'));
			equalHeight(jQuery(this).find('.text'));
		});

		jQuery('.products').each(function(){
			equalHeight(jQuery(this).find('.woocommerce-LoopProduct-link'));
			equalHeight(jQuery(this).find('.product'));
		});

		jQuery('.testimonials-type2').each(function(){
			equalHeight(jQuery(this).find('.item'));
			equalHeight(jQuery(this).find('.h'));
			equalHeight(jQuery(this).find('.text'));
		});

		jQuery('.icon-box-items').each(function(){
			equalHeight(jQuery(this).find('.icon-box-item'));
		});

		jQuery('.testimonials-type3').each(function(){
			equalHeight(jQuery(this).find('.wrap'));
			equalHeight(jQuery(this).find('.text'));
		});

		jQuery('.benefit-items').each(function(){
			equalHeight(jQuery(this).find('.top'));
			equalHeight(jQuery(this).find('.wrap'));
		});

		jQuery('.icon-box-item-wrap').each(function(){
			equalHeight(jQuery(this).find('.icon-box-item'));
		});

		jQuery('.icon-box-items-style3').each(function(){
			equalHeight(jQuery(this).find('.icon-box-item-style3'));
		});

		jQuery('.num-box-items').each(function(){
			equalHeight(jQuery(this).find('.item'));
		});

		jQuery('.category').each(function(){
			equalHeight(jQuery(this).find('.category-item'));
			equalHeight(jQuery(this).find('.wrap'));
		});

		jQuery('.tabs-type2').each(function(){
			var tabs_head = jQuery(this).find('.tabs-head'),
				el = tabs_head.find('.item');
			el.css('width', parseInt(tabs_head.find('.row').width()/el.length));
		});

		jQuery('.tabs-type3').each(function(){
			var tabs_head = jQuery(this).find('.tabs-head'),
				el = tabs_head.find('.item');
			el.css('width', parseInt(tabs_head.width()/el.length));
		});

		jQuery('.pagination-buttons').each(function(){
			var width = jQuery(this).width(),
				count = jQuery(this).find('.item').length;

			jQuery(this).find('.item').css('width', parseInt(width/count));
		});

		jQuery('.project-horizontal-slider img, .project-horizontal, .project-horizontal-img').css('height', jQuery(window).outerHeight()-jQuery('.header-space:not(.hide)').height()-jQuery('.site-footer').outerHeight()-jQuery('#wpadminbar').outerHeight());
		jQuery('.project-horizontal .cell').css('height', jQuery('.project-horizontal').outerHeight());

		jQuery('.ph-slider .item img, .ph-slider, .portfolio-h .cell').css('height', jQuery(window).outerHeight()-jQuery('.header-space:not(.hide)').height()-jQuery('.site-footer').outerHeight()-jQuery('.minified-footer').outerHeight()-jQuery('#wpadminbar').outerHeight());

		jQuery('.projects-slider').css('height', jQuery(window).outerHeight()-jQuery('.site-footer').outerHeight()-jQuery('.site-header').outerHeight()-jQuery('.ypromo-site-bar').outerHeight()-jQuery('#wpadminbar').outerHeight());

		jQuery('.portfolio-h').each(function(){
			var parent_w = jQuery(this).width();

			jQuery(this).find('.ph-slider-area').css('margin-right', -(jQuery(window).width()-parent_w)/2);
		});
		
		jQuery('.sb-block > .cell').css('height', jQuery(window).outerHeight()-jQuery('.header-space:not(.hide)').height()-jQuery('#wpadminbar').outerHeight());

		/*------------------------------------------------------------------
		[ Fix centered container ]
		*/
		jQuery('.centered-container').each(function() {
			var width = parseInt(Math.round(jQuery(this).width()).toFixed(0)),
				height = parseInt(Math.round(jQuery(this).height()).toFixed(0));

			jQuery(this).css('width', '').css('height', '');

			if ( width & 1 ) {jQuery(this).css('width', (width+1)+'px');}

			if ( height & 1 ) {jQuery(this).css('height', (height+1)+'px');}
		});

		/*------------------------------------------------------------------
		[ Parallax ]
		*/
		jQuery('.background-parallax').each(function(){
			var wScroll = jQuery(window).scrollTop()-jQuery(this).parent().offset().top+jQuery('#wpadminbar').height()+jQuery('.header-space').height();
	 		jQuery(this).css('transform', 'translate(0px,' + wScroll + 'px)');
	 		jQuery(this).parents('.owl-carousel').find('.owl-nav div').css('margin-top', wScroll);
		});
	});

	/*------------------------------------------------------------------
	[ Accordion ]
	*/

	jQuery('.accordion-items .item .top').on('click', function() {
		if(jQuery(this).parent().hasClass('active')) {
			jQuery(this).parent().removeClass('active').find('.wrap').slideUp();
		} else {
			jQuery(this).parent().addClass('active').find('.wrap').slideDown();
		}
	});

	/*------------------------------------------------------------------
	[ Project horizontal slider ]
	*/
	jQuery('.project-horizontal-slider').each(function(){
		var head_slider = jQuery(this);
		if(head_slider.find('.item').length > 1){
			head_slider.imagesLoaded( function() {
				head_slider.addClass('owl-carousel').owlCarousel({
					items:1,
					nav: true,
					dots: false,
					autoplay: false,
					autoWidth: true,
					navClass: ['owl-prev basic-icons-left-arrow-forward','owl-next basic-icons-right-arrow-forward'],
					navText: false,
					margin: 30,
					responsive:{
						0:{
							nav: false,
						},
						480:{

						},
						768:{
							nav: true,
						},
					}
				});
			});
		}
	});


    /*------------------------------------------------------------------
	[ Scroll top button ]
	*/

	jQuery('#scroll-top').on("click", function(){
		jQuery('body, html').animate({ scrollTop: '0' }, 1100); 
		return false;
	});

	/*------------------------------------------------------------------
	[ Comment reply ]
	*/

	jQuery('.replytocom').on('click', function(){
		var id_parent = jQuery(this).attr('data-id');
		jQuery('#comment_parent').val(id_parent);
		jQuery('#respond').appendTo(jQuery(this).parents('.comment-item'));
		jQuery('#cancel-comment-reply-link').show();
		return false;
	});

	jQuery('#cancel-comment-reply-link').on('click', function(){
		jQuery('#comment_parent').val('0');
		jQuery('#respond').appendTo(jQuery('#commentform-area'));
		jQuery('#cancel-comment-reply-link').hide();
		return false;
	});

	/*------------------------------------------------------------------
	[ Quantity ]
	*/

	jQuery('.quantity .down').on("click", function(){
		var val = jQuery(this).parent().find('.input-text').val();
		if(val > 1) {
			val = parseInt(val) - 1;
			jQuery(this).parent().find('.input-text').val(val);
		}
		return false;
	});

	jQuery('.quantity .up').on("click", function(){
		var val = jQuery(this).parent().find('.input-text').val();
		val = parseInt(val) + 1;
		jQuery(this).parent().find('.input-text').val(val);
		return false;
	});

	/*------------------------------------------------------------------
	[ Animations ]
	*/

	jQuery(window).on('load scroll', function(){
		jQuery('.skill-item .chart').each(function(){
			var top = jQuery(document).scrollTop()+jQuery(window).height();
			var pos_top = jQuery(this).offset().top;
			if (top > pos_top) {
				jQuery(this).addClass('animated');
			}
		});

		jQuery('.skill-item .rating-line').each(function(){
			var top = jQuery(document).scrollTop()+jQuery(window).height(),
				pos_top = jQuery(this).offset().top,
				val = jQuery(this).data('percent');
			if (top > pos_top) {
				if(!jQuery(this).hasClass('animated')) {
					jQuery(this).addClass('animated').find('.line').css('width', val+'%');
				}
			}
		});
	});

	jQuery(window).scroll(num_scr);

	function num_scr() {
		jQuery('.num-box-items .item .num').each(function() {
			var top = jQuery(document).scrollTop()+jQuery(window).height();
			var pos_top = jQuery(this).offset().top;
			if (top > pos_top) {
				jQuery(window).off("scroll", num_scr);
				if(!jQuery(this).hasClass('animated')) {
					jQuery(this).addClass('animated').prop('Counter',0).animate({
						Counter: jQuery(this).text()
					}, {
						duration: 3000,
						easing: 'swing',
						step: function (now) {
							jQuery(this).text(Math.ceil(now));
						}
					});
				}
			}
		});
	}

	jQuery('.jquery-background-video').each(function() {
		jQuery(this).bgVideo({showPausePlay: false});
	});

	if(jQuery('.popup-gallery').length > 0) {
		jQuery('body').append('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> <div class="pswp__bg"></div><div class="pswp__scroll-wrap"> <div class="pswp__container"> <div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"> <div class="pswp__top-bar"> <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> <div class="pswp__preloader"> <div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"> </button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"> </button> <div class="pswp__caption"> <div class="pswp__caption__center"></div></div></div></div></div>')

		var $pswp = jQuery('.pswp')[0];
	    var image = [];

	    jQuery('.popup-gallery').each( function() {
	        var $pic     = jQuery(this);
	        $pic.on('click', '.popup-item, article', function(event) {
	       		var getItems = function() {
	                var items = [],
	                	$el = '';
	                if($pic.hasClass('owl-carousel')) {
	                	$el = $pic.find('.owl-item:not(.cloned) a:visible');
	                } else {
	                	$el = $pic.find('a');
	                }
	                $el.each(function() {
	                    var $href   = jQuery(this).attr('href'),
	                        $size   = jQuery(this).data('size').split('x'),
	                        $width  = $size[0],
	                        $height = $size[1];

	                    if(jQuery(this).data('type') == 'video') {
	                    	var item = {
	                    		html: jQuery(this).data('video')
	                    	};
	                    } else {
		                    var item = {
		                        src : $href,
		                        w   : $width,
		                        h   : $height
		                    }
		                }

	                    items.push(item);
	                });
	                return items;
	            }

		        var items = getItems();

		        jQuery.each(items, function(index, value) {
		            image[index]     = new Image();
		            if(value['src']) {
		            	image[index].src = value['src'];
		            }
		        });

	            event.preventDefault();
	            
	            var $index = jQuery(this).index();
	            if(jQuery(this).parent().hasClass('thumbnails')) {
	            	$index++;
	            }
	            if(jQuery(this).parent().hasClass('owl-item')) {
	            	$index = jQuery(this).data('id');
	            }
              if (jQuery(this).parents('.popup-gallery').find('.grid-sizer').length > 0) {
                $index = $index - 1;
              }
	            var options = {
	                index: $index,
	                bgOpacity: 0.7,
	                showHideOpacity: true
	            }

	            var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
	            lightBox.init();

	            lightBox.listen('beforeChange', function() {
	            	var currItem = jQuery(lightBox.currItem.container);
	            	jQuery('.pswp__video').removeClass('active');
	            	var currItemIframe = currItem.find('.pswp__video').addClass('active');
	            	jQuery('.pswp__video').each(function() {
	            		if (!jQuery(this).hasClass('active')) {
	            			jQuery(this).attr('src', jQuery(this).attr('src'));
	            		}
	            	});
	            });

	            lightBox.listen('close', function() {
	            	jQuery('.pswp__video').each(function() {
	            		jQuery(this).attr('src', jQuery(this).attr('src'));
	            	});
	            });
	        });
	    });
	}
});

