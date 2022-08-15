function charaselected() {
    var x = document.getElementById("chara-selection");
    x.style.display = "none";
    var y = document.getElementById("chara-info");
    y.style.display = "block";
}
function charaselectedreverse() {
    var x = document.getElementById("chara-selection");
    x.style.display = "block";
    var y = document.getElementById("chara-info");
    y.style.display = "none";
}

function changeCommon(){
    var common = document.getElementById("chara-table-common");
    common.style.display = "inline-block";
    var rare = document.getElementById("chara-table-rare");
    rare.style.display = "none";
    var epic = document.getElementById("chara-table-epic");
    epic.style.display = "none";
    var legend = document.getElementById("chara-table-legend");
    legend.style.display = "none";
}
function changeRare(){
    var common = document.getElementById("chara-table-common");
    common.style.display = "none";
    var rare = document.getElementById("chara-table-rare");
    rare.style.display = "inline-block";
    var epic = document.getElementById("chara-table-epic");
    epic.style.display = "none";
    var legend = document.getElementById("chara-table-legend");
    legend.style.display = "none";
}
function changeEpic(){
    var common = document.getElementById("chara-table-common");
    common.style.display = "none";
    var rare = document.getElementById("chara-table-rare");
    rare.style.display = "none";
    var epic = document.getElementById("chara-table-epic");
    epic.style.display = "inline-block";
    var legend = document.getElementById("chara-table-legend");
    legend.style.display = "none";
}
function changeLegend(){
    var common = document.getElementById("chara-table-common");
    common.style.display = "none";
    var rare = document.getElementById("chara-table-rare");
    rare.style.display = "none";
    var epic = document.getElementById("chara-table-epic");
    epic.style.display = "none";
    var legend = document.getElementById("chara-table-legend");
    legend.style.display = "inline-block";
}
function loadImg() {
    var table = document.getElementById("chartable2");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = '<img src="https://monmusu-td.wikiru.jp/attach2/696D67_E38090E382B1E383ABE38399E383ADE382B9E5A898E38091E38386E383ABE383AB5F5F69636F6E2E706E67.png"/>';
}