function Hand(parentObj)
{
    this.cards = [];
    this.parent = parentObj; // for raising alerts
    this.pointsMoreThan21 = false;
    this.isHitBlackJack = false;


    //  allow draw if cards on hand less than 5
    //  & points < 21
    //  & no blackJacks.
    function checkIfCanDrawCard()
    {

    }
}

Hand.prototype.drawCard = function()
{
    var result = false;
    var cards = this.cards.length;
    var cardValues = this.getCardsOnHandValue();




    if (cards < 3 ||
        (cardValues < 21 && cards !== 5))
    {
        this.cards.push(deck.pop());
        result = true; // draw card success.

        var newCardLength = this.cards.length;

        if (newCardLength === 2)
        {
            this.checkBlackJack();
        }
        else if (newCardLength === 5)
        {
            this.evaluate_5cards();
        }
    }
    else if (cards === 5)
    {
        alert('already at max: 5 cards.');
    }
    else if (cardValues === 21)
    {
        alert('your already at max points: 21.');
    }
    else if (cardValues > 21)
    {
        alert('Already bomb:\t' + cardValues + ' points.');
    }

    this.pointsMoreThan21 =
        this.getCardsOnHandValue() > 21;

    return result;
}

//  aces returned is a new array. Cannnot
//  be use Array.prototype.indexOf() ?
Hand.prototype.getACEs = function()
{
    var aces = this.cards.filter((elem) =>
    {
        return elem.isAce();
    });
    return (aces.length === 0) ? false : aces;
}
Hand.prototype.getNon_aces = function()
{
    var nonAces = this.cards.filter((elem) =>
    {
        return !elem.isAce();
    });
    return (nonAces.length === 0) ? false : nonAces;
}

Hand.prototype.lastCard = function()
{
    return this.cards[this.cards.length - 1];
}

//  tested ok.
Hand.prototype.evaluate_5cards = function()
{
    //   add up to see if more than 21
    // get all the ace cards. take them value as small as possible.

    var totalValue = 0;
    var acesFound = this.getACEs();

    if (acesFound)
    { //  otherwise value would be Nan
        totalValue += acesFound.length; // each ace value is 1..
    }

    // add up all them non ace cards
    totalValue +=
        this.cards.reduce((accum, elem) =>
        {
            return elem.isAce() ? accum : (accum + elem.getNumericalValue());
        }, 0);

    var userMsg;
    // total them value
    if (totalValue <= 21)
    {
        //  do something
        //  reveal cards or something.
        userMsg = 'You win! 5 cards less than 21.\n' + 'Your total points:\t' + totalValue;
        defaultAlertCaller(userMsg);
    }
    else
    {
        userMsg = '5 cards over 21:\t' + totalValue + ' points'
        defaultAlertCaller(userMsg);
        this.cardPointsOverLimit = true;
    }
}

Hand.prototype.evaluateTriple7 = function()
{
    var cards = this.cards;

    if (cards[0].getNumericalValue() === 7 &&
        cards[1].getNumericalValue() === 7 &&
        cards[2].getNumericalValue() === 7)
    {
        this.isHitBlackJack = true; //  might need to change to superJackpot or soemthing.
        defaultAlertCaller('Triple 7 hit!\n' +
            cards[0].cardName + '+\n' +
            cards[1].cardName + '+\n' +
            cards[2].cardName);
    }
}

Hand.prototype.checkBlackJack = function()
{
    var noOfCards = this.cards.length;
    var aceCardsFound = this.getACEs();

    if (noOfCards != 2 ||
        !aceCardsFound)
    {
        return false;
    }
    else if (aceCardsFound.length === 2 ||
             this.getCardsOnHandValue() === 21)
    {
        return true;
    }
    else
    {
        return false;
    }
}

Hand.prototype.getCardsOnHandValue = function()
{
    if (this.cards.length === 0)
        return 0;

    var acesFound = this.getACEs();
    var nonACEsFound = this.getNon_aces();
    var nonACEsValue = 0;

    if (nonACEsFound)
    {
        nonACEsValue = nonACEsFound.reduce((accum, elem) =>
        {
            return accum + elem.getNumericalValue();
        }, 0);
    }

    if (!acesFound)
    {
        return nonACEsValue;
    }
    else
    { //  deduced based on excel layout
        switch (acesFound.length)
        {
            case 1:
            {
                return (nonACEsValue <= 10) ? (11 + nonACEsValue) : (1 + nonACEsValue);
            }
            case 2:
            {
                return (nonACEsValue <= 9) ? (12 + nonACEsValue) : (2 + nonACEsValue);
            }
            case 3:
            {
                return (nonACEsValue <= 8) ? (13 + nonACEsValue) : (3 + nonACEsValue);
            }
            case 4:
            {
                return (nonACEsValue <= 7) ? (14 + nonACEsValue) : (4 + nonACEsValue);
            }
            default:
                break;
        }
    }
}
