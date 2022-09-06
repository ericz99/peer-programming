import { Optional } from 'sequelize';
import { Table, Model, Column, PrimaryKey, BelongsToMany } from 'sequelize-typescript';

import Room from './Room';
import UserRoom from './UserRoom';

interface UserAttributes {
  id: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table
class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Column
  id!: string;

  @BelongsToMany(() => Room, () => UserRoom)
  rooms!: Room[];
}

export default User;
