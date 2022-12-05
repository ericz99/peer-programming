"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_client_1 = require("socket.io-client");
const socket_io_1 = require("socket.io");
const chai_1 = require("chai");
describe('Test SocketIO', () => {
    let io = null;
    let serverSocket = null;
    let clientSocket = null;
    before((done) => {
        const httpServer = http_1.default.createServer().listen(5001);
        io = new socket_io_1.Server(httpServer);
        clientSocket = (0, socket_io_client_1.io)(`http://localhost:5001`);
        io.on('connection', (socket) => {
            serverSocket = socket;
        });
        clientSocket.on('connect', () => {
            done();
        });
    });
    after(() => {
        io.close();
        clientSocket.close();
    });
    describe('server socket test session', () => {
        // it('should receive data from server socket @client', () => {});
        it('should ping from server socket to client socket', (done) => {
            serverSocket.emit('ping', 'pong');
            clientSocket.on('ping', (arg) => {
                console.log(`Message Result: ${arg}`);
                (0, chai_1.expect)(arg).to.equal('pong');
                done();
            });
        });
    });
});
