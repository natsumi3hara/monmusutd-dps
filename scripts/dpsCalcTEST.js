function testLevelCC(){
    let level = Number(document.getElementById("input-level").value);
    let cc = Number(document.getElementById("input-cc").value);
    if (level === "" || cc === ""){
        window.alert("レベルまたはクラスチェンジが空白");
        document.getElementById("input-level").value = 1;
        document.getElementById("input-cc").value = 0;
    } else if (level > 120 || level < 1) {
        window.alert("レベル：最低値1、最大値120");
        document.getElementById("input-level").value = 1;
    } else if (cc > 3 || cc < 0) {
        window.alert("クラスチェンジ：最低値0、最大値3");
        document.getElementById("input-cc").value = 0;
    } else if (!(Number.isInteger(level))){
        window.alert("レベル：整数を入力してください");
        document.getElementById("input-level").value = 1
    } else if (!(Number.isInteger(cc))){
        window.alert("クラスチェンジ：整数を入力してください");
        document.getElementById("input-cc").value = 0
    }
}

function equipImageChange(){
    let cc = Number(document.getElementById("input-cc").value) + 1;
    let weapon = document.getElementById("equipweapon")
    let head = document.getElementById("equiphead")
    let body = document.getElementById("equipbody")
    let accessory = document.getElementById("equipaccessory")
    let weaponabbr = document.getElementById("equipweaponabbr")
    let headabbr = document.getElementById("equipheadabbr")
    let bodyabbr = document.getElementById("equipbodyabbr")
    let accessoryabbr = document.getElementById("equipaccessoryabbr")
    weapon.src = "../../img/equipment-icons/"+equipConvert[baseClass.toString()][0]+cc.toString()+".png"
    head.src = "../../img/equipment-icons/"+equipConvert[baseClass.toString()][1]+cc.toString()+".png"
    body.src = "../../img/equipment-icons/"+equipConvert[baseClass.toString()][2]+cc.toString()+".png"
    accessory.src = "../../img/equipment-icons/"+equipConvert[baseClass.toString()][3]+cc.toString()+".png"
    weaponabbr.title = equipAbbr[(baseClass+cc-1).toString()][0]
    headabbr.title = equipAbbr[(baseClass+cc-1).toString()][1]
    bodyabbr.title = equipAbbr[(baseClass+cc-1).toString()][2]
    accessoryabbr.title = equipAbbr[(baseClass+cc-1).toString()][3]
}

function allDPS(){
    testLevelCC()
    var level = Number(document.getElementById("input-level").value)
    var cc = Number(document.getElementById("input-cc").value)
    
    calculateStat(level,cc,"HP");
    calculateStat(level,cc,"Atk");
    calculateStat(level,cc,"pDef");
    calculateStat(level,cc,"mDef");
    calculateStat(level,cc,"aSpd");
    calculateStat(level,cc,"PAD");
    calculateStat(level,cc,"Range");
    calculateStat(level,cc,"Block");

}

function calculateStat(level,cc,type){
    if (level < 31) {
        var a = 0;
    } else if (level > 30 && level < 61){
        var a = 1;
    } else if (level > 60 && level < 91){
        var a = 2;
    } else {
        var a = 3;
    }
    if (level == 30 || level == 60 || level == 90 || level == 120) {
        var b = 30;
    } else {
        var b = level % 30;
    }
    try {
        var x = formula[type][0] - formula[type][1];
        for (let i = 1; i < 1+a+1; i++){
            if (i == a+1){
                x += formula[type][i] * b;
            } else {
                x += formula[type][i] * 30;
            }
        }
        for (let i = 5; i < 5+cc; i++){
            x += formula[type][i];
        }
    } catch(err){}
    //RAW STAT//
    if (type == "aSpd" || type == "PAD" || type == "Range"|| type == "Block"){
        var rawStat = Math.floor(char["CC"+cc+type])
    } else {
        var rawStat = Math.floor(char[type] * x);
    }
    //RAW STAT//
    for (let i = 3; i < 6; i++){
        if (document.getElementById("talent"+i.toString()+"check").checked) {
            if (talentIdentifier(document.getElementById("talent"+i.toString()).innerHTML) == type) {
                //TALENT STAT//
                rawStat += Number(document.getElementById("talent"+i.toString()).innerHTML.split("+")[1]);
                //TALENT STAT//
            } else {}
        } else {}
    }
    //console.log(type+":"+rawStat)
    
    //console.log(remainHP);
    let RateBuff1 = [0];
    let AddBuff1 = [0];
    let RateBuff2 = [0];
    let AddBuff2 = [0];
    var subskillID_1 = getAttachID("subskill1");
    var subskillID_2 = getAttachID("subskill2");
    if (subskillID_1 == -1 || subskillID_2 == -1){
        //console.log("Either subskill is 'None'")
        if (subskillID_1 == -1 && subskillID_2 != -1) {
            //subskill 2 is active
            let attachTalentList = attachData.table[subskillID_2].talentList;
            RateBuff1.push(extractAttachTalent(attachTalentList,type,23)[0])
            AddBuff1.push(extractAttachTalent(attachTalentList,type,23)[1])
            RateBuff2.push(extractAttachTalent(attachTalentList,type,1)[0])
            AddBuff2.push(extractAttachTalent(attachTalentList,type,1)[1])
        } else if (subskillID_1 != -1 && subskillID_2 == -1) {
            //subskill 1 is active
            let attachTalentList = attachData.table[subskillID_1].talentList;
            RateBuff1.push(extractAttachTalent(attachTalentList,type,23)[0])
            AddBuff1.push(extractAttachTalent(attachTalentList,type,23)[1])
            RateBuff2.push(extractAttachTalent(attachTalentList,type,1)[0])
            AddBuff2.push(extractAttachTalent(attachTalentList,type,1)[1])
        } else {
            //no subskill is active
        }
    } else if (attachData.table[subskillID_1].name.split(" ")[0] == attachData.table[subskillID_2].name.split(" ")[0]){
        //console.log("Same kind of subskill")
        if (subskillID_1 >= subskillID_2){
            let attachTalentList = attachData.table[subskillID_1].talentList;
            RateBuff1.push(extractAttachTalent(attachTalentList,type,23)[0])
            AddBuff1.push(extractAttachTalent(attachTalentList,type,23)[1])
            RateBuff2.push(extractAttachTalent(attachTalentList,type,1)[0])
            AddBuff2.push(extractAttachTalent(attachTalentList,type,1)[1])
        } else {
            let attachTalentList = attachData.table[subskillID_2].talentList;
            RateBuff1.push(extractAttachTalent(attachTalentList,type,23)[0])
            AddBuff1.push(extractAttachTalent(attachTalentList,type,23)[1])
            RateBuff2.push(extractAttachTalent(attachTalentList,type,1)[0])
            AddBuff2.push(extractAttachTalent(attachTalentList,type,1)[1])
        }
    } else {
        //console.log("Different kind of subskill")
        let attachTalentList = attachData.table[subskillID_1].talentList;
        let tempSubskill1 = extractAttachTalent(attachTalentList,type,23)
        let tempSubskill2 = extractAttachTalent(attachTalentList,type,1)
        attachTalentList = attachData.table[subskillID_2].talentList;
        RateBuff1.push(extractAttachTalent(attachTalentList,type,23)[0]+tempSubskill1[0])
        AddBuff1.push(extractAttachTalent(attachTalentList,type,23)[1]+tempSubskill1[1])
        RateBuff2.push(extractAttachTalent(attachTalentList,type,1)[0]+tempSubskill2[0])
        AddBuff2.push(extractAttachTalent(attachTalentList,type,1)[1]+tempSubskill2[1])
    }
    //↓ATTACH AND SELF-BUFF STAT↓//
    RateBuff1.push(selfBuff[type][0])
    AddBuff1.push(selfBuff[type][1])
    let RateBuff1Mult = RateBuff1.reduce((acc,curr)=>(acc)*(1+curr/100),1);
    let AddBuff1Mult = AddBuff1.reduce((acc,curr)=>acc+curr);
    console.log(type+"Rate1:",RateBuff1Mult,type+"Add1:",AddBuff1Mult);
    rawStat = Math.floor(rawStat * RateBuff1Mult + AddBuff1Mult);
    //↑ATTACH AND SELF-BUFF STAT↑//
    //EQUIPMENT STAT//
    rawStat += equipValues("1",type,cc) + equipValues("2",type,cc) + equipValues("3",type,cc) + equipValues("4",type,cc);
    //PARTY+DIVINE STAT//
    //console.log(rawStat);
    rawStat = Math.floor(rawStat * partyValues(type));
    rawStat = Math.floor(rawStat + divineAdd(type));
    var upperStat = Math.floor(rawStat * 10);
    var lowerStat = Math.floor(rawStat * 0.5);
    //For display//
    document.getElementById("dps-output-menu-value-"+type).innerHTML = rawStat;
    //END OF BASE STATS//
    //START OF BATTLE STATS//
    //ATTRIBUTE TILE//
    if (document.getElementById("shared20001").checked){
        if (type === "Atk"||type === "pDef"||type === "mDef"){
            RateBuff2.push(15*attrEffect);
        } else if (type === "Range"){
            RateBuff2.push(10*attrEffect);
        } else {}
    }
    //TACTICS GUARD//
    if (type === "pDef"){
        RateBuff2.push(Number(document.getElementById("shared20003").value)*4);
    }
    //ATKUP WHILE MOVE (1090)//
    if (type === "Atk"){
        if (Number(document.getElementById("subskill1").value) === 1090 || Number(document.getElementById("subskill2").value === 1090)){
            if (document.getElementById("shared20004").checked){
                RateBuff2.push(100);
            } else {}
        } else {}
    } else {}
    //Other allies' skills (Mearus)//
    RateBuff2.push(allAlliesSkillRate(type));
    //Extra Buffs (no Block input)//
    try {
        RateBuff2.push(Number(document.getElementById("extra-"+type+"-1").value));
        AddBuff2.push(Number(document.getElementById("extra-"+type+"-2").value));
    } catch (err) {}
    //Supporter Buffs (no HP, aSpd, PAD, Block input)//
    try {
        AddBuff2.push(Number(document.getElementById("supporter-buff-value-"+type).value));
    } catch (err) {}
    //Chara-specific Buffs//
    console.log("Hi");
    console.log(charaSpecificSkillRates(type));
    console.log(charaSpecificSkillAdds(type));
    RateBuff2.push(charaSpecificSkillRates(type));
    AddBuff2.push(charaSpecificSkillAdds(type));
    //---------------------------------//
    //Now RateBuff2 is WITHOUT EX skill//
    //---------------------------------//
    let RateBuff2Mult = RateBuff2.reduce((acc,curr)=>(acc)+(curr/100),1);
    let AddBuff2Mult = AddBuff2.reduce((acc,curr)=>acc+curr);
    console.log(type+"Rate2:",RateBuff2Mult,type+"Add2:",AddBuff2Mult);
    let battleStat = Math.floor(rawStat * RateBuff2Mult + AddBuff2Mult);
    if (battleStat < lowerStat){
        battleStat = lowerStat
    } else if (battleStat > upperStat){
        battleStat = upperStat
    } else {}
    document.getElementById("dps-output-battle-value-"+type).innerHTML = battleStat
    //EX Skill//
    let skillaltnumber = Number(document.getElementById("skill-alt-select").value);
    let skilllevelnumber = Number(document.getElementById("skill-level-select").value);
    getOwnSkillRates(type)

    
}
function getOwnSkillRates(type){
    let totalOwnSkillRate = 0;
    console.log(skillaltnumber);
}


function charaSpecificSkillRates(type){
    let totalSpecificRate = 0;
    let CSnumber = document.getElementsByClassName("chara-specific-"+charID.toString()).length;
    for (let i=1;i<(CSnumber+1);i++){
        let charaSpecificIndex = document.getElementById("charaSpecific"+charID.toString()+"-"+i.toString()).value;
        if (charAwaked){
            try {
                let CSList = charaSpecificRef["charaSpecific"+charID.toString()+"-"+i.toString()+"a"][type];
                if (typeof CSList[0] === "number"){
                    if (charaSpecificIndex > CSList.length){
                        totalSpecificRate += CSList[CSList.length-1];
                    } else {
                        totalSpecificRate += CSList[charaSpecificIndex];
                    }
                } else {} //else is not Rate
            } catch (err) {}
        } else {
            try {
                let CSList = charaSpecificRef["charaSpecific"+charID.toString()+"-"+i.toString()][type];
                if (typeof CSList[0] === "number"){
                    if (charaSpecificIndex > CSList.length){
                        totalSpecificRate += CSList[CSList.length-1];
                    } else {
                        totalSpecificRate += CSList[charaSpecificIndex];
                    }
                } else {} //else is not Rate
            } catch (err) {}
        }
    }
    return totalSpecificRate;
}
function charaSpecificSkillAdds(type){
    let totalSpecificAdd = 0;
    let CSnumber = document.getElementsByClassName("chara-specific-"+charID.toString()).length;
    for (let i=1;i<(CSnumber+1);i++){
        let charaSpecificIndex = document.getElementById("charaSpecific"+charID.toString()+"-"+i.toString()).value;
        if (charAwaked){
            try {
                let CSList = charaSpecificRef["charaSpecific"+charID.toString()+"-"+i.toString()+"a"][type];
                if (typeof CSList[0] === "string"){
                    if (charaSpecificIndex > CSList.length){
                        totalSpecificAdd += Number(CSList[CSList.length-1].split("a")[1]);
                    } else {
                        totalSpecificAdd += Number(CSList[charaSpecificIndex].split("a")[1]);
                    }
                } else {} //else is not Add
            } catch (err) {}
        } else {
            try {
                let CSList = charaSpecificRef["charaSpecific"+charID.toString()+"-"+i.toString()][type];
                if (typeof CSList[0] === "string"){
                    if (charaSpecificIndex > CSList.length){
                        totalSpecificAdd += Number(CSList[CSList.length-1].split("a")[1]);
                    } else {
                        totalSpecificAdd += Number(CSList[charaSpecificIndex].split("a")[1]);
                    }
                } else {} //else is not Add
            } catch (err) {}
        }
    }
    return totalSpecificAdd;
}
function allAlliesSkillRate(type){
    let totalAllAlliesSkill = 0
    for (i=0;i<otherSkillchecks.length;i++){
        let otherSkillCB = otherSkillchecks[i];
        let otherSkillLV = Number(document.getElementById("level"+otherSkillCB.id.split("otherSkill")[1]).value);
        if (otherSkillCB.checked){
            if (partybuffref[otherSkillCB.id].cond.length == 0){
                try {
                    totalAllAlliesSkill += Number(partybuffref[otherSkillCB.id][type][otherSkillLV-1]);
                    break
                } catch (err) {//console.log("No buff")
                }
            } else if (partybuffref[otherSkillCB.id].cond.includes(char["attribute"])||partybuffref[otherSkillCB.id].cond.includes(baseClass)){
                try {
                    totalAllAlliesSkill += Number(partybuffref[otherSkillCB.id][type][otherSkillLV-1]);
                    break
                } catch (err) {//console.log("No buff")
                    totalAllAlliesSkill += 0;
                }
            } else {//console.log("cond not met")
            }
        } else {//console.log("not checked")
        }
    }
    return totalAllAlliesSkill;
}

function divineAdd(type){
    let totalDivineAddBuff = 0
    for (i=0;i<divinechecks.length;i++){
        let divineCB = divinechecks[i];
        let divineLV = Number(document.getElementById("level"+divineCB.id.split("divine")[1]).value);
        //console.log(partybuffref[divineCB.id].cond)
        if (divineCB.checked){
            if (partybuffref[divineCB.id].cond.length == 0){
                try {
                    console.log(typeof partybuffref[divineCB.id][type][divineLV-1])
                    totalDivineAddBuff += Number(partybuffref[divineCB.id][type][divineLV-1].split("a")[1]);
                    break
                } catch (err) {//console.log("No buff")
                }
            }
            else if (partybuffref[divineCB.id].cond.includes(char["attribute"])||partybuffref[divineCB.id].cond.includes(baseClass)){
                try {
                    if (typeof partybuffref[divineCB.id][type][divineLV-1] == "string");
                    console.log("String");
                    totalDivineAddBuff += Number(partybuffref[divineCB.id][type][divineLV-1].split("a")[1]);
                    break
                } catch (err) {//console.log("No buff")
                    totalDivineAddBuff += 0;
                }
            } else {//console.log("Error 3")
            }
        } else {}
    }
    console.log(type+"-dAddBuff:",totalDivineAddBuff);
    return totalDivineAddBuff;
}

function partyValues(type){
    let totalPartyBuff = 0;
    for (i=0;i<partychecks.length;i++){
        if (partychecks[i].checked){
            if (partybuffref[partychecks[i].id].cond.length == 0){
                try {
                    totalPartyBuff += partybuffref[partychecks[i].id][type][0];
                } catch (err) {}
            }
            else if (partybuffref[partychecks[i].id].cond.includes(char["attribute"])||partybuffref[partychecks[i].id].cond.includes(baseClass)){
                try {
                    totalPartyBuff += partybuffref[partychecks[i].id][type][0];
                } catch (err) {}
            }
        }
    }
    totalPartyBuff = totalPartyBuff/100 + 1
    //console.log(type+"-pBuff:",totalPartyBuff)
    for (i=0;i<divinechecks.length;i++){
        let divineCB = divinechecks[i];
        let divineLV = Number(document.getElementById("level"+divineCB.id.split("divine")[1]).value);
        //console.log(partybuffref[divineCB.id].cond)
        if (divineCB.checked){
            if (partybuffref[divineCB.id].cond.length == 0){
                try {
                    totalPartyBuff *= (partybuffref[divineCB.id][type][divineLV-1]/100 + 1);
                    break
                } catch (err) {//console.log("No buff")
                }
            }
            else if (partybuffref[divineCB.id].cond.includes(char["attribute"])||partybuffref[divineCB.id].cond.includes(baseClass)){
                try {
                    //console.log(partybuffref[divineCB.id][type][divineLV-1])
                    if (typeof partybuffref[divineCB.id][type][divineLV-1] == "number"){
                    totalPartyBuff *= (partybuffref[divineCB.id][type][divineLV-1]/100 + 1);
                    break
                    } else {}
                } catch (err) {//console.log("No buff")
                    totalPartyBuff *= 1
                }
            } else {//console.log("Error 3")
            }
        } else {}
    }
    console.log(type+"-pdBuff:",totalPartyBuff)
    return totalPartyBuff
}

function equipValues(equipnumber,type,cc){
    let value;
    if (document.getElementById("equip"+equipnumber).checked){
        value = equip[cc][Number(equipnumber)-1][type];
    } else {value = 0}
    return value;
}

function extractAttachTalent(list,type,time){
    let attachTalentRate = 0;
    let attachTalentActual = 0;
    let attachTalentFixed = -1;
    if (type == "HP"){
        for (i = 0;i<list.length;i++){
            attachTalentRate += talentParseParamOnly(list,1,time)
            attachTalentRate -= talentParseParamOnly(list,2,time)
            attachTalentActual += talentParseParamOnly(list,3,time)
            attachTalentActual -= talentParseParamOnly(list,4,time)
            attachTalentFixed = talentParseParamOnly(list,5,time)
            }
    } else if (type == "Atk"){
        for (i = 0;i<list.length;i++){
            attachTalentRate += talentParseParamOnly(list,6,time)
            attachTalentRate -= talentParseParamOnly(list,7,time)
            attachTalentActual += talentParseParamOnly(list,8,time)
            attachTalentActual -= talentParseParamOnly(list,9,time)
            attachTalentFixed = talentParseParamOnly(list,10,time)
            }
    } else if (type == "pDef"){
        for (i = 0;i<list.length;i++){
            attachTalentRate += talentParseParamOnly(list,11,time)
            attachTalentRate -= talentParseParamOnly(list,12,time)
            attachTalentActual += talentParseParamOnly(list,13,time)
            attachTalentActual -= talentParseParamOnly(list,14,time)
            attachTalentFixed = talentParseParamOnly(list,15,time)
            }
    } else if (type == "mDef"){
        for (i = 0;i<list.length;i++){
            attachTalentRate += talentParseParamOnly(list,16,time)
            attachTalentRate -= talentParseParamOnly(list,17,time)
            attachTalentActual += talentParseParamOnly(list,18,time)
            attachTalentActual -= talentParseParamOnly(list,19,time)
            attachTalentFixed = talentParseParamOnly(list,20,time)
            }
    } else if (type == "aSpd"){
        for (i = 0;i<list.length;i++){
            attachTalentRate += talentParseParamOnly(list,26,time)
            attachTalentRate -= talentParseParamOnly(list,27,time)
            attachTalentActual += talentParseParamOnly(list,28,time)
            attachTalentActual -= talentParseParamOnly(list,29,time)
            attachTalentFixed = talentParseParamOnly(list,30,time)
            }
    } else if (type == "PAD"){
        for (i = 0;i<list.length;i++){
            attachTalentRate += talentParseParamOnly(list,31,time)
            attachTalentRate -= talentParseParamOnly(list,32,time)
            attachTalentActual += talentParseParamOnly(list,33,time)
            attachTalentActual -= talentParseParamOnly(list,34,time)
            attachTalentFixed = talentParseParamOnly(list,35,time)
            }
    } else if (type == "Range"){
        for (i = 0;i<list.length;i++){
            attachTalentRate += talentParseParamOnly(list,36,time)
            attachTalentRate -= talentParseParamOnly(list,37,time)
            attachTalentActual += talentParseParamOnly(list,38,time)
            attachTalentActual -= talentParseParamOnly(list,39,time)
            attachTalentFixed = talentParseParamOnly(list,40,time)
            }
    }
    //console.log([attachTalentRate, attachTalentActual,attachTalentFixed])
    return [attachTalentRate, attachTalentActual,attachTalentFixed];
}
function talentParseParamOnly(list,bufftype,time) {
    let remainHP = Number(document.getElementById("shared20002").value);
    if (list[i].talentId == bufftype && list[i].timing == time){
        if (list[i].triggerData.length == 0){
            if (list[i].activeData.length == 0){
                if (list[i].param[2] === undefined){//test for 底力//
                    return Number(list[i].param[0].num[0]);
                } else {
                    return (100-remainHP)/100 * Number(list[i].param[0].num[0]);
                }
            } else if (list[i].activeData[0].type == 1006) {
                if ((baseClass+1000).toString().slice(1,2) == list[i].activeData[0].num[0]){
                    return Number(list[i].param[0].num[0]);
                } else if (bufftype%5 == 0) {return -1;} else {return 0;}
            } else if (baseClass >= list[i].activeData[0].num[0] && baseClass <= list[i].activeData[1].num[0]){
                return Number(list[i].param[0].num[0])
            } else if (bufftype%5 == 0) {return -1;} else {return 0;}
        } else {
            //as of now only 疾風怒濤 has a base stat with triggerData, the rest are either bomb activation or damage up with trigger
            return 0;}
    } else if (bufftype%5 == 0) {return -1;} else {return 0;}
}

function talentIdentifier(talentText){
    if (talentText.slice(0,2) == "最大"){
        return "HP";
    } else if (talentText.slice(0,2) == "攻撃"){
        if (talentText.slice(0,3) == "攻撃力") {
            return "Atk";
        } else if (talentText.slice(0,3) == "攻撃速") {
            return "aSpd";
        }
    } else if (talentText.slice(0,2) == "物理"){
        return "pDef";
    } else if (talentText.slice(0,2) == "魔法"){
        return "mDef";
    } else if (talentText.slice(0,2) == "射程"){
        return "Range";
    } else {
        return
    }
}

function getAttachID(subskillSelectID){
    let requireCheck = [1040,1041,1042,1043,1044,1045,1090];
    let subskillSelect = Number(document.getElementById(subskillSelectID).value);
    let subskillIndex = attachData.table.findIndex(object => {return object.id === subskillSelect})
    if (requireCheck.includes(subskillSelect)){
        document.getElementById(subskillSelectID+"condcheck").innerHTML = "「条件」をチェック！";
    } else {
        document.getElementById(subskillSelectID+"condcheck").innerHTML = "";
    }
    return subskillIndex
}

function updateBlockCount(){
    let maxBC = document.getElementById("")
    let currentBC = document.getElementById("input-number-blocked").value;
    let BCList = document.getElementsByClassName("actualBlockCount");
    console.log(BCList);
    for (let i=0;i<BCList.length;i++){
        BCList[i].value = currentBC;
    }
}
function talenttext(){
    document.getElementById("talent3").innerHTML = char.awakeData["3"];
    document.getElementById("talent4").innerHTML = char.awakeData["4"];
    document.getElementById("talent5").innerHTML = char.awakeData["5"];
}
function skilltextreplace(){
    let skillaltnumber = "skillText"+document.getElementById("skill-alt-select").value;
    let skilllevelnumber = "lv"+document.getElementById("skill-level-select").value;
    document.getElementById("dps-output-menu-skill-text").innerHTML = char[skillaltnumber][skilllevelnumber].split("(Cooldown")[0];
    document.getElementById("dps-output-battle-skill-text").innerHTML = char[skillaltnumber][skilllevelnumber].split("(Cooldown")[0];
    document.getElementById("dps-output-skill-skill-text").innerHTML = char[skillaltnumber][skilllevelnumber].split("(Cooldown")[0];
}
function traittextreplace(){
    document.getElementById("dps-output-menu-trait-text").innerHTML =  char.traitText.replace("awaked","フル覚醒");
    document.getElementById("dps-output-battle-trait-text").innerHTML =  char.traitText.replace("awaked","フル覚醒");
    document.getElementById("dps-output-skill-trait-text").innerHTML =  char.traitText.replace("awaked","フル覚醒");
}
function divineOneOnly(divineid){
    for (i=0;i<divinechecks.length;i++){
        divinechecks[i].checked = false;
    }
    document.getElementById(divineid).checked = true;
}



window.addEventListener("load", talenttext);
window.addEventListener("load", traittextreplace);
window.addEventListener("load", skilltextreplace);
window.addEventListener("load",equipImageChange);
window.addEventListener("load",allDPS);







//super-long/repetitive code starts here
function attachOptions1() {
    let optionList = document.getElementById('subskill1').options;
    let attachOptions = [
        {value: 0, text: 'なし'},
        {value: 1001, text: 'HP強化 I'},
        {value: 1002, text: 'HP強化 II'},
        {value: 1003, text: 'HP強化 III'},
        {value: 1004, text: '攻撃力強化 I'},
        {value: 1005, text: '攻撃力強化 II'},
        {value: 1006, text: '攻撃力強化 III'},
        {value: 1007, text: '物理防御強化 I'},
        {value: 1008, text: '物理防御強化 II'},
        {value: 1009, text: '物理防御強化 III'},
        {value: 1010, text: '魔法防御強化 I'},
        {value: 1011, text: '魔法防御強化 II'},
        {value: 1012, text: '魔法防御強化 III'},
        {value: 1013, text: 'リジェネレーション I'},
        {value: 1014, text: 'リジェネレーション II'},
        {value: 1015, text: 'リジェネレーション III'},
        {value: 1016, text: '物理攻撃回避 I'},
        {value: 1017, text: '物理攻撃回避 II'},
        {value: 1018, text: '物理攻撃回避 III'},
        {value: 1019, text: '魔法攻撃回避 I'},
        {value: 1020, text: '魔法攻撃回避 II'},
        {value: 1021, text: '魔法攻撃回避 III'},
        {value: 1022, text: '移動速度上昇 I'},
        {value: 1023, text: '移動速度上昇 II'},
        {value: 1024, text: '移動速度上昇 III'},
        {value: 1025, text: 'クリティカル I'},
        {value: 1026, text: 'クリティカル II'},
        {value: 1027, text: 'クリティカル III'},
        {value: 1028, text: '再出撃時間短縮 I'},
        {value: 1029, text: '再出撃時間短縮 II'},
        {value: 1030, text: '再出撃時間短縮 III'},
        {value: 1031, text: '生命力吸収 I'},
        {value: 1032, text: '生命力吸収 II'},
        {value: 1033, text: '生命力吸収 III'},
        {value: 1034, text: '攻撃待機時間短縮 I'},
        {value: 1035, text: '攻撃待機時間短縮 II'},
        {value: 1036, text: '攻撃待機時間短縮 III'},
        {value: 1037, text: '貫通攻撃 I'},
        {value: 1038, text: '貫通攻撃 II'},
        {value: 1039, text: '貫通攻撃 III'},
        {value: 1040, text: '底力(攻撃) I'},
        {value: 1041, text: '底力(攻撃) II'},
        {value: 1042, text: '底力(攻撃) III'},
        {value: 1043, text: '底力(物理防御) I'},
        {value: 1044, text: '底力(物理防御) II'},
        {value: 1045, text: '底力(物理防御) III'},
        {value: 1046, text: '撤退時コスト回復 I'},
        {value: 1047, text: '撤退時コスト回復 II'},
        {value: 1048, text: '撤退時コスト回復 III'},
        {value: 1049, text: 'アイアンボディ'},
        {value: 1050, text: 'ファストチャージャー'},
        {value: 1051, text: 'オートパニッシャー'},
        //{value: 1052, text: 'エレメンタルブースト'},
        {value: 1053, text: 'フェニックスの加護'},
        {value: 1054, text: '騎士の心得'},
        {value: 1055, text: '霧を晴らす列車'},
        {value: 1056, text: '巨鎧騎士の討伐証'},
        {value: 1057, text: '攻撃+物理防御強化'},
        {value: 1058, text: '黄金岩晶の討伐証'},
        {value: 1059, text: 'フルハートハイビート'},
        {value: 1060, text: '双角王者の討伐証'},
        {value: 1061, text: '純白ヴェール'},
        {value: 1062, text: '冥途の置き土産'},
        {value: 1063, text: '捨て身の一撃'},
        {value: 1064, text: '攻撃+魔法防御強化'},
        {value: 1065, text: 'HP+物理防御強化'},
        {value: 1066, text: 'HP+魔法防御強化'},
        {value: 1067, text: '聖なる祈り'},
        {value: 1068, text: '物理防御+魔法防御強化'},
        {value: 1069, text: 'HP強化+出撃コスト減少'},
        {value: 1070, text: '竜騎士の討伐証'},
        {value: 1071, text: '結石竜の討伐証'},
        {value: 1072, text: 'スタートチャージャー'},
        {value: 1073, text: '魔導の心得'},
        {value: 1074, text: 'リミットブレイク'},
        {value: 1075, text: 'ゴブリンパーティ！'},
        {value: 1076, text: '高貴なる狩人'},
        {value: 1077, text: '魔導艦の討伐証'},
        {value: 1078, text: '攻撃強化+出撃コスト減少'},
        {value: 1079, text: '物理防御強化+物理攻撃回避'},
        {value: 1080, text: '古代艦の討伐証'},
        {value: 1081, text: '攻撃強化+リジェネレーション'},
        {value: 1082, text: '皇女の誇り'},
        {value: 1083, text: 'ぐねぐねスライムくん（緑）'},
        {value: 1084, text: 'タクティクスガード'},
        {value: 1085, text: '物理防御強化+出撃コスト減少'},
        {value: 1086, text: '常夏巨兵の討伐証'},
        {value: 1087, text: '攻撃強化+貫通攻撃'},
        {value: 1088, text: '生命力吸収+攻撃待機短縮'},
        {value: 1089, text: 'まったり充電寝正月'},
        {value: 1090, text: '疾風怒濤'},
        {value: 1091, text: '先手必勝！'},
        {value: 1092, text: 'ポイズンボム'},
        {value: 1093, text: 'HP強化+リジェネレーション'},
        {value: 1094, text: '物理攻撃+魔法攻撃回避'},];

attachOptions.forEach(option =>
  optionList.add(
    new Option(option.text, option.value, option.selected)
  )
);
}

function attachOptions2() {
    let optionList = document.getElementById('subskill2').options;
    let attachOptions = [
        {value: 0, text: 'なし'},
        {value: 1001, text: 'HP強化 I'},
        {value: 1002, text: 'HP強化 II'},
        {value: 1003, text: 'HP強化 III'},
        {value: 1004, text: '攻撃力強化 I'},
        {value: 1005, text: '攻撃力強化 II'},
        {value: 1006, text: '攻撃力強化 III'},
        {value: 1007, text: '物理防御強化 I'},
        {value: 1008, text: '物理防御強化 II'},
        {value: 1009, text: '物理防御強化 III'},
        {value: 1010, text: '魔法防御強化 I'},
        {value: 1011, text: '魔法防御強化 II'},
        {value: 1012, text: '魔法防御強化 III'},
        {value: 1013, text: 'リジェネレーション I'},
        {value: 1014, text: 'リジェネレーション II'},
        {value: 1015, text: 'リジェネレーション III'},
        {value: 1016, text: '物理攻撃回避 I'},
        {value: 1017, text: '物理攻撃回避 II'},
        {value: 1018, text: '物理攻撃回避 III'},
        {value: 1019, text: '魔法攻撃回避 I'},
        {value: 1020, text: '魔法攻撃回避 II'},
        {value: 1021, text: '魔法攻撃回避 III'},
        {value: 1022, text: '移動速度上昇 I'},
        {value: 1023, text: '移動速度上昇 II'},
        {value: 1024, text: '移動速度上昇 III'},
        {value: 1025, text: 'クリティカル I'},
        {value: 1026, text: 'クリティカル II'},
        {value: 1027, text: 'クリティカル III'},
        {value: 1028, text: '再出撃時間短縮 I'},
        {value: 1029, text: '再出撃時間短縮 II'},
        {value: 1030, text: '再出撃時間短縮 III'},
        {value: 1031, text: '生命力吸収 I'},
        {value: 1032, text: '生命力吸収 II'},
        {value: 1033, text: '生命力吸収 III'},
        {value: 1034, text: '攻撃待機時間短縮 I'},
        {value: 1035, text: '攻撃待機時間短縮 II'},
        {value: 1036, text: '攻撃待機時間短縮 III'},
        {value: 1037, text: '貫通攻撃 I'},
        {value: 1038, text: '貫通攻撃 II'},
        {value: 1039, text: '貫通攻撃 III'},
        {value: 1040, text: '底力(攻撃) I'},
        {value: 1041, text: '底力(攻撃) II'},
        {value: 1042, text: '底力(攻撃) III'},
        {value: 1043, text: '底力(物理防御) I'},
        {value: 1044, text: '底力(物理防御) II'},
        {value: 1045, text: '底力(物理防御) III'},
        {value: 1046, text: '撤退時コスト回復 I'},
        {value: 1047, text: '撤退時コスト回復 II'},
        {value: 1048, text: '撤退時コスト回復 III'},
        {value: 1049, text: 'アイアンボディ'},
        {value: 1050, text: 'ファストチャージャー'},
        {value: 1051, text: 'オートパニッシャー'},
        //{value: 1052, text: 'エレメンタルブースト'},
        {value: 1053, text: 'フェニックスの加護'},
        {value: 1054, text: '騎士の心得'},
        {value: 1055, text: '霧を晴らす列車'},
        {value: 1056, text: '巨鎧騎士の討伐証'},
        {value: 1057, text: '攻撃+物理防御強化'},
        {value: 1058, text: '黄金岩晶の討伐証'},
        {value: 1059, text: 'フルハートハイビート'},
        {value: 1060, text: '双角王者の討伐証'},
        {value: 1061, text: '純白ヴェール'},
        {value: 1062, text: '冥途の置き土産'},
        {value: 1063, text: '捨て身の一撃'},
        {value: 1064, text: '攻撃+魔法防御強化'},
        {value: 1065, text: 'HP+物理防御強化'},
        {value: 1066, text: 'HP+魔法防御強化'},
        {value: 1067, text: '聖なる祈り'},
        {value: 1068, text: '物理防御+魔法防御強化'},
        {value: 1069, text: 'HP強化+出撃コスト減少'},
        {value: 1070, text: '竜騎士の討伐証'},
        {value: 1071, text: '結石竜の討伐証'},
        {value: 1072, text: 'スタートチャージャー'},
        {value: 1073, text: '魔導の心得'},
        {value: 1074, text: 'リミットブレイク'},
        {value: 1075, text: 'ゴブリンパーティ！'},
        {value: 1076, text: '高貴なる狩人'},
        {value: 1077, text: '魔導艦の討伐証'},
        {value: 1078, text: '攻撃強化+出撃コスト減少'},
        {value: 1079, text: '物理防御強化+物理攻撃回避'},
        {value: 1080, text: '古代艦の討伐証'},
        {value: 1081, text: '攻撃強化+リジェネレーション'},
        {value: 1082, text: '皇女の誇り'},
        {value: 1083, text: 'ぐねぐねスライムくん（緑）'},
        {value: 1084, text: 'タクティクスガード'},
        {value: 1085, text: '物理防御強化+出撃コスト減少'},
        {value: 1086, text: '常夏巨兵の討伐証'},
        {value: 1087, text: '攻撃強化+貫通攻撃'},
        {value: 1088, text: '生命力吸収+攻撃待機短縮'},
        {value: 1089, text: 'まったり充電寝正月'},
        {value: 1090, text: '疾風怒濤'},
        {value: 1091, text: '先手必勝！'},
        {value: 1092, text: 'ポイズンボム'},
        {value: 1093, text: 'HP強化+リジェネレーション'},
        {value: 1094, text: '物理攻撃+魔法攻撃回避'},];
    
attachOptions.forEach(option =>
  optionList.add(
    new Option(option.text, option.value, option.selected)
  )
);
}
window.addEventListener("load", attachOptions1);
window.addEventListener("load", attachOptions2);