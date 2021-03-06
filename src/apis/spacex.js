/**
 * This constructor creates an object capable of handling all the API comms
 * Only one instance of this object is required per page used
 * The constructor is self invoked at the end of the file 
 * 
 */
function SpaceXApi() {
    this.endpoints = {
        launches: 'https://api.spacexdata.com/v3/launches',
        nextLaunch: 'https://api.spacexdata.com/v3/launches/next'
    }
    this.activeXHR = null;
    this.dataCache = {};

}

SpaceXApi.prototype.getLaunches = function(year) {
    var params = {};
    if (year) {
        params['launch_year'] = year;
    }
    this.requestData("launches", params)  
};

SpaceXApi.prototype.getNextLaunch = function(year) {
    this.requestData("nextLaunch", {}, window.startLaunchCountdown, true);
};



/**
 * Fire off a new request to the API
 *
 */
SpaceXApi.prototype.requestData = function(endpoint, params, customCallback, conflictFree) {

    var callback = SpaceXApi.prototype.processResponse.bind(this);
    if (typeof customCallback === 'function') {
        callback = customCallback;
    }

    if (typeof this.endpoints[endpoint] === 'undefined') {
        console.warn('Invalid endpoint requested: '+endpoint);
        return;
    }
    
    params = params || {};
    var queryParams = "?";
    for (var param in params) {
        queryParams+='&';
        queryParams+= param+'='+params[param];
    }


    // if there is already an xhr in progress, abort it before continuing
    if (!conflictFree && this.activeXHR && this.activeXHR.readyState !== 4) {
        this.activeXHR.abort();
        delete this.activeXHR;
    }

    var requestUrl = this.endpoints[endpoint]+queryParams;

    // use memoization to prevent making identical API requests more than once
    if (!conflictFree && this.dataCache[requestUrl]) {
        callback(this.dataCache[requestUrl]);
        return;
    }

    var xhr =  new XMLHttpRequest();
    this.activeXHR = xhr;
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        this.dataCache[requestUrl] = xhr.responseText;
        callback(xhr.responseText);
    }.bind(this)

    xhr.open('GET', this.endpoints[endpoint]+queryParams);
    xhr.send();
};


/**
 * The API response is passed directly into this function
 * This function is to check for API errors and parse the relevant data
 *
 * @param {Object} res - API's response in the exact state it was received
 */
SpaceXApi.prototype.processResponse = function(res) {
    if (res === "") {
        return;
    }
    var data = JSON.parse(res);

    if (typeof window.launchesLoaded === "function") {
        launchesLoaded(data);
    }


};


window.spaceX = new SpaceXApi();