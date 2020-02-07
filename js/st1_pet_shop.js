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

    let btn = event.target
    let itm = btn.parentElement.parentElement

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
    const cartCols = document.querySelectorAll('.cart_table_col')

    let inCart = checkCart(itmDet.itmDes, itmDet.itmQnt)
    if (!inCart) {
        for(let i = 0; i < cartCols.length; i++) {
            const span = document.createElement('span');
            span.className = 'td'
            const col = cartCols[i]
            const colRows = cartCols[i].querySelectorAll('.td')
            const lstRow = colRows[colRows.length-1]
            if (lstRow) {
                lstRow.after(span)
            } else {
                col.appendChild(span)
            }
            span.innerHTML = itmDetArr[i]
        }
        setTotalPrice()
    }
  
    // Object.values(itmDet).forEach(val => {
    //     let span = document.createElement('span');
    //     span.className = 'td'
    //     let itmTst = document.createTextNode(val)
    //     span.appendChild(itmTst)
    //     let col = cols.querySelectorAll('.td')
    //     let lstRow = col[col.length-1]
    //     lstRow.after(span)
    // })
    // cols.forEach(el => {
    //     let span = document.createElement('span');
    //     span.className = 'td'
    //     let itmTst = document.createTextNode(itmDetArr[])
    //     span.appendChild(itmTst)
    //     let col = el.querySelectorAll('.td')
    //     let lstRow = col[col.length-1]
    //     lstRow.after(span)
    // })
    // let itmTst = document.createTextNode(itmNo)
    // span.appendChild(itmTst)
    // let col = document.querySelector('.cart_id_col').querySelectorAll('.td')
    // let lstRow = col[col.length-1]
    // lstRow.after(span)
    // let itmNoHtml = `<span class="td">${itmNo}</span>`
    // let itmImgHtml = `<span class="td"><img src="${itmImg}" class="cart_img"></span>`
    // let itmDesHtml = `<span class="td">${itmDes}</span>`
    // let itmQntHtml = `<span class="td">${itmQnt}</span>`
    // let itmCurHtml = `<span class="td">${itmCur}</span>`
    // let itmPriceHtml = `<span class="td">${itmPrice}</span>`
    // let itmRmHtml = '<span class="td"><div class="cart_remove">X</div></span>'

        /* <span class="td">1</span>
     <span class="td"><img src="img/shop/food/food101.jpg" class="cart_img"></span>
     <span class="td">Cat Whisks</span>
     <span class="td">2</span>
     <span class="td"><span class="mono">rs</span></span>
     <span class="td"><span class="cart_price pink mono">2000</span></span>
     <span class="td cart_total"><span class="cart_price pink mono">101500</span></span>
     <span class=    itmDet.forEach(el => console.log(el))
"td cart_total"><span class="pink">TOTAL</span></span> */



    // console.log(itmImgHtml)

    //  console.log(itmTotalPrice)
}

let checkCart = (itmDes, itmQnt) => {
    const itmLst = document.querySelector('.itm_des_col').querySelectorAll('.td')
    const qntLst = document.querySelector('.cart_qnt_col').querySelectorAll('.td')
    let inCart
    for(let i = 0; i < itmLst.length; i++) {
        if (itmLst[i].innerHTML == itmDes) {
            let qnt = qntLst[i]
            if (parseInt(qnt.innerHTML) !== itmQnt) {
                qnt.innerHTML = itmQnt
                setTotalPrice()
            } 
            inCart = true
            break
        } else {
            inCart = false
        }
    }
    return inCart
}
let setTotalPrice = () => {
    let totalPrice = 0
    const totalPriceClass = document.querySelector('.cart_price_total')
    const priceLst = document.querySelector('.cart_price_col').getElementsByClassName('cart_price')
    const qntLst = document.querySelector('.cart_qnt_col').querySelectorAll('.td')
    for(let i = 0; i < priceLst.length; i++) {
        totalPrice += parseInt(priceLst[i].innerHTML) * parseInt(qntLst[i].innerHTML)
    }
    if(totalPriceClass) {
        totalPriceClass.innerHTML = totalPrice
    } else {
        const totalCol = document.querySelector('.cart_id_col')
        const spanTotal = document.createElement('span');
        spanTotal.className = 'cart_total'
        totalCol.appendChild(spanTotal)
        spanTotal.innerHTML = '<span class="pink">TOTAL</span>'
        
        const priceCol = document.querySelector('.cart_price_col')
        const spanPrice = document.createElement('span');
        spanPrice.className = 'cart_total'
        priceCol.appendChild(spanPrice)
        spanPrice.innerHTML = `<span class="cart_total"><span class="cart_price_total pink mono">${totalPrice}</span></span>`
    }
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
