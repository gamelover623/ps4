/* =====================================================================
 sophus3-freestuff-EU_5.5.9h-20170811b
 =====================================================================*/
if (typeof s3_logging_active === 'undefined') {s3_logging_active = true; }

/* =========================== Customisation ===========================*/
var s3_pw_set = {'server': 'edx-it.sophus3.com', 'pwid': 22, 'ckDomain': '*.freestuff.eu', 'domains': ['*.freestuff.eu']};

function llgHashID() {
    return document.getElementsByName('md5Data')[0].value;
}

/*=====================================================================*/

/*=========================== StandardCode ============================*/
/*             DO NOT MAKE CHANGES TO THE CODE BELOW !                */
//Opt-Out
if(s3getParam('s3optout') === '1' || s3getParam('s3aearoptout') === '1' || s3getParam('s3hmoptout') === '1' || s3getParam('s3troptout') === '1'){
    s3_logging_active = false;
    s3load("//scripts.sophus3.com/s3f/optout", "s3optout.html");
}

function s3checkOptOut(service){
    if(s3getCookieValue("s3optout", "s3totaloptout") === "yes"){
        s3_logging_active = false;
        return true;
    }
    else if(service === "tr" && s3getCookieValue("s3optout", "s3troptout") === "yes"){
        s3_logging_active = false;
        return true;
    }
    else if (service === "aear" && s3getCookieValue("s3optout", "s3aearoptout") === "yes"){
        return true;
    }
    else if(service === "hm" && s3getCookieValue("s3optout", "s3hmoptout") === "yes"){
        return true;
    }
    else{
        return false;
    }
}

if (typeof tc_page_alias !== 'undefined') { //Compatibility with old version tagging
    s3_page_alias = tc_page_alias;
}

if (typeof s3_page_alias !== 'undefined' && location.search !== null && location.search.length > 1) {
    s3_page_alias += (s3_page_alias.indexOf('?') === -1) ? location.search : "&" + location.search.substring(1)
}

/* ================================ PW ================================*/
if(typeof s3pwdone === 'undefined' 	&& s3checkOptOut("tr") === false
    && typeof s3_pw_set !== 'undefined' && typeof Piwik === 'undefined'
    && typeof _paq === 'undefined' && typeof s3_pw_set.server !== 'undefined'
    && typeof s3_pw_set.pwid !== 'undefined'){
    var s3_paq = s3_paq || [];
    (function() {
        try{
            s3_paq.push(['setDocumentTitle', window.location.href]);
            s3_paq.push(['setCookieDomain', s3_pw_set.ckDomain]);
            s3_paq.push(['setDomains', s3_pw_set.domains]);
            s3_paq.push(['enableLinkTracking']);
            if (typeof s3_page_alias !== 'undefined') {
                s3_paq.push(['setCustomUrl', s3_page_alias + ' (c)']);
            }
            s3_paq.push(['setCustomVariable', 1, 'llgHashID', llgHashID(), 'visit']);
            s3_paq.push(['trackPageView']);

            var u = '//' + s3_pw_set.server + '/';
            s3_paq.push(['setTrackerUrl', u+'tracking.php']);
            s3_paq.push(['setSiteId', s3_pw_set.pwid]);
            var d=document, sophus3g=d.createElement('script'), sophus3s=d.getElementsByTagName('script')[0];
            sophus3g.type='text/javascript'; sophus3g.async=true; sophus3g.defer=true; sophus3g.src=u+'tracking.js'; sophus3s.parentNode.insertBefore(sophus3g,sophus3s);
        }catch( err ) {}
    })();
    var s3pwdone = 1;
}
/*=====================================================================*/

var s3LogType = "s3def"; //default logtype

function s3listed(lstObject) {
    try {
        var i = 0;

        var currentPath = window.location.pathname.toLowerCase();
        var currentURL = document.URL.toLowerCase();
        var currentDomain = document.URL.substring(document.URL.indexOf('//')+2, document.URL.indexOf('http://www.freestuff.eu/', document.URL.indexOf('//')+2));//document.domain.toLowerCase();
        currentDomain = currentDomain.toLowerCase();

        for (i = 0; i < lstObject.lstPattern.length; i = i + 1) {
            if (currentURL.indexOf(lstObject.lstPattern[i].toLowerCase()) !== -1) {
                return true;
            }
        }
        for (var i = 0; i < lstObject.lstDomains.length; i = i + 1) {
            if (currentDomain === lstObject.lstDomains[i].toLowerCase()) {
                return true;
            }
        }
        for (i = 0; i < lstObject.lstPath.length; i = i + 1) {
            if (currentPath === lstObject.lstPath[i].toLowerCase()) {
                return true;
            }
        }
        return false;
    } catch (err){
        return false;
    }
}

function s3load(path, script){
    var scriptEl = document.createElement('script');
    var scriptLst = document.getElementsByTagName('script')[0];

    try{
        scriptEl.type = 'text/javascript';
        scriptEl.async = true;
        scriptEl.src = path + '/' + script;
        scriptLst.parentNode.insertBefore(scriptEl, scriptLst);
    }
    catch(e){}
}

function s3setCookie(c_name, c_text, exdays, c_domain){
    try{
        var  t_value = '', t_expires = '', exdate = new Date(), t_domain = '';
        if (exdays) {
            exdate.setDate(exdate.getDate() + exdays);
            t_expires = '; expires=' + exdate.toUTCString();
        }
        if (c_domain) {
            t_domain = '; domain=' + c_domain;
        }
        t_value = encodeURIComponent(c_text) +  t_expires + '; path=/' + t_domain;
        document.cookie = c_name + '=' + t_value;
    } catch(e){}
}

function s3readCookie(c_name) {
    try{
        var searchname = c_name + '=';
        var ca = document.cookie;
        var c = "";
        var i = 0;
        ca = ca.split(';');
        for (i = 0; i < ca.length; i = i + 1) {
            c = ca[i];
            while (c.charAt(0) === ' ') {c = c.substring(1, c.length); }
            if (c.indexOf(searchname) === 0) {return decodeURIComponent(c.substring(searchname.length, c.length)); }
        }
        return 'undefined';
    } catch(e){
        return 'undefined';
    }
}

function s3setCookieValue(c_name, v_name, v_value, exdays) {
    var oldc_text = s3readCookie(c_name), c_text = '', oldv_text = '', newv_text = '';
    if (oldc_text.indexOf(v_name) > -1) {
        oldv_text = v_name + ':' + s3getCookieValue(c_name, v_name);
        newv_text = v_name + ':' + v_value;
        c_text = s3_replace(oldc_text, oldv_text, newv_text);
    } else if (oldc_text != 'undefined') {
        c_text = oldc_text + '&' + v_name + ':' + v_value;
    } else {
        c_text = v_name + ':' + v_value;
    }
    s3setCookie(c_name, c_text, exdays, cookieDomain);
}

function s3getCookieValue(c_name, v_name) {
    var s3ckie = s3readCookie(c_name);
    var qsParm = [];
    if (s3ckie.indexOf(v_name + ':') >= 0) {
        var parms = s3ckie.split('&');
        for (var i = 0; i < parms.length; i = i + 1) {
            var pos = parms[i].indexOf(':');
            if (pos > 0) {
                var key = parms[i].substring(0,pos);
                var val = parms[i].substring(pos+1);
                qsParm[key] = val;
            }
        }
        return qsParm[v_name];
    }
}

function s3_replace(mainstring,searchstring,replacestring) {
    if (mainstring.indexOf(searchstring)>=0){
        return mainstring.substring(0,mainstring.indexOf(searchstring))+replacestring+mainstring.substring(mainstring.indexOf(searchstring)+searchstring.length,mainstring.length)
    }
    else return mainstring;
}

function s3getParam(paramName) {
    var qsParm = [];
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    var i = 0, pos =0, key = '', val = '', retval = '';
    for (i = 0; i < parms.length; i = i + 1) {
        pos = parms[i].indexOf('=');
        if (pos > 0) {
            key = parms[i].substring(0, pos);
            val = parms[i].substring(pos + 1);
            qsParm[key] = val;
        }
    }
    retval = (typeof qsParm[paramName] !== 'undefined') ? qsParm[paramName] : '';
    return retval;
}

function s3_log(alias, displayed) {
    try{
        if (typeof s3_paq !== 'undefined'){
            s3_paq.push(['trackEvent', 's3_log', alias]);
        }
    }catch(err){}
}
