//Picture Browser: Uses ajax to grab photos
//and display them in an appealling manner.
//Custom CS can be used to style the picture-browser.
(function initialize() {
	var folders = [];
	var photos = [];
	var pictureElem = document.getElementById("picture-browser");
	var metaFile = "files.txt";

	//Set up event listeners
	function addEvents() {

	}

	//Get photos from the directory
	function getPhotos(folder, callback) {
		var url = document.URL;
		console.log(window.location)

		//get containing folder
		url = url.substring(0, url.lastIndexOf('/'));
		console.log(url);
		var requestObj = new XMLHttpRequest();
		requestObj.addEventListener("load", function() {
			console.log(requestObj.responseText);
			callback();
		});
		requestObj.overrideMimeType('text/xml');
		requestObj.open("GET", url + "/" + folder + "/" + metaFile);
		requestObj.send();
	}

	function addPhotos() {

	}

	//Display the photos contained in one folder
	function displayPhotos(folderID) {
		folderID = folderID || 0;
		folder = folders[folderID];
		pictureElem.innerHTML = "";

		//create elements
		var folderElem = document.createElement("div");
		folderElem.setAttribute("id", "picture-browser-photo");
		var listElem = document.createElement("div");
		listElem.setAttribute("id", "picture-browser-list");
		pictureElem.appendChild(folderElem);
		pictureElem.appendChild(listElem);

		//add images
		var photos = getPhotos(folder, addPhotos);

		//add event listeners each time a folder is displayed
		addEvents();
	}

	//Grab meta data from the html file to use folders
	function initMetas() {
		var metas = document.getElementsByTagName('meta');
		var folderString = '';
		for(var i = 0; i < metas.length; i++) {
			if(metas[i].getAttribute("name") === "picture-browser") {
				folderString = metas[i].getAttribute("content");
			}
		}
		if(folderString !== '') {
			rawFolders = folderString.split(',');
			for(var i = 0; i < rawFolders.length; i++) {
				folders.push(rawFolders[i].trim());
			}

			//display photos
			if(folders.length > 0)
				displayPhotos();
		}
	};

	(function init() {
		initMetas();
	})();
})();