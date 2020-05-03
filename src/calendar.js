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

    this.addEventListeners();
};

Calendar.prototype.prepareTable = function() {

    // clear any existing data from the table
    this.table.innerHTML = "";
    
    this.addDayHeadings();

    this.table.appendChild(document.createElement('tbody'));
    this.createDayCells();
    
    
};

Calendar.prototype.addEventListeners = function() {
    var prevBtn = document.querySelector('.calendar-header .prev-btn');
    var nextBtn = document.querySelector('.calendar-header .next-btn');

    prevBtn.addEventListener('click', function(){
        this.updateCalendarMonth(this.monthDisplayed-1);
    }.bind(this));

    nextBtn.addEventListener('click', function(){
        this.updateCalendarMonth(this.monthDisplayed+1);
    }.bind(this));
    
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
 * Invokes itself once from the constructor function on initialisation, and to initialise different months
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
Calendar.prototype.updateCalendarMonth = function(month) {

    this.tableBody.innerHTML = "";
    this.createDayCells();

    if (isNaN(month)) {
        month = new Date().getMonth();
    }

    if (isNaN(this.yearDisplayed) ) {
        this.yearDisplayed = new Date().getFullYear();
    }

    if (month < 0) {
        month+=12;
        this.yearDisplayed-=1;
    }

    if (month >= 12) {
        month-=12;
        this.yearDisplayed+=1
    }

 
    // so the next/previous arrows can work, keep track of the latest month being displayed
    this.monthDisplayed = month;
    
    // capture what the users local date is so today's date can be highlighted
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();

    // work out what the month to be displayed is and the details of its days
    var monthToDisplay = new Date(this.yearDisplayed, this.monthDisplayed);
    var monthStartDay = new Date(this.yearDisplayed, this.monthDisplayed, 1).getDay()-1; // +1 because getDay() works on Sunday -> Saturday weeks
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
    document.querySelector('.calendar-area .month-displayed').textContent = monthLabel + ' ' + this.yearDisplayed ;

    // find the total days in this month by setting it to the next month, and use 0 to get the day before
    var monthLength = new Date(this.yearDisplayed, this.monthDisplayed+1, 0).getDate();

    var dayIndex = 0;
    var dayOfMonth = 1;

    // add the number of day cells required by this month
    while (dayIndex < 6*7) { // 6 weeks * 7 days
        var dayCell = this.getDayCellByIndex(dayIndex);

        if (dayIndex >= monthStartDay && dayOfMonth <= monthLength) {
            dayCell.textContent = dayOfMonth;
            dayCell.classList.add('month-day-'+dayIndex);
            
            if (this.monthDisplayed === currentMonth && this.yearDisplayed === currentYear && dayOfMonth === currentDay) {
                dayCell.classList.add('today');
            }

            dayOfMonth+=1;

            
        } else {
            
        }

        dayIndex+=1;

    }

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

