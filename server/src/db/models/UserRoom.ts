import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';

import Room from './Room';
import User from './User';

interface UserAttributes {
  userId: string;
  roomId: string;
}

@Table
class UserRoom extends Model<UserAttributes> {
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @ForeignKey(() => Room)
  @Column
  roomId!: string;
}

export default UserRoom;
