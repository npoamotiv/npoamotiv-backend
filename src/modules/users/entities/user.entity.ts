import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  modelName: 'User', // добавим явное указание имени модели
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare login: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'tabel',
  })
  declare tabel: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;
}
