import { Server, Socket } from 'socket.io';
import http from 'http';
import logger from './logger';

// import { getOrSetCache } from './utils';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, RoomData, UserKeyboard } from './interfaces';

export default (server: http.Server) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);

  io.on('connection', (socket: Socket) => {
    logger.log({
      level: 'info',
      message: `${socket.id} - User Connected!`
    });

    // ### EVENTS START ###

    socket.on('joinSession', async (room: RoomData) => {
      logger.log({
        level: 'info',
        message: 'A User Joined Room!'
      });

      // if user already joined room don't do anything
      if (!socket.rooms.has(room.id)) {
        socket.join(room.id);
        socket.to(room.id).emit('notifyRoomEvent', {
          data: `${socket.id}`,
          type: 'JOIN_SESSION'
        });

        // // # cache room
        // await getOrSetCache({
        //   key: `room_${room.id}`,
        //   value: room
        // });
      }
    });

    socket.on('replayUserKeyboard', (key: UserKeyboard, room: RoomData) => {
      socket.to(room.id).emit('replayUserKeyboard', key);
    });

    socket.on('syncData', async (roomId: string) => {
      const curRoom = io.of('/').adapter.rooms.get(roomId);

      socket.emit('syncData', {
        data: curRoom
      });
    });

    // ### EVENTS END ###

    socket.on('disconnect', () => {
      logger.log({
        level: 'info',
        message: 'User Disconnected!'
      });

      socket.on('leaveSession', (room: RoomData) => {
        socket.to(room.id).emit('notifyRoomEvent', {
          data: `${socket.id}`,
          type: 'LEAVE_SESSION'
        });
      });
    });
  });
};
