// Global Variables & Adding Event Listeners
let category = document.querySelector('#category')
let clear = document.querySelector('.clear_cart')
let cartBtn = document.querySelector('.cart_btn')

//Tst
const firstName = document.querySelector('#firstname')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const address = document.querySelector('#address')
const form = document.querySelector('#order')
const notification = document.querySelector('.added_notify')
const emptyCartModal = document.querySelector('.empty_cart_modal')
const cartModal = document.querySelector('.cart_modal')
const formInvalidModal = document.querySelector('.form_invalid_modal')
const okBtn = document.querySelectorAll('.ok_btn')
// Item Database OLD
// let food = [
//     {
//         name: 'WHISKAS® Dry Cat Food Beefsssssssssssssssssssssssssssssssss Flavour',
//         img: 'img/shop/food101.jpg',
//         price: 1200
//     }, 
//     {
//         name: 'Meow Mix® Original Choice',
//         img: 'img/shop/food201.jpg',
//         price: 800
//     },
//     {
//         name: 'Chicken Flavor Dry Cat Food',
//         img: 'img/shop/food301.jpg',
//         price: 4500
//     }
// ]
// let toy = [
//     {
//         name: 'Hartz Just For Cats Cat Toy',
//         img: 'img/shop/toy101.jpg',
//         price: 650
//     }, 
//     {
//         name: 'Petstages Cat Tracks Cat Toy',
//         img: 'img/shop/toy201.jpg',
//         price: 800
//     },
//     {
//         name: 'Bergan Turboscratcher Cat Toy (Assorted)',
//         img: 'img/shop/toy301.jpg',
//         price: 1500
//     }
// ]
// let med = [
//     {
//         name: 'Bayer Advantage II Flea Prevention',
//         img: 'img/shop/med101.jpg',
//         price: 5000
//     }, 
//     {
//         name: 'NODENS CAT Hip & Joint Glucosamine',
//         img: 'img/shop/med201.jpg',
//         price: 2000
//     },
//     {
//         name: 'HomeoPet Nose Relief, 15 ml',
//         img: 'img/shop/med301.jpg',
//         price: 2000
//     },
//     {
//         name: 'Nutramax Cosequin Sprinkle Capsules',
//         img: 'img/shop/med401.jpg',
//         price: 2000
//     }
// ]
// let all = food.concat(toy).concat(med)

//Tst itemData NEW

let items = {
    food: [{
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
            }],
    toy: [{
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
        }],
    med: [{
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
        }]
}
items['all'] = items['food'].concat(items['med'], items['toy'])

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
    let setQnt = `<button class="cart_counter increment">+</button>
    <input type="text" value="${parseInt(itm.querySelector('input').value)}" class="cart_qnt_input" readonly>
    <button class="cart_counter decrement">-</button>`
    let qnt = parseInt(itm.querySelector('input').value)
    const itmDet = {
            itmNo: document.querySelector('.cart_id_col').querySelectorAll('.td').length + 1,
            itmImg: `<img src='${itm.querySelector('img').src}' class="cart_img">`,
            itmDes: `<span class="start">${itm.querySelector('.item_title_p').innerHTML}</span>`,
            // itmCur: 'rs',
            itmPrice: `<span class="cart_price pink mono">${parseInt(itm.querySelector('.itm_price').innerHTML)}</span>`,
            itmQnt: setQnt,//`${parseInt(itm.querySelector('input').value)}`,
            itmRm: `<div class="cart_remove">X<span class="store_row_no">${document.querySelector('.cart_id_col').querySelectorAll('.td').length}</span></div>`
        }
    const itmDetArr = Object.values(itmDet)
    const cartCols = document.querySelectorAll('.cart_table_col')
    let inCart = checkCart(itmDet.itmDes, qnt)
    if (!inCart[0]) {
        for(let i = 0; i < cartCols.length; i++) {
            const span = document.createElement('span');
            span.className = 'td'
            const col = cartCols[i]
            const colRows = cartCols[i].querySelectorAll('.td')
            const lstRow = colRows[colRows.length-1]
            if (lstRow) {
                lstRow.after(span)
            } else {
                // clear.style.marginTop = '20px'
                col.appendChild(span)
            }
            span.innerHTML = itmDetArr[i]
        }
        const removeItmInCart = document.querySelectorAll('.cart_remove')
        // removeItmInCart.forEach(btn => btn.onclick = function(){removeItm(parseInt(event.target.querySelector('.store_row_no').innerHTML))}) // added
        removeItmInCart[removeItmInCart.length-1].addEventListener('click', function(){removeItm(parseInt(event.target.querySelector('.store_row_no').innerHTML))})
        setTotalPrice()
        let qntIncrease = document.querySelectorAll('.cart_counter.increment')[document.querySelector('.cart_id_col').querySelectorAll('.td').length-1]
        let qntDecrease = document.querySelectorAll('.cart_counter.decrement')[document.querySelector('.cart_id_col').querySelectorAll('.td').length-1]
        // console.log(document.querySelectorAll('.cart_counter.increment'))
        qntIncrease.addEventListener('click', function(){
            qntIncrement()
            setTotalPrice()
        })
        qntDecrease.addEventListener('click', function(){
            qntDecrement()
            setTotalPrice()
        })
    }
    
    return inCart
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

function show(ele, display) {
    ele.style.visibility = 'visible'
    ele.style.display = display
}
function hide(ele) {
    ele.style.display = 'none'
}
function setWidthToParent(ele) {
    ele.style.width = getComputedStyle(ele.parentElement).width
}
let checkCart = (itmDes, itmQnt) => {
    const itmLst = document.querySelector('.itm_des_col').querySelectorAll('.td')
    const qntLst = document.querySelector('.cart_qnt_col').querySelectorAll('.cart_qnt_input')
    let inCart = [false, false, 0, null]
    for(let i = 0; i < itmLst.length; i++) {
        if (itmLst[i].innerHTML == itmDes) {
            let qnt = qntLst[i]
            if (parseInt(qnt.value) !== itmQnt) {
                inCart = [true, false, i, qnt.value]
                qnt.value = itmQnt
                setTotalPrice()
            } else {
                inCart = [true, true, i, null]
            }
            break
        } else {
            inCart = [false, false, i+1, null]
        }
    }
    return inCart
}
let setTotalPrice = () => {
    let totalPrice = 0
    const totalPriceClass = document.querySelector('.cart_price_total')
    const priceLst = document.querySelector('.cart_price_col').getElementsByClassName('cart_price')
    const qntLst = document.querySelector('.cart_qnt_col').querySelectorAll('.cart_qnt_input')
    for(let i = 0; i < priceLst.length; i++) {
        totalPrice += parseInt(priceLst[i].innerHTML) * parseInt(qntLst[i].value)
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

let changeItemsOld = () => {
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
                                        <p class="item_title_p"><span>${itm.name}</span></p>
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
                                        <p class="item_title_p"><span>${itm.name}</span></p>
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
                                        <p class="item_title_p"><span>${itm.name}</span></p>
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
                                            <p class="item_title_p"><span>${itm.name}</span></p>
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
// Tst new changeItems 
let changeItems = () => {
    document.querySelector('.showcase').innerHTML = ''
    const getCategory = document.querySelector('#category').querySelector('option:checked').value
    items[getCategory].forEach(itm => {
        const showcase = document.querySelector('.showcase')
        const itmDiv = document.createElement('div')
        itmDiv.className = 'item'
        const itmDivInner = `<img class="itm_img"src="${itm.img}">
                            <div class="item_des">
                                <hr class="item_title_sep">
                                <p class="item_title_p"><span>${itm.name}</span></p>
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
    // Adding EventListener
    let addItem = document.querySelectorAll('.add')
    let qntIncrease = document.querySelectorAll('.increment')
    let qntDecrease = document.querySelectorAll('.decrement')

    qntIncrease.forEach(counter => counter.addEventListener('click', qntIncrement))
    qntDecrease.forEach(counter => counter.addEventListener('click', qntDecrement))
    addItem.forEach(btn => btn.addEventListener('click', function(){
        const inCart = addToCart()
        setWidthToParent(notification)
        if (!inCart[0] && !inCart[1]) {
            notification.innerHTML = "<span>Item Added ✅</span><span class='undo' href='#'>undo</span>"
            notification.style.backgroundColor = 'rgba(8, 145, 65, 0.767)'
            document.querySelector('.undo').addEventListener('click', function(){removeItm(inCart[2]); hide(notification)})
        } else if(inCart[0] && !inCart[1]) {
            notification.innerHTML = "<span>Quantity Changed ✅</span><span class='undo' href='#'>undo</span>"
            notification.style.backgroundColor = 'rgba(8, 145, 65, 0.767)'
            document.querySelector('.undo').addEventListener('click', function(){
                document.querySelectorAll('.cart_qnt_input')[inCart[2]].value = inCart[3]
                setTotalPrice()
                hide(notification)
            })
        } 
        else {
            notification.innerHTML = "<span>This is already in the cart ✕</span>"
            notification.style.backgroundColor = 'rgba(219, 29, 29, 0.877)'    
        }
        show(notification, 'flex')
        setTimeout('hide(notification)', 3000)
    }));
    setSameHeightElement()
}

function removeItm(itmNo) {
    const cols = document.querySelectorAll('.cart_table_col')
    const rowToRemove = itmNo
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
    itmNoReset()
}
// Working on cartNo when an item is removed
let itmNoReset = () => {
    const itmRows = document.querySelector('.cart_id_col').querySelectorAll('.td')
    for(let i = 0; i<itmRows.length; i++) {
        itmRows[i].innerHTML = i + 1
        document.querySelectorAll('.store_row_no')[i].innerHTML = i
    }
}

let setSameHeightElement = () => {
    // console.log('done')
    const itmNames = document.querySelectorAll('.item_title_p') 
    let itmNamesText = []
    // const p1 = document.querySelectorAll('.item_title_p')[0]
    // p1.style.height = style.height
    // console.log(style.height)
    // Testing
    for(let i = 0; i<itmNames.length; i++) {
        itmNamesText.push(itmNames[i].innerHTML.length)
    }
    index = itmNamesText.indexOf(Math.max(...itmNamesText))
    // let index = 1
    // for(let i = 0; i < itmNames.length; i++) {
    //     // if (i < itmNames.length) { //Changed this at IIT idk why did i even add this
    //         if (itmNames[i].innerHTML.length > itmNames[index].innerHTML.length) {
    //                 index = i
    //         }
    //     // }
    // }
    const style = getComputedStyle(itmNames[index])
    itmNames.forEach(name => {
        if (name.innerHTML != itmNames[index].innerHTML) {
            name.style.height = style.height
        }
        })
}
let showCart = () => {
    cartModal.style.visibility = 'visible'
    clear.style.display='block'   
}
let hideModal = (ele) => {
    if (event.target == ele || event.target == document.querySelector('.close_cart')){
        ele.style.visibility = 'hidden'
        clear.style.display='none' //Fixes the delay to disappear
    }
}

//Tst Success
function formFeedback(field) {
    const fieldName = field.name
    let isFormInvalid = emptyFieldFeedback(field)
    if (!isFormInvalid) {
        switch(fieldName) {
            case 'phone':
                if (!isNumbers(field)) {
                    document.querySelector('.wrong_format_tel').style.display = 'none'
                    document.querySelector('.not_allowed_number').style.display = 'block'
                    field.style.borderColor = 'red'
                    isFormInvalid = true
                } else if (!isTel(field)) {
                    document.querySelector('.not_allowed_number').style.display = 'none'
                    document.querySelector('.wrong_format_tel').style.display = 'block'
                    field.style.borderColor = 'red'
                    isFormInvalid = true
                } 
                else {
                    field.value = field.value.trim()
                    document.querySelector('.wrong_format_tel').style.display = 'none'
                    document.querySelector('.not_allowed_number').style.display = 'none'
                    field.borderColor = 'silver'   

                }
                break
            case 'email':
                if (!isEmail(field)) {
                    document.querySelector('.wrong_format_email').style.display = 'block'
                    field.style.borderColor = 'red'   
                    isFormInvalid = true
                } else {
                    field.value = field.value.trim()
                    document.querySelector('.wrong_format_email').style.display = 'none'
                    field.borderColor = 'silver'

                }
                break
        }
    }
    return isFormInvalid
}
function emptyFieldFeedback(field) {
    const fieldValue = field.value.trim()
    const feedback = field.nextElementSibling.firstElementChild
    const allFeedbacks = field.nextElementSibling.querySelectorAll('.validation')
    for(let i = 0; i < allFeedbacks.length; i++) {
        allFeedbacks[i].style.display = "none"
    }
    if (!fieldValue.length) {
        feedback.style.display = "block"
        field.style.borderColor = 'red'
        return true
    } else {
        feedback.style.display = "none"
        field.style.borderColor = 'silver'
        return false
    }
}
function isNumbers(field) {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const fieldValue = field.value.trim()
    let valid = isNoSpace(fieldValue)
    if(valid) {
        for(i=0; i<fieldValue.length; i++) {
            if (!valid) {
                break
            }
            for(j=0; j<numbers.length; j++) {
                if (fieldValue[i] == numbers[j]) {
                    valid = true
                    break
                }
                valid = false
            }
        }
    }
    return valid
    
}
function isTel(field) {
    let fieldValue = field.value.trim()
    if(fieldValue.length == 9) {
        fieldValue = 0 + fieldValue
        valid = true
    } else if (fieldValue.length == 10 && parseInt(fieldValue[0]) == 0) {
        valid = true
    } else {
        valid = false
    }
    return valid
}
function isNoSpace(value) {
    for(i=0; i<value.length; i++) {
        if (value[i] == ' ') {
            valid = false
            break
        } else {
            valid = true
        }
    }
    return valid
}
function isEmail(field) {
    const emailCharacter = '@'
    const fieldValue = field.value.trim()
    let valid = isNoSpace(fieldValue)
    
    if (valid) {
        for(i=0; i<fieldValue.length; i++) { 
            if (fieldValue[i] == emailCharacter) {
                if (i == 0) {
                    valid = false
                }
                else if (fieldValue.slice(i).length == 1) {
                    valid = false
                } else {
                    valid = true
                }
                break
            } else {
                valid = false
            }
        }
    }
    return valid
}

function requiredFieldOnSkip() {
    const requiredFields = document.querySelectorAll('.required')
    for(let i = requiredFields.length-1; i>0; i--) {
        for(let j = i-1; j>=0; j--) {
            requiredFields[i].addEventListener('focus', function(){formFeedback(requiredFields[j])})
        }
    } 
}
// Tst ONSUBMIT
function onSubmitFeedBack(){
    const requiredField = document.querySelectorAll('.required')
    let isFormInvalid
    for(let i = requiredField.length-1; i >= 0; i--) {
        isFormInvalid = formFeedback(requiredField[i])
        if(isFormInvalid) {
            for(let j = i-1; j>=0; j--) {
                emptyFieldFeedback(requiredField[j])
            }
            show(formInvalidModal, 'flex')
            break
        } 
    }
    if (!isFormInvalid) {
        if(!document.querySelectorAll('.td').length){
            show(emptyCartModal, 'flex')
        } else {
            makeBill()
        }
    }
}
function makeBill() {
    let totalBill = 0
    const cartItems = document.querySelector('.itm_des_col').querySelectorAll('.td')
    if(!document.querySelector('.bill_modal')) {
        const modal = document.createElement('div')
        modal.className = 'bill_modal'
        const billContainerHtml =`<div class="bill_container">
                            <h4>This is your order</h4>
                            <hr class="bill_title_sep">
                            <table id="bill_table" width="100%">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Qnt</th>
                                    <th class="numbers">Price</th>
                                    <th class="numbers">Total</th>
                                </tr>
                            </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <button class="ok_btn">OK</button>
                        </div>`
        modal.innerHTML = billContainerHtml
        document.body.appendChild(modal)
    } else{
        document.querySelector('tbody').innerHTML = ""
    }
    const billTable = document.querySelector('tbody')
    for (let i = 0; i < cartItems.length; i++){
        let total = parseInt(document.querySelector('.cart_price_col').querySelectorAll('.cart_price')[i].innerHTML) * parseInt(document.querySelector('.cart_qnt_col').querySelectorAll('.cart_qnt_input')[i].value)
        // console.log(total)
        totalBill = totalBill + total
        let bill = `<tr>
                    <td style="max-width: 50px;">${document.querySelector('.itm_des_col').querySelectorAll('.td')[i].innerHTML}</td>
                    <td>${document.querySelector('.cart_qnt_col').querySelectorAll('.cart_qnt_input')[i].value}</td>
                    <td class="numbers">${document.querySelector('.cart_price_col').querySelectorAll('.td')[i].innerHTML}</td>
                    <td class="numbers total_price">${total}</td>
                </tr>`
        billTable.innerHTML += bill
    }
    const totalBillHtml = `<tr class="total">
                        <th colspan="2">Total Price</th>
                        <th class="numbers" colspan="2">${totalBill}</th>
                    </tr>`
    billTable.innerHTML += totalBillHtml
    document.querySelector('.bill_modal').querySelector('.ok_btn').addEventListener('click', function(){hide(document.querySelector('.bill_modal'))})
    document.querySelector('.bill_modal').addEventListener('click', function(){hideModal(document.querySelector('.bill_modal'))})
    document.querySelector('.bill_modal').style.visibility = 'visible'
    document.querySelector('.bill_modal').style.display = 'flex'

    // <tr>
    //     <td style="max-width: 50px;">T-shirt sdwddsfsfsfwf sfsfsfsf ddddddd</td>
    //     <td class="qnt"> <button class="counter increment">+</button>
    //         <input type="text" value="1" class="qnt_input" readonly>
    //         <button class="counter decrement">-</button></td>
    //     <td class="numbers">400.00</td>
    //     <td class="numbers">800.00</td>
    // </tr>
    // <tr>
    //     <td>Pen Drive</td>
    //     <td>3</td>
    //     <td class="numbers">200.00</td>
    //     <td class="numbers">600.00</td>
    // </tr>
    // <tr class="total">
    //     <th colspan="2">Total Price</th>
    //     <th class="numbers" colspan="2">1400.00</th>
    // </tr>
}


// Event Listeners Tst
//1
window.addEventListener('resize', function(){setWidthToParent(notification)})
//2
order.addEventListener('submit', onSubmitFeedBack)
// Add Event Listeners Tst Success
firstName.addEventListener('focusout', function() {
    formFeedback(firstName)
})
email.addEventListener('focusout', function() {
    formFeedback(email)
})
phone.addEventListener('focusout', function() {
    formFeedback(phone)
})
address.addEventListener('focusout', function() {
    formFeedback(address)
})
requiredFieldOnSkip()

// Imediate Exucution
changeItems()
// Adding Event Listeners
category.addEventListener('change', changeItems)
clear.addEventListener('click', clearCart)
window.addEventListener('resize', setSameHeightElement)
cartBtn.addEventListener('click', showCart)
cartModal.addEventListener('click', function(){hideModal(cartModal)})
emptyCartModal.addEventListener('click', function(){hideModal(emptyCartModal)})
formInvalidModal.addEventListener('click', function(){hideModal(formInvalidModal)})
okBtn[0].addEventListener('click', function(){hide(emptyCartModal)})
okBtn[1].addEventListener('click', function(){hide(formInvalidModal)})
    /* let test = () => {
        let x = document.querySelector('#som')
        console.log(x)
        x.value = 2
    } */  
