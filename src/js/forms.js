



let blackout = document.querySelector('.blackout'),
    modalForm = document.querySelector('.modalForm'),
    buttunsClose = document.querySelectorAll('.but_close_form'),
    thanks = document.querySelector('.thanks'),
    modalBuy = document.querySelector('.modalBuy');


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('but_show_form')) {
        blackout.style.display = 'block'
        modalForm.style.display = 'block'

    } else if (event.target.classList.contains('i_love_run')) {
        alert ('я бегать не люблю')
        event.preventDefault()

    } else if (event.target.classList.contains('consultation_go')) {
        modalForm.style.display = 'none'
        blackout.style.display = 'block'
        thanks.style.display = 'block'
        event.preventDefault()

    } else if (event.target.classList.contains('ringing_phone')) {
        alert ('звоню...')
        event.preventDefault()

    } else if (event.target.classList.contains('but_buy')) {
        blackout.style.display = 'block'
        modalBuy.style.display = 'block'
        let text = event.target.parentElement.parentElement.firstElementChild.firstElementChild.children[1].textContent

        modalBuy.children[1].textContent = text
        
    } else if (event.target.closest('.fasebook_icon')) {
        alert ('Файсбуки ваши, такого нет')
        event.preventDefault()
    } else if (event.target.closest('.instagram_icon')) {
        alert ('Инстакарточки тоже нет')
        event.preventDefault()
    } else if (event.target.closest('.pinterest_icon')) {
        alert ('Что это такое!?')
        event.preventDefault()
    } else {
        return
    }
})


for (let i = 0; i < buttunsClose.length; i++) {
    buttunsClose[i].addEventListener('click', function() {
        blackout.style.display = 'none'
        modalForm.style.display = 'none'
        thanks.style.display = 'none'
        modalBuy.style.display = 'none'
    })
}
