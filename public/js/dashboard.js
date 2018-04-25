x = document.getElementById("mySidenav");
y = document.getElementById("content");
function toggle() {
    if ( x.style.width == "0px" ) { 
        x.style.width = "270px";
        y.style.marginLeft = "370px";
    }
    else {
        x.style.width = "0px";
        y.style.marginLeft = "100px";
    }
}
function closeNav() {
    x.style.width = "0px";
    y.style.marginLeft = "100px";
}