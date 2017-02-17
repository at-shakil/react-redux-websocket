import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppConf from '../config/application.json';
import { SocketDataType } from '../constants/Enums';

class App extends Component {
  getChildContext() {
    const socket = new WebSocket(AppConf.websocketOrigin);
    this.props.handleSocketEvents(socket);
    return {socket};
  }

  render() {
    return (
      <div className="page-container">
        {this.props.children}
      </div>
    );
  }
}

App.props = {
  children: PropTypes.element.isRequired
};

App.childContextTypes = {
  socket: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  handleSocketEvents(socket) {
    socket.onopen = e => console.log("Connected");
    socket.onclose = e => console.log("Disconnected");
    socket.onerror = e => console.log(`Error: ${e.data}`);
    socket.onmessage = e => {
      const { type, data } = JSON.parse(e.data);

      switch(type) {
        case SocketDataType.ALERT:
          alert(data);
          break;
        default:
          return;
      }
    };
  }
});

export default connect(null, mapDispatchToProps)(App);
