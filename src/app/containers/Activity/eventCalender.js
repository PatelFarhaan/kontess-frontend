/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import moment from 'moment';
import { getFetch } from "../../../utils/fetchRequests";
import * as session from "../../../utils/session";
import './style.scss'
import { Loading } from '../../globals/contants';

export default class EventCalender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perPage: 100,
            userType: '',
            loading: true
        };
    }
    getAllEvents = async (date) => {
        this.setState({
            loading: true
        })
        let month = moment(date).month() + 1;
        let year = moment(date).year();
        let events = await getFetch(`event/month-wise-event/?month=${month}&year=${year}`).then((resp) => {
            if (resp.status === 200) {
                return resp.data;
            }
        }).catch(err => {
            return [];
        })
        let tasks = await getFetch(`participant_task/month-wise-listing/?month=${month}&year=${year}`).then((resp) => {
            if (resp.status === 200) {
                return resp.data;
            }
        }).catch(err => {
            return [];
        })
        let eventList = [];
        await events.concat(tasks).map(event => {
            if (event.title || event.task.status !== 'submit') {
                let temp = {};
                temp.id = event.id;
                temp.type = event.title ? 'Event' : 'Task';
                temp.title = event.title ? event.title : event.task.title;
                temp.eventDate = event.title ? moment(event.schedule_date, 'YYYY-MM-DD HH:mm A') : moment(this.state.userType === 'judge' ? event.task.grade_due_date : event.task.submission_due_date, 'YYYY-MM-DD HH:mm A');
                temp.location = event.title ? event.location : '';
                temp.color = event.title ? moment() < moment(temp.eventDate, 'YYYY-MM-DD HH:mm A') ? 'green' : 'orange' : moment() < moment(temp.eventDate, 'YYYY-MM-DD HH:mm A') ? 'blue' : 'red';
                temp.calendar = temp.color === 'green' ? 'Upcoming event' : temp.color === 'orange' ? 'Past event' : temp.color === 'blue' ? 'Due task' : 'Past due task'
                eventList.push(temp)
            }
        });
        this.setState({
            loading: false
        })
        return eventList;
    }
    componentWillMount = async () => {
        let userType = await session.getUserType();
        let userId = await session.getSessionUserId();
        this.setState({
            userType: userType,
            userId: userId
        }, () => {
            this.renderCalender();
        })

    }


    renderCalender = async () => {
        let currentSelf = this;
        var today = moment();
        let userType = this.state.userType;
        function Calendar(selector, events, current) {
            this.el = document.querySelector(selector);
            this.events = events;
            this.current = moment(current).date(1);
            this.draw();
            var current = document.querySelector('.today');
            if (current) {
                var self = this;
                window.setTimeout(function () {
                    self.openDay(current);
                }, 500);
            }
        }

        Calendar.prototype.draw = function () {
            //Create Header
            this.drawHeader();
            //Draw Month
            this.drawMonth();
            if (this.events.length) {
                this.drawLegend();
            }

        }

        Calendar.prototype.drawHeader = function () {
            var self = this;
            if (!this.header) {
                //Create the header elements
                this.header = createElement('div', 'header');
                this.header.className = 'header';

                this.title = createElement('h1');

                var right = createElement('div', 'right');
                right.addEventListener('click', function () { self.nextMonth(); });

                var left = createElement('div', 'left');
                left.addEventListener('click', function () { self.prevMonth(); });

                //Append the Elements
                this.header.appendChild(this.title);
                this.header.appendChild(right);
                this.header.appendChild(left);

                this.el.appendChild(this.header);
            }

            this.title.innerHTML = this.current.format('MMMM YYYY');
        }

        Calendar.prototype.drawMonth = function () {
            var self = this;

            this.events.forEach(function (ev) {
                ev.date = self.current.clone().date(moment(ev.eventDate).format('D'));
            });


            if (this.month) {
                this.oldMonth = this.month;
                this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
                this.oldMonth.addEventListener('webkitAnimationEnd', function () {
                    self.oldMonth.parentNode.removeChild(self.oldMonth);
                    self.month = createElement('div', 'month');
                    self.backFill();
                    self.currentMonth();
                    self.forwardFill();
                    self.el.appendChild(self.month);
                    window.setTimeout(function () {
                        self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
                    }, 16);
                });
            } else {
                this.month = createElement('div', 'month');
                this.el.appendChild(this.month);
                this.backFill();
                this.currentMonth();
                this.forwardFill();
                this.month.className = 'month new';
            }
        }

        Calendar.prototype.backFill = function () {
            var clone = this.current.clone();
            var dayOfWeek = clone.day();

            if (!dayOfWeek) { return; }

            clone.subtract('days', dayOfWeek + 1);

            for (var i = dayOfWeek; i > 0; i--) {
                this.drawDay(clone.add('days', 1));
            }
        }

        Calendar.prototype.forwardFill = function () {
            var clone = this.current.clone().add('months', 1).subtract('days', 1);
            var dayOfWeek = clone.day();

            if (dayOfWeek === 6) { return; }

            for (var i = dayOfWeek; i < 6; i++) {
                this.drawDay(clone.add('days', 1));
            }
        }

        Calendar.prototype.currentMonth = function () {
            var clone = this.current.clone();

            while (clone.month() === this.current.month()) {
                this.drawDay(clone);
                clone.add('days', 1);
            }
        }

        Calendar.prototype.getWeek = function (day) {
            if (!this.week || day.day() === 0) {
                this.week = createElement('div', 'week');
                this.month.appendChild(this.week);
            }
        }

        Calendar.prototype.drawDay = function (day) {
            var self = this;
            this.getWeek(day);
            //Outer Day
            var outer = createElement('div', this.getDayClass(day));
            outer.addEventListener('click', function () {
                self.openDay(this);
            });

            //Day Name
            var name = createElement('div', 'day-name', day.format('ddd'));

            //Day Number
            var number = createElement('div', 'day-number', day.format('DD'));


            //Events
            var events = createElement('div', 'day-events');
            this.drawEvents(day, events);

            outer.appendChild(name);
            outer.appendChild(number);
            outer.appendChild(events);
            this.week.appendChild(outer);
        }

        Calendar.prototype.drawEvents = function (day, element) {
            if (day.month() === this.current.month()) {
                var todaysEvents = this.events.reduce(function (memo, ev) {
                    if (ev.date.isSame(day, 'day')) {
                        memo.push(ev);
                    }
                    return memo;
                }, []);

                todaysEvents.forEach(function (ev) {
                    var evSpan = createElement('span', ev.color);
                    element.appendChild(evSpan);
                });
            }
        }

        Calendar.prototype.getDayClass = function (day) {
            let classes = ['day'];
            if (day.month() !== this.current.month()) {
                classes.push('other');
            } else if (today.isSame(day, 'day')) {
                classes.push('today');
            }
            return classes.join(' ');
        }

        Calendar.prototype.openDay = function (el) {
            var details, arrow;
            var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
            var day = this.current.clone().date(dayNumber);
            var currentOpened = document.querySelector('.details');

            //Check to see if there is an open detais box on the current row
            if (currentOpened && currentOpened.parentNode === el.parentNode) {
                details = currentOpened;
                arrow = document.querySelector('.arrow');
            } else {
                //Close the open events on differnt week row
                //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
                if (currentOpened) {
                    currentOpened.addEventListener('webkitAnimationEnd', function () {
                        currentOpened.parentNode.removeChild(currentOpened);
                    });
                    currentOpened.addEventListener('oanimationend', function () {
                        currentOpened.parentNode.removeChild(currentOpened);
                    });
                    currentOpened.addEventListener('msAnimationEnd', function () {
                        currentOpened.parentNode.removeChild(currentOpened);
                    });
                    currentOpened.addEventListener('animationend', function () {
                        currentOpened.parentNode.removeChild(currentOpened);
                    });
                    currentOpened.className = 'details out';
                }

                //Create the Details Container
                details = createElement('div', 'details in');

                //Create the arrow
                var arrow = createElement('div', 'arrow');

                //Create the event wrapper

                details.appendChild(arrow);
                el.parentNode.appendChild(details);
            }

            var todaysEvents = this.events.reduce(function (memo, ev) {
                if (ev.date.isSame(day, 'day')) {
                    memo.push(ev);
                }
                return memo;
            }, []);
            this.renderEvents(todaysEvents, details, day);

            arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
        }

        Calendar.prototype.renderEvents = function (events, ele, day) {
            //Remove any events in the current details element
            var currentWrapper = ele.querySelector('.events');
            var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

            events.forEach(function (ev) {
                var div = createElement('div', 'event');
                var divName = createElement('div');
                var square = createElement('div', `event-category ${ev.color} float-left`);
                var span = createElement('span', '', ev.type + ' - ' + ev.title);
                var spanlocation = createElement('span', 'calender-location', 'Location - ' + ev.location);
                var br = createElement('br');
                var spanTime = createElement('span', 'float-right', moment(ev.eventDate).format('hh:mm a'));
                divName.appendChild(span);
                if (ev.type === 'Event') {
                    divName.appendChild(br);
                    divName.appendChild(spanlocation);
                }
                divName.appendChild(spanTime);
                div.appendChild(square);
                div.appendChild(divName);

                wrapper.appendChild(div);
            });

            if (!events.length) {
                var div = createElement('div', 'event empty');
                var span = createElement('span', '', 'No Events / Tasks');

                var addEventButton = createElement('button', 'btn btn-md btn-primary float-right', 'Add Event');
                addEventButton.setAttribute('data-toggle', "modal");
                addEventButton.setAttribute('data-target', "#newevent");
                addEventButton.setAttribute('data-backdrop', "static");
                addEventButton.setAttribute('data-keyboard', "false");
                addEventButton.onclick = function () {
                    addEvent(day);
                };
                div.appendChild(span);
                if (userType === 'admin' && today <= day) {
                    div.appendChild(addEventButton)
                }
                wrapper.appendChild(div);
            }

            if (currentWrapper) {
                currentWrapper.className = 'events out';
                currentWrapper.addEventListener('webkitAnimationEnd', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
                currentWrapper.addEventListener('oanimationend', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
                currentWrapper.addEventListener('msAnimationEnd', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
                currentWrapper.addEventListener('animationend', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
            } else {
                ele.appendChild(wrapper);
            }
        }



        Calendar.prototype.nextMonth = function () {
            this.current.add('months', 1);
            this.next = true;
            getEvent(this.current);
        }

        Calendar.prototype.prevMonth = function () {
            this.current.subtract('months', 1);
            this.next = false;
            getEvent(this.current);
        }

        window.Calendar = Calendar;
        Calendar.prototype.drawLegend = function () {
            var legend = createElement('div', 'legend');
            var calendars = this.events.map(function (e) {
                return e.calendar + '|' + e.color;
            }).reduce(function (memo, e) {
                if (memo.indexOf(e) === -1) {
                    memo.push(e);
                }
                return memo;
            }, []).forEach(function (e) {
                var parts = e.split('|');
                var entry = createElement('span', 'entry ' + parts[1], parts[0]);
                legend.appendChild(entry);
            });
            this.el.appendChild(legend);
        }
        function createElement(tagName, className, innerText) {
            var ele = document.createElement(tagName);
            if (className) {
                ele.className = className;
            }
            if (innerText) {
                ele.innderText = ele.textContent = innerText;
            }
            return ele;
        }
        function addEvent(current) {
            currentSelf.props.createEvent(current);
        }
        async function getEvent(current) {
            document.getElementById("calendar").innerHTML = "";
            var events = await currentSelf.getAllEvents(current);
            var calendar = new Calendar('#calendar', events, current);
        }
        getEvent(today);
    }

    render() {
        const { loading } = this.state;
        return (
            <div style={{ 'width': '420px' }}> <div style={{ 'display': loading ? 'none' : 'block' }} id="calendar"></div>{!loading ? '' : <Loading minHeight={570} />}</div>
        );
    }
}
