import { Optional } from 'sequelize';
import { Table, Model, Column, PrimaryKey, IsUUID, HasOne, BelongsToMany } from 'sequelize-typescript';

import History from './History';
import User from './User';
import UserRoom from './UserRoom';

interface RoomAttributes {
  id: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}

@Table
class Room extends Model<RoomAttributes, RoomCreationAttributes> {
  @IsUUID('all')
  @PrimaryKey
  @Column
  id!: string;

  @HasOne(() => History)
  history!: History;

  @BelongsToMany(() => User, () => UserRoom)
  users!: User[];
}

export default Room;
