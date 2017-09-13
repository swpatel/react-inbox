import React, {Component} from 'react';
import './App.css';

import ToolBar from './components/ToolBar';
import Messages from './components/Messages';

class App extends Component {

    const
    seedData = [
        {
            "id": 1,
            "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
            "read": false,
            "starred": true,
            "labels": ["dev", "personal"]
        },
        {
            "id": 2,
            "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
            "read": false,
            "starred": false,
            "selected": true,
            "labels": []
        },
        {
            "id": 3,
            "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
            "read": false,
            "starred": true,
            "labels": ["dev"]
        },
        {
            "id": 4,
            "subject": "We need to program the primary TCP hard drive!",
            "read": true,
            "starred": false,
            "selected": true,
            "labels": []
        },
        {
            "id": 5,
            "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
            "read": false,
            "starred": false,
            "labels": ["personal"]
        },
        {
            "id": 6,
            "subject": "We need to back up the wireless GB driver!",
            "read": true,
            "starred": true,
            "labels": []
        },
        {
            "id": 7,
            "subject": "We need to index the mobile PCI bus!",
            "read": true,
            "starred": false,
            "labels": ["dev", "personal"]
        },
        {
            "id": 8,
            "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
            "read": true,
            "starred": true,
            "labels": []
        }
    ]

    state = {messages: this.seedData};

    onChangeMsgSelected = (message) => {
        const messages = [...this.state.messages];
        messages.splice(messages.indexOf(message), 1, message);
        this.setState({
            messages: messages
        });
    }

    onAddMsgLabel = (label) => {
        const updatedMessages = [...this.state.messages]
        Object.keys(updatedMessages).map(function (key, index) {
            if (updatedMessages[key].labels.indexOf(label) === -1 && updatedMessages[key].selected)
                updatedMessages[key].labels.push(label)
        });
        this.setState({
            messages: updatedMessages
        });
    }

    render() {
        return (
            <div>
                <ToolBar messages={this.state.messages}
                         onAddMsgLabel={this.onAddMsgLabel}
                />
                <Messages messages={this.state.messages} onChangeHandler={this.onChangeMsgSelected}/>

            </div>
        );
    }
}

export default App;