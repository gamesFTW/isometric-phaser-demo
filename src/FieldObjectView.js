import R from 'ramda';

import Phaser from 'phaser';
import PhaserWrapper from 'phaserWrapper/PhaserWrapper';
import FiledObjectsViewEvent from 'FiledObjectsViewEvent';


import EventEmitter from 'external/EventEmitter';


export default class FieldObjectView extends EventEmitter {
    /**
     * @returns {number}
     * @const
     */
    static get SIZE() { return 50; }


    /**
     */
    get position() {
        return {x: this._x, y: this._y};
    }


    /**
     * @param {Object} point
     * @param {Number} point.x
     * @param {Number} point.y
     */
    set position(point) {
        this._x = point.x;
        this._y = point.y;

        if (this._sprite) {
            this._sprite.x = point.x * FieldObjectView.SIZE;
            this._sprite.y = point.y * FieldObjectView.SIZE;
        }

        this.emit(FiledObjectsViewEvent.MOVED);
    }


    constructor(x, y) {
        super();

        this._x = null;
        this._y = null;
        this._isHighlighted = false;

        /**
         * @protected
         */
        this._sprite = null;


        this.position = {x: x, y: y};
    }


    dispose() {
        this._sprite.kill();
    }


    addHandlers() {
        this._sprite.inputEnabled = true;
        this._sprite.events.onInputDown.add(this._onClick, this);
        this._sprite.events.onInputOver.add(this._onOver, this);
        this._sprite.events.onInputOut.add(this._onOut, this);
    }


    highlightOn() {}


    highlightOff() {}


    _onClick(event, pointer) {
        if (PhaserWrapper.game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)) {
            this.emit(FiledObjectsViewEvent.CTRL_CLICK);
        } else {
            this.emit(FiledObjectsViewEvent.CLICK);
        }
    }


    _onOver(event) {
        this.emit(FiledObjectsViewEvent.OVER);
    }


    _onOut(event) {
        this.emit(FiledObjectsViewEvent.OUT);
    }


    //onDblClick() {
    //    this.emit(FiledObjectsViewEvent.DBL_CLICK);
    //}
}
