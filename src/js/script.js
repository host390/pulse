

window.addEventListener('DOMContentLoaded', () => {
	let shopList = document.querySelectorAll('.shop__item'),
    shopFrames = document.querySelectorAll('.shop__wrapper_frames');

	for (let i = 0; i < shopList.length; i++) {
		shopList[i].addEventListener('click', function() {
			// Удаляем первый
			shopList[0].classList.remove('shop__item_active')
			moveListBg(shopList[i])

			shopFrames[0].classList.remove('shop__wrapper_frames_active')
			moveShopFrames(shopFrames[i])

			continueShowing ()
		})
	}

	// Если иконок больше чем указано в разрешении, то они скрываються и появляется конпка
	function continueShowing () {

		let frameWrapActive = document.querySelector('.shop__wrapper_frames_active')

		// Создаю небольшую приграду
		let box = document.createElement('div')
		box.classList.add('boxx')
		box.style.width = '100%'
		let boxx = frameWrapActive.querySelector('.boxx')
		if (boxx == null) frameWrapActive.append(box)


		let shopFrame = frameWrapActive.querySelectorAll('.shop__frame')

		let max = 6



		if (document.documentElement.offsetWidth <= 992) max = 4

		if (document.documentElement.offsetWidth <= 667) max = 2

		switch (max) {
			case 6 :
				// Каждому 3 убрать marginRight
				for (let i = 2; i < shopFrame.length; i = i + 3) {
					shopFrame[i].style.marginRight = '0'
				}
				break;
			case 4 :
				// Каждому 2 убрать marginRight
				for (let i = 1; i < shopFrame.length; i = i + 2) {
					shopFrame[i].style.marginRight = '0'
				}
				break;
			case 2 :
				// Каждому даём marginRight = 10 и marginLeft = 10
				for (let i = 0; i < shopFrame.length; i++) {
					shopFrame[i].style.marginRight = '10' + 'px'
					shopFrame[i].style.marginLeft = '10' + 'px'
				}
		}


		// Каждому 3 убрать marginRight
		// for (let i = 2; i < shopFrame.length; i = i + 3) {
		// 	shopFrame[i].style.marginRight = '0'
		// }

		let sum = 0
		for (let i = 0; i < shopFrame.length; i++) {
			if (shopFrame[i].style.display == 'none') sum += 1
			
		}

		let activShowButt = frameWrapActive.querySelector('.shop__wrapper_frames_hiddenButt')
		if (activShowButt != null) return

		if (shopFrame.length - sum > max) {

			let proceedBut = document.createElement('a')
			proceedBut.classList.add('shop__wrapper_frames_proceedBut')
			proceedBut.textContent = 'Далее...'

			let hiddenButt = document.createElement('a')
			hiddenButt.classList.add('shop__wrapper_frames_hiddenButt')
			hiddenButt.textContent = 'Скрыть'


			hiddenButt.addEventListener('click', function() {
				for (let i = max; i < shopFrame.length; i++) {
					shopFrame[i].style.display = 'none'
				}

				frameWrapActive.append(proceedBut)
				
				hiddenButt.remove()

				return location.href = '#shop_anchor'
				// event.preventDefault()
			})

			for (let i = max; i < shopFrame.length; i++) {
				shopFrame[i].style.display = 'none'
			}

			frameWrapActive.append(proceedBut)

			proceedBut.addEventListener('click', function() {
				for (let i = max; i < shopFrame.length; i++) {
					shopFrame[i].style.display = 'block'
				}

				frameWrapActive.append(hiddenButt)

				proceedBut.remove()
				event.preventDefault()
			})
		}
	}

	// Также ёё надо запусть в начале
	continueShowing ()

	// Добавляет активный класс меню выбора товаров 
	let previousList
	function moveListBg(shopList) {
		if (previousList) {
			previousList.classList.remove('shop__item_active')
		}

		shopList.classList.add('shop__item_active')

		previousList = shopList
	}

	// Добавляет активный класс блокам с товарами 
	let previousFrame
	function moveShopFrames(ShopFrame) {
		if (previousFrame) {
			previousFrame.classList.remove('shop__wrapper_frames_active')
		}

		ShopFrame.classList.add('shop__wrapper_frames_active')

		previousFrame = ShopFrame
	}


	let showBut = document.querySelectorAll('#showDescription'),  
		backBut = document.querySelectorAll('#backDescription');

	// Показать описание товара
	for (let link of showBut) {
		link.addEventListener('click', function() {
			link.parentElement.nextElementSibling.classList.add('backside_active')
			event.preventDefault()
		})
	}

	// Убрать описание товара
	for (let link of backBut) {
		link.addEventListener('click', function() {
			link.parentElement.classList.remove('backside_active')
			event.preventDefault()
		})
	}




	/* 
		Карусель
	*/

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



	/* 
		Окна
	*/

	let blackout = document.querySelector('.blackout'),
		form = document.querySelector('[data-modal="form"]'),
		closeButtons = document.querySelectorAll('[data-but-form="close"]'),
		thanks = document.querySelector('[data-modal="thanks"]'),
		buy = document.querySelector('[data-modal="buy"]');


	document.addEventListener('click', function(event) {
		if (event.target.dataset.butForm == 'show') {
			blackout.style.display = 'block'
			form.style.display = 'block'

		} else if (event.target.classList.contains('but_buy')) {
			blackout.style.display = 'block'

			// Берёт текст из названия
			let text = event.target.parentElement.parentElement.firstElementChild.firstElementChild.children[1].textContent

			let productName = buy.querySelector('#buy__ProductName')
			productName.textContent = text

			buy.style.display = 'block'
		}
		// } else if (event.target.dataset.butForm == 'push') {
		// 	// blackout.style.display = 'block'
		// 	// form.style.display = 'none'
		// 	// thanks.style.display = 'block'
		// }
		else return
	})

	for (let i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', function() {
			blackout.style.display = 'none'
			form.style.display = 'none'
			thanks.style.display = 'none'
			buy.style.display = 'none'
		})
	}


	/*
		Валидация форм
	*/




	const createTextError = function (input, arr) {
		let div = document.createElement('div')
		
		div.classList.add('text_error')
		text = regulText[arr]
		div.innerHTML = text
		div.style.textAlign = 'left'
		input.before(div)
	}


	let input = document.querySelectorAll('input'),
		forms = document.querySelectorAll('form')

	let regulText = {
		name: 'Нкрорректное имя',
		phone: 'Нкрорректный телефон',
		email: 'Нкрорректный email'
	}

	let regul = {
		name: function nameValid(value) {
			return (/^([А-Я]|[A-Z])([а-я]|[a-z]){1,}$/).test(value);
		},
		placehold: function placValid(value) {
			return (/^\s{0,}/).test(value)
		},
		phone: function phonValid(value) {
			return (/^(8\d{10}|\+7\d{10})$/).test(value)
		},
		email: function phonValid(value) {
			return (/^\w{1,}(\.\w{1,}@mail.ru|@yandex.ru)$/).test(value)
		}
	}

	for (let i = 0; i < forms.length; i++) {

		for (let j = 0; j < forms[i].elements.length; j++) {
			if (forms[i].elements[j].tagName != 'BUTTON') {
				
				let arr = forms[i].elements[j].dataset.pleis.split()

				forms[i].elements[j].addEventListener('input', ()=> {
					for (let ar of arr) {
						if (regul[ar](forms[i].elements[j].value)) {

							if ( forms[i].elements[j].previousElementSibling == null || 
								forms[i].elements[j].previousElementSibling.tagName == 'INPUT'
							) {
								continue
							} else {
								forms[i].elements[j].previousElementSibling.remove()
							}
							forms[i].elements[j].classList.remove('error')
							forms[i].elements[j].classList.add('success')

						} else {
							

							if (forms[i].elements[j].previousElementSibling == null || 
								forms[i].elements[j].previousElementSibling.tagName != 'DIV') {
									createTextError(forms[i].elements[j], ar)
							} else {
								continue
							}
							forms[i].elements[j].classList.remove('success')
							forms[i].elements[j].classList.add('error')
						}
					}
				})
			}
		}

		forms[i].addEventListener('submit', (e)=> {
			for (let j = 0; j < forms[i].elements.length; j++) {
				if (forms[i].elements[j].tagName != 'BUTTON') {

					let arr = forms[i].elements[j].dataset.pleis.split()
					
					if (arr == '') {
						alert ('Вам меня не взломать ХаХа')
						location.href=location.href

					} else {
						for (let ar of arr) {
							if (regul[ar](forms[i].elements[j].value)) {

								if ( forms[i].elements[j].previousElementSibling == null || 
									forms[i].elements[j].previousElementSibling.tagName == 'INPUT'
								) {
									continue
								} else {
									forms[i].elements[j].previousElementSibling.remove()
								}

								forms[i].elements[j].classList.remove('error')
								forms[i].elements[j].classList.add('success')
		
							} else {
								
								if (forms[i].elements[j].previousElementSibling == null || 
									forms[i].elements[j].previousElementSibling.tagName != 'DIV') {
										createTextError(forms[i].elements[j], arr)
								} else {
									continue
								}

								forms[i].elements[j].classList.remove('success')
								forms[i].elements[j].classList.add('error')
							}
						}
					}
				}
			}

			for (let j = 0; j < forms[i].elements.length; j++) {
				if (forms[i].elements[j].classList.contains('error')) {
					event.preventDefault()
				}
			}
		})
	}


	/*
		Ссылки
	*/

	document.addEventListener('click', function(event) {
		targ = event.target.closest("[data-link-text]")
		if (!targ) return
		alert (targ.dataset.linkText)
		event.preventDefault()
	})





})



// let shopList = document.querySelectorAll('.shop__item'),
//     shopFrames = document.querySelectorAll('.shop__wrapper_frames');

// for (let i = 0; i < shopList.length; i++) {
//     shopList[i].addEventListener('click', function() {
//         // Удаляем первый
// 		shopList[0].classList.remove('shop__item_active')
//         moveListBg(shopList[i])

//         shopFrames[0].classList.remove('shop__wrapper_frames_active')
//         moveShopFrames(shopFrames[i])

// 		continueShowing ()
//     })
// }

// // Если иконок больше чем указано в разрешении, то они скрываються и появляется конпка
// function continueShowing () {

// 	let frameWrapActive = document.querySelector('.shop__wrapper_frames_active')

// 	// Создаю небольшую приграду
// 	let box = document.createElement('div')
// 	box.classList.add('boxx')
// 	box.style.width = '100%'
// 	let boxx = frameWrapActive.querySelector('.boxx')
// 	if (boxx == null) frameWrapActive.append(box)


// 	let shopFrame = frameWrapActive.querySelectorAll('.shop__frame')

// 	let max = 6



// 	if (document.documentElement.offsetWidth <= 992) max = 4

// 	if (document.documentElement.offsetWidth <= 667) max = 2

// 	switch (max) {
// 		case 6 :
// 			// Каждому 3 убрать marginRight
// 			for (let i = 2; i < shopFrame.length; i = i + 3) {
// 				shopFrame[i].style.marginRight = '0'
// 			}
// 			break;
// 		case 4 :
// 			// Каждому 2 убрать marginRight
// 			for (let i = 1; i < shopFrame.length; i = i + 2) {
// 				shopFrame[i].style.marginRight = '0'
// 			}
// 			break;
// 		case 2 :
// 			// Каждому даём marginRight = 10 и marginLeft = 10
// 			for (let i = 0; i < shopFrame.length; i++) {
// 				shopFrame[i].style.marginRight = '10' + 'px'
// 				shopFrame[i].style.marginLeft = '10' + 'px'
// 			}
// 	}


// 	// Каждому 3 убрать marginRight
// 	// for (let i = 2; i < shopFrame.length; i = i + 3) {
// 	// 	shopFrame[i].style.marginRight = '0'
// 	// }

// 	let sum = 0
// 	for (let i = 0; i < shopFrame.length; i++) {
// 		if (shopFrame[i].style.display == 'none') sum += 1
		
// 	}

// 	let activShowButt = frameWrapActive.querySelector('.shop__wrapper_frames_hiddenButt')
// 	if (activShowButt != null) return

// 	if (shopFrame.length - sum > max) {

// 		let proceedBut = document.createElement('a')
// 		proceedBut.classList.add('shop__wrapper_frames_proceedBut')
// 		proceedBut.textContent = 'Далее...'

// 		let hiddenButt = document.createElement('a')
// 		hiddenButt.classList.add('shop__wrapper_frames_hiddenButt')
// 		hiddenButt.textContent = 'Скрыть'


// 		hiddenButt.addEventListener('click', function() {
// 			for (let i = max; i < shopFrame.length; i++) {
// 				shopFrame[i].style.display = 'none'
// 			}

// 			frameWrapActive.append(proceedBut)
			
// 			hiddenButt.remove()

// 			return location.href = '#shop_anchor'
// 			// event.preventDefault()
// 		})

// 		for (let i = max; i < shopFrame.length; i++) {
// 			shopFrame[i].style.display = 'none'
// 		}

// 		frameWrapActive.append(proceedBut)

// 		proceedBut.addEventListener('click', function() {
// 			for (let i = max; i < shopFrame.length; i++) {
// 				shopFrame[i].style.display = 'block'
// 			}

// 			frameWrapActive.append(hiddenButt)

// 			proceedBut.remove()
// 			event.preventDefault()
// 		})
// 	}
// }

// // Также ёё надо запусть в начале
// continueShowing ()

// // Добавляет активный класс меню выбора товаров 
// let previousList
// function moveListBg(shopList) {
//     if (previousList) {
//         previousList.classList.remove('shop__item_active')
//     }

//     shopList.classList.add('shop__item_active')

//     previousList = shopList
// }

// // Добавляет активный класс блокам с товарами 
// let previousFrame
// function moveShopFrames(ShopFrame) {
//     if (previousFrame) {
//         previousFrame.classList.remove('shop__wrapper_frames_active')
//     }

//     ShopFrame.classList.add('shop__wrapper_frames_active')

//     previousFrame = ShopFrame
// }


// let showBut = document.querySelectorAll('#showDescription'),  
//     backBut = document.querySelectorAll('#backDescription');

// // Показать описание товара
// for (let link of showBut) {
//     link.addEventListener('click', function() {
//         link.parentElement.nextElementSibling.classList.add('backside_active')
//         event.preventDefault()
//     })
// }

// // Убрать описание товара
// for (let link of backBut) {
//     link.addEventListener('click', function() {
//         link.parentElement.classList.remove('backside_active')
//         event.preventDefault()
//     })
// }




// /* 
// 	Карусель
// */

// let	carouselWrapper = document.querySelector('.carousel__wrapper'),
// 	previousButArrow = carouselWrapper.querySelector('#previousButArrow'),
// 	carouselSlider = carouselWrapper.querySelector('.carousel__slider_wrapper'),
// 	imgAll = carouselSlider.querySelectorAll('img'),
// 	nextButArrow = carouselWrapper.querySelector('#nextButArrow'),
// 	circleWrapper = carouselWrapper.querySelector('.carousel__circle_wrapper');

// let previousActive
// if (document.documentElement.offsetWidth <= 768) {

//     for (let i = 0; i < imgAll.length; i++) {
//         imgAll[i].style.width = document.documentElement.offsetWidth + 'px'

//         let circle = document.createElement('button')
//         circle.classList.add('carousel__circle')

//         circle.addEventListener('click', function() {
//             let moving = i * -option.widthImg
//             carouselSlider.style.marginLeft = moving + 'px'

//             if (previousActive) {
//                 previousActive.classList.remove('carousel__circle_active')
//             }

//             circle.classList.add('carousel__circle_active')
//             previousActive = circle
//         })
//         circleWrapper.append(circle)
//     }

//     let circleButtons = carouselWrapper.querySelectorAll('.carousel__circle')
//     circleButtons[0].classList.add('carousel__circle_active')
//     previousActive = circleButtons[0]
// }


// let option = {
//     widthImg: imgAll[0].offsetWidth,
//     scrollAll: 2,
//     scroll: 1
// }

// let startWhite = 0
// nextButArrow.addEventListener('click', function() {

//     startWhite += -option.scroll * option.widthImg

//     // Если не нужна постоянная прокрутка
//     // startWhite = Math.max(startWhite, -option.widthImg * option.scroll * option.scrollAll)

//     if (startWhite < -option.widthImg * option.scrollAll) startWhite = 0

//     carouselSlider.style.marginLeft = startWhite + 'px'
// })

// previousButArrow.addEventListener('click', function() {

//     startWhite += option.scroll * option.widthImg

//     // Если не нужна постоянная прокрутка
//     // startWhite = Math.min(startWhite, 0)

//     if (startWhite > 0) startWhite = -option.widthImg * option.scrollAll

//     carouselSlider.style.marginLeft = startWhite + 'px'
// })



// /* 
// 	Окна
// */

// let blackout = document.querySelector('.blackout'),
//     form = document.querySelector('[data-modal="form"]'),
//     closeButtons = document.querySelectorAll('[data-but-form="close"]'),
//     thanks = document.querySelector('[data-modal="thanks"]'),
//     buy = document.querySelector('[data-modal="buy"]');


// document.addEventListener('click', function(event) {
// 	if (event.target.dataset.butForm == 'show') {
// 		blackout.style.display = 'block'
// 		form.style.display = 'block'

// 	} else if (event.target.classList.contains('but_buy')) {
// 		blackout.style.display = 'block'

// 		// Берёт текст из названия
// 		let text = event.target.parentElement.parentElement.firstElementChild.firstElementChild.children[1].textContent

// 		let productName = buy.querySelector('#buy__ProductName')
// 		productName.textContent = text

// 		buy.style.display = 'block'
// 	}
// 	// } else if (event.target.dataset.butForm == 'push') {
// 	// 	// blackout.style.display = 'block'
// 	// 	// form.style.display = 'none'
// 	// 	// thanks.style.display = 'block'
// 	// }
// 	else return
// })

// for (let i = 0; i < closeButtons.length; i++) {
//     closeButtons[i].addEventListener('click', function() {
//         blackout.style.display = 'none'
//         form.style.display = 'none'
//         thanks.style.display = 'none'
//         buy.style.display = 'none'
//     })
// }


// /*
// 	Валидация форм
// */




// const createTextError = function (input, arr) {
// 	let div = document.createElement('div')
	
// 	div.classList.add('text_error')
// 	text = regulText[arr]
// 	div.innerHTML = text
// 	div.style.textAlign = 'left'
// 	input.before(div)
// }


// let input = document.querySelectorAll('input'),
//     forms = document.querySelectorAll('form')

// let regulText = {
// 	name: 'Нкрорректное имя',
//     phone: 'Нкрорректный телефон',
//     email: 'Нкрорректный email'
// }

// let regul = {
//     name: function nameValid(value) {
//         return (/^([А-Я]|[A-Z])([а-я]|[a-z]){1,}$/).test(value);
//     },
//     placehold: function placValid(value) {
//         return (/^\s{0,}/).test(value)
//     },
//     phone: function phonValid(value) {
//         return (/^(8\d{10}|\+7\d{10})$/).test(value)
//     },
//     email: function phonValid(value) {
//         return (/^\w{1,}(\.\w{1,}@mail.ru|@yandex.ru)$/).test(value)
//     }
// }

// for (let i = 0; i < forms.length; i++) {

// 	for (let j = 0; j < forms[i].elements.length; j++) {
// 		if (forms[i].elements[j].tagName != 'BUTTON') {
			
// 			let arr = forms[i].elements[j].dataset.pleis.split()

// 			forms[i].elements[j].addEventListener('input', ()=> {
// 				for (let ar of arr) {
// 					if (regul[ar](forms[i].elements[j].value)) {

// 						if ( forms[i].elements[j].previousElementSibling == null || 
// 							forms[i].elements[j].previousElementSibling.tagName == 'INPUT'
// 						) {
// 							continue
// 						} else {
// 							forms[i].elements[j].previousElementSibling.remove()
// 						}
// 						forms[i].elements[j].classList.remove('error')
// 						forms[i].elements[j].classList.add('success')

// 					} else {
						

// 						if (forms[i].elements[j].previousElementSibling == null || 
// 							forms[i].elements[j].previousElementSibling.tagName != 'DIV') {
// 								createTextError(forms[i].elements[j], ar)
// 						} else {
// 							continue
// 						}
// 						forms[i].elements[j].classList.remove('success')
// 						forms[i].elements[j].classList.add('error')
// 					}
// 				}
// 			})
// 		}
// 	}

//     forms[i].addEventListener('submit', (e)=> {
// 		for (let j = 0; j < forms[i].elements.length; j++) {
// 			if (forms[i].elements[j].tagName != 'BUTTON') {

// 				let arr = forms[i].elements[j].dataset.pleis.split()
				
// 				if (arr == '') {
// 					alert ('Вам меня не взломать ХаХа')
// 					location.href=location.href

// 				} else {
// 					for (let ar of arr) {
// 						if (regul[ar](forms[i].elements[j].value)) {

// 							if ( forms[i].elements[j].previousElementSibling == null || 
// 								forms[i].elements[j].previousElementSibling.tagName == 'INPUT'
// 							) {
// 								continue
// 							} else {
// 								forms[i].elements[j].previousElementSibling.remove()
// 							}

// 							forms[i].elements[j].classList.remove('error')
// 							forms[i].elements[j].classList.add('success')
	
// 						} else {
							
// 							if (forms[i].elements[j].previousElementSibling == null || 
// 								forms[i].elements[j].previousElementSibling.tagName != 'DIV') {
// 									createTextError(forms[i].elements[j], arr)
// 							} else {
// 								continue
// 							}

// 							forms[i].elements[j].classList.remove('success')
// 							forms[i].elements[j].classList.add('error')
// 						}
// 					}
// 				}
// 			}
// 		}

// 		for (let j = 0; j < forms[i].elements.length; j++) {
// 			if (forms[i].elements[j].classList.contains('error')) {
// 				event.preventDefault()
// 			}
// 		}
//     })
// }


// /*
// 	Ссылки
// */

// document.addEventListener('click', function(event) {
// 	targ = event.target.closest("[data-link-text]")
// 	if (!targ) return
// 	alert (targ.dataset.linkText)
// 	event.preventDefault()
// })



