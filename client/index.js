const first = document.getElementById('first')
const last = document.getElementById('last')

let dist = 200
let width = 200
let counter = 0

const leftBtn = document.querySelector('.left-btn')
const rightBtn = document.querySelector('.right-btn')

leftBtn.addEventListener('click', () => {
   
        first.style.transform = `translateX(-${dist + width*counter}px)`
        last.style.transform = `translateX(-${dist + width*counter}px)`

    counter++
})

rightBtn.addEventListener('click', () => {
    blocks.forEach(item => {
        console.log(item.id)
        item.style.transform = `translateX(${dist - width*counter}px)`
    })
    counter--
})
