const plus = document.querySelector('#plus')
const minus = document.querySelector('#minus')
const h4 = document.querySelector('h4')
const banner_content = document.querySelector('.bill_container')
// if (h4.childNodes[0].nodeType == 3) {
//     console.log('yes')
// } else {
//     console.log('No')
// }
console.log(h4)

const s = document.createTextNode('<button>Im created</button>')
document.querySelector('.modal').append(s)

function show(ele, display) {
    document.querySelector('.added_notify').style.display = 'flex'
}
function hide(ele) {
    document.querySelector('.added_notify').style.display = 'none'
}

document.addEventListener('click', function(){
    show()
    setTimeout('hide()', 3000)
})


const html = document.querySelector('html')
let getExtStyleInt = (element, attr) => {
    let style = getComputedStyle(element) 
    let attributeInt = parseInt(style[attr].slice(0, style[attr].length-2))
    return attributeInt
}
let allElements = document.querySelectorAll('*')
function setFontSizeToRemNew() {
    let textElements =  allElements.filter(ele => {
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
    
