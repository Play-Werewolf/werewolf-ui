import { connect } from "./backend";
import * as restore from "./restore";

class GameManager {
  constructor({
    update,
    roomId,
    authentication, // Anonymous or token
  }) {
    this.socket = null;

    this.update = update;
    this.roomId = roomId;
    this.auth = authentication;
    this.session_id = null;

    this._start_connection();

    window.game = this; // TODO: Remove (debug)
  }

  async _start_connection() {
    await this.init();
    if (restore.getSavedSession()) {
      try {
        await this.restore_session(restore.getSavedSession());
      }
      catch {
        restore.revokeSessionId();
        await this.authenticate(this.auth);
      }
    }
    else {
      await this.authenticate(this.auth);
    }
    
    await this.create_room();
    console.log("Authenticated");
  }

  async init() {
    try {
      this.socket = await connect("ws://127.0.0.1");
      this.update({ connection: { connected: true } });

      this.socket.on("close", () => {
        this.update({
          connection: { connected: false, status: "Disconnected" },
        });
      });

      this.socket.on("session_status", this.on_session_status.bind(this));
      this.socket.on("room_status", this.on_room_status.bind(this));
      this.socket.on("state_update", this.on_state_update.bind(this));
      this.socket.on("game_update", this.on_game_update.bind(this));
      this.socket.on("*", (msg) => console.log("Got message: ", msg));

    } catch (e) {
      console.error(e);
      this.pdate({
        connection: { connected: false, status: "Connection error" },
      });
    }
  }

  on_session_status(args) {
    if (args[1] === "authenticated") {
      this.update({
        session: {
          status: args[1],
          id: args[2],
          nickname: args[5],
        }
      });
      this.session_id = args[2];
    }
    else {
      this.update({
        session: {
          status: args[1],
        }
      });
    }
  }

  on_room_status(args) {
    this.update({
      room: {
        status: args[1],
        roomId: args[2] || null,
      }
    });
    if (args[1] === "connected") {
      restore.saveSessionId(this.session_id);
    }
  }

  on_state_update(args) {
    this.update({
      state: JSON.parse(args[1])
    });
  }

  on_game_update(args) {
    this.update({
      game: JSON.parse(args[1])
    });
  }

  authenticate(auth) {
    switch (auth.type) {
    case "anonymous":
      return this.authenticate_anonymous(auth.nickname);
    default:
      return new Promise((_, reject) => setTimeout(reject, 0));
    }
  }

  restore_session(session_id) {
    return new Promise((resolve, reject) => {
      this.socket.send("restore_session\x00" + session_id);
      this.socket.once("session_status", (args) => {
        if (args[1] == "authenticated") resolve(args);
        else reject(args);
      })
    })
  }

  authenticate_anonymous(nickname) {
    return new Promise((resolve, reject) => {
      if (!this.socket)
        reject({error: "Not connected"});
      
      this.socket.send("authenticate_anonymous\x00" + nickname);
      this.socket.once("session_status", (args) => {
        if (args[1] === "authenticated")
          resolve(args);
        else
          reject(args);
      });
    });
  }

  create_room() {
    return new Promise((resolve, reject) => {
      this.socket.send("create_room");
      this.socket.once("room_status", (args) => {
        if (args[1] === "connected") resolve(args);
        else reject(args);
      });
    });
  }

  leave_room() {
    return new Promise((resolve) => {
      this.socket.send("leave_room");
      this.socket.once("room_status", (args) => resolve(args));
    });
  }

  join_room(room_id) {
    return new Promise((resolve, reject) => {
      if (!this.socket)
        reject({error: "Not connected"});

      this.socket.send("join_room\x00" + room_id.padStart(4, "0"));
      this.socket.once("room_status", (args) => {
        if (args[1] === "connected") resolve(args);
        else reject(args);
      });
    });
  }

  ready() {
    this.socket.send("ready");
  }

  not_ready() {
    this.socket.send("not_ready");
  }
}

export default GameManager;
