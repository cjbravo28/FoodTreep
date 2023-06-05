

function printPageArea(areaID){
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML= printContent;
    window.print();
    document.body.innerHTML = originalContent;
}



