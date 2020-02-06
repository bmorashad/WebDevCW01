let addItem = document.querySelectorAll('.add')
let addToCart = () => {
    /* <span class="td">1</span>
     <span class="td"><img src="img/shop/food/food101.jpg" class="cart_img"></span>
     <span class="td">Cat Whisks</span>
     <span class="td">2</span>
     <span class="td"><span class="mono">rs</span></span>
     <span class="td"><span class="cart_price pink mono">2000</span></span>
     <span class="td cart_total"><span class="cart_price pink mono">101500</span></span>
     <span class="td cart_total"><span class="pink">TOTAL</span></span> */
     let btn = event.target
     let itm = btn.parentElement.parentElement
     let itmImg = itm.querySelector('img').src
     let itmDes = itm.querySelector('.item_title_p').innerHTML
     let itmQnt = parseInt(itm.querySelector('input').value)
     let itmCur = itm.querySelector('.currency').innerHTML.slice(0, 2).toLowerCase()
     let itmPrice = parseInt(itm.querySelector('.itm_price').innerHTML)
     let itmNo = document.querySelector('.cart_id_col').querySelectorAll('.tr').length + 1
     let itmTotalPrice = itmQnt * itmPrice 

    

     console.log(itmTotalPrice)
 }
 /* let test = () => {
     let x = document.querySelector('#som')
     console.log(x)
     x.value = 2
 } */
addItem.forEach(btn => btn.addEventListener('click', addToCart));
