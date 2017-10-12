import React, {Component} from 'react';
import './App.css';

import ToolBar from './components/ToolBar';
import Messages from './components/Messages';
import ComposeForm from './components/ComposeForm';

class App extends Component {

    state = {messages: []};

    async componentDidMount() {
        const response = await fetch(`/api/messages`);
        const json = await response.json();
        this.setState({messages: json._embedded.messages});
    }


    async callApi(path, method, body){
         return await fetch(path, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    }

    async updateMessages(request) {
        await this.callApi('/api/messages', 'PATCH', request)
    }

    async addMessage(request) {
        await this.callApi('/api/messages', 'POST', request)
    }

    async toggleStar(message) {
        await this.updateMessages({
            "messageIds": [message.id],
            "command": "star",
            "star": message.starred
        })

    }

    onChangeMsgSelected = (message, action) => {
        const messages = [...this.state.messages];
        if (action === 'starred')
        {
            this.toggleStar(message);
        }

        messages.splice(messages.indexOf(message), 1, {...message, [action]:!message[action]});

        this.setState({messages});
    }

    async onClickMarkAsRead (isMessageRead){
        await this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "read",
            "read": isMessageRead
        })

        this.setState({
            messages: this.state.messages.map(message => (
                message.selected ? { ...message, read: isMessageRead } : message
            ))
        })
    }

    async onClickMarkAsUnRead (isMessageUnRead){
        await this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "read",
            "read": isMessageUnRead
        })

        this.setState({
            messages: this.state.messages.map(message => (
                message.selected ? { ...message, read: isMessageUnRead } : message
            ))
        })
    }

    async onChangeAddLabel (label){

        await this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "addLabel",
            "label": label
        })
        const messages = this.state.messages.map(message => {
            if (message.selected ) {
                if (!message.labels.includes(label)) {
                    return {...message,
                        labels:[...message.labels, label]
                    };
                }
            }
            return message;
        });
        this.setState({messages});
    }

    async onChangeRemoveLabel (label) {

        await this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "removeLabel",
            "label": label
        })

        const messages = [...this.state.messages];

        messages.forEach(message => {
            if (message.selected ) {
                if (message.labels.includes(label)) {
                   message.labels =  message.labels.filter((label) => label !== label);
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

    async onDeleteMessages() {
        await this.updateMessages({
            "messageIds": this.state.messages.filter(message => message.selected).map(message => message.id),
            "command": "delete",
        })

        this.setState({ messages: this.state.messages.filter(message => !message.selected) });
    }

    onShowHideComposeForm() {
        this.setState({showHideComposeForm: !this.state.showHideComposeForm});
    }

    async onAddMessage(subject, body) {
        await this.addMessage('/api/messages', 'POST', {
            subject: subject,
            body: body,
        })

        const messages = [...this.state.messages];

        const message = {
            "id": messages.length + 1,
            "subject": subject,
            "read": false,
            "starred": false,
            "labels": []
        }

        messages.push(message);

        this.setState({
            messages,
            showHideComposeForm: false,
        })
    }

    render() {
        return (
            <div>
                <ToolBar messages={this.state.messages}
                         onClickMarkAsRead={this.onClickMarkAsRead.bind(this)}
                         onClickMarkAsUnRead={this.onClickMarkAsUnRead.bind(this)}
                         onChangeAddLabel={this.onChangeAddLabel.bind(this)}
                         onChangeRemoveLabel={this.onChangeRemoveLabel.bind(this)}
                         onBulkSelectCheck={this.onBulkSelectCheck.bind(this)}
                         onDeleteMessages={this.onDeleteMessages.bind(this)}
                         onShowHideComposeForm={this.onShowHideComposeForm.bind(this)}

                />
                {this.state.showHideComposeForm &&
                    <ComposeForm onAddMessage={this.onAddMessage.bind(this)}/>
                }
                <Messages messages={this.state.messages} onChangeHandler={this.onChangeMsgSelected.bind(this)}/>

            </div>
        );
    }
}

export default App;
