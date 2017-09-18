import React from 'react';

const Message = ({message, onChange}) => {

    const onChangeEvent = (event) => {
        message.selected = event.target.checked;
        onChange(message);
    }

    const onClickEvent = () => {
        message.starred = !message.starred;
        onChange(message);
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
