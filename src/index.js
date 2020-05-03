var calendarTable = document.querySelector('.month-calendar');
var calendar = new Calendar({
    tableElement: calendarTable,
    callbacks: {
        dateChanged: calendarDateChanged,
        eventClicked: eventClicked
    }
});
calendar.updateCalendarMonth();

function calendarDateChanged(month, year) {
    spaceX.getLaunches(year);
};

function eventClicked(event) {

};

var selectedLaunch = document.querySelector('.selected-launch');
function updateSelectedLaunch(event) {
    var eventData = JSON.parse(event.target.dataset.launchData);

    var launchDate = new Date(eventData.date);
    var launchTime = launchDate.getTime();

    selectedLaunch.querySelector('.launchTime').textContent = launchTime;
    selectedLaunch.querySelector('.rocket-name').textContent = eventData.rocket;
    selectedLaunch.querySelector('.launch-details').textContent = eventData.details;
    debugger;
};


function updateLaunchCountdown() {

};

function launchesLoaded(launches) {
    var launchList = [];
    for (var launch in launches) {
        var singleLaunch = {
            title: launches[launch].mission_name,
            rocket: launches[launch].rocket_name,
            date: launches[launch].launch_date_local,
            details: launches[launch].details,
            icon: '🚀'
        };
        launchList.push(singleLaunch);
    }
    calendar.addEvents(launchList);
}