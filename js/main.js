//listen for submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
        //get form values
        let siteName = document.getElementById('siteName').value;
        let siteUrl = document.getElementById('siteUrl').value;
        let bookmark = {
                name: siteName,
                url: siteUrl
        }
        if (!validateForm(siteName, siteUrl)) {
                return false;
        }

        /*
                //local storage
                localStorage.setItem('test', 'hello world');
                localStorage.getItem('test');
                console.log(localStorage.getItem('test'));
                localStorage.removeItem('test')
                console.log(localStorage.getItem('test'));
        */

        //test if bookmark is null               
        if (localStorage.getItem('bookmarks') === null) {
                //init array
                var bookmarks = [];
                //add to array
                bookmarks.push(bookmark);
                //set to localstorage
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        } else {
                // get bookmarks from localstorage
                var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
                // add bookmar to array
                bookmarks.push(bookmark);
                // re-set to local storage
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        }

        //clear form
        document.getElementById('myForm').onreset();


        //prevent form for submitting
        e.preventDefault();

}
//delete bookmark
function removeBookmark(url) {
        //console.log(url);
        localStorage.removeItem(url);
        //get bookmark
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // loop throught bookmarks
        for (var i = 0; i < bookmarks.length; i++) {
                if (bookmarks[i].url == url) {
                        //remove from array
                        bookmarks.splice(i, 1);
                }
        }
        //re set local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


        //refetch bookmarks
        fetchBookmarks();
}

// fetch bookmark
function fetchBookmarks() {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        console.log(bookmarks);
        //get output id
        var bookmarksResults = document.getElementById('bookmarksResults');

        // build output
        bookmarksResult.innerHTML = "";
        for (var i = 0; i < bookmarks.length; i++) {
                var name = bookmarks[i].name;
                var url = bookmarks[i].url;

                bookmarksResult.innerHTML += `<div class="well">` +
                        `<h1 class="text-center">` + name + `</h1>
                                                        <br />
                                                        <a class="btn btn-default target="_blank" href="` + url + `">Link</a>
                                                        <a onclick="removeBookmark(\`` + url + `\`)" class="btn btn-danger pull-right" href="#">Remove</a>
                                                </div>`;
        }
        fetchBookmarks();

}

//validation form
function validateForm(siteName, siteUrl) {
        //empty forms
        if (!siteName || !siteUrl) {
                alert('PLease fill in the form');
                return false;
        }

        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        if (!siteUrl.match(regex)) {
                alert('please use a valid URL');
                return false;
        }
        return true;
}