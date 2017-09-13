import React from 'react';

const Message = ({message, onChange}) => {

    const onChangeEvent = (event) => {
        console.log('here..');
        event.preventDefault();
        let msg = message;
        msg.selected = event.target.checked;
        onChange(msg);
    }

    const onClickEvent = (event) => {
        event.preventDefault();
        let msg = message;
        msg.starred = !message.starred;
        onChange(msg);
    }

    return (
        <div className={`row message ${message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''}`}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox"
                               value={message.selected}
                               checked={!!message.selected}
                               onChange = {onChangeEvent}

                        />
                    </div>
                    <div className="col-xs-2">
                        <i className={`star fa fa-star${!!message.starred ? '' : '-o'}`}
                           onClick = {onClickEvent}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                <span className="label label-warning">{message.labels[0]}</span>
                <span className="label label-warning">{message.labels[1]}</span>
                <a href="#">
                    {message.subject}
                </a>
            </div>
        </div>
    )
}

export default Message
