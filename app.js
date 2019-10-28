var buttonClick 

window.onload = function() {
    var container = document.getElementById("grid-container");
    
    // categories:
    for (var i=0; i<5; i++) {
        var categoryNode = document.createElement("div");
        categoryNode.classList.add("grid-item");
        var categoryName = document.createTextNode("Random Category");
        categoryNode.appendChild(categoryName);
        container.appendChild(categoryNode);
    }

    // buttons:
    for (var i=1; i<6; i++) {
        for (var j=0; j<5; j++) {
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
        var difficulty = document.getElementById('difficulty').value
        
        var j = 0;
        var i = 0;
        var categoryID = "";
        
        for(j = 0; j < 1500; j++){
            var categoryFinder = new XMLHttpRequest();
            categoryFinder.open("GET", "http://jservice.io/api/clues?min_date=" +date+  "&max_date=" +date + "&value="+ difficulty + "&offset="+j + "00" , false );
            categoryFinder.send(null);
            var categoryFinderArray = JSON.parse(categoryFinder.responseText);
        



            for(i = 0; i < categoryFinderArray.length; i++){
              //  console.log("title of category "+categoryFinderArray[i].title);
                
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
                    }
                    console.log(JSON.parse(xmlHttp.responseText));
                    return;
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


var a;
function generateRandomGameBoard(){
    var colorer = document.getElementsByClassName('button grid-item');

    var i = 0;
    for(i=0; i< colorer.length; i++){
        colorer[i].style.backgroundColor = 'blue';
    }
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/random?count=5", false);
    xmlHttp.send(null);
    console.log(JSON.parse(xmlHttp.responseText));
 
    a = xmlHttp;
   // console.log(JSON.parse(a.responseText));

    
    var categories = JSON.parse(xmlHttp.responseText);
    var columnNames = document.getElementsByClassName('grid-item');
    console.log(categories.length);
    var j = 0;
    for(j = 0; j< categories.length; j++) {
        
        columnNames[j].innerHTML = categories[j].category.title;
       
    }
}

function clickTest(clickedId) {
    console.log(clickedId[0]);
    console.log(clickedId[2]);

    document.getElementById(clickedId).style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[clickedId[0]].category_id;

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

function clickTest1() {

    document.getElementById('Column1(100)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 100){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }
}

function clickTest2() {

    document.getElementById('Column1(200)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 200){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest3() {

    document.getElementById('Column1(300)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 300){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest4() {

    document.getElementById('Column1(400)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 400){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest5() {

    document.getElementById('Column1(500)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 500){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest6() {

    document.getElementById('Column1(600)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 600){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest7() {

    document.getElementById('Column1(700)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 700){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest8() {

    document.getElementById('Column1(800)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 800){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest9() {

    document.getElementById('Column1(900)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 900){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest10() {

    document.getElementById('Column1(1000)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[0].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);
    console.log(categoryArray);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        
        if(categoryArray[i].value == 1000){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest11() {

    document.getElementById('Column2(100)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 100){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest12() {

    document.getElementById('Column2(200)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 200){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest13() {

    document.getElementById('Column2(300)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 300){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest14() {

    document.getElementById('Column2(400)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 400){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest15() {

    document.getElementById('Column2(500)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 500){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest16() {

    document.getElementById('Column2(600)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 600){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest17() {

    document.getElementById('Column2(700)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 700){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest18() {

    document.getElementById('Column2(800)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 800){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest19() {

    document.getElementById('Column2(900)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 900){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}

function clickTest20() {

    document.getElementById('Column2(1000)').style.backgroundColor = 'red';
    var category_id0 = JSON.parse(a.responseText)[1].category_id;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://jservice.io/api/clues?category=" + category_id0, false);
    xmlHttp.send(null);
    var categoryArray = JSON.parse(xmlHttp.responseText);

    var i = 0;
    for(i = 0; i< categoryArray.length; i++){
        if(categoryArray[i].value == 1000){
            alert("Question:" + " "+ categoryArray[i].question);
            alert("Answer:" + " "+categoryArray[i].answer);
            break;
        }

        if(i == categoryArray.length-1){
            alert("there is no question of this value in this particular category");
        }

    }

}



