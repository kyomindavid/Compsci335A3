// Compsci 335 A3
// Author: Kyomin Ku
// UPI: kku031

function yourshop() {
	document.getElementById("yourshop").style.color = "gold";
	document.getElementById("joinshop").style.color = "white";
	document.getElementById("yourcomments").style.color = "white";
}

// Changes between Books and Blurays
function stateChange() {
	var items = document.getElementById("items");
	var item = items.options[items.selectedIndex].value;
	
	if (document.getElementById("searchbar").value != null) {
		var key = document.getElementById("searchbar").value;
		if(item == "books") searchBooks(key);
		else searchBlurays(key);
	} else {
		if(item == "books") getBooks();
		else getBlurays();
	}
}

function search() {
	var key = document.getElementById("searchbar").value;
	var items = document.getElementById("items");
	var item = items.options[items.selectedIndex].value;
	
	if(item == "books") searchBooks(key);
	else searchBlurays(key);
}
//----------------------------------------------------------------
//-------------------------  Books  ------------------------------
//----------------------------------------------------------------	
function getBooks(){
	var xhr = new XMLHttpRequest();
	var booklist = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booklist";
	xhr.open("GET", booklist, true);
	xhr.setRequestHeader("accept", "application/json");
	
	xhr.onload = function() {
		var jsonList = JSON.parse(xhr.responseText);
		showBooks(jsonList);
	}
	xhr.send(null); 
}

function searchBooks(key) {
	if (key == "") document.getElementById("resultof").innerHTML = 'All Books:';
	else document.getElementById("resultof").innerHTML = 'Result of "' + key + '":';
	
	var xhr = new XMLHttpRequest();
	var booksearch = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/booksearch?term=" + key;
	xhr.open("GET", booksearch, true);
	xhr.setRequestHeader("accept", "application/json");
	
	xhr.onload = function() {
		var jsonList = JSON.parse(xhr.responseText);
		showBooks(jsonList);
	}
	xhr.send(null); 
}

function showBooks(result) {
	var tableContent = "<tr class='Title'></tr>";
	
	for (var i = 0; i < result.length; ++i) {
		var record = result[i];
		 tableContent += '<tr><td style="padding-top: 50px; padding-bottom: 30px; padding-left: 60px; padding-right: 60px;"><img src="http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=' + record.Id + '" /></td>' 
		 + '<td style="padding-left: 60px; padding-right: 60px; font-family:Josefin Sans;">' +  record.Title + '</td>' 
		 + '<td style="padding-left: 60px; padding-right: 60px;"><a href="http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id=' + record.Id + '"><img src="buynow.jpg" height="60px"/></a></td></tr>';
	}
	document.getElementById("table").innerHTML = tableContent;
}


//-----------------------------------------------------------------
//-------------------------  Blurays  -----------------------------
//-----------------------------------------------------------------
function getBlurays() {
	var xhr = new XMLHttpRequest();
	var brlist = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brlist";
	xhr.open("GET", brlist, true);
	xhr.setRequestHeader("accept", "application/json");
	
	xhr.onload = function() {
		var jsonList = JSON.parse(xhr.responseText);
		showBlurays(jsonList);
	}
	xhr.send(null); 
}

function searchBlurays(key) {
	if (key == "") document.getElementById("resultof").innerHTML = 'All Blurays:';
	else document.getElementById("resultof").innerHTML = 'Result of "' + key + '":';
	
	var xhr = new XMLHttpRequest();
	var brsearch = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brsearch?term=" + key;
	xhr.open("GET", brsearch, true);
	xhr.setRequestHeader("accept", "application/json");
	
	xhr.onload = function() {
		var jsonList = JSON.parse(xhr.responseText);
		showBlurays(jsonList);
	}
	xhr.send(null); 
}

function showBlurays(result) {
	var tableContent = "<tr class='BlurayTitle'></tr>";
   
	for (var i = 0; i < result.length; ++i) {
		var record = result[i];
		 tableContent += '<tr><td style="padding-top: 50px; padding-bottom: 30px; padding-left: 60px; padding-right: 60px;"><img src="http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/brimg?id=' + record.Id + '" /></td>' 
		 + '<td style="padding-left: 60px; padding-right: 60px;">'+  record.Title + '</td>' 
		 + '<td style="padding-left: 60px; padding-right: 60px;"><a href="http://redsox.tcs.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id=' + record.Id + '"><img src="buynow.jpg" height="60px"/></a></td></tr>';
	}
	alert(result.length);
	document.getElementById("table").innerHTML = tableContent;
	
}
