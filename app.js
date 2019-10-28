var buttonClick 



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
/*        // in the html doc, there should be a search box under the Generate Question section where you can type in whatever value and search the question
        // this just takes whatever value I take in using the getElementById function
        var date = document.getElementById('date').value;
        var category = document.getElementById('category').value;
        var difficulty = document.getElementById('difficulty').value
        
        // now one bad trait about this API is that it only takes in categories by their ID NUMBERS. Really isn't exactly user friendly, so 
        // I decided to take it upon myself to find a way to make the category searchbox take in a STRING instead of an INT

        // this should generate an array of all questions by category
        var categoryFinder = new XMLHttpRequest();
   //   categoryFinder.open("GET", "http://jservice.io/api/clues?min_date=" +date+  "&max_date=" +date + "&value="+ difficulty, false );
        categoryFinder.open("GET", "http://jservice.io/api/categories?count=100", false);
        categoryFinder.send(null);
        console.log(JSON.parse(categoryFinder.responseText));

        // here i just created a new variable for the array as to eliminate any convolusion 
        var categoryFinderArray = JSON.parse(categoryFinder.responseText);
        var i = 0;
        var j = 0;
        var categoryID = "";
     //   for (j; j<1000; j++) {
            console.log(categoryFinderArray.length);

            // now, I want to loop through my array and find wherever the "category title" is the same as the STRING I type in the category search box
            for(i = 0; i<categoryFinderArray.length; i++){
                
                // if I find a category title equal to my string, then I want to set a prior variable to the CATEGORYID of the element I found so I can use 
                // it to actually generate the question
                if(category == categoryFinderArray[i].title) {
                    categoryID = categoryFinderArray[i].id;
                    break;
            } 
                // oops this gets a little tricky. What if I don't find any elements? That is a very likely scenario since this API only displays
                // at most 100 categories at a time! Oh dear! Well not to worry there is a pagination function that can let me look at the next 100 categories...
                // this if statement makes use of this pagination, so if i is equal to 100, or the for loop is almost reaching the end of the array, 
                // create a new Array to loop through but this time, containing different possible questions due to OFFSET
                if(i == categoryFinderArray.length - 1){
                
                    var newCategoryFinder = new XMLHttpRequest();
             //       newCategoryFinder.open("GET", "http://jservice.io/api/clues?min_date=" + date+ "&max_date=" +date+ "&value="+ difficulty + "&offset=" + j+1 + "00", false);
                    newCategoryFinder.open("GET", "http://jservice.io/api/categories?count=100&offset=" + j +"00");
                    console.log("asdflad" + j+1);
                    newCategoryFinder.send(null);
                    var newCategoryFinderArray = JSON.parse(newCategoryFinder.responseText);
                    categoryFinderArray = newCategoryFinderArray;
                    i = 0;
                    j++;
                    
                }
                
                console.log(j);
                if(j >= 20 && j <= 22){
                    alert("Seems like the program is running too long. Try adding more filters");
                    break;
                }
                
        }  */
        

   // } 
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



