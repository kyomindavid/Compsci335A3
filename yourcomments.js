// Compsci 335 A3
// Author: Kyomin Ku
// UPI: kku031

function yourcomments() {
	document.getElementById("yourcomments").style.color = "gold";
	document.getElementById("yourshop").style.color = "white";
	document.getElementById("joinshop").style.color = "white";
}

function postComment() {
	var feedback = document.getElementById("comment").value;
	var name = document.getElementById("name").value;
	
	if (feedback == "" || name == "") {
		alert("Please complete all fields!");
		
	} else {
		var xhr = new XMLHttpRequest();
		var comment = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + name;
		xhr.open("POST", comment, true);
		
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON.stringify(feedback));
		
		document.getElementById("comment").value = "";
		document.getElementById("name").value = "";
		
		xhr.onload = function () {
			showComments();
		}
	}
}

function showComments() {
	var xhr = new XMLHttpRequest();
	var htmlcomments = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/htmlcomments";
	xhr.open("GET", htmlcomments, true);
	
	xhr.onload = function(){
		document.getElementById("setofcomments").innerHTML = xhr.responseText;
	}
	xhr.send(null);
}