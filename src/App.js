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
            "read": true,
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
            "read": true,
            "starred": true,
            "labels": ["dev"]
        },
        {
            "id": 4,
            "subject": "We need to program the primary TCP hard drive!",
            "read": false,
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
            "read": false,
            "starred": true,
            "labels": []
        },
        {
            "id": 7,
            "subject": "We need to index the mobile PCI bus!",
            "read": false,
            "starred": false,
            "labels": ["dev", "personal"]
        },
        {
            "id": 8,
            "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
            "read": false,
            "starred": true,
            "labels": []
        }
    ]

    state = {messages: this.seedData};

    onChangeMsgSelected = (message) => {
        const messages = [...this.state.messages];

        messages.splice(messages.indexOf(message), 1, message);

        this.setState({messages});
    }

    onClickMarkAsRead = (isMessageRead) => {
        const messages = [...this.state.messages];

        messages.forEach(message => message.selected ? message.read = isMessageRead : '');

        this.setState({messages});
    }

    onClickMarkAsUnRead = (isMessageUnRead) => {
        const messages = [...this.state.messages];

        messages.forEach(message => message.selected ? message.read = isMessageUnRead : '');

        this.setState({messages});
    }

    onChangeAddLabel = (e) => {
        const messages = [...this.state.messages];

        messages.forEach(message => {
            if (message.selected ) {
                if (!message.labels.includes(e.target.value)) {
                    message.labels.push(e.target.value);
                }
            }
        });

        this.setState({messages});

    }

    onChangeRemoveLabel = (e) => {
        const messages = [...this.state.messages];

        messages.forEach(message => {
            if (message.selected ) {
                if (message.labels.includes(e.target.value)) {
                   message.labels =  message.labels.filter((label) => label !== e.target.value);
                }
            }
        });

        this.setState({messages});

    }

    onBulkSelectCheck = isAllSelected  => {
        const messages = [...this.state.messages];

        this.setState({
            messages: messages.forEach(message => message.selected = isAllSelected)
        });

    }

    onDeleteMessages = ()  => {

        const messages = [...this.state.messages];

        this.setState({ messages: messages.filter(message => !message.selected) });

    }

    render() {
        return (
            <div>
                <ToolBar messages={this.state.messages}
                         onClickMarkAsRead={this.onClickMarkAsRead}
                         onClickMarkAsUnRead={this.onClickMarkAsUnRead}
                         onChangeAddLabel={this.onChangeAddLabel}
                         onChangeRemoveLabel={this.onChangeRemoveLabel}
                         onBulkSelectCheck={this.onBulkSelectCheck}
                         onDeleteMessages={this.onDeleteMessages}

                />
                <Messages messages={this.state.messages} onChangeHandler={this.onChangeMsgSelected}/>

            </div>
        );
    }
}

export default App;
