document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div"); // Target each square in the grid
    const status = document.getElementById("status"); // Access the status message container
    const newGameButton = document.querySelector(".btn"); // Select the New Game button
    let isXTurn = true; // Initialize the game with X’s turn
  
    // Define all possible winning combinations (rows, columns, and diagonals)
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    squares.forEach((square) => {
      square.classList.add("square"); // Add base styling to each square
  
      // Click event to handle marking squares with X or O
      square.addEventListener("click", () => {
        if (!square.textContent && !status.classList.contains("you-won")) { // Proceed only if square is empty and no one has won
          const playerSymbol = isXTurn ? "X" : "O";
          square.textContent = playerSymbol; // Set X or O in the square
          square.classList.add(playerSymbol); // Apply the class for styling
  
          if (checkWinner(playerSymbol)) { // Check if the current player has won
            status.textContent = `Congratulations! ${playerSymbol} is the Winner!`; // Update status message
            status.classList.add("you-won"); // Apply the winning style
          } else {
            isXTurn = !isXTurn; // Toggle turn
          }
        }
      });
  
      // Mouseover and mouseleave events for hover effect
      square.addEventListener("mouseover", () => {
        if (!square.textContent) {
          square.classList.add("hover"); // Add hover effect if square is empty
        }
      });
  
      square.addEventListener("mouseleave", () => {
        square.classList.remove("hover"); // Remove hover effect on mouse exit
      });
    });
  
    // Click event for resetting the game when "New Game" button is pressed
    newGameButton.addEventListener("click", () => {
      squares.forEach(square => {
        square.textContent = ""; // Clear the X or O from each square
        square.classList.remove("X", "O"); // Remove the X and O classes
      });
      status.textContent = "Move your mouse over a square and click to play an X or an O."; // Reset status message
      status.classList.remove("you-won"); // Remove the winning style
      isXTurn = true; // Reset the game to start with X’s turn
    });
  
    // Function to determine if the current player has a winning combination
    function checkWinner(playerSymbol) {
      return winningCombinations.some(combination => {
        return combination.every(index => squares[index].textContent === playerSymbol);
      });
    }
  });
  