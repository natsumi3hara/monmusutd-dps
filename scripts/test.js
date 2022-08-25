function charaselected(charaId,imgsrc) {
    let x = document.getElementById("chara-selection");
    x.style.display = "none";
    let y = document.getElementById("chara-info");
    y.style.display = "block";
    let z = document.getElementById("calc-chara-id");
    z.style.display = "none";
    let calcImage = imgsrc;
    document.getElementById("calc-picture").innerHTML = "<img class='charimg' src="+calcImage+"/>"
    let abilityIndex = abilityData.table.findIndex(object => {return object.id === charaId})
    document.getElementById("calc-race-trait").innerHTML = abilityData.table[abilityIndex].text
    document.getElementById("calc-chara-id").innerHTML = charaId
    document.getElementById("calc-skill-data").innerHTML = "Skill Data"
}
function charaselectedreverse() {
    let x = document.getElementById("chara-selection");
    x.style.display = "block";
    let y = document.getElementById("chara-info");
    y.style.display = "none";
}

function changeCommon(){
    let common = document.getElementById("chara-table-common");
    common.style.display = "inline-block";
    let rare = document.getElementById("chara-table-rare");
    rare.style.display = "none";
    let epic = document.getElementById("chara-table-epic");
    epic.style.display = "none";
    let legend = document.getElementById("chara-table-legend");
    legend.style.display = "none";
}
function changeRare(){
    let common = document.getElementById("chara-table-common");
    common.style.display = "none";
    let rare = document.getElementById("chara-table-rare");
    rare.style.display = "inline-block";
    let epic = document.getElementById("chara-table-epic");
    epic.style.display = "none";
    let legend = document.getElementById("chara-table-legend");
    legend.style.display = "none";
}
function changeEpic(){
    let common = document.getElementById("chara-table-common");
    common.style.display = "none";
    let rare = document.getElementById("chara-table-rare");
    rare.style.display = "none";
    let epic = document.getElementById("chara-table-epic");
    epic.style.display = "inline-block";
    let legend = document.getElementById("chara-table-legend");
    legend.style.display = "none";
}
function changeLegend(){
    let common = document.getElementById("chara-table-common");
    common.style.display = "none";
    let rare = document.getElementById("chara-table-rare");
    rare.style.display = "none";
    let epic = document.getElementById("chara-table-epic");
    epic.style.display = "none";
    let legend = document.getElementById("chara-table-legend");
    legend.style.display = "inline-block";
}
function loadImg() {
    let table = document.getElementById("chartable2");
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = '<img src="https://monmusu-td.wikiru.jp/attach2/696D67_E38090E382B1E383ABE38399E383ADE382B9E5A898E38091E38386E383ABE383AB5F5F69636F6E2E706E67.png"/>';
}

function loadSkillData() {
    let skillLevel = document.getElementById("skill-level-select").value
    let charaSkill = document.getElementById("calc-chara-id").innerHTML
    document.getElementById("calc-skill-data").innerHTML = skillData[charaSkill].levels[skillLevel]
}