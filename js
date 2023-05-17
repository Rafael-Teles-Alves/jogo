document.addEventListener("DOMContentLoaded", function() {
  var word = "HELLO"; // Palavra a ser adivinhada
  var guessedLetters = []; // Letras adivinhadas pelo jogador
  var guesses = 6; // Número máximo de tentativas

  var wordContainer = document.getElementById("word-container");
  var guessesContainer = document.getElementById("guesses");
  var guessInput = document.getElementById("guess");
  var submitButton = document.getElementById("submit");

  // Inicializa o jogo
  function init() {
    displayWord();
    updateGuesses();
    guessInput.addEventListener("keyup", handleKeyUp);
    submitButton.addEventListener("click", handleGuess);
  }

  // Exibe as letras adivinhadas corretamente ou espaços para as letras desconhecidas
  function displayWord() {
    wordContainer.innerHTML = "";
    for (var i = 0; i < word.length; i++) {
      var letter = word[i];
      var displayLetter = guessedLetters.includes(letter) ? letter : "_";
      var letterSpan = document.createElement("span");
      letterSpan.textContent = displayLetter;
      wordContainer.appendChild(letterSpan);
    }
  }

  // Atualiza o número de tentativas restantes
  function updateGuesses() {
    guessesContainer.textContent = guesses;
  }

  // Manipula o evento de tecla pressionada
  function handleKeyUp(event) {
    if (event.keyCode === 13) {
      handleGuess();
    }
  }

  // Manipula a tentativa do jogador
  function handleGuess() {
    var guess = guessInput.value.toUpperCase();
    guessInput.value = "";

    if (guess.length !== 1 || !/[A-Z]/.test(guess)) {
      return;
    }

    if (guessedLetters.includes(guess)) {
      return;
    }

    guessedLetters.push(guess);

    if (!word.includes(guess)) {
      guesses--;
    }

    displayWord();
    updateGuesses();
    checkGameOver();
  }

  // Verifica se o jogo acabou
  function checkGameOver() {
    if (guesses === 0) {
      alert("Game Over! A palavra era: " + word);
      resetGame();
    } else if (guessedLetters.length === word.length) {
      alert("Parabéns! Você adivinhou a palavra corretamente!");
      resetGame();
    }
  }

  // Reinicia o jogo
  function resetGame() {
    guessedLetters = [];
    guesses = 6;
    displayWord();
    updateGuesses();
  }

  // Inicializa o jogo ao carregar a página
  init();
});
