import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Sale from './Sale';
import Product from './Product';

interface SaleProductsAttributes {
  sale_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

type SaleProductsCreationAttributes = Optional<SaleProductsAttributes, 'sale_id' | 'product_id'>;

export class SaleProducts extends Model<SaleProductsAttributes, SaleProductsCreationAttributes> implements SaleProductsAttributes {
  public sale_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number;
}

SaleProducts.init({
  sale_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Sale,
      key: 'id'
    },
    primaryKey: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'SaleProducts',
  timestamps: false
});

export default SaleProducts;