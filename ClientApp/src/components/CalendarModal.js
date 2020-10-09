import React, { Component } from 'react';
import { CustomEvent, StandardEvent } from './CustomEvent.js';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export class CalendarModal extends Component {

    approveOrCancel(idx, type, id) {
        this.props.approveOrCancel(idx, type, id);
    }

    getTitle() {
        if (this.props.canApprove) {
            return "Queue calendar";
        } else {
            return "Requests calendar";
        }
    }

    getCalendarType() {
        if (this.props.canApprove) {
            return (
                <Calendar
                    events={this.props.events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={moment().toDate()}
                    localizer={localizer}
                    style={{ height: "80vh"}}
                    components={{
                        agenda: { 
                            event: (props) => <CustomEvent {...props} approveOrCancelFromCal={(idx, type, id) => this.approveOrCancel(idx, type, id)} />
                        },
                        day: {
                            event: (props) => <CustomEvent {...props} approveOrCancelFromCal={(idx, type, id) => this.approveOrCancel(idx, type, id)} />
                        },
                        month: {
                            event: StandardEvent
                        } 
                    }}
                    eventPropGetter={
                        (event, start, end, isSelected) => {
                            let newStyle = {
                                backgroundColor: "#2a57cc",
                                color: 'white',
                                borderRadius: "4px",
                                border: "none"
                            };
                        
                            return {
                                className: "",
                                style: newStyle
                            };
                            }
                    }
                    views={['month', 'day', 'agenda']}
                />
            );
        } else {
            return (
                <Calendar
                    events={this.props.events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={moment().toDate()}
                    localizer={localizer}
                    style={{ height: "80vh"}}
                    components={{
                        event: StandardEvent
                    }}
                    eventPropGetter={
                        (event, start, end, isSelected) => {
                            let newStyle = {
                                backgroundColor: "#2a57cc",
                                color: 'white',
                                borderRadius: "4px",
                                border: "none"
                            };
                        
                            return {
                                className: "",
                                style: newStyle
                            };
                            }
                    }
                    views={['month', 'day', 'agenda']}
                />
            );
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.calendarModalOpen} toggle={() => this.props.toggleCalendarModal()} tabIndex="-1" size="xl">
                <ModalHeader toggle={() => this.props.toggleCalendarModal()}>{this.props.modalTitle}</ModalHeader>
                <ModalBody>
                    {this.getCalendarType()}
                </ModalBody>
            </Modal>
        );
    }
}