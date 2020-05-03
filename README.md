# SpaceX Launch Calendar
## Details
This project is a vanilla zero-dependency SPA, with the aim of populating a calendar with upcoming SpaceX launches for the current year.


## Live Demo
- [Demo page](https://romantic-lamport-8d77ca.netlify.app/) (hosted by Netlify)


## Additional Info

### Relevant projects
Other earlier projects past which make use of public and private APIs:
- Office TV Dashboard
  - Parsing and stripping out relevant financial data from a large spreadsheet using the Google Sheets API to display the current day's earnings.
  - Regular polling of the OpenWeatherMap API to receive the current weather at the location of the office. 
- Twitter API
  - Using the twitter API to create bots which react to spefic trigger words. Resulting in various actions on the local machine.
- Facebook API
  - Created a live LED counter showcasing the number of 'page likes' a business has, displayed to their customers on entry.
- Banking API
  - Using a banks open API (Monzo), users could authorize access via OAuth2 to produce a map view of their spendings powered by Mapbox.


### Best approach
Before the first line of code is written, This section establishes guidelines for what the project must contain to be considered feature complete. The technology stack used is considered.

Required Features: 
 - Calendar view of the current year
 - Area to highlight the time/days until the next launch
 - Minimal view of a launch showing most important info
 - Area to display info for a selected launch

Tech Requirements:
 - Browser friendly (ES5, only using compatible Grid/Flex features).
 - Responsive layout for different devices.
 - No third-party frameworks, vanilla JS will be required to create a templating feature.
### Future improvements and considerations for future projects
 - Investigate SpaceX API for known issues such as "Next launch" endpoint returning a date in the past. 
 - Allow more time for adding JSDoc comments to all functions.
 - Style improvements on the calendar events.
 - Map of launch location
 - Allow more time for the project.

 