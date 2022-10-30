let conditions = ["filterDiv", "all"]
function filterSelection(condition) {
  if (conditions.includes(condition)){
    conditions.splice(conditions.indexOf(condition),1)
  } else {
    conditions.push(condition)
  }
  if (conditions.includes("all")){
    conditions.splice(conditions.indexOf("all"),1)
  }
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (condition == "all") conditions = ["filterDiv", "all"];
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    let condArray = x[i].className.split(" ")
    console.log(condArray)
    let checkerAND = (arr, target) => target.every(v => arr.includes(v));
    let checkerOR = (arr,target) => target.some(v => arr.includes(v))
    //console.log(checkerAND(condArray,conditions))
    //console.log(checkerOR(condArray,conditions))
    //console.log(document.getElementById("andORswitch").checked)
    if (conditions.includes("all")){
      w3AddClass(x[i], "show");
    } else if (checkerAND(condArray,conditions)){
        w3AddClass(x[i], "show");
    } else if (document.getElementById("andORswitch").checked){
      condArray.splice(condArray.indexOf("filterDiv"),1)
      if (checkerOR(condArray,conditions)) {
      w3AddClass(x[i], "show");
      }
    }
  }
  console.log(conditions)
}

// function filterSelection(c) {
//   var x, i;
//   x = document.getElementsByClassName("filterDiv");
//   if (c == "all") c = "";
//   for (i = 0; i < x.length; i++) {
//     w3RemoveClass(x[i], "show");
//     if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
//   }
// }

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("buttonContainer");
var btns = btnContainer.getElementsByClassName("btn");
var images = document.getElementsByClassName("smallCharaImg");

function allInactive(){
  var current = document.getElementsByClassName("active");
  for (var i = 0; i < btns.length; i++) {
    current[0].className = current[0].className.replace(" active", "");
  }
  this.className += " active";
}
function selectedActive(){
  document.getElementById("showAll").className = document.getElementById("showAll").className.replace(" active", "");
  if (this.className.includes(" active")) {
    this.className = this.className.replace(" active", "");
  } else {
    this.className += " active";
  }
}

document.getElementById("showAll").addEventListener("click",allInactive)
for (var i = 0; i < btns.length; i++) {
  if (btns[i].id == "showAll"){
    //pass
  } else {
    btns[i].addEventListener("click", selectedActive)
  }
}

function selectWindowDisappear(){
  let x = document.getElementById("selectionWindow");
  let y = document.getElementById("infoWindow");
  x.style.display = "none";
  y.style.display = "block";
}
function infoWindowDisappear(){
  let x = document.getElementById("selectionWindow");
  let y = document.getElementById("infoWindow");
  x.style.display = "block";
  y.style.display = "none";
}

for (var i = 0; i < images.length; i++) {
  images[i].addEventListener("click", selectWindowDisappear)
}

function unitselect(chID,image) {
  let imagecell = document.getElementById("imagecell")
  image = image.replace("_s","")
  imagecell.innerHTML = "<img style='width:100%;' src="+image+">"
  let unitname = document.getElementById("unitname")
  unitname.innerHTML = unitData[chID].name
  let traittext = document.getElementById("traittext")
  traittext.innerHTML = "<span style='font-size:medium; text-decoration: underline;'>Race Trait:</span><br>"+unitData[chID].trait
  let skilltext = document.getElementById("skilltext")
  skilltext.innerHTML = "<span style='font-size:medium; text-decoration: underline;'>Skill (max level):</span><br>"+unitData[chID].skill
  let unittags = document.getElementById("unittags")
  unittags.innerHTML = unitData[chID].tags
  let nousagi = document.getElementById("nousagi")
  nousagi.innerHTML = "<span style='font-size:medium; text-decoration: underline;'>A certain Nousagi's review:</span><br>"+unitData[chID].review+"<br><br><span style='font-size:medium; color:green;'>"+unitData[chID].good+"</span><br><span style='font-size:medium; color:red;'>"+unitData[chID].bad+"<span>"
}








// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function(){
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }
// for (var i = 0; i < btns.length; i++) {
//     btns[i].addEventListener("click", function(){
//       var current = document.getElementsByClassName("active");
//       this.className.replace(" active", "");
//     })
// }