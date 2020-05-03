var calendarTable = document.querySelector('.month-calendar');
var calendar = new Calendar({
    tableElement: calendarTable,
    callbacks: {
        dateChanged: calendarDateChanged,
        eventClicked: eventClicked
    }
});

// These can be triggered immediately as all dependenies are ready on load
calendar.updateCalendarMonth();
spaceX.getNextLaunch();

function calendarDateChanged(month, year) {
    spaceX.getLaunches(year);
};

function eventClicked(event) {
    var eventData = JSON.parse(event.target.dataset.launchData);
    updateSelectedLaunch(eventData);
};

var selectedLaunch = document.querySelector('.selected-launch');
function updateSelectedLaunch(eventData) {
    
    document.querySelector('.select-placeholder').style.display = "none";

    var launchDate = new Date(eventData.date);
    var launchTime = launchDate.toTimeString();

    selectedLaunch.querySelector('.launch-date').textContent = launchDate.toString().split(" ").slice(0, 4).join(' ');
    selectedLaunch.querySelector('.launch-time').textContent = launchTime;
    selectedLaunch.querySelector('.rocket-name').textContent = eventData.rocket || '-';
    selectedLaunch.querySelector('.launch-details').textContent = eventData.details || '-';
    selectedLaunch.style.display = "block";
};

var nextLaunch;
function startLaunchCountdown(launchInfo) {
    var launchInfo = JSON.parse(launchInfo);
    nextLaunch = launchInfo.launch_date_local;
    updateLaunchCountdown();
};

var launchTimer = document.querySelector('.time-to-launch');
function updateLaunchCountdown() {
    // if this function runs before the launch data is available, continue the 1s loop but don't do anything 
    if (nextLaunch) {
        var currentDate = new Date();
        var launchDate = new Date(nextLaunch);

        // convert to seconds between the launch
        var timeUntilLaunch = ((launchDate.getTime() - currentDate.getTime())/1000).toFixed(0);
        var daysTillLaunch = (timeUntilLaunch/60/60/24).toFixed(0);

        launchTimer.querySelector('.days').textContent = daysTillLaunch+ ' days';
        launchTimer.querySelector('.seconds').textContent = "T-minus "+ timeUntilLaunch + " seconds";
        
    }

  setTimeout(updateLaunchCountdown, 1000);  
};

function launchesLoaded(launches) {
    var launchList = [];
    for (var launch in launches) {
        var singleLaunch = {
            title: launches[launch].mission_name,
            rocket: launches[launch].rocket.rocket_name,
            date: launches[launch].launch_date_local,
            details: launches[launch].details,
            icon: '🚀'
        };
        launchList.push(singleLaunch);
    }
    calendar.addEvents(launchList);
}