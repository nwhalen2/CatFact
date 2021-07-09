console.log("page loaded!")

// connect button listener
var submitButton = document.getElementById('bsr-submit-button');
submitButton.onmouseup = getFormInfo;

function getFormInfo(){
    console.log('entered getFormInfo.');
    // get name from user
    var num1 = document.getElementById('number1').value;
    console.log(num1);
    // make nw call to age api with the user name
    makeNetworkCallToAgeApi(num1);
} // end of getFormInfo

function makeNetworkCallToAgeApi(num1){
    console.log('got number = ' + num1);
    var url = "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8&size=" + num1;

    var xhr = new XMLHttpRequest(); // 1. create xhr object
    xhr.open("GET", url, true); // 2. configure the object

    xhr.onload = function(e){
        console.log('age api onload triggered');
        console.log('network response received = ' + xhr.responseText);
        updateNumberWithResponse(num1, xhr.responseText);
    } // end of xhr.onload

    xhr.onerror = function(e){
        console.log('age api onerror triggered' + xhr.statusText);
    } // end of xhr.onerror

    xhr.send(null); // this actually sends the request
} // end of makeNetworkCallToAgeApi

function updateNumberWithResponse(num1, response_text){
    // extract age information from json response
    var response_json = JSON.parse(response_text);

    // update label with it
    var label1 = document.getElementById('result-line-1');
    label1.innerHTML = "Generated Number: " + response_json['data'];
    var num2 = response_json['data'];
    console.log("num2: " + num2);
    // and make nw call to numbers api
    makeNetworkCallToCatApi(num2);
}

function makeNetworkCallToCatApi(num2){
    console.log("entered makeNetworkCallToNumbersApi num2 = " + num2);
    // TODO
    var url = "https://catfact.ninja/fact?max_length=" + num2;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function(e){
      var response_text = xhr.responseText;
      console.log('network response received = ' + xhr.responseText);
      updateCatFact(response_text);
  } // end of xhr.onload

  xhr.onerror = function(e){
      console.log('age api onerror triggered' + xhr.statusText);
  } // end of xhr.onerror

  xhr.send(null); 
} // end of makeNetworkCallToNumbersApi

function updateCatFact(response_text) {
  /*var label2 = document.getElementById("result-line-2");
  label2.innerHTML = response;

  // dynamic add - dynamically usng JS
  // to create & add elements to the DOM
  */
  // creating new label element
  /*
  label_item = document.createElement("label"); // "label" is a class name
  label_item.setAttribute("id", "dynamic-label-1");
  label_item.setAttribute("style", "color: blue; font-size: 10px");

  var item_text = document.createTextNode(response);
  label_item.appendChild(item_text);

  // option 1: attach directly to body
  document.body.appendChild(label_item);
*/
  // option 2: control where the new item is attached

  var response_json = JSON.parse(response_text);
  var cat_fact = response_json["fact"];
  console.log("cat fact: " + cat_fact);


  label_item = document.createElement("label"); // "label" is a class name
  label_item.setAttribute("id", "dynamic-label-1");
  var item_text = document.createTextNode(cat_fact);
  label_item.appendChild(item_text);

  var response_div = document.getElementById("response-div");
  response_div.appendChild(label_item);
}

