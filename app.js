var buttonClick 

window.onload = function() {
    var container = document.getElementById("grid-container");
    
    // categories:
    for (var i=0; i<6; i++) {
        var categoryNode = document.createElement("div");
        categoryNode.classList.add("grid-item");
        var categoryName = document.createTextNode("Random Category");
        categoryNode.appendChild(categoryName);
        container.appendChild(categoryNode);
    }

    // buttons:
    for (var i=1; i<6; i++) {
        for (var j=0; j<6; j++) {
            var rowNode = document.createElement("div");
            rowNode.classList.add("grid-item");
            rowNode.classList.add("button");
            var rowName = document.createTextNode(i +"00");
            rowNode.appendChild(rowName);
            
            // change the type, onclick, and id
            rowNode.setAttribute("type", "button");
            rowNode.setAttribute("onclick", "clickTest(this.id)");
            rowNode.setAttribute("id", j + "_" + i + "00");

            container.appendChild(rowNode);
        }
    }

    generateRandomGameBoard();
}

function searchDate(event) {
    if (event.keyCode==13){
        var date = document.getElementById('date').value;
        
        // console.log(date);

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "http://jservice.io/api/clues?min_date=" +date+  "&max_date=" +date, false ); // false for synchronous request
        xmlHttp.send( null );
        console.log(JSON.parse(xmlHttp.responseText));
        // console.log(JSON.parse(xmlHttp.responseText)[0].id);

        
    }
}

function searchCategory(event) {
    if (event.keyCode == 13){
        var category = document.getElementById('category').value;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category, false);
        xmlHttp.send(null);
        console.log(JSON.parse(xmlHttp.responseText));
    }
}
// Let's start by generating a question based on a bunch of filters
function searchQuestion(event){
     // this is to test for whenever the user presses the ENTER key, any event that occurs happens right after the ENTER key is pressed
    if (event.keyCode == 13){
        var date = document.getElementById('date').value;
        var category = document.getElementById('category').value;
        var categoryid = document.getElementById('categoryid').value;
        var difficulty = document.getElementById('difficulty').value
        
        var j = 0;
        var i = 0;
        var categoryID = "";
  /*      if(category.length == 0){
            console.log("hey");

            if(categoryid.length > 0) {

            }
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", "http://jservice.io/api/clues?min_date=" +date+  "&max_date=" +date + "&category=" + categoryID + "&value="+ difficulty, false );
            xmlHttp.send(null);
            console.log(JSON.parse(xmlHttp.responseText));
            return;
        } */

        if(categoryid.length > 0 || category.length == 0){
            categoryID = categoryid;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", "http://jservice.io/api/clues?min_date=" +date+  "&max_date=" +date + "&category=" + categoryID + "&value="+ difficulty, false );
            xmlHttp.send(null);
            console.log(JSON.parse(xmlHttp.responseText));

            if(JSON.parse(xmlHttp.responseText).length == 0){
                alert("there is no such question");
            } else {
                
                for (var i = 0; i < 10; i++){
                    if(JSON.parse(xmlHttp.responseText)[i] == null){
                        break;
                    }
                    var container = document.getElementById("QandAcontainer");
                    var categoryNode = document.createElement("div");
                    categoryNode.classList.add("answers");
                    var Question = document.createTextNode("Question: " +JSON.parse(xmlHttp.responseText)[i].question);
                    var Answer = document.createTextNode(" Answer: " +JSON.parse(xmlHttp.responseText)[i].answer);
                    categoryNode.appendChild(Question);
                    categoryNode.appendChild(Answer);
                    container.appendChild(categoryNode);
                }
            }
            return;

        }
        
        for(j = 0; j < 1500; j++){
            var categoryFinder = new XMLHttpRequest();
            categoryFinder.open("GET", "http://jservice.io/api/clues?min_date=" +date+  "&max_date=" +date + "&value="+ difficulty + "&offset="+j + "00" , false );
            categoryFinder.send(null);
            var categoryFinderArray = JSON.parse(categoryFinder.responseText);
        

            for(i = 0; i < categoryFinderArray.length; i++){
                
              if(category == categoryFinderArray[i].category.title) {
                    console.log("r u working");
                    console.log(category);
                    console.log(categoryFinderArray[i].category.title);
                    console.log(categoryFinderArray[i].category_id);
                    categoryID = categoryFinderArray[i].category_id;
                    

                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open("GET", "http://jservice.io/api/clues?min_date=" +date+  "&max_date=" +date + "&category=" + categoryID + "&value="+ difficulty, false );
                    xmlHttp.send(null);

                    if(JSON.parse(xmlHttp.responseText).length == 0){
                        alert("there is no such question");
                    } else {

                        for (var i = 0; i < 10; i++){
                            if(JSON.parse(xmlHttp.responseText)[i] == null){
                                break;
                            }
                    
                            var container = document.getElementById("QandAcontainer");
                            var categoryNode = document.createElement("div");
                            categoryNode.classList.add("answers");
                            var Question = document.createTextNode("Question: " +JSON.parse(xmlHttp.responseText)[i].question);
                            var Answer = document.createTextNode(" Answer: " +JSON.parse(xmlHttp.responseText)[i].answer);
                            categoryNode.appendChild(Question);
                            categoryNode.appendChild(Answer);
                            container.appendChild(categoryNode);
                        }
                    return;
                    }
                } 
            }
            console.log(j);
            if(j == 20){
                alert("Seems like the program is running too long. Try adding more filters");
                break;
            }


        } 

    } 
    }

function clearQuestions() {
    const myNode = document.getElementById("QandAcontainer");
    myNode.innerHTML = '';
      

}


var a;
var replacementArray;
var replacementArray2;
function generateRandomGameBoard(){
    var colorer = document.getElementsByClassName('button grid-item');

    var i = 0;
    for(i=0; i< colorer.length; i++){
        colorer[i].style.backgroundColor = 'blue';
    }
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/random?count=100", false);
    xmlHttp.send(null);
    //console.log(JSON.parse(xmlHttp.responseText));
 
    a = xmlHttp;
    // console.log(JSON.parse(a.responseText));
    
    var clues = JSON.parse(xmlHttp.responseText);
    replacementArray = [];
    replacementArray2 = [];

    for(var i = 0; i< clues.length; i++){

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + clues[i].category_id + "&value=100", false);
        xmlHttp.send(null);
        var categoryArray = JSON.parse(xmlHttp.responseText);

        if(categoryArray.length != 0){
            if (!replacementArray.includes(clues[i].category_id)){
                // check if categoryArray[randomNumber] already exists in replacementArray

               replacementArray.push(clues[i].category_id);
               replacementArray2.push(clues[i]);
                console.log(clues[i].category_id);
            }
        }
        if(replacementArray.length == 6){
            break;
        }
        

    }


    var columnNames = document.getElementsByClassName('grid-item');
    console.log(clues.length);
    var j = 0;
    for(j = 0; j< 6; j++) {
        
        columnNames[j].innerHTML = replacementArray2[j].category.title;
       
    }


}
   
function clickTest(clickedId) {

    document.getElementById(clickedId).style.backgroundColor = 'red';
  //  var category_id0 = JSON.parse(a.responseText)[clickedId[0]].category_id;
    var category_id0 = replacementArray2[clickedId[0]].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    // console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == clickedId[2] + "00"){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){

            alert("there is no question of this value in this particular category");
        }

    }
}

