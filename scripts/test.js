function charaselected(charaId,imgsrc) {
    let x = document.getElementById("chara-selection");
    x.style.display = "none";
    let y = document.getElementById("chara-info");
    y.style.display = "block";
    let z = document.getElementById("calc-chara-id");
    z.style.display = "none";
    let calcImage = imgsrc;
    document.getElementById("calc-picture").innerHTML = "<img class='charimg' src="+calcImage+">"
    //↓IMPORTANT CODE
    let abilityIndex = abilityData.table.findIndex(object => {return object.id === charaId})
    //↑IMPORTANT CODE
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

function dropSelect(dropIDpage,imgsrc) {
    let j = document.getElementById("drop-table");
    j.style.display = "block";
    let k = document.getElementById("drop-select");
    k.style.display = "none";
    document.getElementById("drop-available").innerHTML = tableAvailable;
    document.getElementById("drop-unavailable").innerHTML = tableUnavailable;
    document.getElementById("drop-item-name").innerHTML = ""
    document.getElementById("drop-usage").innerHTML = ""
    document.getElementById("drop-best-stage").innerHTML = ""
    let dropImage = "<img id='drop-icon-image' src="+imgsrc+">";
    document.getElementById("drop-icon").innerHTML = dropImage;
    let indexDrop = 0;
    const toSortAvailable = [];
    const toSortUnavailable = [];
    for(let dropList of Object.values(dropData)){
        for(let dropitemlist of Object.values(dropList.drops)){
            if (dropitemlist.dropID === dropIDpage){
                var dropNamepage = dropitemlist.dropName;
                let stageNamePrint = Object.getOwnPropertyNames(dropData)[indexDrop].split(":")[1];
                let stageNameID = Object.getOwnPropertyNames(dropData)[indexDrop].split(":")[0];
                if (stageNameID.charAt(0) === "7"){
                    if (subStoryUnlock.includes(stageNameID.slice(1,4))){
                        var unlock = true;
                    } else {
                        var unlock = false;
                    }
                } else {
                    unlock = true;
                }
                let staminaUsed = dropList.stamina;
                let probability = dropitemlist.dropProbability;
                let count = dropitemlist.dropCount;
                let efficiency = Math.round(1000*staminaUsed/((probability/100)*count))/1000;
                /*console.log(efficiency)
                console.log(stageNamePrint)
                console.log(stageNameID)
                console.log(unlock)*/
                if (stageNameID.charAt(0) === "1"){
                    stageTypePrint = " (Main Story)";
                } else if (stageNameID.charAt(0) === "2"){
                    stageTypePrint = " (Special Challenge)";
                } else if (stageNameID.charAt(0) === "3"){
                    stageTypePrint = " (Material Quests)";
                } else if (stageNameID.charAt(0) === "4"){
                    stageTypePrint = " (Boss Challenge)";
                } else if (stageNameID.charAt(0) === "5"){
                    stageTypePrint = " (Dungeon Defense)";
                } else if (stageNameID.charAt(0) === "7"){
                    stageTypePrint = subStoryName[stageNameID.slice(1,4)]
                } else {
                    stageTypePrint = ""
                }
                let tempObjectDrop = {
                    "stagename": stageNamePrint+stageTypePrint,
                    "dropcount": count,
                    "dropprob": probability,
                    "efficiency": efficiency
                };
                if (unlock){
                    toSortAvailable.push(tempObjectDrop);
                } else {
                    toSortUnavailable.push(tempObjectDrop);
                }
            }
        }
        indexDrop++;
    }
    toSortAvailable.sort(function(x,y){
        return x.efficiency - y.efficiency
    })
    toSortUnavailable.sort(function(x,y){
        return x.efficiency - y.efficiency
    })
    console.log(toSortAvailable)
    console.log(toSortUnavailable)
    if (typeof dropNamepage === 'undefined'){
        var dropNamepage = "Not available yet!"
    }
    document.getElementById("drop-item-name").innerHTML = dropNamepage
    try {
        document.getElementById("drop-best-stage").innerHTML = "Best efficiency:<br>" + toSortAvailable[0].stagename
    } catch {
        document.getElementById("drop-best-stage").innerHTML = "No best stage available!"
    }
    var tableA = document.getElementById("drop-available")
    for(let a of toSortAvailable){
        tableA.insertRow();
        for(let cell of Object.values(a)){
            let newCell = tableA.rows[tableA.rows.length - 1].insertCell();
            newCell.textContent = cell
        }
    }
    var tableU = document.getElementById("drop-unavailable")
    for(let u of toSortUnavailable){
        tableU.insertRow();
        for(let cell of Object.values(u)){
            let newCell = tableU.rows[tableU.rows.length - 1].insertCell();
            newCell.textContent = cell
        }
    }
}

function dropSelectReverse() {
    let x = document.getElementById("drop-select");
    x.style.display = "block";
    let y = document.getElementById("drop-table");
    y.style.display = "none";
}

function dropSelectJP(dropIDpage,imgsrc) {
    let j = document.getElementById("drop-table");
    j.style.display = "block";
    let k = document.getElementById("drop-select");
    k.style.display = "none";
    document.getElementById("drop-available").innerHTML = tableAvailableJP;
    document.getElementById("drop-unavailable").innerHTML = tableUnavailableJP;
    document.getElementById("drop-item-name").innerHTML = ""
    document.getElementById("drop-usage").innerHTML = ""
    document.getElementById("drop-best-stage").innerHTML = ""
    let dropImage = "<img id='drop-icon-image' src="+imgsrc+">";
    document.getElementById("drop-icon").innerHTML = dropImage;
    let indexDrop = 0;
    const toSortAvailable = [];
    const toSortUnavailable = [];
    for(let dropList of Object.values(dropData)){
        for(let dropitemlist of Object.values(dropList.drops)){
            if (dropitemlist.dropID === dropIDpage){
                var dropNamepage = dropitemlist.dropName;
                let stageNamePrint = Object.getOwnPropertyNames(dropData)[indexDrop].split(":")[1];
                let stageNameID = Object.getOwnPropertyNames(dropData)[indexDrop].split(":")[0];
                if (stageNameID.charAt(0) === "7"){
                    if (subStoryUnlock.includes(stageNameID.slice(1,4))){
                        var unlock = true;
                    } else {
                        var unlock = false;
                    }
                } else {
                    unlock = true;
                }
                let staminaUsed = dropList.stamina;
                let probability = dropitemlist.dropProbability;
                let count = dropitemlist.dropCount;
                let efficiency = Math.round(1000*staminaUsed/((probability/100)*count))/1000;
                /*console.log(efficiency)
                console.log(stageNamePrint)
                console.log(stageNameID)
                console.log(unlock)*/
                if (stageNameID.charAt(0) === "1"){
                    stageTypePrint = " (メインストーリー)";
                } else if (stageNameID.charAt(0) === "2"){
                    stageTypePrint = " (スペシャルチャレンジ)";
                } else if (stageNameID.charAt(0) === "3"){
                    stageTypePrint = " (育成素材クエスト)";
                } else if (stageNameID.charAt(0) === "4"){
                    stageTypePrint = " (ボスチャレンジ)";
                } else if (stageNameID.charAt(0) === "5"){
                    stageTypePrint = " (ダンジョンディフェンス)";
                } else if (stageNameID.charAt(0) === "7"){
                    stageTypePrint = subStoryNameJP[stageNameID.slice(1,4)]
                } else {
                    stageTypePrint = ""
                }
                let tempObjectDrop = {
                    "stagename": stageNamePrint+stageTypePrint,
                    "dropcount": count,
                    "dropprob": probability,
                    "efficiency": efficiency
                };
                if (unlock){
                    toSortAvailable.push(tempObjectDrop);
                } else {
                    toSortUnavailable.push(tempObjectDrop);
                }
            }
        }
        indexDrop++;
    }
    toSortAvailable.sort(function(x,y){
        return x.efficiency - y.efficiency
    })
    toSortUnavailable.sort(function(x,y){
        return x.efficiency - y.efficiency
    })
    console.log(toSortAvailable)
    console.log(toSortUnavailable)
    if (typeof dropNamepage === 'undefined'){
        var dropNamepage = "まだ獲得できません"
    }
    document.getElementById("drop-item-name").innerHTML = dropNamepage
    try {
        document.getElementById("drop-best-stage").innerHTML = "最も効率の良いステージ：<br>" + toSortAvailable[0].stagename
    } catch {
        document.getElementById("drop-best-stage").innerHTML = "開放中ステージがありません"
    }
    var tableA = document.getElementById("drop-available")
    for(let a of toSortAvailable){
        tableA.insertRow();
        for(let cell of Object.values(a)){
            let newCell = tableA.rows[tableA.rows.length - 1].insertCell();
            newCell.textContent = cell
        }
    }
    var tableU = document.getElementById("drop-unavailable")
    for(let u of toSortUnavailable){
        tableU.insertRow();
        for(let cell of Object.values(u)){
            let newCell = tableU.rows[tableU.rows.length - 1].insertCell();
            newCell.textContent = cell
        }
    }
}