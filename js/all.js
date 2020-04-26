var data = {
    "folders": ["images", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js", "css", "js"],
    "files": ["hello.txt", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js", "team.js"],
    "path": "/hello"
};

var backPath = new Array();
var selectedItem;
var path = data["path"];
var folders = data["folders"].sort();
var files = data["files"].sort();

console.log(folders);
console.log(files);

function getData(path) {
    setView();
}

function refresh() {
    getData(path);
    setView();
}

function setView() {
    $('#path').val(path);

    var htmlData = "";
    for (var folder of folders) {
        htmlData += '<div class="folder" id="folder" ondblclick="openFolder(\'' + folder + '\')" onclick="selectedFile(\'' + folder + '\')" oncontextmenu="leftClick(event, \'' + folder + '\') "contextmenu="context-menu"><img src="./icons/folder.png" alt="folder" height="70px" width="auto"><h5>' + folder + '</h5></div>';
    }
    for (var file of files) {
        htmlData += ' <div class="file" id="file" onclick="selectedFile(\'' + file + '\')" oncontextmenu="leftClick(event, \'' + file + '\') "contextmenu="context-menu"><img src="./icons/file.png" alt="folder" height="70px" width="auto"><h5>' + file + '</h5></div>';
    }

    $('.mainBody').html(htmlData);
}


function openFolder(folderName) {
    backPath.push(path);
    if (path == "/") {
        path = path + folderName;
    } else {
        path = path + "/" + folderName;
    }
    getData(path);
}

function leftClick(event, item) {
    event.preventDefault();
    console.log(item);
    selectedItem = item;
    var contextElement = document.getElementById("context-menu");
    contextElement.classList.add("active");
    contextElement.style.top = event.clientY + "px";
    contextElement.style.left = event.clientX + "px";
}


function copyLink() {
    var link = path + "/" + selectedItem;
    console.log(link);
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.opacity = 0;
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}

function deleteItem() {
    var isConfiremed = confirm("Please confirm if you want to delete this files");
    if (isConfiremed) {
        folders.pop(selectedItem);
        files.pop(selectedItem);
        setView();
    }
}

function selectedFile(file) {
    console.log("Selected File: " + file);
}

function home() {
    path = "/";
    getData(path);
}

function back() {
    if (backPath.length > 0) {
        path = backPath.pop();
        $('#path').val(path);

    }
}

$(document).ready(setView());

window.addEventListener("click", function() {
    var contextElement = document.getElementById("context-menu");
    contextElement.classList.remove("active");
})