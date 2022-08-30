import http from 'http';
import { io as Client, Socket as ClientSocket } from 'socket.io-client';
import { Server, Socket as ServerSocket } from 'socket.io';
import { expect } from 'chai';

import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from '../src/interfaces';

describe('Test SocketIO', () => {
  let io: Server | null = null;
  let serverSocket: ServerSocket | null = null;
  let clientSocket: ClientSocket | null = null;

  before((done) => {
    const httpServer = http.createServer().listen(5001);
    io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer);

    clientSocket = Client(`http://localhost:5001`) as ClientSocket<ServerToClientEvents, ClientToServerEvents>;

    io!.on('connection', (socket) => {
      serverSocket = socket as ServerSocket;
    });

    clientSocket.on('connect', () => {
      done();
    });
  });

  after(() => {
    io!.close();
    clientSocket!.close();
  });

  describe('server socket test session', () => {
    // it('should receive data from server socket @client', () => {});

    it('should ping from server socket to client socket', (done) => {
      serverSocket!.emit('ping', 'pong');

      clientSocket!.on('ping', (arg: string) => {
        console.log(`Message Result: ${arg}`);
        expect(arg).to.equal('pong');
        done();
      });
    });
  });
});
