import { Optional } from 'sequelize';
import { Table, Model, Column, PrimaryKey, HasOne, BelongsToMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';

import History from './History';
import User from './User';
import UserRoom from './UserRoom';

interface RoomAttributes {
  id: string;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}

@Table
class Room extends Model<RoomAttributes, RoomCreationAttributes> {
  @PrimaryKey
  @Column
  id!: string;

  @HasOne(() => History)
  history!: History;

  @BelongsToMany(() => User, () => UserRoom)
  users!: User[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default Room;
