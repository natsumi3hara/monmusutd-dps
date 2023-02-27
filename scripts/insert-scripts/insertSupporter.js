document.write(`
<style>
#flex-container-supporter-buff {
    display: flex;
    flex-wrap: wrap;
}
#flex-container-supporter-buff br{
    display: block;
    content: "";
    margin-top: 0;
}
.flex-container-supporter-buff-inner{
    width:150px;
    height:100px;
    background-color:#ff788c;
    margin:5px;
    display:flex;
}
.flex-container-supporter-buff-inner2{
    display:flex;
    flex-direction:column;
    flex:1;
    text-align:center;
}
.supporter-buff-img{
    height: 75px;
    flex:3;
}
.supporter-buff-name{
    text-align:center;
    font-size:0.65em;
    flex:1;
}
.supporter-buff-label{
    font-size:0.8em;
    margin:auto;
    vertical-align:middle;
    flex:1;
}
.supporter-check{
    margin:auto;
    flex:1;
}
.supporter-value-input{
    margin:auto;
    font-size:0.8em;
    flex:1;
}
</style>
<button type="button" class="collapsible-button">サポーター（クリックで開く）</button>
<div class="collapsible-content" style="display:none;">
    <div id="flex-container-supporter-buff">
        <div class="flex-container-supporter-buff-inner">
            <div class="flex-container-supporter-buff-inner2">
                <img src="../../img/ui-icons/Icon_Job_17011.png" class="supporter-buff-img">
                <span class="supporter-buff-name">攻撃力</span>
            </div>
            <div class="flex-container-supporter-buff-inner2">
                <span class="supporter-buff-label"></span>
                <span class="supporter-buff-label">合計</span>
                <input id="supporter-buff-value-Atk" class="supporter-value-input" type="number" min="0" max="9999" value="0" style="width:70%;height:20%;margin:2px auto;border:none;font-size:0.75em;">
                <span class="supporter-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-supporter-buff-inner">
            <div class="flex-container-supporter-buff-inner2">
                <img src="../../img/ui-icons/Icon_Job_17011.png" class="supporter-buff-img">
                <span class="supporter-buff-name">物理防御</span>
            </div>
            <div class="flex-container-supporter-buff-inner2">
                <span class="supporter-buff-label"></span>
                <span class="supporter-buff-label">合計</span>
                <input id="supporter-buff-value-pDef" class="supporter-value-input" type="number" min="0" max="9999" value="0" style="width:70%;height:20%;margin:2px auto;border:none;">
                <span class="supporter-buff-label"></span>
            </div>
        </div>
        <div class="flex-container-supporter-buff-inner">
            <div class="flex-container-supporter-buff-inner2">
                <img src="../../img/ui-icons/Icon_Job_17011.png" class="supporter-buff-img">
                <span class="supporter-buff-name">魔法防御</span>
            </div>
            <div class="flex-container-supporter-buff-inner2">
                <span class="supporter-buff-label"></span>
                <span class="supporter-buff-label">合計</span>
                <input id="supporter-buff-value-mDef" class="supporter-value-input" type="number" min="0" max="9999" value="0" style="width:70%;height:20%;margin:2px auto;border:none;">
                <span class="supporter-buff-label"></span>
            </div>
        </div>
    </div>
    <button type="button" class="collapsible-button">詳細</button>
    <div style="display:none;">
        <span style="font-size:16px;">シャーマン系</span><br>
        <span style="font-family: mtdfontlight;font-size:14px;">CC0: 攻撃力のみ、最大150</span><br>
        <span style="font-family: mtdfontlight;font-size:14px;">CC1: 攻撃力と物防、最大240</span><br>
        <span style="font-family: mtdfontlight;font-size:14px;">CC2: 攻撃力と物防と魔防、最大300</span><br>
        <span style="font-family: mtdfontlight;font-size:14px;">CC3: 攻撃力と物防と魔防、最大300</span><br>
        <span style="font-size:16px;">バード系</span><br>
        <span style="font-family: mtdfontlight;font-size:14px;">CC0: 攻撃力と物防と魔防+50</span><br>
        <span style="font-family: mtdfontlight;font-size:14px;">CC1: 攻撃力と物防と魔防+70、同属性の場合は+90</span><br>
        <span style="font-family: mtdfontlight;font-size:14px;">CC2: 攻撃力と物防と魔防+90、同属性の場合は+120</span><br>
        <span style="font-family: mtdfontlight;font-size:14px;">CC3: 攻撃力と物防と魔防+100、同属性の場合は+140</span><br>
    </div>
</div>
<script>
let supporterchecks = document.getElementsByClassName("supporter-check")
for (let i=0;i<supporterchecks.length;i++){
    if (supporterchecks[i].id == "supporter"+charID.toString()){
        supporterchecks[i].disabled = true;
        supporterchecks[i].checked = true;
    } else {}
    if (supporterchecks[i].id == "awake"+charID.toString() && charAwaked){
        supporterchecks[i].disabled = true;
        supporterchecks[i].checked = true;
    } else if (supporterchecks[i].id == "awake"+charID.toString()){
        supporterchecks[i].disabled = true;
    } else {}
}
</script>


`);