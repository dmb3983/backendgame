# backendgame

Based on Wes Bos' <a href="https://learnnode.com/" target="_blank" >Learn Node Course</a>

#Interpretation of the prompt and assumptions that you have made

The assumptions that I made for this project were as follows.
1.	The developer would need the option to update games and stats.
2.	An admin should be the only person to be able to delete a player or game (Sys Admin).
3.	The game stats would be stored in a nested object (player) with fields for achievements, headshot and kills.
4.	The player collection would contain user name and registration details.
 
#API you would expose and data models you would use. Any technology(s) can be used here. 

1.	The Rest API would expose the player and game data to the dev/Admin. This would be done using mongoose(via express) to connect to the MongoDB.
2.	MongoDB was chosen for its extensibility, performance, and security. It would scale from 2 to 16 players without any issues. MongoDB can set different permission level for as many user types as necessary. This way the game player could view there stats via a read-only connection from the API.
3.	The app schemas from Mongoose would setup required fields for the data manipulation ensuring that the required fields were filled in and making sure the types were correct.
4.	Passport.js would be used for authentication of the User. Passport salts the password and makes user Registration extremely simple and secure. 
5.	The template that was chosen had the passport.js and mongoose setup built in, minimizing my work on customizing those setups (User, database setup)

