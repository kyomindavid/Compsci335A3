// Compsci 335 A3
// Author: Kyomin Ku
// UPI: kku031

function joinshop() {
	document.getElementById("joinshop").style.color = "gold";
	document.getElementById("yourshop").style.color = "white";
	document.getElementById("yourcomments").style.color = "white";
}

function register() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var address = document.getElementById("address").value;
	
	// Showing warning messages
	if (username == "" || password == "" || address == "") {
		document.getElementById("registermessage").innerHTML = "Register Failed!";
		document.getElementById("registermessage").style.color = "red";
		
		if (username == "") {
			$("#nousername").show();
			var nousername = "Username Required!"
			document.getElementById("nousername").innerHTML = nousername;
		} else {
			$("#nousername").hide();
		}
		if (password == "") {
			$("#nopassword").show();
			var nopassword = "Password Required!"
			document.getElementById("nopassword").innerHTML = nopassword;
		} else {
			$("#nopassword").hide();
		}
		if (address == "") {
			$("#noaddress").show();
			var noaddress = "Address Required!"
			document.getElementById("noaddress").innerHTML = noaddress;
		} else {
			$("#noaddress").hide();
		}	
		
	} else {
		$("#nousername").hide();
		$("#nopassword").hide();
		$("#noaddress").hide();
		
		var xhr = new XMLHttpRequest();
		var register = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/register";
		xhr.open("POST", register, true);
		
		xhr.setRequestHeader("Content-Type", "application/json");
		var json = { Name: username, Password: password, Address: address };
		xhr.send(JSON.stringify(json));
		
		document.getElementById("username").value = "";
		document.getElementById("password").value = "";
		document.getElementById("address").value = "";
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById("registermessage").innerHTML = xhr.responseText;
				document.getElementById("registermessage").style.color = "red";
				console.log(xhr.responseText);	
			}
		}
	}
}

function version() {
	var xhr = new XMLHttpRequest();
	var version = "http://redsox.tcs.auckland.ac.nz/BC/Open/Service.svc/version";
	xhr.open("GET", version, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	
	xhr.onload = function() {
		document.getElementById("version").innerHTML = xhr.responseText;
	}
	xhr.send(null); 		
}
