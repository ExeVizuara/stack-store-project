import User from './User';
import Sale from "./Sale";
import Product from './Product';

// Relación: Un usuario puede tener muchas ventas
User.hasMany(Sale, { foreignKey: 'user_id' });
Sale.belongsTo(User, { foreignKey: 'user_id' });

// Relación: Una venta puede tener muchos productos y un producto puede estar en muchas ventas
Sale.belongsToMany(Product, { through: 'SaleProducts', foreignKey: 'sale_id' });
Product.belongsToMany(Sale, { through: 'SaleProducts', foreignKey: 'product_id' });

export { User, Sale };
