import React from 'react';

const ToolBar = (
        {messages, onClickMarkAsRead, onClickMarkAsUnRead, onChangeAddLabel, onChangeRemoveLabel, onBulkSelectCheck,onDeleteMessages
        }) => {

    const unReadMessagesCount = () => {
        return messages.reduce( (sum, message) => {
            return sum + (message.read ? 0:1)
        }, 0);

    }

    const onClickReadEvent = () => {
        onClickMarkAsRead(true);
    }

    const onClickUnReadEvent = () => {
        onClickMarkAsUnRead(false);
    }

    const onChgAddLabel = (e) => {
        console.log('selected value to Add-->', e.target.value);
        onChangeAddLabel(e);
    }

    const onChgRemoveLabel = (e) => {
        console.log('selected value to remove-->', e.target.value);
        onChangeRemoveLabel(e);
    }


    const checkAllMessagesSelected = () => {
        return messages.every(message => message.selected);
    }

    const checkSomeMessagesSelected = () => {
        return messages.some(message => message.selected);
    }

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unReadMessagesCount()}</span>
                    unread message{unReadMessagesCount()>1?'s':''}
                </p>

                <button className="btn btn-default"
                    onClick={onBulkSelectCheck}>
                    <i className={`fa fa-${checkAllMessagesSelected()  ? 'check-' : checkSomeMessagesSelected() ? 'minus-': ''}square-o`}></i>
                </button>

                <button className="btn btn-default"
                    onClick={onClickReadEvent }>
                    Mark As Read
                </button>

                <button className="btn btn-default"
                    onClick={onClickUnReadEvent }>
                    Mark As Unread
                </button>

                <select className="form-control label-select"
                    onChange={onChgAddLabel}
                >
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select"
                    onChange={onChgRemoveLabel}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default"
                   onClick={onDeleteMessages}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

export default ToolBar
