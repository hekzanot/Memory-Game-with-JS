/*
  * Tüm kartlarınızı içeren bir liste oluşturun
  */


/*
  * Sayfadaki kartları görüntüleyin
  * - aşağıda sağlanan "shuffle" yöntemini kullanarak kart listesini karıştırın
  * - her kartta dolaşın ve HTML'sini oluşturun
  * - her kartın HTML'sini sayfaya ekleyin
  */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
  * Bir kart için event listener ayarlayın. Bir kart tıklanırsa:
  * - kartın sembolünü görüntülişlevselliği, buradan çağırdığınız başka bir fonksiyona koyun)
  * - kartı "open" kartlar *list*ine ekleyin (bu işlevselliği buradan çağırdığınız başka bir fonksiyona koyun)
  * - listede zaten başka bir kart varsa, iki kartın eşleşip eşleşmediğini kontrol edin
  * + kartlar eşleşirse, kartları açık konumda kilitleyin (bu işlevselliği, buradan çağırdığınız başka bir işleve koyun)
  * + kartlar eşleşmiyorsa, kartları listeden kaldırın ve kartın sembolünü gizleyin (bu işlevselliği, buradan çağırdığınız başka bir fonksiyona koyun)
  * + hareket sayacını artırın ve sayfada görüntüleyin (bu işlevselliği, buradan çağırdığınız başka bir fonksiyona koyun)
  * + tüm kartlar eşleşirse, son skoru içeren bir mesaj görüntüler (bu işlevselliği, buradan çağırdığınız başka bir fonksiyona koyun)
  */

const cards = document.querySelectorAll('.card');
const moves = document.querySelector('.moves');
const restartBtn = document.querySelector('.restart');
moves.textContent = 0;

restartBtn.addEventListener('click', restart);

for(let card of cards) {
    card.addEventListener('click', show);
}
let openCards = [];
let matchedCards = [];
function show(e) {
  // İkiden fazla kart açılmasını engelle
    if (openCards.length >= 2 || e.target.classList.contains('open', 'show') || e.target.classList.contains('match') || e.target.classList.contains('fa')) {
        return;
    }

  // Açık kartları diziye push'la
    e.target.classList.add('open', 'show');
    openCards.push(e.target);
    console.log(openCards, openCards.length);

  // Açık kartları bir süre sonra kapatın
    if (openCards.length === 2) {
        moves.textContent ++;
        match();
        console.log(openCards.length, matchedCards.length);
    }
}
  

function match() {
    if (openCards[0].firstElementChild.classList.value === openCards[1].firstElementChild.classList.value) {
        openCards.map(function(card) {
            card.className = 'card match';
            matchedCards.push(card);
        });
        setTimeout(finalScore, 500);
        openCards = [];
        // console.log(matchedCards, matchedCards.length);
    } else {
  // Eşleşmezlerse kartları gizle
        setTimeout(function() {
            for(let opencard of openCards) {
                opencard.classList.remove('open', 'show');
            }
            openCards = [];
            // console.log(openCards, openCards.length);
        }, 1500);
    }
}

function finalScore() {
  const modal = document.querySelector('.modal');
  const closeModal = document.querySelector('.close');
  const score = document.querySelector('#total-moves');

  closeModal.addEventListener('click', close);

  if (matchedCards.length === 16) {
      modal.style.display = 'block';
      score.textContent = moves.textContent;
  }

  function close() {
      modal.style.display = 'none';
  }
}

function restart() {
  if (openCards.length === 0 && matchedCards.length === 0) {
      return;
  }

  matchedCards.map(function(card) {
      card.classList.remove('match');
  });

  openCards.map(function(card) {
      card.classList.remove('open', 'show');
  });

  moves.textContent = 0;
  openCards = [];
  matchedCards = [];
}