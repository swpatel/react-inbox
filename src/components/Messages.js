import React from 'react';
import Message from './Message';

const Messages = ({messages, onChangeHandler}) => {
    return (
        <div className="container">
            { messages.map(message => <Message
                            key={ message.id }
                            message={ message }
                            onChange = {onChangeHandler}/>) }

        </div>
    )

}

export default Messages