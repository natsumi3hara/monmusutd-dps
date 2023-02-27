document.write(`
<style>
#flex-container-extra-buff {
    display: flex;
    flex-wrap: wrap;
}
#flex-container-extra-buff br{
    display: block;
    content: "";
    margin-top: 0;
}
.flex-container-extra-buff-inner{
    width:150px;
    height:100px;
    background-color:#ff788c;
    margin:5px;
    display:flex;
}
.flex-container-extra-buff-inner2{
    display:flex;
    flex-direction:column;
    flex:1;
    text-align:center;
}
.extra-buff-img{
    height: 75px;
    width: 75px;
    flex:3;
}
.extra-buff-name{
    text-align:center;
    font-size:0.65em;
    flex:1;
}
.extra-buff-label{
    font-size:0.8em;
    flex:1;
}
.extra-check{
    margin:auto;
    flex:1;
}
.extra-level-input{
    border: none;
    max-height: 20%;
    margin:1px auto;
    width: 60px;
}


</style>
<button type="button" class="collapsible-button">その他バフ/デバフ（クリックで開く）</button>
<div class="collapsible-content" style="display:none;">
    <p style="margin:0px 1px;background-color:#ff788c;font-size:smaller; font-family:mtdfontlight;">(戦闘中に発動するバフ/デバフ)<br>ここの数字を<b>加算して</b>入力してください<br>(例1) +50%の乗算バフと-20%の乗算デバフが重なれば+30%になる<br>(例2) +20の加算バフと-60の加算デバフが重なれば-40になる</p>
    <div id="flex-container-extra-buff">
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">HP(乗算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-HP-1" type="number" min="-9999" max="9999" value="0" style="width:65%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;%</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">HP(加算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-HP-2" type="number" min="-9999" max="99999" value="0" style="width:70%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">攻撃(乗算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-Atk-1" type="number" min="-9999" max="9999" value="0" style="width:65%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;%</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">攻撃(加算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-Atk-2" type="number" min="-9999" max="9999" value="0" style="width:70%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">物防(乗算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-pDef-1" type="number" min="-9999" max="9999" value="0" style="width:65%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;%</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">物防(加算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-pDef-2" type="number" min="-9999" max="9999" value="0" style="width:70%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">魔防(乗算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-mDef-1" type="number" min="-9999" max="9999" value="0" style="width:65%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;%</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">魔防(加算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-mDef-2" type="number" min="-9999" max="9999" value="0" style="width:70%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">攻速(乗算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-aSpd-1" type="number" min="-9999" max="9999" value="0" style="width:65%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;%</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">攻速(加算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-aSpd-2" type="number" min="-9999" max="9999" value="0" style="width:70%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">射程(乗算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-Range-1" type="number" min="-9999" max="9999" value="0" style="width:65%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;%</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">射程(加算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-Range-2" type="number" min="-9999" max="9999" value="0" style="width:70%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">硬直(乗算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-PAD-1" type="number" min="-9999" max="9999" value="0" style="width:65%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;%</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-extra-buff-inner">
            <div class="flex-container-extra-buff-inner2">
                <img src="../../img/ui-icons/Home_BtnNumBase_Enh.png" class="extra-buff-img">
                <span class="extra-buff-name">硬直(加算)</span>
            </div>
            <div class="flex-container-extra-buff-inner2">
                <span class="extra-buff-label"></span>
                <span class="extra-buff-label">バフ/デバフ</span>
                <span class="extra-buff-label"><input id="extra-PAD-2" type="number" min="-9999" max="9999" value="0" style="width:70%;height:50%;margin:2px auto;border:none;font-size:0.85em;" onChange="allDPS();">&nbsp;</span>
                <span class="extra-buff-label"></span>
            </div>
        </div>
    </div>
</div>
<script>
let extrachecks = document.getElementsByClassName("extra-check")
for (let i=0;i<extrachecks.length;i++){
    if (extrachecks[i].id == "extra"+charID.toString()){
        extrachecks[i].disabled = true;
        extrachecks[i].checked = true;
    } else {}
    if (extrachecks[i].id == "awake"+charID.toString() && charAwaked){
        extrachecks[i].disabled = true;
        extrachecks[i].checked = true;
    } else if (extrachecks[i].id == "awake"+charID.toString()){
        extrachecks[i].disabled = true;
    } else {}
}
</script>


`);