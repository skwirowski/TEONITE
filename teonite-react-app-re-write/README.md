# TEONITE - Front-end test task
## Author: Paweł Skwirowski
### To start application clone this repository and use npm install command

### Completed tasks description
1.  Application is written with ReactJS library.
2.  All application functionalities listed in task requirements are included.
3.  Default URL address is routed from localhost:3000 to localhost:3000/stats.
4.  Due to docker environment problems in Windows 8.1 and no access to Teonite blog's API I used <https://randomuser.me/> free API
5.  Application fetches data from API i. a. first and last name, id, password consisting of 40-50 lower and upper case letters.
6.  Fetched data is used to create User Interface:
      * author selection field (`<select>` & `<option>`)
      * buttons with actions assigned to them
      * results table
7.  Password string is divided into an array of single characters/letters and used as replacement of words used by blog authors (which should have been fetched from Teonite blog's API)
8.  Characters/letters are counted and sorted by number of occurrences in the array.
9. Application is styled using React-Bootstrap v.3.

### Undone tasks description
1.  Docker environment is not set and running - i should have worked in Linux environment.
2.  Redux library for managing application state is not implemented - I run out of time.
3.  Redux-saga middleware library is not implemented - due to the same reason as above - I run out of time.

---
[My GitHub Profile](https://github.com/skwirowski "Paweł Skwirowski GitHub")