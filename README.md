# MBTA-Schedule Web Application
### React App for displaying realtime MBTA schedules.

---

Current requirements:

A web application that shows live Commuter Rail departure board:

&nbsp;&nbsp;&nbsp;&nbsp;- The application should show the upcoming departures at North and South stations

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- the train destinations

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- the departure times

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- the track numbers

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- the boarding status (e.g. 'Boarding', 'All Aboard', 'Delayed')

---

## Notes/comments on assumptions made in code:

[Expect the destination to be the first value in the array](/src/components/DeparturesTable.jsx#L180-181)

[We should not add to the board when we receive a new event that has status of 'Departed'](/src/components/DeparturesTable.jsx#L199-200)

[We're using defaults specific to the requirements but have set up use for props](/src/components/DeparturesTable.jsx#L42-44)

[If we have a prediction with a "Cancelled" status it's departure time is null and is at the start of the array and there top of the board](/src/components/DeparturesTable.jsx#L213-219)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Useful MBTA links:

[https://www.mbta.com/developers](https://www.mbta.com/developers)

[Developer Portal](https://api-v3.mbta.com/portal)

[V3 API Swagger Documentation](https://api-v3.mbta.com/docs/swagger/index.html)

[Google Groups Forum](https://groups.google.com/forum/#!forum/massdotdevelopers)

## Currently deployed via heroku here:

[MBTA Schedule App](https://crw-mbta-schedule.herokuapp.com/)

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
