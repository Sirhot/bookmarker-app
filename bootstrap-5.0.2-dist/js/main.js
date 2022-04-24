document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;

    var bookmark = {
        name: siteName,
        url: siteURL
    };

    if (!validateForm(siteName, siteURL)) {
        return false;
    }


    //test 
    if (localStorage.getItem("bookmarks") == null) {
        //init an array
        var bookmarks = [];

        //add to array if it is null 
        bookmarks.push(bookmark);

        //to localstorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    } else {
        //take the existed ones
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

        //add new one
        bookmarks.push(bookmark);

        //reset the storage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    }

    fetchBookmarks();

    e.preventDefault();

}

function deleteBookmark(url) {

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);

        }

    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    fetchBookmarks();

}

//show the links with taking them from
function fetchBookmarks() {

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    var bookmarksResults = document.getElementById("bookmarksResults");

    // Build output
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + addhttp(url) + '">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
            '</h3>' +
            '</div>';
    }
}

// Validate Form
function validateForm(siteName, siteURL) {
    if (!siteName || !siteURL) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}
