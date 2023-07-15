import * as flsFunctions from "./modules/functions.js";


flsFunctions.isWebp();

let number = document.getElementById("number-2048");
let resultNumber = 2;
setInterval(changeNumber, 500);

function changeNumber() {
   
   number.innerHTML = resultNumber;
   if(resultNumber < 2048){
      resultNumber *= 2;
   }else {
      resultNumber = 2;
   }
}