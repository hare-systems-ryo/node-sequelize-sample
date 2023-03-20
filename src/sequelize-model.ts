import { Transaction, Sequelize } from 'sequelize';
export interface Models {
  sequelize: Sequelize;
  Sequelize: any;
  close: () => Promise<void>;
  modelNames: ModelNames;
  // ここからテーブルのModel
  Table1: Models.Table1;
  Table2: Models.Table2;
}

export interface ModelNames {
  Table1: 'Table1;';
  Table2: 'Table2;';
}

export namespace Models {
  // Sequelize modelのメソッド用
  export interface Base<T> {
    save: (transaction?: TransactionOption) => Promise<T>;
    findAll: (option?: any) => Promise<T[] | null>;
    findOne: (option: any, transaction?: TransactionOption) => Promise<T | null>;
    create: (data: any, transaction?: TransactionOption) => Promise<T>;
    findByPk: (pk: number, transaction?: TransactionOption) => Promise<T | null>;
    bulkCreate: (data: any, transaction?: TransactionOption) => Promise<T | null>;
    destroy: (transaction?: TransactionOption) => Promise<T>;
    fieldRawAttributesMap: { [key: string]: { field: string; fieldName: string } };
  }

  export interface TransactionOption {
    transaction?: Transaction;
  }

  // Table1のModel定義
  export interface Table1 extends Base<Table1>, Table1Row {}
  export interface Table1Row {
    id: number;
    text: string;
  }

  // Table2のModel定義
  export interface Table2 extends Base<Table2>, Table2Row {}
  export interface Table2Row {
    id: number;
    user: string;
    activate: number | null;
  }
}
