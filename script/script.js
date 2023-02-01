
const CARD = 'card'
const FRONT = 'card_front'
const BACK = 'card_back'
const ICON = 'icon'
let gameOverLay = document.getElementById('gameOver')

startGame();


function startGame() {
    game.createCardsFromWaifus(this.waifus)
    createVisualCards(this.cards);
}
function createVisualCards() {
    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = ''
    game.cards.forEach(card => {
        let container = document.createElement('div');
        container.classList.add(CARD);
        container.id = card.id
        container.dataset.icon = card.icon;
        gameBoard.appendChild(container)
        createCardFace(FRONT, card, container)
        createCardFace(BACK, card, container)
        container.addEventListener('click', flipCard)
    });



}

function createCardFace(face, card, container) {

    if (face == FRONT) {
        let cardFace = document.createElement('div')
        cardFace.classList.add(FRONT)
        let cardFaceContent = document.createElement('img')
        cardFaceContent.src = "./images/" + card.icon + '.jpg'
        cardFaceContent.classList.add('icon')
        cardFace.appendChild(cardFaceContent)
        container.appendChild(cardFace)
    } else {
        let cardFace = document.createElement('div')
        cardFace.classList.add(BACK)
        cardFace.innerHTML = "waifu"
        container.appendChild(cardFace)
    }

}
function flipCard() {
    if (game.setCards(this.id)) {
        this.classList.add('flip')
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards()
                if (game.checkGameOver()) {
                    setTimeout(() => {
                        gameOverLay.style.display = 'flex'
                    }, 1000);
                }
            } else {

                setTimeout(() => {

                    let firstCard = document.getElementById(game.firstCard.id)
                    let secondCard = document.getElementById(game.secondCard.id)
                    firstCard.classList.remove('flip')
                    secondCard.classList.remove('flip')
                    game.unflipCards()
                }, 1000);
            }

        }
    }

}
function restartGame() {
    startGame();
    game.clearCards()
    gameOverLay.style.display = 'none'
}