Form a team with 2 other developers who are in the same sprint (the mentor can help you). You will need to build the project, an API that supports a dice game.

Here are the rules of the game:

- The dice game is played with two six-sided dice
- If the result of both dice is 7, the game is won. If not, it is lost.
- To be able to play the game you must register as a player with a name. A player can see a list of all the rolls they have made and their success percentage.
- To be able to make a draw, a user must register with a non-repeated name. Upon creation, it is assigned a unique identifier and a registration date.

If the user wishes, he/she may not add a name and it will be called "ANONYMOUS". There can be more than one "ANONYMOUS" player.

- Each player can see a list of all the rolls they have made with the value of each die and whether or not they have won the game. In addition, you can know the percentage of success of the rolls you have made.
- You cannot delete a specific game, but you can delete a player's entire roll list. The software must be able to list all the players in the system, the success percentage of each player and the average success percentage of all the players in the system.
- The software must respect the main design patterns.

You should consider the following construction details:

POST /players: Create a player.
PUT /players/{id}: modifies the name of the player.
GET /players: returns the list of all the players in the system with their percentage of successes.
POST /games/{id}: A specific player makes a roll.
DELETE /games/{id}: Deletes the player's rolls.
GET /games/{id}: returns the list of games played by a player.
GET /ranking: returns a ranking of players sorted by success percentage and the average success percentage of all players.
GET /ranking/loser: returns the player with the worst success rate.
GET /ranking/winner: returns the player with the best percentage of success.

Level 1

Persistence: Uses MySQL as database (with Sequelize as ORM).
Level 2

Create a front-end to test functionality

Level 3

Persistence: Uses MongoDB (with Mongoose) as the database.


investigar union types en typescript


structure for MVC

.
├── jest.config.js
├── migrations
├── package.json
├── package-lock.json
├── src
│   ├── controllers
│   │   ├── GameController.ts
│   │   └── PlayerController.ts
│   ├── models
│   │   ├── GameModel.ts
│   │   ├── PlayerModel.ts
│   └── views
│       ├── gameView.ts
│       └── playerView.ts
├── server
│   ├── app.ts
│   ├── routes
│   │   ├── gameRoutes.ts
│   │   ├── playerRoutes.ts
│   └── server.ts
├── scripts
│   ├── dicegameafterivanmodel.sql
│   ├── dicegamedtababasemodified.sql
│   ├── dicegamewithint.sql
│   └── insertData.ts
├── tsconfig.json
└── tsconfig.prod.json
