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
    this.roomId = roomId ? roomId.padStart(4, "0") : null;
    this.actualRoomId = null;
    this.auth = authentication;
    this.session_id = null;

    this._start_connection();

    window.game = this; // TODO: Remove (debug)

    // Events that need special care
    this.on_leave = () => {};
  }

  async _start_connection() {
    console.info("Connecting to game server");
    await this.init();
    console.info("Connected to game server");
    if (restore.getSavedSession()) {
      try {
        console.info("Trying to restore session...");
        await this.restore_session(restore.getSavedSession());
      }
      catch {
        console.info("Failed to restore session. Re-authenticating");
        restore.revokeSessionId();
        await this.authenticate(this.auth);
        console.info("Authenticated.");
      }
    }
    else {
      console.info("Authenticating...");
      await this.authenticate(this.auth);
      console.info("Authenticated");
    }
    
    if (this.roomId && this.actualRoomId && this.roomId !== this.actualRoomId) {
      console.info("Room number mismatching requested room. Leaving current room");
      await this.leave_room(true); // Not raising an event
      console.info("Returned to matchmaking lobby");
    }

    console.info("The requested room ID is: ", this.roomId);
    
    if (this.roomId) {
      console.info("Joining room " + this.roomId);
      await this.join_room(this.roomId);
      console.info("Joined room ");
    }
    else {
      console.info("Creating room");
      await this.create_room();
      console.info("Room created");
    }
    console.info("Initialization sequence finished");
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
      this.socket.on("player_update", this.on_player_update.bind(this));
      // this.socket.on("*", (msg) => console.log("Got message: ", msg));

    } catch (e) {
      console.error(e);
      this.update({
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
    if (args[1] === "connected") {
      this.update({
        room: {
          status: args[1],
          roomId: args[2] || null,
        }
      });
      restore.saveSessionId(this.session_id);
      this.actualRoomId = args[2];
      window.history.replaceState(null, null, "/game/" + this.actualRoomId);
    }
    else {
      this.update({
        room: {
          status: args[1],
          error: args[2] || null,
        }
      });
      restore.revokeSessionId();
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

  on_player_update(args) {
    this.update({
      player: JSON.parse(args[1])
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
        if (args[1] === "authenticated") resolve(args);
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

  leave_room(no_event) {
    return new Promise((resolve) => {
      this.socket.send("leave_room");
      this.socket.once("room_status", (args) => {
        if (!no_event)
          this.on_leave();
        resolve(args);
      });
    });
  }

  join_room(room_id) {
    return new Promise((resolve, reject) => {
      if (!this.socket)
        reject({error: "Not connected"});

      this.socket.send("join_room\x00" + room_id);
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

  // Cannot wait on this one
  // bool can be either true or false.
  _send_boolean_action(bool) {
    this.socket.send("set_boolean_action\x00" + bool);
  }

  // player1 should be a player uuid
  _send_unary_action(player1) {
    this.socket.send("set_unary_action\x00" + player1);
  }

  _send_binary_action(player1, player2) {
    this.socket.send("send_binary_action\x00" + player1 + "\x00" + player2);
  }

  send_action(pl) {
    if (pl.length === 2) {
      this._send_binary_action(pl[0], pl[1]);
    }
    if (pl[0].constructor.name === "String") {
      this._send_unary_action(pl[0]);
    }
    else {
      this._send_boolean_action(pl[0]);
    }
  }
}

export default GameManager;
