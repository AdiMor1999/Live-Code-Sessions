import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocketConnection = () => {
  socket = io('live-code-sessions.up.railway.app'); 
  return socket;
};
