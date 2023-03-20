import { Sequelize, DataTypes } from 'sequelize';
export const Table2 = (sequelize: Sequelize) => {
  return sequelize.define(
    'Table2',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      user: { type: DataTypes.STRING, field: 'user' },
      activate: { type: DataTypes.INTEGER, field: 'activate' },
    },
    { tableName: 'table2', timestamps: false }
  );
};
