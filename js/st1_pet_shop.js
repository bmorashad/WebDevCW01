//Variables

let addItem = document.querySelectorAll('.add')
let qntIncrease = document.querySelectorAll('.increment')
let qntDecrease = document.querySelectorAll('.decrement')

// Event Handlers

let qntIncrement = () => {
    let qntInput = event.target.nextElementSibling
    if (qntInput.value < 9) {
        qntInput.value++
    }
    // let style = document.createElement('style')
        // else {
    //     let sheet = window.document.styleSheets[2];
    //     sheet.insertRule('.increment, .increment:hover, .increment:active { background: #ccc; color: #888 }', sheet.cssRules.length);
    // }
    // console.log(qntInput)
}
let qntDecrement = () => {
    let qntInput = event.target.previousElementSibling
    if (qntInput.value > 1) {
        qntInput.value--
    }
}
let addToCart = () => {
    /* <span class="td">1</span>
     <span class="td"><img src="img/shop/food/food101.jpg" class="cart_img"></span>
     <span class="td">Cat Whisks</span>
     <span class="td">2</span>
     <span class="td"><span class="mono">rs</span></span>
     <span class="td"><span class="cart_price pink mono">2000</span></span>
     <span class="td cart_total"><span class="cart_price pink mono">101500</span></span>
     <span class=    itmDet.forEach(el => console.log(el))
"td cart_total"><span class="pink">TOTAL</span></span> */
    let btn = event.target
    let itm = btn.parentElement.parentElement
    // let itmImg = itm.querySelector('img').src
    // let itmDes = itm.querySelector('.item_title_p').innerHTML
    // let itmQnt = parseInt(itm.querySelector('input').value)
    // let itmCur = 'rs'
    // let itmPrice = parseInt(itm.querySelector('.itm_price').innerHTML)
    // let itmNo = document.querySelector('.cart_id_col').querySelectorAll('.td').length + 1
    // let itmTotalPrice = itmQnt * itmPrice

    const itmDet = {
            itmNo: document.querySelector('.cart_id_col').querySelectorAll('.td').length + 1,
            itmImg: `<img src='${itm.querySelector('img').src}' class="cart_img">`,
            itmDes: itm.querySelector('.item_title_p').innerHTML,
            itmQnt: parseInt(itm.querySelector('input').value),
            itmCur: 'rs',
            itmPrice: `<span class="cart_price pink mono">${parseInt(itm.querySelector('.itm_price').innerHTML)}</span>`,
            itmRm: '<div class="cart_remove">X</div>'
        }
    const itmDetArr = Object.values(itmDet)
    const cols = document.querySelectorAll('.cart_table_col')
    // Object.values(itmDet).forEach(val => {
    //     let span = document.createElement('span');
    //     span.className = 'td'
    //     let itmTst = document.createTextNode(val)
    //     span.appendChild(itmTst)
    //     let colTst = cols.querySelectorAll('.td')
    //     let lastTd = colTst[colTst.length-1]
    //     lastTd.after(span)
    // })
    // cols.forEach(el => {
    //     let span = document.createElement('span');
    //     span.className = 'td'
    //     let itmTst = document.createTextNode(itmDetArr[])
    //     span.appendChild(itmTst)
    //     let colTst = el.querySelectorAll('.td')
    //     let lastTd = colTst[colTst.length-1]
    //     lastTd.after(span)
    // })
    for(let i = 0; i < cols.length; i++) {
        let span = document.createElement('span');
        span.className = 'td'
        let colTst = cols[i].querySelectorAll('.td')
        let lastTd = colTst[colTst.length-1]
        lastTd.after(span)
        span.innerHTML = itmDetArr[i]
    }

    console.log(itmDet)
    let span = document.createElement('span');
    span.className = 'td'
    // let itmTst = document.createTextNode(itmNo)
    // span.appendChild(itmTst)
    // let colTst = document.querySelector('.cart_id_col').querySelectorAll('.td')
    // let lastTd = colTst[colTst.length-1]
    // lastTd.after(span)
    // let itmNoHtml = `<span class="td">${itmNo}</span>`
    // let itmImgHtml = `<span class="td"><img src="${itmImg}" class="cart_img"></span>`
    // let itmDesHtml = `<span class="td">${itmDes}</span>`
    // let itmQntHtml = `<span class="td">${itmQnt}</span>`
    // let itmCurHtml = `<span class="td">${itmCur}</span>`
    // let itmPriceHtml = `<span class="td">${itmPrice}</span>`
    // let itmRmHtml = '<span class="td"><div class="cart_remove">X</div></span>'





    // console.log(itmImgHtml)

    //  console.log(itmTotalPrice)
}

 // Adding EventListener

qntIncrease.forEach(counter => counter.addEventListener('click', qntIncrement))
qntDecrease.forEach(counter => counter.addEventListener('click', qntDecrement))
addItem.forEach(btn => btn.addEventListener('click', addToCart));
     /* let test = () => {
         let x = document.querySelector('#som')
         console.log(x)
         x.value = 2
     } */
