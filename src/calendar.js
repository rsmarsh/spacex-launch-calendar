/**
 * Contructor function to create a monthly calendar
 *
 * @param {Object} config - any properties found witin this object will overwrite defaults
 */
function Calendar(config) {
    if (!config.tableElement) {
        console.error("Calendar initialised without a target HTML element.");
        return;
    }

    this.table = config.tableElement;
    this.prepareTable();
    this.tableBody = this.table.querySelector('tbody');
};

Calendar.prototype.prepareTable = function() {

    // clear any existing data from the table
    this.table.innerHTML = "";
    
    this.addDayHeadings();

    this.table.appendChild(document.createElement('tbody'));
    this.createDayCells();
    
    
};

/**
 * Populates the thead with days of the week
 *
 */
Calendar.prototype.addDayHeadings = function() {

    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var thead = document.createElement('thead'); 
    thead.innerHTML = "";
    thead.classList.add('weekday-headers');

    days.forEach(function(day){
        var heading = document.createElement('th');
        heading.textContent = day;
        thead.appendChild(heading);
    });

    this.table.appendChild(thead);

};

/**
 * Invokes itself once from the constructor function on initialisation
 * This function creates the table body and adds all the empty calendar table td cells
 *
 */
Calendar.prototype.createDayCells = function() {
    var weeksToDisplay = 6;
    var dayIndex = 0;
    var tbody = this.table.querySelector('tbody');
    

    // for each week to display, create a row and fill it with 7 weekday cells
    for (var weekNum = 1; weekNum <= weeksToDisplay; weekNum++) {
        var row = document.createElement('tr');
        row.classList.add('week-row');
        
        for (var dayNum = 1; dayNum <= 7; dayNum++) {
            var dayCell = document.createElement('td');
            
            dayCell.classList.add('index-'+dayIndex);
            dayCell.classList.add('day-'+dayNum);
            if (dayNum > 5) {
                dayCell.classList.add('weekend-cell');
            }
            row.appendChild(dayCell);

            dayIndex+=1;
        }

        tbody.appendChild(row);
    }

};

/**
* Updates the current month being displayed within the calendar
* This will typically be the next/previous month
* 
* @param {Number|String} [month] - the month to display (zero indexed). if undefined uses current month
*/
Calendar.prototype.updateCalendarMonth = function(month, year) {

    // this.tableBody.innerHTML = "";

    if (isNaN(month) || month < 0 || month >= 12 ) {
        month = new Date().getMonth();
    }

    if (isNaN(year) ) {
        year = new Date().getFullYear();
    }

    
    
    // capture what the users local date is so today's date can be highlighted
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();

    // work out what the month to be displayed is and the details of its days
    var monthToDisplay = new Date(year, month);
    var monthStartDay = new Date(year, month, 1).getDay()-1; // +1 because getDay() works on Sunday -> Saturday weeks
    // wrap around when a month starts on a Sunday
    if (monthStartDay === -1) {
        monthStartDay = 6;
    }

    var monthLabel = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ][monthToDisplay.getMonth()];

    // update the calendar heading with month/year label
    document.querySelector('.calendar-area .month-displayed').textContent = monthLabel;

    // find the total days in this month by setting it to the next month, and use 0 to get the day before
    var monthLength = new Date(year, month+1, 0).getDate();

    // iterate through each week, adding the day number labels
    var dayRows = this.table.querySelectorAll('.week-row');


    var dayIndex = monthStartDay;
    var dayOfMonth = 1;

    // add the number of day cells required by this month
    while (dayIndex < monthLength) {
        var dayCell = this.getDayCellByIndex(dayIndex);
        dayCell.textContent = dayOfMonth;
        dayOfMonth+=1;
        dayIndex+=1;
    }

   // TODO: if this day matches today's date, add a highlight class

   // TODO: check if this day has an event, add info if so (this may be done via a second function)

   // TODO: check how many empty cells are below/after this month and add in the correct numbers
};

Calendar.prototype.getDayCellByIndex = function(index) {
    return this.table.querySelector('.index-'+index);
}

Calendar.prototype.addEvents = function(eventList) {
    eventList.forEach(Calendar.prototype.addEvent, this);
};

Calendar.prototype.addEvent = function(event) {
    console.log("add event:", event);
};