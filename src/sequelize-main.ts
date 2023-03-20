// [ sequelize ]
import { Sequelize, Options, DataTypes } from 'sequelize';
// [ 型定義 ]
import { Models as _models } from './sequelize-model';
// [ Model定義 ]
import { Table1 } from './sequelize-model-table1';
import { Table2 } from './sequelize-model-table2';
//-------------------------------------------------------------------
//-------------------------------------------------------------------
export namespace DB {
  export type Models = _models;
  const dbConfig = {
    host: 'localhost',
    port: 3306,
    dbName: 'test',
    user: 'root',
    pass: 'root',
  };

  const DbModelList = {
    Table1,
    Table2,
  } as const;

  /**
   * 各モデルのField（プロパティ）名の配列取得用
   */
  export const GetFieldName = (models: Models, modelName: ModelName) => {
    return Object.values(models[modelName].fieldRawAttributesMap).map((row) => row.fieldName);
  };

  /**
   * Model名の文字列型
   */
  export type ModelName = keyof typeof DbModelList;

  /**
   * DB接続用のModelを取得する
   */
  export const GetModels = (arg?: { targetModelList?: ModelName[]; dbName?: string } | undefined): Models => {
    const config: { targetModelList: ModelName[]; dbName: string } = {
      targetModelList: [],
      dbName: dbConfig.dbName,
      ...arg,
    };

    const sequelizeConf: Options = {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: 'mysql',
      timezone: '+09:00',
      // logging: true,
      logging: false,
      dialectOptions: {
        timezone: '+09:00',
        // useUTC: false,
        dateStrings: true,
        // 日付型を文字列で返却する
        typeCast: (field: any, next: any) => {
          if (field.type === 'DATETIME') {
            return field.string();
          }
          return next();
        },
      },
    };
    const sequelize: Sequelize = new Sequelize(config.dbName, dbConfig.user, dbConfig.pass, sequelizeConf);
    const models: Models = {} as any;
    //[ models ]
    const modelNameList: any = {};
    (Object.keys(DbModelList) as ModelName[]).forEach((key) => {
      if (config.targetModelList.length === 0 || config.targetModelList.includes(key)) {
        models[key] = (DbModelList as any)[key](sequelize);
        modelNameList[key] = key;
      }
    });
    //[ associate ]
    // (Object.keys(DbModelList) as ModelName[]).forEach((key) => {
    //   if (config.targetModelList.length === 0 || config.targetModelList.includes(key)) {
    //     if (models[key].associate) {
    //       models[key].associate(models);
    //     }
    //   }
    // });
    models.modelNames = modelNameList;
    models.sequelize = sequelize;
    models.Sequelize = Sequelize;
    models.close = async () => {
      await sequelize.close();
      (models.sequelize as any) = null;
    };
    return models;
  };
}
