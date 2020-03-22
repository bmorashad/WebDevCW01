window.addEventListener('scroll', () => {
       if(window.scrollY > 1000) {
            document.querySelector('.back_to_top').style.display = "flex";
        } else {
            document.querySelector('.back_to_top').style.display = "none"
        }
        if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
            document.querySelector('.back_to_top').style.bottom = "150px"
        } else {
            document.querySelector('.back_to_top').style.bottom = "80px"
        }
})