var ds_user = '';
var ds_key = '';

//init
$(function() {

    // cookies
    if($.cookie('un') && $.cookie('key')){
        $('#un').val($.cookie('un')) === $.cookie('un');
        $('#key').val($.cookie('key')) === $.cookie('key');
    }

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
    return true;
};


/*
 * initPreview - build params and calls
 * historic preview
 *
 */
function initPreview (hash){
    var params  = {};
    params.start = Math.floor((Date.now() / 1000) - (60 * 60 * 3)); // start is 3 hours ago
    params.end = Math.floor((Date.now() / 1000) - (60 * 60 * 2)); // end is 2 hours ago
    params.hash = hash;
    params.sources = 'twitter';
    params.parameters = 'language.tag,freqDist,10';

    doCreate(serialize(params));
}


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
                // start historic preview
                initPreview(jqXHR.responseJSON.hash);
            } else {
                log('ERROR: Compile failed - no hash received: ' + JSON.stringify(jqXHR.responseJSON));
            }
        },
        error: function (jqXHR, status) {
            log('ERROR: Compile failed: ' + JSON.stringify(jqXHR.responseJSON));
        }
    });
}


/*
 * doCreate
 *
 * @return void
 *
 */
function doCreate (params) {

    log('DEBUG: Staring preview...');

    jQuery.ajax({
        type: "POST",
        url: "http://localhost:3000/api/create",
        contentType: "application/json; charset=utf-8",
        data: params,
        dataType: "json",
        headers: {
            "Authorization": ds_user + ':' + ds_key
        },
        success: function (data, status, jqXHR) {
            log('DEBUG: Historic preview create success: ' + JSON.stringify(jqXHR.responseJSON));
            getPreview(jqXHR.responseJSON.id);
        },
        error: function (jqXHR, status) {
            log('ERROR: historic preview create failed: ' + JSON.stringify(jqXHR.responseJSON));
        }
    });
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
 * serialize - obj to URI encoded string
 *
 * @param - obj - {foo: "hi there", bar: "100%" }
 * @return - string - foo=hi%20there&bar=100%25
 */
function serialize(obj) {
    var str = [];
    for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return str.join("&");
}


/*
 * getPreview - poll historic preview
 * until a 200 is received.
 *
 */
function getPreview (id) {
    var intervalID = setInterval(function() {
        jQuery.ajax({
            type: "GET",
            url: "http://localhost:3000/api/preview/"+id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                "Authorization": ds_user + ':' + ds_key
            },
            success: function (data, status, jqXHR) {
                log('DEBUG: Preview status: ' + JSON.stringify(jqXHR.responseJSON.progress));

                if(jqXHR.status === 200) {
                    log('DEBUG: Preview complete: '+ JSON.stringify(jqXHR.responseJSON));
                    clearInterval(intervalID);
                }
            },
            error: function (jqXHR, status) {
                log('ERROR: historic preview create failed.');
            }
        });
    }, 5000);
}
