A comprehensive workout api to provide exercises and routine history to users without access to equipment.

## Team Name

 Powder Rangers

## Group Members

 * Sasha Berkowitz
 * Marty Yee

## Application Name

 We're Nerds Dude!!

## Project Description

 * Users may sign up for an account on our app.
 * Users may send GET requests to view prearranged or custom workout routines.
 * Users may then send POST requests of custom workout routines.
 * Users may send PATCH requests to update/alter previous routines.
 * Users may also send DELETE requests to delete previous routines.
 * Workout routines contain stats on number of repetitions, timestamps, workout log.

## Who uses it?

 * Galvanize nerds who are in need of a workout.
 * Want to get in shape but too intimidated by the gym?
 * Get fit with body exercises in your office, library, or home.
 * No need for fancy equipment, learn workout routines, keep track of your workouts, log workout routines, and store favorite routines.

## Our Technologies

 We are using:
   * Swagger
   * express
   * knex
   * body-parser
   * cookie-parser
   * cookie-session
   * jsonwebtoken
   * bcrypt
   * humps

## Feature list

  * Sign-Up: Creation of a user account
  * Sign-In: cookie/token, hashed password, validation
  * Favorites Section: with updateable information
  * History Section: workout history
  * Get: users receive information on their workouts
  * POST/PATCH: users send/update information on their workouts
  * Deleteable Content: account, workout routine, friends
  * Dev/Admin have a super-user account which grants access to all other "normal" user accounts, includes CRUD operations

## End User wireframes

* This is to inform us and you of how someone may use your api to fill a need. This will also drive your user stories for the backend api.
* Include pictures of wireframes that you've drawn or you've made using a program, in this repo.

![]https://s4.postimg.org/gabav9b25/Q2_Front_End_Wireframe.jpg

User encounters homepage. May click on Log-In or Sign-Up.
Signed in users are redirected to members page.
Members page provides profile info, which includes weight, log of previous workout routines.

## Entity Relationship Diagrams

* Include pictures of the diagrams that you've drawn or you've made using a program, in this repo.

![]https://s23.postimg.org/5f8o7jnsb/We_re_Nerds_Dude_ERD_-_Page_1.jpg

Wireframes:
https://s4.postimg.org/gabav9b25/Q2_Front_End_Wireframe.jpg

Entity Relationship Diagram:
https://s23.postimg.org/5f8o7jnsb/We_re_Nerds_Dude_ERD_-_Page_1.jpg
