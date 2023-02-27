document.write(`
<style>
#flex-container-otherPassive-buff {
    display: flex;
    flex-wrap: wrap;
}
#flex-container-otherPassive-buff br{
    display: block;
    content: "";
    margin-top: 0;
}
.flex-container-otherPassive-buff-inner{
    width:150px;
    height:100px;
    background-color:#ff788c;
    margin:5px;
    display:flex;
}
.flex-container-otherPassive-buff-inner2{
    display:flex;
    flex-direction:column;
    flex:1;
    text-align:center;
}
.otherPassive-buff-img{
    height: 75px;
    flex:3;
}
.otherPassive-buff-name{
    text-align:center;
    font-size:0.65em;
    flex:1;
}
.otherPassive-buff-label{
    font-size:0.8em;
    flex:1;
}
.otherPassive-check{
    margin:auto;
    flex:1;
}
</style>
<button type="button" class="collapsible-button">味方パッシブ（クリックで開く）</button>
<div class="collapsible-content" style="display:none;">
    <div id="flex-container-otherPassive-buff">
        <div class="flex-container-otherPassive-buff-inner">
            <div class="flex-container-otherPassive-buff-inner2">
                <img src="../../img/chara-icons/icon_10067_0_s.png" class="otherPassive-buff-img">
                <span class="otherPassive-buff-name">ディリオ</span>
            </div>
            <div class="flex-container-otherPassive-buff-inner2">
                <span class="otherPassive-buff-label">編集</span>
                <input type="checkbox" id="otherPassive10067" class="larger-check otherPassive-check">
                <span class="otherPassive-buff-label">完凸</span>
                <input type="checkbox" id="awake10067" class="larger-check otherPassive-check">
            </div>
        </div>
    </div>
</div>
<script>
let otherPassivechecks = document.getElementsByClassName("otherPassive-check")
for (let i=0;i<otherPassivechecks.length;i++){
    if (otherPassivechecks[i].id == "otherPassive"+charID.toString()){
        otherPassivechecks[i].disabled = true;
        otherPassivechecks[i].checked = true;
    } else {}
    if (otherPassivechecks[i].id == "awake"+charID.toString() && charAwaked){
        otherPassivechecks[i].disabled = true;
        otherPassivechecks[i].checked = true;
    } else if (otherPassivechecks[i].id == "awake"+charID.toString()){
        otherPassivechecks[i].disabled = true;
    } else {}
}
</script>


`);