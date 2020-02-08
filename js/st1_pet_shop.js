// Global Variables & Adding Event Listeners
let category = document.querySelector('#category')
let clear = document.querySelector('.clear_cart')

// Item Database
let food = [
    {
        name: 'WHISKAS® Dry Cat Food Beef Flavour',
        img: 'img/shop/food101.jpg',
        price: 1200
    }, 
    {
        name: 'Meow Mix® Original Choice',
        img: 'img/shop/food201.jpg',
        price: 800
    },
    {
        name: 'Chicken Flavor Dry Cat Food',
        img: 'img/shop/food301.jpg',
        price: 4500
    }
]
let toy = [
    {
        name: 'Hartz Just For Cats Cat Toy',
        img: 'img/shop/toy101.jpg',
        price: 650
    }, 
    {
        name: 'Petstages Cat Tracks Cat Toy',
        img: 'img/shop/toy201.jpg',
        price: 800
    },
    {
        name: 'Bergan Turboscratcher Cat Toy (Assorted)',
        img: 'img/shop/toy301.jpg',
        price: 1500
    }
]
let med = [
    {
        name: 'Bayer Advantage II Flea Prevention',
        img: 'img/shop/med101.jpg',
        price: 5000
    }, 
    {
        name: 'NODENS CAT Hip & Joint Glucosamine',
        img: 'img/shop/med201.jpg',
        price: 2000
    },
    {
        name: 'HomeoPet Nose Relief, 15 ml',
        img: 'img/shop/med301.jpg',
        price: 2000
    },
    {
        name: 'Nutramax Cosequin Sprinkle Capsules',
        img: 'img/shop/med401.jpg',
        price: 2000
    }
]
let all = food.concat(toy).concat(med)
// console.log(all)
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
            itmDes: `<span class="start">${itm.querySelector('.item_title_p').innerHTML}</span>`,
            itmQnt: parseInt(itm.querySelector('input').value),
            itmCur: 'rs',
            itmPrice: `<span class="cart_price pink mono">${parseInt(itm.querySelector('.itm_price').innerHTML)}</span>`,
            itmRm: `<div class="cart_remove">X<span class="store_row_no">${document.querySelector('.cart_id_col').querySelectorAll('.td').length}</span></div>`
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
                clear.style.marginTop = '20px'
                col.appendChild(span)
            }
            span.innerHTML = itmDetArr[i]
        }
        const removeItmInCart = document.querySelectorAll('.cart_remove')
        removeItmInCart.forEach(btn => btn.addEventListener('click', removeItm)) // added
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
        spanPrice.innerHTML = `<span class="cart_price_total pink mono">${totalPrice}</span>`
    }
}
let clearCart = () => {
    const cart = document.querySelectorAll('.cart_table_col')
    cart.forEach(el => {
        let span = el.querySelectorAll('.td')
        let cartTotal = el.querySelectorAll('.cart_total')
        span.forEach(el => el.remove())
        cartTotal.forEach(el => el.remove())
    })
        // cart.forEach(el => {
    //     let span = el.querySelectorAll('span')
    //     span.forEach(el => {
    //         if (el.className != 'th') {
    //             el.remove()
    //         }
    //     })
    // })
}

let changeItems = () => {
    document.querySelector('.showcase').innerHTML = ''
    const getCategory = document.querySelector('#category').querySelector('option:checked').value
    
    switch(getCategory) {
        case 'food':
            food.forEach(itm => {
                const showcase = document.querySelector('.showcase')
                const itmDiv = document.createElement('div')
                itmDiv.className = 'item'
                const itmDivInner = `<img class="itm_img"src="${itm.img}">
                                    <div class="item_des">
                                        <hr class="item_title_sep">
                                        <p class="item_title_p">${itm.name}</p>
                                        <hr class="item_title_sep">
                                    </div>
                                    <p class="item_price_p">PRICE: <span class="currency">RS <span class="itm_price">${itm.price}</span></span></p>
                                    <div class="quantity">
                                        <p style="font-size: 1.2rem; font-weight: 600; color: #555555;">Quantity:</p>
                                        <div class="increaser">
                                            <button class="counter increment">+</button>
                                            <input type="text" value="1" class="qnt_input" readonly>
                                            <button class="counter decrement">-</button>
                                        </div>
                                    </div>
                                    <div class="add_item">
                                        <button class="add" id="add2">Add Item</button>
                                    </div>`
                showcase.appendChild(itmDiv)
                itmDiv.innerHTML = itmDivInner
                
            })
            break
        case 'toy':
            toy.forEach(itm => {
                const showcase = document.querySelector('.showcase')
                const itmDiv = document.createElement('div')
                itmDiv.className = 'item'
                const itmDivInner = `<img class="itm_img"src="${itm.img}">
                                    <div class="item_des">
                                        <hr class="item_title_sep">
                                        <p class="item_title_p">${itm.name}</p>
                                        <hr class="item_title_sep">
                                    </div>
                                    <p class="item_price_p">PRICE: <span class="currency">RS <span class="itm_price">${itm.price}</span></span></p>
                                    <div class="quantity">
                                        <p style="font-size: 1.2rem; font-weight: 600; color: #555555;">Quantity:</p>
                                        <div class="increaser">
                                            <button class="counter increment">+</button>
                                            <input type="text" value="1" class="qnt_input" readonly>
                                            <button class="counter decrement">-</button>
                                        </div>
                                    </div>
                                    <div class="add_item">
                                        <button class="add" id="add2">Add Item</button>
                                    </div>`
                showcase.appendChild(itmDiv)
                itmDiv.innerHTML = itmDivInner
                
            })
            break
        case 'med':
            med.forEach(itm => {
                const showcase = document.querySelector('.showcase')
                const itmDiv = document.createElement('div')
                itmDiv.className = 'item'
                const itmDivInner = `<img class="itm_img"src="${itm.img}">
                                    <div class="item_des">
                                        <hr class="item_title_sep">
                                        <p class="item_title_p">${itm.name}</p>
                                        <hr class="item_title_sep">
                                    </div>
                                    <p class="item_price_p">PRICE: <span class="currency">RS <span class="itm_price">${itm.price}</span></span></p>
                                    <div class="quantity">
                                        <p style="font-size: 1.2rem; font-weight: 600; color: #555555;">Quantity:</p>
                                        <div class="increaser">
                                            <button class="counter increment">+</button>
                                            <input type="text" value="1" class="qnt_input" readonly>
                                            <button class="counter decrement">-</button>
                                        </div>
                                    </div>
                                    <div class="add_item">
                                        <button class="add" id="add2">Add Item</button>
                                    </div>`
                showcase.appendChild(itmDiv)
                itmDiv.innerHTML = itmDivInner
                
            })
            break
            default:
                all.forEach(itm => {
                    const showcase = document.querySelector('.showcase')
                    const itmDiv = document.createElement('div')
                    itmDiv.className = 'item'
                    const itmDivInner = `<img class="itm_img"src="${itm.img}">
                                        <div class="item_des">
                                            <hr class="item_title_sep">
                                            <p class="item_title_p">${itm.name}</p>
                                            <hr class="item_title_sep">
                                        </div>
                                        <p class="item_price_p">PRICE: <span class="currency">RS <span class="itm_price">${itm.price}</span></span></p>
                                        <div class="quantity">
                                            <p style="font-size: 1.2rem; font-weight: 600; color: #555555;">Quantity:</p>
                                            <div class="increaser">
                                                <button class="counter increment">+</button>
                                                <input type="text" value="1" class="qnt_input" readonly>
                                                <button class="counter decrement">-</button>
                                            </div>
                                        </div>
                                        <div class="add_item">
                                            <button class="add" id="add2">Add Item</button>
                                        </div>`
                    showcase.appendChild(itmDiv)
                    itmDiv.innerHTML = itmDivInner
                    
                })
                
}
    // Adding EventListener
    let addItem = document.querySelectorAll('.add')
    let qntIncrease = document.querySelectorAll('.increment')
    let qntDecrease = document.querySelectorAll('.decrement')

    qntIncrease.forEach(counter => counter.addEventListener('click', qntIncrement))
    qntDecrease.forEach(counter => counter.addEventListener('click', qntDecrement))
    addItem.forEach(btn => btn.addEventListener('click', addToCart));
    setSameHeightElement()
}
let removeItm = () => {
    const rowToRemove = parseInt(event.target.querySelector('.store_row_no').innerHTML)
    const cols = document.querySelectorAll('.cart_table_col')
    cols.forEach(col => {
        col.querySelectorAll('.td')[rowToRemove].remove()
    })
    if (!cols[0].querySelector('.td')) {
        const total = document.querySelectorAll('.cart_total')
        // forEach isn't working without throwing any error
        total.forEach(el => el.remove())
    }

    if (document.querySelectorAll('.td').length != 0){
        setTotalPrice()
    }
}

let setSameHeightElement = () => {
    // console.log('done')
    const itmNames = document.querySelectorAll('.item_title_p')
    // const p1 = document.querySelectorAll('.item_title_p')[0]
    // p1.style.height = style.height
    // console.log(style.height)
    // Testing
    let index = 1
    for(let i = 0; i < itmNames.length; i++) {
        if (i < itmNames.length-1) {
            if (itmNames[i].innerHTML.length > itmNames[index].innerHTML.length) {
                    index = i
            }
        }
    }
    const style = getComputedStyle(itmNames[index])
    itmNames.forEach(name => {
        if (name.innerHTML != itmNames[index].innerHTML) {
            name.style.height = style.height
        }
        })
    }
// setSameHeightElement()
// Imediate Exucution
changeItems()
// Adding Event Listeners
category.addEventListener('change', changeItems)
clear.addEventListener('click', clearCart)
window.addEventListener('resize', setSameHeightElement)
     /* let test = () => {
         let x = document.querySelector('#som')
         console.log(x)
         x.value = 2
     } */
