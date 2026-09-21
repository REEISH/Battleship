# Battleship 

A classic, interactive web-based adaptation of the iconic board game Battleship. Strategically place your fleet, fire at enemy coordinates, and be the first to sink all your opponent's ships! 

## Features

* **Interactive Gameboard:** A fully responsive and dynamic grid system for both the player and the opponent.
* **Two Game Modes:** 
  * **Player vs. Computer:** Test your tactical skills against an AI opponent.
  * **Player vs. Player (Local):** Pass and play against a human opponent on the same screen.
* **Drag-and-Drop Ship Placement:** Intuitively build your fleet. Click, drag, and drop your ships directly onto the grid before the battle begins. 
* **Real-time Feedback:** Visual indicators for hits, misses, and sunken ships.

## Demo


> **Live Preview:** [Play Battleship Here](https://reeish.github.io/Battleship/) 


## Technologies Used

* **HTML5:** Game structure and grid layout.
* **CSS3:** Styling, grid animations, and drag-and-drop visual states.
* **JavaScript (ES6):** Game logic, drag-and-drop integration, opponent logic, and DOM manipulation.

## Installation & Setup

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/battleship-game.git](https://github.com/REEISH/battleship-game.git)
   ```
2. **Navigate to the project directory:**
   ```bash
   cd src/battleship-game
   ```
3. **Run the game:**
   Simply open the `index.html` file in your preferred web browser. No local server or build tools are required.

## How to Play

1. **Choose your Game Mode:** Select whether you want to play against the Computer or another Human.
2. **Deploy Your Fleet:** Use your mouse to drag your ships from the dock and drop them onto your grid. You can rotate ships by clicking on them before dragging.
3. **Lock Coordinates:** Once all ships are placed, confirm your board to start the game.
4. **Fire:** Take turns clicking on the enemy's grid to guess where their ships are hiding. 
5. **Win the Game:** The first player to successfully find and sink all enemy ships wins!

## Roadmap & Future Enhancements

- [ ] Add an Online Multiplayer mode using WebSockets (Socket.io).
- [ ] Implement a "Smart" AI that uses probability grids instead of random guessing.
- [ ] Add sound effects for hits, misses, and victory/defeat screens.
- [ ] Mobile touch support for the drag-and-drop placement phase.

## License

Distributed under the MIT License. See `LICENSE` for more information.
