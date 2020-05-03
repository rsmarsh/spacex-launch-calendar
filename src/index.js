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


function updateLaunchCountdown() {

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