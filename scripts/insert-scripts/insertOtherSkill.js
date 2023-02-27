document.write(`
<style>
#flex-container-otherSkill-buff {
    display: flex;
    flex-wrap: wrap;
}
#flex-container-otherSkill-buff br{
    display: block;
    content: "";
    margin-top: 0;
}
.flex-container-otherSkill-buff-inner{
    width:150px;
    height:100px;
    background-color:#ff788c;
    margin:5px;
    display:flex;
}
.flex-container-otherSkill-buff-inner2{
    display:flex;
    flex-direction:column;
    flex:1;
    text-align:center;
}
.otherSkill-buff-img{
    height: 75px;
    flex:3;
}
.otherSkill-buff-name{
    text-align:center;
    font-size:0.65em;
    flex:1;
}
.otherSkill-buff-label{
    font-size:0.8em;
    flex:1;
}
.otherSkill-check{
    margin:auto;
    flex:1;
}
</style>
<button type="button" class="collapsible-button">味方スキル（クリックで開く）</button>
<div class="collapsible-content" style="display:none;">
    <div id="flex-container-otherSkill-buff">
        <div class="flex-container-otherSkill-buff-inner">
            <div class="flex-container-otherSkill-buff-inner2">
                <img src="../../img/chara-icons/icon_10103_0_s.png" class="otherSkill-buff-img">
                <span class="otherSkill-buff-name">メアルス</span>
            </div>
            <div class="flex-container-otherSkill-buff-inner2">
                <span class="otherSkill-buff-label">発動</span>
                <input type="checkbox" id="otherSkill10103" class="larger-check otherSkill-check" onChange="allDPS();">
                <span class="otherSkill-buff-label">スキルLv</span>
                <input id="level10103" class="otherSkill-level" type="number" min="1" max="5" value="1" style="width:70%;height:20%;margin:2px auto;border:none;" onChange="allDPS();">
            </div>
        </div>
    </div>
</div>
<script>
let otherSkillchecks = document.getElementsByClassName("otherSkill-check")
for (let i=0;i<otherSkillchecks.length;i++){
    if (otherSkillchecks[i].id == "otherSkill"+charID.toString()){
        otherSkillchecks[i].disabled = true;
        otherSkillchecks[i].checked = false;
    } else {}
}
let otherSkilllevels = document.getElementsByClassName("otherSkill-level")
for (let i=0;i<otherSkilllevels.length;i++){
    if (otherSkilllevels[i].id == "level"+charID.toString()){
        otherSkilllevels[i].disabled = true;
    } else {}
}
</script>


`);