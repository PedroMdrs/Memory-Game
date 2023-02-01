let game = {

    cards: null,
    waifus: [
        'ana',
        'gosling',
        'hancock',
        'ichika',
        'mai',
        'makima',
        'marin',
        'nagase',
        'nasuna',
        'nino',
    ],

    firstCard: null,
    secondCard: null,
    lockMode: false,

    setCards: function(id) {
        let card = this.cards.filter(card => card.id == id)[0];
        if(card.flipped == true || this.lockMode == true ){
            return false;
        }
        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }


    },
    checkMatch: function (){

        if(!this.firstCard || !this.secondCard){
            return false;
        }

        return this.firstCard.icon == this.secondCard.icon

    },
    clearCards: function() {
        this.lockMode = false;
        this.firstCard = null;
        this.secondCard = null
    },
    unflipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards()
    },
    checkGameOver: function(){

        return this.cards.filter(card => !card.flipped).length == 0

    },

    createCardsFromWaifus: function () {
        this.cards = []

        this.waifus.forEach(waifu => {
            this.cards.push(this.createWaifuPair(waifu))
        });
        this.cards = this.cards.flatMap(card => card)
        this.shuffleCards(this.cards)
        return this.cards
    },

    createWaifuPair: function (waifu) {

        return [{
            id: this.createId(waifu),
            icon: waifu,
            flipped: false,
        }, {
            id: this.createId(waifu),
            icon: waifu,
            flipped: false,
        }]

    },

    createId: function (waifu) {
        return waifu + Math.round(Math.random() * 100)
    },

    shuffleCards: function () {

        let currentIndex = this.cards.length;
        let randomIndex = 0

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];

        }
    },














}
