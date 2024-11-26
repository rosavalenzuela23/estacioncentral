const Stomp = require('stompjs');
import { on_connect, on_error } from './conexiones';


const url = "ws://localhost:15674/ws"

const ws = new WebSocket(url);
const client = Stomp.over(ws);

client.connect('guest', 'guest', () => on_connect(client), () => on_error);

