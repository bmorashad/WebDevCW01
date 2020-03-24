let html = document.querySelector('html')
let btnIncrease = document.querySelector('.font_size_increase')
let btnDecrease = document.querySelector('.font_size_decrease')
let btnReset = document.querySelector('.reset')
let allElements = document.querySelectorAll('*')
let defaultFontSize = getExtStyleInt(html, 'fontSize')

// returns the most specific style property as int
function getExtStyleInt(element, attr) {
    let style = getComputedStyle(element) 
    let attributeInt = parseInt(style[attr].slice(0, style[attr].length-2))
    return attributeInt
}

// this sets the font size property to rem unit
function setFontSizeToRemNew() {
    let textElements =  Array.from(allElements).filter(ele => {
                            if(ele.innerHTML) {
                                // return if not a tag
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
    let fontSize = getExtStyleInt(html, 'fontSize')
    if (fontSize < 20) {
        fontSize = fontSize + 1
        const newFontSize = fontSize + 'px'
        html.style.fontSize = newFontSize  
        fontSizeResetButton()
        // workaround for item listing behaviour in shop
        if(document.querySelectorAll('.item_title_p').length) {
            setSameHeightElement()   
        }
    }
}
let fontSizeDecrease = () => {
    let fontSize = getExtStyleInt(html, 'fontSize')
    if (fontSize > 5) {
        fontSize = fontSize - 0.5
        const newFontSize = fontSize + 'px'
        html.style.fontSize = newFontSize  
        fontSizeResetButton()
        // workaround for item behaviour listing in shop
        if(document.querySelectorAll('.item_title_p').length) {
            setSameHeightElement()   
        }    
    }
}
let fontSizeResetButton = () => {
    let fontSize = getExtStyleInt(html, 'fontSize')
    if (fontSize != defaultFontSize) {
        btnReset.style.display = 'block'
        btnReset.tabIndex = "0"
    } else {
        btnReset.style.display = 'none'
        btnReset.tabIndex = "-1"
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

