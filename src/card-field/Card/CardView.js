import _ from 'lodash';
import Phaser from 'phaser';
import PhaserWrapper from 'phaserWrapper/PhaserWrapper';


import EventEmitter from 'external/EventEmitter';


import CardEvent from './CardEvent';


export default class CardView extends EventEmitter {
    static get CARD_WIDTH() {
        return 150;
    }


    static get CARD_HEIGHT() {
        return 200;
    }


    set faceUp (b) {
        let oldState = this._faceUp;
        this._faceUp = b;

        if (b !== oldState) {
            // TODO events
            this.render();
        }
    }
    get faceUp () { return this._faceUp; }


    set visible (b) { this._sprite.visible = b; }
    get visible () { return this._sprite.visible; }


    /**
     * @param {Object} point
     * @param {Number} point.x
     * @param {Number} point.y
     */
    set position(point) {
        this._sprite.x = point.x;
        this._sprite.y = point.y;

        //this.emit();
    }


    constructor(data) {
        super();

        this._sprite = null;
        this._data = data;

        this._faceUp = true;

        this.createView();
    }


    createView() {
        this._sprite = PhaserWrapper.game.make.sprite(
            0, 0
        );

        PhaserWrapper.addToGroup('cards', this._sprite);

        this.render();
    }


    render() {
        this._sprite.removeChild();

        this.addBg();
        if (this.faceUp) {
            this.addHeader()
                .addMiddle()
                .addFooter();
        }
    }


    enableDragAndDrop() {
        this._sprite.inputEnabled = true;
        this._sprite.input.enableDrag();
        this._sprite.events.onDragStart.add(this._onDragStart, this);
        this._sprite.events.onDragStop.add(this._onDragStop, this);
        //this._sprite.events.onDragUpdate.add(this._onDragUpdate, this);
    }


    addBg() {
        let bgImg = this.faceUp ? 'card_bg' : 'card_bg_facedown';

        let bg = PhaserWrapper.game.make.sprite(
            0, 0, bgImg
        );

        this._sprite.addChild(bg);

        return this;
    }

    addHeader() {
        var text = PhaserWrapper.game.make.text(
            5, 5,
            this._data.title,
            {
                font: "12px Arial",
                align: "center"
            }
        );

        this._sprite.addChild(text);

        return this;
    }

    addMiddle() {
        var text= PhaserWrapper.game.make.text(
            5, CardView.CARD_HEIGHT / 2,
            this._data.text,
            {
                font: "10px Arial",
                align: "center",
                fontStyle: "italic"
            }
        );

        this._sprite.addChild(text);

        return this;
    }

    addFooter() {
        var dmg = PhaserWrapper.game.make.text(
            25, CardView.CARD_HEIGHT - 25,
            this._data.dmg,
            {
                font: "18px Arial",
                align: "center",
                fill: 'black'
            }
        );

        var hp = PhaserWrapper.game.make.text(
            CardView.CARD_WIDTH - 25, CardView.CARD_HEIGHT - 25,
            this._data.health,
            {
                font: "18px Arial",
                align: "center",
                fill: 'red'
            }
        );

        this._sprite.addChild(dmg);
        this._sprite.addChild(hp);

        return this;
    }


    _onDragStart() {
        this.emit(CardEvent.START_DRAG);
        console.log(arguments);
    }


    _onDragStop() {
        console.log('stop', arguments);
        this.emit(CardEvent.STOP_DRAG);
    }


    _onDragUpdate(sprite, pointer, dragX, dragY, snapPoint) {

    }
}
