import { Server, Socket } from 'socket.io';
import http from 'http';
import uuid from 'short-uuid';
import logger from './logger';

import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, RoomData, UserKeyboard } from './interfaces';
import { Room, History, User } from './db/models';

export default (server: http.Server) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);

  io.on('connection', async (socket: Socket) => {
    logger.log({
      level: 'info',
      message: `${socket.id} - User Connected!`
    });

    // # create user object
    await User.create({
      id: socket.id
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

        const doesRoomExist = await Room.findOne({
          where: {
            id: room.id
          }
        });

        if (!doesRoomExist) {
          // # create room
          const roomData = await Room.create(
            {
              id: uuid.generate()
            },
            {
              include: [History]
            }
          );

          await History.create({
            id: uuid.generate(),
            roomId: roomData.id
          });
        }
      }
    });

    socket.on('replayUserKeyboard', async (key: UserKeyboard, room: RoomData) => {
      socket.to(room.id).emit('replayUserKeyboard', key);
      // # update history
      await History.update(
        {
          value: key.keyPressed
        },
        {
          where: {
            roomId: room.id
          }
        }
      );
    });

    socket.on('syncData', async (roomId: string) => {
      const history = await History.findOne({
        where: {
          roomId
        },
        include: [Room]
      });

      socket.emit('syncData', {
        data: history
      });
    });

    // ### EVENTS END ###

    socket.on('disconnect', async () => {
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

      await User.destroy({
        where: {
          id: socket.id
        }
      });
    });
  });
};
