# MBTA-Schedule Web Application
### React App for displaying realtime MBTA schedules.

#### Currently deployed via heroku here:

[MBTA Schedule App](https://crw-mbta-schedule.herokuapp.com/)

#### Be sure to set your API KEY [(gotten here)](https://api-v3.mbta.com/portal)

Used in the code [here](/src/components/DeparturesTable.jsx#L17)

---

#### Current requirements:

A web application that shows live Commuter Rail departure board:

&nbsp;&nbsp;&nbsp;&nbsp;- The application should show the upcoming departures at North and South stations - including:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- The train destinations

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- The departure times

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- The track numbers

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- The boarding status (e.g. 'Boarding', 'All Aboard', 'Delayed')

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- I add a column for the name of the station since we're getting data for two stations on one board

---

## Notes/comments on assumptions made in code (they link to relevant portion of code):

[Expect the destination to be the first value in the array](/src/components/DeparturesTable.jsx#L178-L179)

[We should not add to the board when we receive a new event that has status of 'Departed'](/src/components/DeparturesTable.jsx#L197-L198)

[We're using defaults specific to the requirements but have set up use for props](/src/components/DeparturesTable.jsx#L42-L44)

[If we have a prediction with a "Cancelled" status it's departure time is null and is at the start of the array and there top of the board](/src/components/DeparturesTable.jsx#L211-L217)

[Since this is the MBTA we always know the timezone!](/src/utils/formatTime.js#L9-L10)

[Left a note about possibly making station names header configurable](/src/components/BoardHeader.jsx#L5)

[Replaced slashes with hyphens to match image of board at North Station](/src/components/CurrentDate.jsx#L29-L30)

---

## Useful MBTA links:

[https://www.mbta.com/developers](https://www.mbta.com/developers)

[Developer Portal](https://api-v3.mbta.com/portal)

[V3 API Swagger Documentation](https://api-v3.mbta.com/docs/swagger/index.html)

[Google Groups Forum](https://groups.google.com/forum/#!forum/massdotdevelopers)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
