function Header() {
	var x = document.getElementById("myHeader");
	if (x.className === "header") {
		x.className += " responsive";
	} else {
		x.className = "header";
	}
}