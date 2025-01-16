import User from './User';
import Sale from "./Sale";
import Product from './Product';

// Relación: Un usuario puede tener muchas ventas
User.hasMany(Sale, { foreignKey: 'user_id' });
Sale.belongsTo(User, { foreignKey: 'user_id' });

// Relación: Un producto puede tener muchas ventas
Sale.hasMany(Product, { foreignKey: 'product_id' });
Product.belongsTo(Sale, { foreignKey: 'product_id' });

export { User, Sale };
