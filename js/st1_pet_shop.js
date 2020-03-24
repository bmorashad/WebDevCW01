// Global Variables For Event Listeners
let category = document.querySelector('#category')
let clear = document.querySelector('.clear_cart')
let cartBtn = document.querySelector('.cart_btn')
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
const undone = document.querySelector('.undone_notify')

// Items Database
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


// Event Handlers

let qntIncrement = () => {
    let qntInput = event.target.nextElementSibling
    if (qntInput.value < 9) {
        qntInput.value++
    }
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
            itmRm: `<div class="cart_remove"><img class="remove_img" alt="remove item" src="../img/icon/remove.png" id="itm${document.querySelector('.cart_id_col').querySelectorAll('.td').length}"><span class="store_row_no">${document.querySelector('.cart_id_col').querySelectorAll('.td').length}</span></div>`
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
        const removeItmInCart = document.querySelectorAll('.remove_img')
        // removeItmInCart.forEach(btn => btn.onclick = function(){removeItm(parseInt(event.target.querySelector('.store_row_no').innerHTML))}) // added
        removeItmInCart[removeItmInCart.length-1].addEventListener('click', function(){removeItm(parseInt(event.target.getAttribute('id').substring(3)))})
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
}

function show(ele, display) {
    ele.style.visibility = 'visible'
    ele.style.display = display
}
function hide(ele) {
    ele.style.display = 'none'
}

// returns the item state in cart
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
}

// changeItems on category selection 
let changeItems = () => {
    document.querySelector('.showcase').innerHTML = ''
    const getCategory = document.querySelector('#category').querySelector('option:checked').value
    items[getCategory].forEach(itm => {
        const showcase = document.querySelector('.showcase')
        const itmDiv = document.createElement('div')
        itmDiv.className = 'item'
        const itmDivInner = `<img class="itm_img"src="${itm.img}" alt="${itm.name}">
                            <div class="item_des">
                                <p class="item_title_p"><span>${itm.name}</span></p>
                            </div>
                            <p class="item_price_p">RS <span class="currency"><span class="itm_price">${itm.price}</span></span></p>
                            <div class="quantity">
                                <!--<label for="qnt_input"><p style="font-size: 1.2rem; font-weight: 600; color: #555555;">QNT:</p></label>-->
                                <div class="qnt_change">
                                    <button class="counter increment">+</button>
                                    <input type="text" value="1" class="qnt_input" id="qnt_input" readonly>
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
        // setWidthToParent(notification)
        if (!inCart[0] && !inCart[1]) {
            notification.innerHTML = "<span>Item Added ✅</span><span class='undo' href='#'>undo</span>"
            notification.style.backgroundColor = 'rgba(18, 138, 44, 0.86)'
            document.querySelector('.undo').addEventListener('click', function(){
                removeItm(inCart[2]); (function(ele) {ele.style.visibility = "hidden"})(notification)
                undone.style.transform = 'translate(0%, 57px)'
                undone.style.zIndex = '1'
                setTimeout('(function(ele) {ele.style.transform = "translate(0%, -50px)"; ele.style.zIndex = "-1"})(undone)', 800)
            })
        } else if(inCart[0] && !inCart[1]) {
            notification.innerHTML = "<span>Quantity Changed ✅</span><span class='undo' href='#'>undo</span>"
            notification.style.backgroundColor = 'rgba(18, 138, 44, 0.86)'
            document.querySelector('.undo').addEventListener('click', function(){
                document.querySelectorAll('.cart_qnt_input')[inCart[2]].value = inCart[3]
                setTotalPrice();
                (function(ele) {ele.style.visibility = "hidden"})(notification)
                undone.style.transform = 'translate(0%, 57px)'
                undone.style.zIndex = '1'
                setTimeout('(function(ele) {ele.style.transform = "translate(0%, -50px)"; ele.style.zIndex = "-1"})(undone)', 800)
            })
        } 
        else {
            notification.innerHTML = "<span>This is already in the cart ✕</span>"
            notification.style.backgroundColor = 'rgba(219, 29, 29, 0.877)'    
        }
        show(notification, 'flex')
        setTimeout('(function(ele) {ele.style.visibility = "hidden"})(notification)', 3000)
    }));
    // sets equal height for item name element
    setSameHeightElement()
}

function removeItm(itmNo) {
    const cols = document.querySelectorAll('.cart_table_col')
    const rowToRemove = itmNo
    cols.forEach(col => {
        col.querySelectorAll('.td')[rowToRemove].remove()
    })
    // removes total info col completely
    if (!cols[0].querySelector('.td')) {
        const total = document.querySelectorAll('.cart_total')
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
        document.querySelectorAll('.remove_img')[i].id = "itm" + i
    }
}
// sets equal height for item name element
let setSameHeightElement = () => {
    const itmNames = document.querySelectorAll('.item_title_p') 
    let itmNamesText = []
    for(let i = 0; i<itmNames.length; i++) {
        itmNamesText.push(itmNames[i].innerHTML.length)
    }
    index = itmNamesText.indexOf(Math.max(...itmNamesText))
    const style = getComputedStyle(itmNames[index])
    itmNames.forEach(name => {
        if (name.innerHTML != itmNames[index].innerHTML) {
            name.style.height = style.height
        }
        })
}
let showCart = () => {
    cartModal.style.visibility = 'visible'

}
let hideModal = (ele) => {
    if (event.target == ele || event.target.classList.contains('modal_btn') || event.target == document.querySelector('.close_cart')){
        ele.style.visibility = 'hidden'
    }
}

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
// check unnessary spaces in phone number
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
function onSubmitFeedBack(){
    const requiredField = document.querySelectorAll('.required')
    let firstInvalidField = 0
    let isFormInvalid
    for(let i = requiredField.length-1; i >= 0; i--) {
        isFormInvalid = formFeedback(requiredField[i])
        if(isFormInvalid) {
            for(let j = i-1; j>=0; j--) {
                formFeedback(requiredField[j]) //changed to formFeedback from emptyFieldFeedbacks
                if(formFeedback(requiredField[j])) {
                    firstInvalidField = j
                }
            }
            show(formInvalidModal, 'flex')
            return firstInvalidField
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
                            <h4 class="bill_title">This is your order</h4>
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
                            <button class="ok_btn modal_btn">OK</button>
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
                    <td class="bill_item_des">${document.querySelector('.itm_des_col').querySelectorAll('.td')[i].querySelectorAll('span')[1].innerHTML}</td>
                    <td>${document.querySelector('.cart_qnt_col').querySelectorAll('.cart_qnt_input')[i].value}</td>
                    <td class="numbers"><span class="mono">${document.querySelector('.cart_price_col').querySelectorAll('.td')[i].querySelector('span').innerHTML}</span></td>
                    <td class="numbers total_price"><span class="pink mono">${total}</span></td>
                </tr>`
        billTable.innerHTML += bill
    }
    const totalBillHtml = `<tr class="total">
                        <th colspan="2" class="pink">Total Price</th>
                        <th class="numbers" colspan="2"><span class="pink mono">${totalBill}</span></th>
                    </tr>`
    billTable.innerHTML += totalBillHtml
    document.querySelector('.bill_modal').querySelector('.ok_btn').addEventListener('click', function(){hide(document.querySelector('.bill_modal'))})
    document.querySelector('.bill_modal').addEventListener('click', function(){hideModal(document.querySelector('.bill_modal'))})
    document.querySelector('.bill_modal').style.visibility = 'visible'
    document.querySelector('.bill_modal').style.display = 'flex'
}
function formContainerPositionOnWindowHeight() {
    if(window.innerHeight < document.querySelector('.form_container').offsetHeight) {
        document.querySelector('.form_container').style.position = 'static'
    } else {
        document.querySelector('.form_container').style.position = 'sticky'
    }
}
function formReset() {
    document.querySelectorAll('.validation').forEach(e => {
        e.style.display = 'none'
        document.querySelectorAll('.shop_form_txt').forEach(e => {
            e.style.borderColor = 'rgb(224, 224, 224)'
        })
        document.querySelector('textarea').style.borderColor = 'rgb(224, 224, 224)'
    })
}

document.querySelector('.form_reset').addEventListener('click', formReset)

// Event Listeners
let formInvalidModalListener = false
order.addEventListener('submit', function(){
    const firstInvalidField = onSubmitFeedBack()
    function formInvalid(){document.querySelectorAll('.required')[firstInvalidField].focus(); hideModal(formInvalidModal)}
    if(formInvalidModalListener) {
        formInvalidModal.removeEventListener('click', formInvalid)
    }
    formInvalidModal.addEventListener('click', formInvalid)
    formInvalidModalListener = true
})
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
formContainerPositionOnWindowHeight()
changeItems()
// Adding Event Listeners
category.addEventListener('change', changeItems)
clear.addEventListener('click', clearCart)
window.addEventListener('resize', () => {setSameHeightElement; formContainerPositionOnWindowHeight();})
cartBtn.addEventListener('click', () => {show(cartModal, 'flex')})
cartModal.addEventListener('click', function(){hideModal(cartModal)})
emptyCartModal.addEventListener('click', function(){hideModal(emptyCartModal)})
// okBtn[0].addEventListener('click', function(){hide(emptyCartModal)})
// okBtn[1].addEventListener('click', function(){hide(formInvalidModal)})
    /* let test = () => {
        let x = document.querySelector('#som')
        console.log(x)
        x.value = 2
    } */  
