var ds_user = '';
var ds_key = '';

// Init
$(function() {

    // cookies
    if($.cookie('un') && $.cookie('key')){
        $('#un').val($.cookie('un')) === $.cookie('un');
        $('#key').val($.cookie('key')) === $.cookie('key');
    }

    //init JCSDL
    $('#jcsdl-edit').jcsdlGui({
        save : function(code) {

            log('DEBUG: CSDL generated: ' + code);

            // validate the DS creds
            if(validateCreds() === true){
                // compile csdl
                doCompile(code);
            }
        },
        hideTargets : ['twitter.status', 'twitter.place', 'twitter.retweet', 'twitter.mention_ids', 'twitter.domains', 'twitter.in_reply_to_screen_name', 'twitter.links', 'twitter.user', 'twitter.retweeted',   'interaction', '2ch', 'lexisnexis', 'intensedebate', 'sinaweibo', 'tencentweibo', 'tumblr', 'facebook_page', 'googleplus','instagram', 'wordpress', 'wikipedia', 'yammer',  'imdb','facebook', '2channel', 'myspace', 'digg', 'amazon', 'blog', 'board', 'bitly', 'dailymotion', 'flickr', 'newscred', 'reddit', 'topix', 'video', 'youtube', 'imdb.author', 'imdb.type', 'imdb.contenttype', 'imdb.thread']
    });
});


/*
 * validateCreds
 *
 * @return boolean
 *
 */
function validateCreds(){

    ds_user = $.trim($('#un').val());
    ds_key  = $.trim($('#key').val());

    if(ds_user ==='' || ds_key === ''){
        alert('Please enter a DataSift username and API key.');
        return false;
    }

    // set cookie
    $.cookie('un', ds_user, { expires: 60 });
    $.cookie('key', ds_key, { expires: 60 });
    console.log('DEBUG: saved cookies: ' + ds_user + '' + ds_key);
    return true;
};



function doCompile (csdl) {

    log('DEBUG: Compiling CSDL...');

    jQuery.ajax({
        type: "POST",
        url: "http://localhost:3000/api/compile",
        contentType: "application/json; charset=utf-8",
        data: 'csdl='+encodeURIComponent(csdl),
        dataType: "json",
        headers: {
            "Authorization": ds_user + ':' + ds_key
        },
        success: function (data, status, jqXHR) {
            log('DEBUG: compile success - ' + JSON.stringify(jqXHR.responseJSON));
        },
        error: function (jqXHR, status) {
            log('ERROR: compile failed: ' + JSON.stringify(jqXHR.responseJSON));
        }
    });
}

function log(update){
    $('#debug').val($('#debug').val() + "\n\n" + update);
}


/*
function getContacts () {

    jQuery.ajax({
        type: "GET",
        url: "http://localhost:49193/Contacts.svc/GetAll",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status, jqXHR) {
            // do something
        },

        error: function (jqXHR, status) {
            // error handler
        }
    });
}


// get the promise object for this API
var dataPromise = getData();

// register a function to get called when the data is resolved
dataPromise.done(function(data){
    console.log("We got data: " + data);
    console.log("We got data: " + typeof(data));
    $('#debug').val(data);
});

// register the failure function
dataPromise.fail(function(ex){
    console.log("oops, some problem occured: " + ex);
});

// Note: we can have as many dataPromise.done(...) as we want.
dataPromise.done(function(data){
    //console.log("We asked it twice, we get it twice: " + data);
});



function getData(){
    // 1) create the jQuery Deferred object that will be used
    var deferred = $.Deferred();

    // ---- AJAX Call ---- //
    //XMLHttpRequest xhr = new XMLHttpRequest();
    xhr = new XMLHttpRequest();
    //void open(DOMString method, DOMString url, optional boolean async, optional DOMString? user, optional DOMString? password);
    xhr.open("POST","http://localhost:3000/api/compile",true);

    // register the event handler
    xhr.addEventListener('load',function(){
        if(xhr.status === 200){
            // 3.1) RESOLVE the DEFERRED (this will trigger all the done()...)
            deferred.resolve(xhr.response);
        }else{
            // 3.2) REJECT the DEFERRED (this will trigger all the fail()...)
            deferred.reject("HTTP error: " + xhr.status);
        }
    },false)

    // perform the work
    xhr.send('hello from the browser :)');
    // Note: could and should have used jQuery.ajax.
    // Note: jQuery.ajax return Promise, but it is always a good idea to wrap it
    //       with application semantic in another Deferred/Promise
    // ---- /AJAX Call ---- //

    // 2) return the promise of this deferred
    return deferred.promise();
}

 */