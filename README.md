# Might As Well Jump

## 🎶 I get up and nothin' gets me down 🎵 _(get that server up!)_

1. Run `npm install`.
2. Run `ng serve` (or `npm run start`) and visit the app at `http://localhost:4200`.
3. Run `ng test` (or `npm run test`) to execute the unit tests.
4. Run the API at `http://localhost:8005/api` (instructions in relevant repo);

## 🎶 You got it tough, I've seen the toughest around 🎵 _(not so tough endpoints)_

The app utilizes the following API requests:

- GET /api/systemusers
- GET /api/systemusers/{id}
- POST /api/systemusers
- PUT /api/systemusers/{id}
- DELETE /api/systemusers/{id}

## 🎶 And I know, baby, just how you feel 🎵 _(when you see README screenshots)_
![home](/src/assets/docs/home.png)

## 🎶 You got to roll with the punches and get to what's real 🎵 _(show me the real user data!)_
![users_directory](/src/assets/docs/users_directory.png)

## 🎶 Ah, can't you see me standin' here 🎵 _(waiting for you to add me as a user!)_
![users_directory](/src/assets/docs/add_user.png)

## 🎶 I got my back against the record machine 🎵 _(edit that record!)_
![users_directory](/src/assets/docs/edit_user.png)

## 🎶 I ain't the worst that you've seen 🎵 _(not too shabby coverage)_

Testing Coverage Summary

- Statements   : 92.42% ( 122/132 )
- Branches     : 81.25% ( 13/16 )
- Functions    : 86% ( 43/50 )
- Lines        : 91.45% ( 107/117 )
  
## 🎶 Ah, can't you see what I mean? 🎵 _(about future enhancements?)_

Future Enhancements

- sorting Users Directory on columns
- more editable fields for users
- more sophisticated form validation
- better types for API response data (based upon a contractural agreement with the API regarding appropriate schemas)
- better error handling with API calls (display messages to users)
- better testing for error handling
- displaying error messages on form submission errors (username is already taken, email is already taken, etc.)
- using NgRx effects instead of route snapshots
- ghost content for edit form while loading

## 🎶 Ah, might as well jump ([jump](https://www.youtube.com/watch?v=SwYN7mTi6HM)) 🎵