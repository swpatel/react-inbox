import React from 'react';

const Message = ({message, onChange}) => {

    const onChangeEvent = () => {
        onChange(message, 'selected');
    }

    const onClickEvent = () => {
        onChange(message, 'starred');
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
                {message.labels.map((label,i)=> <span key={i} className="label label-warning"> {label} </span>)}
                <a href="#">
                    {message.subject}
                </a>
            </div>
        </div>
    )
}

export default Message
