import EventEmitter from 'external/EventEmitter';

var Card = MeteorApp.Card;
var Action = MeteorApp.Action;


class Backend extends EventEmitter {
    get CARD_MOVED() { return 'Backend:cardMoved'}
    get CARD_REMOVED() { return 'Backend:cardRemoved'}
    get CARD_TAPPED() { return 'Backend:cardTapped'}
    get CARD_UNTAPPED() { return 'Backend:cardUntapped'}


    constructor() {
        super();

        this.listenServerActions();
    }

    listenServerActions() {
        //TODO ХАК для того что бы все прошлые эвенты не пожгружались
        var initializing = true;

        Action.find().observe({
            added: function(action) {
                if(!initializing) {
                    this.emit(action.type, action.params);
                }
            }.bind(this)
        });

        initializing = false;
    }


    // ----------------------- Getters -----------------------
    // TODO: move it to class.
    getCards() {
        return Card.find().fetch().map(function(card) {
            // TODO здесь хочется сделать нормальное отбрасывание ненужного из cardData
            // TODO Тоесть хочется отдавать только нужно для создание карты у плеера
            var cardData = card;
            cardData['id'] = cardData['_id'];
            delete cardData['_id'];

            return cardData;
        });
    }


    // ----------------------- Setters -----------------------
    // TODO: move it to class.
    removeCard(id) {
        Meteor.call('removeCard', id);
    }


    moveCardTo(id, position) {
        Meteor.call('moveCard', id, position);
    }


    tapCard(id) {
        Meteor.call('tapCard', id);
    }


    untapCard(id) {
        Meteor.call('untapCard', id);
    }
}


export default new Backend();
