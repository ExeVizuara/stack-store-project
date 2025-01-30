import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database';
import Product from "./Product";

export interface SaleAttributes {
    id: number;
    user_id: number;
    total: number;
    createdAt?: Date;
    updatedAt?: Date;
    products?: Product[];
}

type SaleCreationAttributes = Optional<SaleAttributes, 'id'>;

class Sale extends Model<SaleAttributes, SaleCreationAttributes> implements SaleAttributes {
    public id!: number;
    public user_id!: number;
    public total!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly products?: Product[];
}

Sale.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Sale',
    tableName: 'sales',
    timestamps: true  // Esto habilita createdAt y updatedAt automáticamente
  });
  
  export default Sale;