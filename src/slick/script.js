



$('.carousel__wapper_img').slick({
    infinite: true,
    speed: 250,
    adaptiveHeight: false,
    prevArrow : '<button type="button" class="slick-prev"><img src="img/carousel/arrow-left.png"></button>',
    nextArrow : '<button type="button" class="slick-next"><img src="img/carousel/arrow-right.png"></button>',
    responsive: [
        {
            breakpoint: 993, //992
            settings: {
                dots: true,
                arrows: false,
            }
        }
    ]
});