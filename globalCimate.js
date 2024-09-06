let txtClimateHeader = document.getElementById("txtClimateHeader");
document.getElementById("btnSearchOnAction").addEventListener("click", btnSearchOnAction);
let searchBar;

climateHeaderGroupBody = "";

function btnSearchOnAction() {
    searchBar = document.getElementById("searchBar").value;
   if(searchBar){
    climateHeaderGroupBody+=`
                    <h4  class="climate-header">Climate of ${searchBar}</h4>
                    <hr class="line-below-searchBar">
    `
   }else{
    console.log("enter a value...");
   }
   txtClimateHeader.innerHTML = climateHeaderGroupBody;
}

