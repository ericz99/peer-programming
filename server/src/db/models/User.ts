import { Optional } from 'sequelize';
import { Table, Model, Column, PrimaryKey, BelongsToMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';

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

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default User;
