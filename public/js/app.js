var ds_user = '';
var ds_key = '';


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
                doCompile(code);
            }
        },
        hideTargets : ['twitter.status', 'twitter.place', 'twitter.retweet', 'twitter.mention_ids', 'twitter.domains', 'twitter.in_reply_to_screen_name', 'twitter.links', 'twitter.user', 'twitter.retweeted',   'interaction', '2ch', 'lexisnexis', 'intensedebate', 'sinaweibo', 'tencentweibo', 'tumblr', 'facebook_page', 'googleplus','instagram', 'wordpress', 'wikipedia', 'yammer',  'imdb','facebook', '2channel', 'myspace', 'digg', 'amazon', 'blog', 'board', 'bitly', 'dailymotion', 'flickr', 'newscred', 'reddit', 'topix', 'video', 'youtube', 'imdb.author', 'imdb.type', 'imdb.contenttype', 'imdb.thread']
    });
});


/*
 * validateCreds - validate the user has entered
 *                 DS creds, and set cookies.
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


/*
 * doCompile
 *
 * @return void
 *
 */
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
            log('DEBUG: Compile success - ' + JSON.stringify(jqXHR.responseJSON));
            if(jqXHR.responseJSON.hash && jqXHR.responseJSON.hash !== undefined){
                doCreate(jqXHR.responseJSON.hash);
            }

        },
        error: function (jqXHR, status) {
            log('ERROR: compile failed: ' + JSON.stringify(jqXHR.responseJSON));
        }
    });
}


/*
 * doCreate
 *
 * @return void
 *
 */
function doCreate (hash) {

    log('DEBUG: Staring preview...');

    /*
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
            log('DEBUG: Staring preview...');
        },
        error: function (jqXHR, status) {
            log('ERROR: compile failed: ' + JSON.stringify(jqXHR.responseJSON));
        }
    });

    */
}

/*
 * log
 *
 * @return void
 *
 */
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
*/