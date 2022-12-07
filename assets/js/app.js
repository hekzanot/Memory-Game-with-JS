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

for(let card of cards) {
    card.addEventListener('click', show);
}
let openCards = [];
let matchedCards = [];
function show(e) {
  // İkiden fazla kart açılmasını engelle
    if (openCards.length >= 2) {
        return;
    }

  // Açık kartları diziye push'la
    e.target.classList.add('open', 'show');
    openCards.push(e.target);
    console.log(openCards, openCards.length);

  // Açık kartları bir süre sonra kapatın
    if (openCards.length === 2) {
        match();
    }
}

function match() {
    if (openCards[0].firstElementChild.classList.value === openCards[1].firstElementChild.classList.value) {
        openCards.map(function(card) {
            card.className = 'card match';
            matchedCards.push(card);
        });
        openCards = [];
        console.log(matchedCards, matchedCards.length);
    } else {
  // Eşleşmezlerse kartları gizle
        setTimeout(function() {
            for(let opencard of openCards) {
                opencard.classList.remove('open', 'show');
            }
            openCards = [];
            console.log(openCards, openCards.length);
        }, 1500);
    }
}