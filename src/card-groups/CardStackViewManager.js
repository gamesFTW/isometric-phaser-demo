import _ from 'lodash';


import CardViewManager from './CardViewManager';


export default class CardStackViewManager extends CardViewManager {
    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} faceUp
     * @param {Number} scale - не работает
     */
    constructor({x: x, y: y, faceUp: faceUp, scale: scale = 1}) {
        super(...arguments);
    }


    /**
     * @param {Card[]} cards
     */
    reorderCards(cards) {
        var cardsViews = cards.map(card => card.cardView);

        var firstCardView = _.first(cardsViews);
        if (firstCardView) {
            firstCardView.visible = true;
            this.placeCard(firstCardView, this._x, this._y);
        }

        _.rest(cardsViews).forEach(cv => cv.visible = false);
    }
}
