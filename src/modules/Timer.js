import React, { Component } from 'react';
import './Timer.css';

const INTERVALS = [1000, 60, 60, 24, 7];

function twoDigits(v) {
    return ('0' + v).substr(-2);
}

export default class Timer extends Component {
    constructor(props) {
        super();

        this._iterate = this._iterate.bind(this);
        this._start = props.start;
        this.state = this._offset();
    }

    render() {
        let text = '';

        const {
            direction,
            weeks,
            days,
            hours,
            minutes,
            seconds
        } = this.state;

        if (direction === 1) {
            text = `w${weeks}d${days} ${hours}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
        } else {
            text = 'Времени не осталось';
        }

        return (
            <div className="timer">{text}</div>
        );
    }

    componentDidMount() {
        this._iterate();
    }

    /**
     * Выполняет проверку дат и выводит оставшееся время
     */
    _iterate() {
        const offset = this._offset();

        this.setState(offset);

        if (offset.direction !== 1) {
            return;
        }

        this._timeout = setTimeout(this._iterate, 1000);
    }

    /**
     * Вычисляет расстояние между датами
     * @param {Date} [from]
     * @returns {Object}
     */
    _offset(from) {
        from = from || new Date();

        let offset = (this._start - from);
        let direction = offset > 0 ? 1 : offset < 0 ? -1 : 0;

        offset = Math.abs(offset);

        let result = INTERVALS.map(function(value) {
            var result = offset % value;

            offset = (offset - result) / value;

            return result;
        });

        return {
            milliseconds: result[0],
            seconds: result[1],
            minutes: result[2],
            hours: result[3],
            days: result[4],
            weeks: offset,
            direction: direction
        };
    }
}
