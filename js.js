function showSubMenu(){
    var submenu = document.getElementsByClassName('sub-menu')[0];
    submenu.style.display == 'none' || submenu.style.display == '' ? submenu.style.display = 'flex' : submenu.style.display = 'none';
}
function showCert(certs){
    var c = Array.from(certs);
    var r = document.getElementsByClassName('response')[0];
    r.innerHTML = '';
    c.forEach(function(e, i){
        var cont = document.createElement('figure');
        var img = document.createElement('img');
        img.src = 'certs/'+e+'.jpg';
        cont.appendChild(img);
        r.appendChild(cont);
    });
}
function cleanR(){
    document.getElementsByClassName('response')[0].innerHTML = '';
}