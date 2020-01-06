


const slider = tns({
    container: '.carousel__wapper_img',
    items: 1,
    slideBy: "page",
    speed: 250,
    controls: false,
    nav: false,
    /* controlsText : [
            '<img src="img/carousel/arrow-left.png">',
            '<img src="img/carousel/arrow-right.png">'
        ] 
    */
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});