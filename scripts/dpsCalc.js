function calculateStats() {
    let level = document.getElementById("level-input").value;
    let cc = document.getElementById("cc-input").value;
    if (level == "" || cc == ""){
        window.alert("Both Level and CC fields must not be empty!");
    } else if (level > 120 || level < 1) {
        window.alert("Level must be an integer from 1 to 120!");
    } else if (cc > 3 || cc < 0) {
        window.alert("Class Change must be an integer from 0 to 3!");
    } else {
        calculateStat(level,cc,"HP");
        calculateStat(level,cc,"Atk");
        calculateStat(level,cc,"pDef");
        calculateStat(level,cc,"mDef");
        calculateStat(level,cc,"aSpd");
        calculateStat(level,cc,"PAD");
        calculateStat(level,cc,"Range");
    }
}

function calculateStat(level,cc,type){
    cc = Number(cc);
    level = Number(level);
    if (level < 31) {
        var a = 0;
    } else if (level > 30 && level < 61){
        var a = 1;
    } else if (level > 60 && level < 91){
        var a = 2;
    } else {
        var a = 3;
    }
    //console.log(a);
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
    if (type == "aSpd" || type == "PAD" || type == "Range"){
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

    var subskillID_1 = getAttachID("subskill1");
    var subskillID_2 = getAttachID("subskill2");
    let attachTable, attachTable1, attachTable2;
    if (subskillID_1 == -1 || subskillID_2 == -1){
        //console.log("Either subskill is 'None'")
        if (subskillID_1 == -1 && subskillID_2 != -1) {
            let attachTalentList = attachData.table[subskillID_2].talentList;
            attachTable = extractAttachTalent(attachTalentList,type,23)
        } else if (subskillID_1 != -1 && subskillID_2 == -1) {
            let attachTalentList = attachData.table[subskillID_1].talentList;
            attachTable = extractAttachTalent(attachTalentList,type,23)
        } else {
            attachTable = [0,0,-1]
        }
    } else if (attachData.table[subskillID_1].name.split(" ")[0] == attachData.table[subskillID_2].name.split(" ")[0]){
        //console.log("Same kind of subskill")
        if (subskillID_1 >= subskillID_2){
            let attachTalentList = attachData.table[subskillID_1].talentList;
            attachTable = extractAttachTalent(attachTalentList,type,23)
        } else {
            let attachTalentList = attachData.table[subskillID_2].talentList;
            attachTable = extractAttachTalent(attachTalentList,type,23)
        }
    } else {
        //console.log("Different kind of subskill")
        let attachTalentList = attachData.table[subskillID_1].talentList;
        attachTable1 = extractAttachTalent(attachTalentList,type,23);
        attachTalentList = attachData.table[subskillID_2].talentList;
        attachTable2 = extractAttachTalent(attachTalentList,type,23)
        attachTable = [attachTable1[0]+attachTable2[0],attachTable1[1]+attachTable2[1],-1]
    }

    //ATTACH AND SELF-BUFF STAT//
    let selfBuffvalue = 0
    selfBuffvalue = selfBuff[type][0]
    if (attachTable[2] != -1){
        rawStat = attachTable[2];
    } else {
        rawStat = Math.floor(rawStat * (100 + attachTable[0])/100 * (100 + selfBuffvalue)/100 + attachTable[1])
    }
    //ATTACH AND SELF-BUFF STAT//
    //EQUIPMENT STAT//
    rawStat += equipValues("1",type,cc) + equipValues("2",type,cc) + equipValues("3",type,cc) + equipValues("4",type,cc)
    //EQUIPMENT STAT//
    
    //For display//
    document.getElementById("dps-stat-value-"+type).innerHTML = rawStat;
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
    console.log([attachTalentRate, attachTalentActual,attachTalentFixed])
    return [attachTalentRate, attachTalentActual,attachTalentFixed]
}
function talentParseParamOnly(list,bufftype,time) {
    if (list[i].talentId == bufftype && list[i].timing == time){
        if (list[i].activeData.length == 0){
            return Number(list[i].param[0].num[0])
        } else if (list[i].activeData[0].type == 1006) {
            if ((baseClass+1000).toString().slice(1,2) == list[i].activeData[0].num[0]){
                return Number(list[i].param[0].num[0])
            } else if (bufftype%5 == 0) {return -1} else {return 0}
        } else if (baseClass >= list[i].activeData[0].num[0] && baseClass <= list[i].activeData[1].num[0]){
            return Number(list[i].param[0].num[0])
        } else if (bufftype%5 == 0) {return -1} else {return 0}
    } else if (bufftype%5 == 0) {return -1} else {return 0}
}

function talentIdentifier(talentText){
    if (talentText.slice(0,2) == "最大"){
        return "HP"
    } else if (talentText.slice(0,2) == "攻撃"){
        if (talentText.slice(0,3) == "攻撃力") {
            return "Atk"
        } else if (talentText.slice(0,3) == "攻撃速") {
            return "aSpd"
        }
    } else if (talentText.slice(0,2) == "物理"){
        return "pDef"
    } else if (talentText.slice(0,2) == "魔法"){
        return "mDef"

    } else if (talentText.slice(0,2) == "射程"){
        return "Range"
    } else {
        return
    }
}

function getAttachID(subskillSelectID){
    let subskillSelect = Number(document.getElementById(subskillSelectID).value)
    let subskillIndex = attachData.table.findIndex(object => {return object.id === subskillSelect})
    return subskillIndex
}

function talenttext(){
    document.getElementById("talent3").innerHTML = char.awakeData["3"]
    document.getElementById("talent4").innerHTML = char.awakeData["4"]
    document.getElementById("talent5").innerHTML = char.awakeData["5"]
}

function skilltext(){
    let skillaltnumber = "skillText"+document.getElementById("skill-alt-select").value
    //console.log(skillaltnumber)
    let skilllevelnumber = "lv"+document.getElementById("skill-level-select").value
    //console.log(skilllevelnumber)
    document.getElementById("skill-text").innerHTML = char[skillaltnumber][skilllevelnumber].split("(Cooldown")[0]
}

window.addEventListener("load", talenttext);
window.addEventListener("load", skilltext);







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
        {value: 1052, text: 'エレメンタルブースト'},
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
        {value: 1073, text: 'ハンティングアイ'},
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
        {value: 1087, text: '攻撃強化+貫通攻撃'},];

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
        {value: 1052, text: 'エレメンタルブースト'},
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
        {value: 1073, text: 'ハンティングアイ'},
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
        {value: 1087, text: '攻撃強化+貫通攻撃'}
    ];
    
attachOptions.forEach(option =>
  optionList.add(
    new Option(option.text, option.value, option.selected)
  )
);
}
window.addEventListener("load", attachOptions1);
window.addEventListener("load", attachOptions2);