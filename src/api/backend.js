function Communicator(socket) {
  this.socket = socket;
  this.callbacks = {};

  const trigger_callback = (name, arg) => {
    if (this.callbacks[name]) {
      for (var i in this.callbacks[name]) {
        this.callbacks[name][i](arg);
      }

      this.callbacks[name] = this.callbacks[name].filter(x => !x.__temp__);
      return true;
    }
    return false;
  }

  this.on = (event, callback) => {
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);
  };

  this.once = (event, callback) => {
    callback.__temp__ = true;
    this.on(event, callback);
  };

  this.socket.onmessage = (message) => {
    let parts = message.data.split("\x00");

    trigger_callback(parts[0], parts);
    trigger_callback("*", parts);
  };

  this.socket.onclose = () => {
    trigger_callback("close");
  }

  this.send = (msg) => {
    this.socket.send(msg);
  }
}

function connect(remote_url) {
  return new Promise((resolve, reject) => {
    let socket = new WebSocket(remote_url);
    socket.onopen = () => resolve(new Communicator(socket));
    socket.onerror = reject;
  });
}

export { connect, Communicator };
