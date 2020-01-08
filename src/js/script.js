


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

// Токже ёё надо запусть в начале
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