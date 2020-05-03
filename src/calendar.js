/**
 * Contructor function to create a monthly calendar
 *
 * @param {Object} config - any properties found witin this object will overwrite defaults
 */
function Calendar(config) {
    
}

/**
* Updates the current month being displayed within the calendar
* This will typically be the next/previous month
* 
* @param {Number|String} [month] - the month to display (zero indexed). if undefined uses current month
*/
Calendar.prototype.updateCalendarMonth = function(month) {
   if (isNaN(month) || month < 0 || month >= 12 ) {
       month = new Date().getMonth();
   }

   var currentDate = new Date();
   var currentMonth = currentDate.getMonth();
   var currentDay = currentDate.getDate();

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
   ][month];

   // TODO: update calendar heading with month/year label

   // TODO: find the starting day for the selected month

   // TODO: find the total number of days in the selected month

   // TODO: iterate through each week, adding the day number labels

   // TODO: if this day matches today's date, add a highlight class

   // TODO: check if this day has an event, add info if so (this may be done via a second function)

   // TODO: check how many empty cells are below/after this month and add in the correct numbers
};

Calendar.prototype.addEvents = function(eventList) {
    eventList.forEach(Calendar.prototype.addEvent, this);
};

Calendar.prototype.addEvent = function(event) {
    console.log("add event:", event);
};