import React from 'react';

const ToolBar = ({messages}) => {

    const unReadMessagesCount = () => {
        let count= messages.reduce( (sum, message) => {
            return sum + (message.read ? 0:1)
        }, 0);

        return (count);
    }

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unReadMessagesCount()}</span>
                    unread message{unReadMessagesCount()>1?'s':''}
                </p>

                <button className="btn btn-default">
                    <i className="fa fa-check-square-o"></i>
                </button>

                <button className="btn btn-default">
                    Mark As Read
                </button>

                <button className="btn btn-default">
                    Mark As Unread
                </button>

                <select className="form-control label-select">
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select">
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default">
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )
}

export default ToolBar
