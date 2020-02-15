let html = document.querySelector('html')
let btnIncrease = document.querySelector('.font_size_increase')
let btnDecrease = document.querySelector('.font_size_decrease')
let btnReset = document.querySelector('.reset')
let allElements = document.querySelectorAll('*')
let defaultFontSize = getExtStyleInt(html, 'fontSize')
function getExtStyleInt(element, attr) {
    let style = getComputedStyle(element) 
    let attributeInt = parseInt(style[attr].slice(0, style[attr].length-2))
    return attributeInt
}
// Test Old
// function setFontSizeToRem() {
//     let txtEle = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'span']
//     let htmlFontSize = getExtStyleInt(html, 'fontSize')
//     // console.log(htmlFontSize)
//     html.style.fontSize = htmlFontSize + 'px'
//     for (let i = 0; i<txtEle.length; i++) {
//         let elements = document.getElementsByTagName(txtEle[i])
//         if(elements.length) {
//             for (let j = 0; j<elements.length; j++) {
//                 let ele = elements[j]
//                 let fontSizeInt = getExtStyleInt(ele, 'fontSize')
//                 let sizeInRem = fontSizeInt/htmlFontSize
//                 ele.style.fontSize = sizeInRem + 'rem'

//             }
//         }
//     }
// }
// setFontSizeToRem()

// Tst New setFontToRem
function setFontSizeToRemNew() {
    let textElements =  Array.from(allElements).filter(ele => {
                            if(ele.innerHTML) {
                                if(ele.innerHTML.trim().slice(0, 1) != '<') {
                                    return ele
                                }
                            }
                        })
    let htmlFontSize = getExtStyleInt(html, 'fontSize')
    // console.log(htmlFontSize)
    html.style.fontSize = htmlFontSize + 'px'
    for (let i = 0; i<textElements.length; i++) {
        let element = textElements[i] 
        let fontSizeInt = getExtStyleInt(element, 'fontSize')
        let sizeInRem = fontSizeInt/htmlFontSize
        element.style.fontSize = sizeInRem + 'rem'

    }
}
setFontSizeToRemNew()


let fontSizeIncrease = () => {
    // let htmlStyle = getComputedStyle(html)
    // let fontSize = htmlStyle.fontSize
    let fontSize = getExtStyleInt(html, 'fontSize')
    if (fontSize < 20) {
        fontSize = fontSize + 1
        const newFontSize = fontSize + 'px'
        html.style.fontSize = newFontSize  
        fontSizeResetButton()
        if(document.querySelectorAll('.item_title_p').length) {
            setSameHeightElement()   
        }
    }
    // banner size responsiveness
    // if (fontSize > 11 && fontSize < 20) {
    //     const banner = document.querySelector('.banner_container')
    //     const bannerHeight = getExtStyleInt(banner, 'height')
    //     const newBannerHeight = (bannerHeight + 50) + 'px'
    //     banner.style.height = newBannerHeight
    // }

}
let fontSizeDecrease = () => {
    let fontSize = getExtStyleInt(html, 'fontSize')
    if (fontSize > 5) {
        fontSize = fontSize - 0.5
        const newFontSize = fontSize + 'px'
        html.style.fontSize = newFontSize  
        fontSizeResetButton()
        if(document.querySelectorAll('.item_title_p').length) {
            setSameHeightElement()   
        }    
    }
    // let fontSize = htmlStyle.fontSize
    // let htmlStyle = getComputedStyle(html)
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
let fontSizeResetButton = () => {
    let fontSize = getExtStyleInt(html, 'fontSize')
    if (fontSize != defaultFontSize) {
        btnReset.style.display = 'block'
    } else {
        btnReset.style.display = 'none'
    }
}
let fontSizeReset = () => {
    let fontSize = getExtStyleInt(html, 'fontSize')
    html.style.fontSize = defaultFontSize + 'px'
    fontSizeResetButton()
    if(document.querySelectorAll('.item_title_p').length) {
        setSameHeightElement()   
    }
}
btnIncrease.addEventListener('click', fontSizeIncrease)
btnDecrease.addEventListener('click', fontSizeDecrease)
btnReset.addEventListener('click', fontSizeReset)

