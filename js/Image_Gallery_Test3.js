/*Event Listeners for the images*/

document.getElementById("img1").addEventListener("click",function () {
    displayImage("img1");
});

document.getElementById("img2").addEventListener("click",function () {
    displayImage("img2");
});

document.getElementById("img3").addEventListener("click",function () {
    displayImage("img3");
});

document.getElementById("img4").addEventListener("click",function () {
    displayImage("img4");
});

document.getElementById("img5").addEventListener("click",function () {
    displayImage("img5");
});

/*Function for display Images*/

function displayImage(pic){
    switch (pic) {
        case "img1":
            document.getElementById("imgViewerWDescription").style.display = "block";
            document.getElementById("imageViewer").innerHTML = document.getElementById("pic1").innerHTML;
            document.getElementById("description").innerHTML = document.getElementById("AbyssianCat_Dc").innerHTML;
            imgesposition();
            break;
        case "img2":
            document.getElementById("imgViewerWDescription").style.display = "block";
            document.getElementById("imageViewer").innerHTML = document.getElementById("pic2").innerHTML;
            document.getElementById("description").innerHTML = document.getElementById("RagdollCats_Dc").innerHTML;
            imgesposition();
            break;
        case "img3":
            document.getElementById("imgViewerWDescription").style.display = "block";
            document.getElementById("imageViewer").innerHTML = document.getElementById("pic3").innerHTML;
            document.getElementById("description").innerHTML = document.getElementById("CornishRexCats_Dc").innerHTML;
            imgesposition();
            break;
        case "img4":
            document.getElementById("imgViewerWDescription").style.display = "block";
            document.getElementById("imageViewer").innerHTML = document.getElementById("pic4").innerHTML;
            document.getElementById("description").innerHTML = document.getElementById("ExoticShorthairCats_Dc").innerHTML;
            imgesposition();
            break;
        case "img5":
            document.getElementById("imgViewerWDescription").style.display = "block";
            document.getElementById("imageViewer").innerHTML = document.getElementById("pic5").innerHTML;
            document.getElementById("description").innerHTML = document.getElementById("HimalayanCats_Dc").innerHTML;
            imgesposition();
            break;
    }
}
/*Grid reposition*/
function imgesposition() {
    document.getElementById("pic1").style.gridColumn = "span 2 / auto";
    document.getElementById("pic1").style.gridRow = "1/2";
    document.getElementById("pic2").style.gridColumn = "span 2 / auto";
    document.getElementById("pic2").style.gridRow = "2/3";
    document.getElementById("pic3").style.gridRow = "3/4";
    document.getElementById("pic4").style.gridRow = "4/5";
    document.getElementById("pic5").style.gridColumn = "span 2 / auto";
    document.getElementById("pic5").style.gridRow = "5/6";
}

/*Close the image viewer*/
function closeWindow(){

    window.location.reload();
}

/*Background color changer*/
document.getElementById("redButton").addEventListener("click",function () {
    bgColor("redButton");
});
document.getElementById("pinkButton").addEventListener("click",function () {
    bgColor("pinkButton");
});
document.getElementById("purpleButton").addEventListener("click",function () {
    bgColor("purpleButton");
});
document.getElementById("whiteButton").addEventListener("click",function () {
    bgColor("whiteButton");
});


function bgColor(X) {
    switch (X){
        case "redButton":
            document.body.style.backgroundColor = "#ff0022";
            break;
        case "pinkButton":
            document.body.style.backgroundColor = "pink";
            break;
        case "purpleButton":
            document.body.style.backgroundColor = "#ed5fd8";
            break;
        case "whiteButton":
            document.body.style.backgroundColor = "white";
            break;

    }

}

/*Text Color Changer*/
document.getElementById("redClrText").addEventListener("click",function () {
    textClr("redClrText");
});
document.getElementById("blueClrText").addEventListener("click",function () {
    textClr("blueClrText");
});
document.getElementById("greenClrText").addEventListener("click",function () {
    textClr("greenClrText");
});
document.getElementById("blackClrText").addEventListener("click",function () {
    textClr("blackClrText");
});


function textClr(X) {
    switch (X){
        case "redClrText":
            document.getElementById("description").style.color = "red";
            break;
        case "blueClrText":
            document.getElementById("description").style.color = "#0073ff";
            break;
        case "greenClrText":
            document.getElementById("description").style.color = "#2fff00";
            break;
        case "blackClrText":
            document.getElementById("description").style.color = "black";
            break;

    }

}