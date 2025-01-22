import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SaleProductsAttributes {
  sale_id: number;
  product_id: number;
  quantity: number;
}

type SaleProductsCreationAttributes = Optional<SaleProductsAttributes, 'sale_id' | 'product_id'>;

export class SaleProducts extends Model<SaleProductsAttributes, SaleProductsCreationAttributes> implements SaleProductsAttributes {
  public sale_id!: number;
  public product_id!: number;
  public quantity!: number;
}

SaleProducts.init({
  sale_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Sales',
      key: 'id'
    },
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id'
    },
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'SaleProducts',
  timestamps: false
});