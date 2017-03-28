A comprehensive workout api to provide exercises and routine history to users without access to equipment.

# Galvanize Q2 Group Project Proposal

* This proposal is for a fullstack app, eventhough you will actually only build the serverside portion of it.
* 1 member from your team will need to fork this repo and update this README file with your proposal.
* Make sure to preview your proposal in a markdown preview and [use valid markdown syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
  * Unformatted/unreadable proposals will be rejected
* Create a Pull Request against this repo with your own repo.

## Team Name

 Powder Rangers

## Group Members

 * Sasha Berkowitz
 * Marty Yee

## Project/Application Name

 We're Nerds Dude!!

## Project Description

 * Users may sign up for an account on our app.
 * Users may send GET requests to view prearranged or custom workout routines.
 * Users may then send POST requests of custom workout routines.
 * Users may send PATCH requests to update/alter previous routines.
 * Users may also send DELETE requests to delete previous routines.
 * Workout routines contain stats on number of repetitions, timestamps, workout log.

 Stretch: Users can set their workout data to be either "private" or "public".
  Other users may view public workout data.

## Who uses it? (from the point of view of end users of your fullstack app)

 * Galvanize nerds who are in need of a workout.
 * Want to get in shape but too intimidated by the gym?
 * Get fit with body exercises in your office, library, or home.
 * No need for fancy equipment, learn workout routines, keep track of your workouts, log workout routines, and store favorite routines.

## What outputs do they need? (from the point of view of end users of your fullstack app)

 * GET requests sends user a json of a workout routine.
 * On POST, PATCH, DELETE requests, users are sent a confirmation of their updated workout data.

## What inputs are needed to generate those outputs? (from the point of view of end users of your fullstack app)

 * Users are required to input data values based on their workout routine, which includes name of the exercise and number of repetitions.

## What technologies do you plan to use? (server-side only)
* List libraries/frameworks you plan to use

 We plan on using:
   * Swagger
   * express
   * knex
   * body-parser
   * cookie-parser
   * cookie-session
   * jsonwebtoken
   * bcrypt
   * humps

## Feature list (both server side and client side)
* List all features in priority order (including stretch features):

  * Sign-Up: Creation of a user account
  * Sign-In: cookie/token, hashed password, validation
  * Favorites Section: with updateable information
  * History Section: workout history
  * Get: users receive information on their workouts
  * POST/PATCH: users send/update information on their workouts
  * Deleteable Content: account, workout routine, friends
  * Dev/Admin have a super-user account which grants access to all other "normal" user accounts, includes CRUD operations

 Stretch: Friends Section: private/public status on routines/logs

## End User wireframes. (Client side view of your app, which you won't be implimenting in Q2)
* This is to inform us and you of how someone may use your api to fill a need. This will also drive your user stories for the backend api.
* Include pictures of wireframes that you've drawn or you've made using a program, in this repo.

![](https://s4.postimg.org/gabav9b25/Q2_Front_End_Wireframe.jpg "Front End Wireframe")

User encounters homepage. May click on Log-In or Sign-Up.
Signed in users are redirected to members page.
Members page provides profile info, which includes weight, log of previous workout routines.

## Entity Relationship Diagrams (Server side)
* Include pictures of the diagrams that you've drawn or you've made using a program, in this repo.

![](https://s24.postimg.org/7fkxgku6d/We_re_Nerds_Dude.jpg "ERD")

## User Stories for completing the serverside.
* Use a tracking software like trello or gihub issues.
* Should include all API end points as well details on the input and output to these endpoints
  * Non-Registered users may only do GET requests for predefined workout routines
  * User makes /user POST request to sign-up for User Account, response confirmation
  * User makes /user POST request for user authentication, response confirmation
  * User makes /routines GET request to obtain prearranged Routines, Excercise, Favorites, Routine Log
  * User makes /routines/:id GET request to obtain specific Routine
  * User makes /routines/:id/exercises GET request to obtain Exercises for each Routine
  * User makes /users/:user_id/routines/ POST request to create custom Routine, response confirmation
  * User makes /users/:user_id/routines/:id PATCH request to update custom Routine, response confirmation
  * User makes /users/:user_id/routines/:id DELETE request to delete custom Routine, response confirmation
  * User makes /users/:user_id/favorites GET request to obtain favorite Routines
  * User makes /users/:user_id/favorites/:id GET request to obtain specific favorite Routine
  * User makes /users/:user_id/favorites POST to add Routine to favorites, response confirmation
  * User makes /users/:user_id/favorites/:id DELETE to remove Routine to favorites, response confirmation
  * User makes /users/:user_id/log/ GET to add a routine log entry, response confirmation
  * User makes /users/:user_id/log/ POST to add a routine log entry, response confirmation
  * User makes /users/:user_id/log/:id PATCH to update a routine log entry, response confirmation
  * User makes /users/:user_id/log/:id DELETE to delete log entry, response confirmation
  * User makes /users/:user_id/weight GET to obtain Weight Log
  * User makes /users/:user_id/weight POST to post weight entry, response confirmation
  * User makes /users/:user_id/weight/:id PATCH to update weight entry, response confirmation
  * User makes /users/:user_id/weight/:id DELETE to delete weight entry, response confirmation

  * Set up Swagger framework
  * Create tests for app
  * Set up database migrations
  * Set up table references
  * Seed database with data
  * Set up validation for creation of User Account
  * Set up cookie tokens for User log-in
  * Integrate 3rd party API
  * Set up responses for requests
  * Set up admin accounts (superuser)
  
Wireframes:
https://s4.postimg.org/gabav9b25/Q2_Front_End_Wireframe.jpg

Entity Relationship Diagram:
https://s23.postimg.org/5f8o7jnsb/We_re_Nerds_Dude_ERD_-_Page_1.jpg
