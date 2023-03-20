import { QueryTypes } from 'sequelize';
import { DB } from './sequelize-main';
import dayjs from 'dayjs';

const create = async () => {
  const models = DB.GetModels();
  const transaction = await models.sequelize.transaction({ autocommit: false });
  try {
    const insertData = {};
    //即席関数内で型指定を厳格に管理して値を投入
    ((obj: DB.Models['Table1']) => {
      obj.text = 'created >> ' + dayjs().format('YYYYMMDD HHmmssSSS');
    })(insertData as any);
    const createResult = await models.Table1.create(insertData, {
      transaction,
    });
    await transaction.commit();
    console.log('createResult', JSON.stringify(createResult));
    return createResult.id;
  } catch (error) {
    await transaction.rollback();
    console.log('error', error);
    return null;
  } finally {
    models.sequelize.close();
  }
};

const update1 = async (id: number) => {
  const models = DB.GetModels();
  const transaction = await models.sequelize.transaction({ autocommit: false });
  try {
    const table1 = await models.Table1.findByPk(id, {
      transaction,
    });
    if (table1 === null) return;
    console.log('Table1', JSON.stringify(table1));
    table1.text = 'update >> ' + dayjs().format('YYYYMMDD HHmmssSSS');
    await table1.save({ transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.log('error', error);
  } finally {
    models.sequelize.close();
  }
};

const selectSql = async (id: number) => {
  type Row = {
    id: number;
    text: number;
  };
  const models = DB.GetModels();
  // const transaction = await models.sequelize.transaction({ autocommit: false });
  try {
    const sql = `select * from table1 where id=:id`;
    const queryResult = await models.sequelize.query<Row>(sql, {
      raw: false,
      type: QueryTypes.SELECT,
      replacements: { id: 1 },
      // transaction: transaction,
    });
    console.log('queryResult', JSON.stringify(queryResult));
  } catch (error) {
    console.log('error', error);
  } finally {
    models.sequelize.close();
  }
  //
};

const test = async () => {
  //一つ目のレコードは挿入だけ
  await create();
  //2つ目のレコードは上書きもしてみる
  const id = await create();
  if (id === null) return;
  await update1(id);
  await selectSql(id);
};

test();
