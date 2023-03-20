import { Sequelize, DataTypes } from 'sequelize';
export const Table1 = (sequelize: Sequelize) => {
  return sequelize.define(
    'Table1',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      text: { type: DataTypes.STRING, field: 'text' },
    },
    { tableName: 'table1', timestamps: false }
  );
};
