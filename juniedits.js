    // Επιλογή των βασικών στοιχείων από το DOM
    const board = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-button');
    const matchCount = document.getElementById('matches-found');

    // Σύμβολα για τις κάρτες (διπλότυπα για ζεύγη) - Τώρα είναι διαδρομές εικόνων
    const symbols = [
      'Sprunki Sky.jpg',
      'Sprunki Vineria.jpg',
	  'Sprunki Durple.jpg',
      'Sprunki Oren.jpg',
	  'Sprunki Jevin.jpg',
      'Sprunki Pinki.jpg',
	  'Sprunki Raddy.jpg',
      'Sprunki Simon.jpg'
     
    ];
    let cards = [], flipped = [], matched = [], matches = 0, canFlip = true;

    // Ανακατεύει τυχαία έναν πίνακα
    function shuffle(array) {
      return array.sort(() => 0.5 - Math.random());
    }

    // Δημιουργεί μία κάρτα DOM με το σύμβολο (τώρα εικόνα)
    function createCard(symbol) {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.symbol = symbol; // Still store the symbol (image path) for comparison

      card.innerHTML = `
        <div class="card-face card-front"><img src="${symbol}" alt="card image"></div>
        <div class="card-face card-back"></div>
      `;
      card.addEventListener('click', () => flipCard(card));
      return card;
    }

    // Χειρίζεται το κλικ στην κάρτα
    function flipCard(card) {
      // Αν δεν επιτρέπεται ή έχει ήδη γυριστεί ή ταιριάξει, βγες
      if (!canFlip || card.classList.contains('flipped') || matched.includes(card)) return;

      // Γύρισε την κάρτα και αποθήκευσέ την
      card.classList.add('flipped');
      flipped.push(card);

      // Αν έχουν γυριστεί 2 κάρτες, έλεγξε για ταίριασμα
      if (flipped.length === 2) {
        canFlip = false;
        const [a, b] = flipped;

        if (a.dataset.symbol === b.dataset.symbol) {
          // Βρέθηκε ζεύγος
          matched.push(a, b);
          matches++;
          matchCount.textContent = matches;

          // Αλλαγή χρώματος με την προσθήκη της κλάσης "matched"
          a.classList.add('matched');
          b.classList.add('matched');

          flipped = [];
          canFlip = true;

          // Αν έχουν βρεθεί όλα τα ζεύγη
          if (matched.length === cards.length) {
            setTimeout(() => alert('Congratulations! You matched all the cards!'), 500);
          }
        } else {
          // Δεν είναι ίδιες – γύρισέ τις πίσω
          setTimeout(() => {
            a.classList.remove('flipped');
            b.classList.remove('flipped');
            flipped = [];
            canFlip = true;
          }, 1000);
        }
      }
    }

    // Εκκίνηση ή επανεκκίνηση του παιχνιδιού
    function startGame() {
      board.innerHTML = ''; // Καθάρισε το ταμπλό
      cards = shuffle([...symbols, ...symbols]); // Δημιουργία διπλών
      flipped = []; matched = []; matches = 0;
      matchCount.textContent = matches;
      canFlip = true;

      // Δημιουργία όλων των καρτών και προσθήκη στο ταμπλό
      cards.forEach(sym => board.appendChild(createCard(sym)));
    }

    // Εκκίνηση παιχνιδιού όταν φορτώνει η σελίδα
    resetBtn.addEventListener('click', startGame);
    window.addEventListener('DOMContentLoaded', startGame);
