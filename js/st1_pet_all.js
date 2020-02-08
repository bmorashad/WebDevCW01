let html = document.querySelector('html')
let itmCard = document.querySelectorAll('.item')
let qntInput = document.querySelectorAll('.qnt_input')
let qntBtn = document.querySelectorAll('.counter')
let btnIncrease = document.querySelector('.font_size_increase')
let btnDecrease = document.querySelector('.font_size_decrease')

let fontSizeIncrease = () => {
    let htmlStyle = getComputedStyle(html)
    
    let fontSize = htmlStyle.fontSize
    let fontSizeInt = parseInt(fontSize.slice(0, fontSize.length-2))
    if (fontSizeInt < 20) {
        fontSizeInt = fontSizeInt + 1
        const newFontSize = fontSizeInt + 'px'
        html.style.fontSize = newFontSize  
    }
    setSameHeightElement()   
}
let fontSizeDecrease = () => {
    let htmlStyle = getComputedStyle(html)
    
    let fontSize = htmlStyle.fontSize
    let fontSizeInt = parseInt(fontSize.slice(0, fontSize.length-2))

    if (fontSizeInt > 5) {
        fontSizeInt = fontSizeInt - 1
        const newFontSize = fontSizeInt + 'px'
        html.style.fontSize = newFontSize  
        setSameHeightElement()   
    }
    // console.log(itmCardStyle.width)
    // let cardStylesArr = []
    // itmCard.forEach(card => {
    //     const cardStyle = getComputedStyle(card)
    //     cardStylesArr.push(cardStyle)
    //     return cardStylesArr
    // })
    // let newStyleWidthArr = []
    // cardStylesArr.forEach(style => {
    //     const styleWidth = style.width
    //     let styleWidthInt = parseInt(styleWidth.slice(0, styleWidth.length-2))
    //     styleWidthInt = styleWidthInt - 10
    //     const newStyleWidth = styleWidthInt + 'px' 
    //     newStyleWidthArr.push(newStyleWidth)
    // })
    // if (fontSizeInt < 8) {
    //     for(let i = 0; i<itmCard.length; i++) {
    //         itmCard[i].style.width = newStyleWidthArr[i]
    //         // qntInput[i].style.fontSize = '1.2rem'
    //         // qntBtn[i].style.fontSize = '1.6rem'    
    //     }
    // }
 
    // console.log(newStyleWidthArr)
    // if (fontSizeInt < 8) {
    //     itmCardWidthInt = itmCardWidthInt - 30
    //     const newItmCardWidth = itmCardWidthInt + 'px'
    //     itmCard.style.width = newItmCardWidth   
    // }
}
btnIncrease.addEventListener('click', fontSizeIncrease)
btnDecrease.addEventListener('click', fontSizeDecrease)
