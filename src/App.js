import React from 'react';
import './App.css';
import axios from 'axios';
import qs from 'qs';

import ChatList from './ChatList';
import ChatForm from './ChatForm';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      text: ''
    }
  }

  componentDidMount() {

    const url = 'ws://localhost:31337/chat'; // cant use the create react app proxy because of a bug on 5/3/19
    this.connection = new WebSocket(url);

    this.connection.onmessage = (e) => {
      console.log(e.data);
      if (this.state.messages.length === 0) {
        this.setState({
          messages: JSON.parse(e.data)
        })
      } else {
        this.setState({
          messages: [...this.state.messages, JSON.parse(e.data)]
        })
      }
    };

    // setInterval(async() => {
    //   const {data} = await axios.get('/api');
    //   console.log(data);
    //   this.setState({
    //     messages: data
    //   });
    // }, 2000);

  }

  render() {
    return (
      <div className="App">
        <h3>CHAppy</h3>
        <ChatForm text={this.state.text}
                  handleChange={this._setText}
                  handleSend={this._sendMessage}
                  
                  />
        <ChatList messages={this.state.messages}/>
          
      </div>
    );
  }

  _setText = (text) => {
    console.log('App _setText got called')
    this.setState({
      text
    })
  }

  _sendMessage = async () => {
    console.log('App _sendMessage got called')

    await axios({
      method: 'post',
      url: '/api',
      data: qs.stringify({message: this.state.text}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    this.setState({
      text: ''
    })
  }

}

export default App;
