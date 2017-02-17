import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SocketDataType } from '../../constants/Enums';
import './Home.scss';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.onMessage = this.onMessage.bind(this);
  }

  onMessage() {
    const
      { sendMessage } = this.props,
      { socket } = this.context;
    sendMessage(socket, this.message.value);
  }

  render() {
    return (
      <div className="home">
        <input ref={ref => this.message = ref} />
        <button onClick={this.onMessage}>
          Echo Message!
        </button>
      </div>
    );
  }
}

Home.contextTypes = {
  socket: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  sendMessage(socket, message) {
    const data = JSON.stringify({
      type: SocketDataType.ALERT,
      data: message
    });

    socket.send(data);
  }
});

export default connect(null, mapDispatchToProps)(Home);
