import { connect } from "./backend";

class GameManager {
  constructor({
    update,
    roomId,
    authentication, // Anonymous or token
  }) {
    this._socket = null;

    this.update = update;
    this.roomId = roomId;
    this.auth = authentication;

    this.init();
  }

  init() {
    // TODO: Not use a fixed URL for this
    connect("ws://127.0.0.1")
      .then((conn) => {
        this.startConnection(conn);
      })
      .catch((e) => {
        this.update({
          connection: {
            connected: false,
            error: e.message,
          },
        });
      });
  }

  startConnection(conn) {
    this.conn = { connected: true };
    this.update({ connection: this.conn });

    this._socket = conn;

    console.log("authenticating");
    this.authenticate(this.auth)
      .then((session) => {
        this.update({
          session: {
            status: session[1],
            id: session[2],
            nickname: session[5],
          },
        });
        return this.initRoom();
      })
      .then((room) => {
        console.log("room", room);
      })
      .catch((err) => {
        console.log("Error", err);
        if (!err.update) return;
        this.update(err.update);
      });
  }

  authenticate(auth) {
    switch (auth.type) {
      case "anonymous":
        return this.authenticateAnonymous(auth.nickname);
      default:
        return new Promise((_, reject) => setTimeout(reject, 1));
    }
  }

  authenticateAnonymous(nickname) {
    return new Promise((resolve, reject) => {
      this._socket.send("authenticate_anonymous\x00" + nickname);
      this._socket.once("session_status", (args) => {
        if (args[1] == "authenticated") resolve(args);
        else reject({ update: { session: { status: args[1] } } });
      });
    });
  }

  initRoom() {
    if (!this.roomId) {
      return this.createRoom();
    } else {
      return this.joinRoom(this.roomId);
    }
  }

  createRoom() {
    return new Promise((resolve, reject) => {
      this._socket.send("create_room");
      this._socket.once("room_status", (args) => {
        console.log("Room status: ", args);
        if (args[1] == "connected") resolve(args);
        else reject({ update: {room: null}});
      });
    });
  }

  joinRoom(roomId) {}
}

export default GameManager;
