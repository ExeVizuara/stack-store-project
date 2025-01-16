import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database';

interface ProductAttributes {
    id: number;
    name: string;
    category: string;
    code: number;
    expiration: Date;
    stock: number;
    cost: number;
    discount: number;
    price: number;
    created_at: Date;
}

type ProductCretionAttributes = Optional<ProductAttributes, 'id' | 'created_at'>;

class Product extends Model<ProductAttributes, ProductCretionAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public category!: string;
    public code!: number;
    public expiration!: Date;
    public stock!: number;
    public cost!: number;
    public discount!: number;
    public price!: number;
    public readonly created_at!: Date;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, 
    {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: false,
    }
);

export default Product;