var forms = document.getElementsByTagName("form");

function myFunc(num){
    for(let i = 0; i < forms.length; i++){
        forms[i].style.display = "none";
    }
    forms[num].style.display = "block";
}