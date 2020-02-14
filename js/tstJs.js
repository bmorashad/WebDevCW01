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