import { Optional } from 'sequelize';
import { Table, Model, Column, PrimaryKey, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';

import Room from './Room';

interface HistoryAttributes {
  id?: string;
  value?: string;
  roomId?: string;
}

interface HistoryCreationAttributes extends Optional<HistoryAttributes, 'id'> {}

@Table
class History extends Model<HistoryAttributes, HistoryCreationAttributes> {
  @PrimaryKey
  @Column
  id!: string;

  @Column
  value!: string;

  @ForeignKey(() => Room)
  @Column
  roomId!: string;

  @BelongsTo(() => Room)
  room!: Room;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default History;
