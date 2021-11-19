$(document).ready(function() {

  var itemsLength = $('.slider > div').length - 1;
  var fl=0;

  $('.slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $('.slide').on('click', function() {
    $(this).toggleClass('locked');
  });
  
  $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    if(currentSlide<nextSlide){
      if(!$('.slider .slide:last-child').hasClass('slick-active')){
        var locked = new Array();
        $('.slider .slide').each(function () { 
          if($(this).hasClass('locked')){
            locked.push($(this).data('slick-index'));
          }
        });
        
        $.each(locked, function (index, value) { 
          el_cur = $(".slide[data-slick-index='" + value +"']");
          el_next = el_cur.next();
          var copy_from = $(el_cur).clone(true);   
          $(el_next).replaceWith(copy_from);
          var copy_to = $(el_next).clone(true);        
          $(el_cur).replaceWith(copy_to);
        });
      }
    }else{
      if(!$('.slider .slide:first-child').hasClass('slick-active')){
        var locked = new Array();
        $('.slider .slide').each(function () { 
          if($(this).hasClass('locked')){
            locked.push($(this).data('slick-index'));
          }
        });
        
        $.each(locked, function (index, value) { 
          el_cur = $(".slide[data-slick-index='" + value +"']");
          el_prev = el_cur.prev();
          var copy_from = $(el_cur).clone(true);   
          $(el_prev).replaceWith(copy_from);
          var copy_to = $(el_prev).clone(true);        
          $(el_cur).replaceWith(copy_to);
        });
      }
    }

    $(window).resize(function() {
      $('.slider .slide').each(function () { 
        $(this).removeClass('locked');
      });
    });
  });
});
