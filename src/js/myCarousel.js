let	carouselWrapper = document.querySelector('.carousel__wrapper'),
	previousButArrow = carouselWrapper.querySelector('#previousButArrow'),
	carouselSlider = carouselWrapper.querySelector('.carousel__slider_wrapper'),
	imgAll = carouselSlider.querySelectorAll('img'),
	nextButArrow = carouselWrapper.querySelector('#nextButArrow'),
	circleWrapper = carouselWrapper.querySelector('.carousel__circle_wrapper');

let previousActive
if (document.documentElement.offsetWidth <= 768) {

    for (let i = 0; i < imgAll.length; i++) {
        imgAll[i].style.width = document.documentElement.offsetWidth + 'px'

        let circle = document.createElement('button')
        circle.classList.add('carousel__circle')

        circle.addEventListener('click', function() {
            let moving = i * -option.widthImg
            carouselSlider.style.marginLeft = moving + 'px'

            if (previousActive) {
                previousActive.classList.remove('carousel__circle_active')
            }

            circle.classList.add('carousel__circle_active')
            previousActive = circle
        })
        circleWrapper.append(circle)
    }

    let circleButtons = carouselWrapper.querySelectorAll('.carousel__circle')
    circleButtons[0].classList.add('carousel__circle_active')
    previousActive = circleButtons[0]
}


let option = {
    widthImg: imgAll[0].offsetWidth,
    scrollAll: 2,
    scroll: 1
}

let startWhite = 0
nextButArrow.addEventListener('click', function() {

    startWhite += -option.scroll * option.widthImg

    // Если не нужна постоянная прокрутка
    // startWhite = Math.max(startWhite, -option.widthImg * option.scroll * option.scrollAll)

    if (startWhite < -option.widthImg * option.scrollAll) startWhite = 0

    carouselSlider.style.marginLeft = startWhite + 'px'
})

previousButArrow.addEventListener('click', function() {

    startWhite += option.scroll * option.widthImg

    // Если не нужна постоянная прокрутка
    // startWhite = Math.min(startWhite, 0)

    if (startWhite > 0) startWhite = -option.widthImg * option.scrollAll

    carouselSlider.style.marginLeft = startWhite + 'px'
})