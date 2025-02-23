import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
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
  login!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  tabel!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
}
