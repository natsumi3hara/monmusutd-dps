document.write(`
<style>
#flex-container-charaSpecific-buff {
    display: flex;
    flex-wrap: wrap;
}
#flex-container-charaSpecific-buff br{
    display: block;
    content: "";
    margin-top: 0;
}
.flex-container-charaSpecific-buff-inner{
    width:225px;
    height:100px;
    background-color:#ff788c;
    margin:5px;
    display:flex;
}
.flex-container-charaSpecific-buff-inner2{
    display:flex;
    flex-direction:column;
    flex:1;
    text-align:center;
}
.charaSpecific-buff-img{
    height: 75px;
    flex:3;
}
.charaSpecific-buff-name{
    text-align:center;
    font-size:0.65em;
    flex:1;
}
.charaSpecific-buff-label{
    font-size:0.8em;
    flex:1;
}
.charaSpecific-check{
    margin:auto;
    flex:1;
}
.charaSpecific-level-input{
    border: none;
    max-height: 20%;
    margin:1px auto;
    width: 60px;
}

</style>
<button type="button" class="collapsible-button">キャラ個別（クリックで開く）</button>
<div class="collapsible-content" style="display:none;">
    <div id="flex-container-charaSpecific-buff">
        <div class="flex-container-charaSpecific-buff-inner chara-specific-10025">
            <div class="flex-container-charaSpecific-buff-inner2">
                <img src="../../img/chara-icons/icon_10025_0_s.png" class="charaSpecific-buff-img">
                <span class="charaSpecific-buff-name">攻撃アップ</span>
            </div>
            <div class="flex-container-charaSpecific-buff-inner2" style="flex:2;">
                <span class="charaSpecific-buff-label">編集</span>
                <input type="checkbox" id="charaSpecific10025" class="larger-check charaSpecific-check" onChange="allDPS();">
                <span class="charaSpecific-buff-label">レベル</span>
                <input id="level30000" type="number" min="1" max="5" value="1" style="width:70%;height:20%;margin:2px auto;border:none;" disabled>
            </div>
        </div>
        <div class="flex-container-charaSpecific-buff-inner chara-specific-10106">
            <div class="flex-container-charaSpecific-buff-inner2">
                <img src="../../img/chara-icons/icon_10106_0_s.png" class="charaSpecific-buff-img">
                <span class="charaSpecific-buff-name">攻撃アップ用</span>
            </div>
            <div class="flex-container-charaSpecific-buff-inner2" style="flex:2;">
                <span class="charaSpecific-buff-label"></span>
                <span class="charaSpecific-buff-label">ブロックしている敵</span>
                <input id="charaSpecific10106-1" class="actualBlockCount" type="number" min="0" max="99" value="0" style="width:70%;height:20%;margin:2px auto;border:none;" disabled>
                <span class="charaSpecific-buff-label"></span>
            </div>
        </div>
    </div>
</div>
<script>
let charaSpecificDivs = document.getElementsByClassName("flex-container-charaSpecific-buff-inner");
let checkCharaID = "chara-specific-" + charID.toString();
for (let i=0;i<charaSpecificDivs.length;i++){
    if (charaSpecificDivs[i].classList.contains(checkCharaID)){
        //Correct ID//
    } else {
        charaSpecificDivs[i].style.display = "none";
    }
}
</script>
`);