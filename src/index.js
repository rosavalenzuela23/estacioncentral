const fs = require('fs');
const Stomp = require('stompjs');
import { on_connect, on_error } from './conexiones';

const url = "wss://localhost:15673/ws"

const ws = new WebSocket(url);
const client = Stomp.over(ws);

client.connect('guest', 'guest', () => on_connect(client), () => on_error);

