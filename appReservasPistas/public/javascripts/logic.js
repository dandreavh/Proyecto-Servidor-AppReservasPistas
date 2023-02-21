const checkbox = document.getElementById("federado");
checkbox.addEventListener("click", function(){
    if(checkbox.checked){
        checkbox.setAttribute("value", "true");
    }else{
        checkbox.setAttribute("value", "false");
    }
})