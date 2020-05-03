/**
 * This constructor creates an object capable of handling all the API comms
 * Only one instance of this object is required per page used
 * The constructor is self invoked at the end of the file 
 * 
 */
function SpaceXApi() {
    this.endpoints = {
        launches: 'https://api.spacexdata.com/v3/launches'
    }
    this.activeXHR = null;

}

/**
 * Fire off a new request to the API
 *
 */
SpaceXApi.prototype.requestData = function(endpoint) {

    if (typeof this.endpoints[endpoint] === 'undefined') {
        console.warn('Invalid endpoint requested: '+endpoint);
        return;
    }

    // if there is already an xhr in progress, abort it before continuing
    if (this.activeXHR && this.activeXHR.readyState !== 4) {
        this.activeXHR.abort();
        delete this.activeXHR;
    }

    var xhr =  new XMLHttpRequest();
    this.activeXHR = xhr;
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }

        SpaceXApi.prototype.processResponse.call(this, xhr.responseText);
    }.bind(this)

    xhr.open('GET', this.endpoints[endpoint]);
    xhr.send();
};


/**
 * The API response is passed directly into this function
 * This function is to check for API errors and parse the relevant data
 *
 * @param {Object} res - API's response in the exact state it was received
 */
SpaceXApi.prototype.processResponse = function(res) {
    var data = JSON.parse(res);
    console.log(data);
};


window.spaceX = new SpaceXApi();