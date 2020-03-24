function validateForm() {
  var x = document.forms["form"]["name"].value;
  var radios = document.getElementsByName("rate us");
  var formValid = false;

  if (x == "") {
    alert("TYPE YOUR NAME FIRST ......");
    return false;
  }

    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;        
    }

    if (!formValid) alert("PLEASE RATEUS .....");
    return formValid;
}
 