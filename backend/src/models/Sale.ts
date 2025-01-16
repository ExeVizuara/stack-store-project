import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database';

interface SaleAttributes {
    id: number;
    user_id: number;
    product_id: number;
    product_name: string;
    product_category: string;
    product_quantity: number;
    product_price: number;
    created_at?: Date;
}

type SaleCretionAttributes = Optional<SaleAttributes, 'id' | 'created_at'>;

class Sale extends Model<SaleAttributes, SaleCretionAttributes> implements SaleAttributes {
    public id!: number;
    public user_id!: number;
    public product_id!: number;
    public product_name!: string;
    public product_category!: string;
    public product_quantity!: number;
    public product_price!: number;
    public readonly created_at!: Date;
}

Sale.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_quantity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
    sequelize,
    modelName: 'Sale',
    tableName: 'sales',
    timestamps: false,
}
);

export default Sale;