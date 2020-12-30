<script>
document.addEventListener('DOMContentLoaded', function() {

	var egy_xpath = "//*[@id='main-content']/div/div/div/div/div[1]/div/div/div[2]/div[2]/div/div[2]";
	var ksa_xpath = "//*[@id='main-content']/div/div/div/div/div[1]/div/div/div[2]/div[2]/div/div[3]";

	var egypt_xPathResult = document.evaluate(egy_xpath, document);
	if(egypt_xPathResult){
		var egypt = egypt_xPathResult.iterateNext();
	}

	var ksa_xPathResult = document.evaluate(ksa_xpath, document);
	if(ksa_xPathResult){
		var ksa = ksa_xPathResult.iterateNext();
	}

	if (egypt.style.display === "none") {
		egypt.style.display = "block";
	} else {
		egypt.style.display = "none";
	}

	if (ksa.style.display === "none") {
		ksa.style.display = "block";
	} else {
		ksa.style.display = "none";
	}

	var s_ajaxListener = new Object();
	s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
	s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
	s_ajaxListener.callback = function () {
	// this.method :the ajax method used
	// this.url    :the url of the requested script (including query string, if any) (urlencoded)
	// this.data   :the data sent, if any ex: foo=bar&a=b (urlencoded)

	var get_request = decodeURI(this.data);
	alert(get_request);
	var e = get_request.search("مصر");
	if (e > 0){
		egypt.style.display = "block";
	} else {
		egypt.style.display = "none";
	}

	var k = get_request.search("السعودية");
	if (k > 0){
		ksa.style.display = "block";
	} else {
		ksa.style.display = "none";
	}
	}

	XMLHttpRequest.prototype.open = function(a,b) {
	if (!a) var a='';
	if (!b) var b='';
	s_ajaxListener.tempOpen.apply(this, arguments);
	s_ajaxListener.method = a;
	s_ajaxListener.url = b;
	if (a.toLowerCase() == 'get') {
	s_ajaxListener.data = b.split('?');
	s_ajaxListener.data = s_ajaxListener.data[1];
	}
	}

	XMLHttpRequest.prototype.send = function(a,b) {
	if (!a) var a='';
	if (!b) var b='';
	s_ajaxListener.tempSend.apply(this, arguments);
	if(s_ajaxListener.method.toLowerCase() == 'post')s_ajaxListener.data = a;
	s_ajaxListener.callback();
	}

}, false);
</script>
