import sequelize from "../config/database";
import Product from "../models/Product";
import Sale, { SaleAttributes } from "../models/Sale";
import SaleProducts from "../models/SaleProducts";
import { calculateInGrams } from "./mathematicalOperationsService";

interface CreateSaleInput {
    user_id: number;
    products: {
        product_id: number;
        quantity: number;
        price: number;
    }[];
}

interface UpdateSaleData {
    product_name?: string;
    product_category?: string;
    product_quantity?: number;
    product_price?: number;
}

export class SaleService {

    static async createSale(data: CreateSaleInput, quantity: { [key: number]: number }) {
        const t = await sequelize.transaction();

        try {
            const { user_id, products } = data;
            const total = products.reduce((sum, product) => {
                const productQuantity = quantity[product.product_id] || 0;
                if (productQuantity > 50) {
                    const totalPrice = calculateInGrams(productQuantity, product.price);
                    return totalPrice;
                } else 
                return sum + (product.price * productQuantity); // Calcular el precio total
            }, 0);

            // Crear la venta
            const sale = await Sale.create(
                { user_id, total },
                { transaction: t }
            );

            // Crear las entradas en SaleProducts

            const saleProducts = products.map(product => {
                console.log(product.product_id); // Verifica el contenido del producto
                return {
                    sale_id: sale.id,
                    product_id: product.product_id,
                    quantity: quantity[product.product_id],
                    price: product.price
                };
            });

            await SaleProducts.bulkCreate(saleProducts, { transaction: t });

            await t.commit();
            console.log(sale);
            return sale;
        } catch (error) {
            console.error('Error al crear la venta:', error);
            await t.rollback();
            throw new Error(`Error al crear la venta: ${error}`);
        }
    }

    // static async getSaleById(id: number) {
    //     try {
    //         const user = await Sale.findByPk(id);
    //         if (!user) throw new Error('Venta no encontrada');
    //         return user;
    //     } catch (error) {
    //         throw new Error(`Error al obtener la venta: ${error}`);
    //     }
    // }

    static async getSaleById(saleId: number) {
        try {
            const sale = await Sale.findOne({
                where: { id: saleId }, // El ID de la venta que estás buscando
                include: [
                  {
                    model: Product, // El modelo de los productos
                    as: 'products', // El alias definido en la relación
                    through: { attributes: ['quantity', 'price'] }, // Asegúrate de incluir los atributos de la tabla intermedia (SaleProducts)
                  }
                ]
              });
            

            if (!sale) {
                throw new Error('Venta no encontrada');
            }

            return sale;
        } catch (error) {
            throw new Error(`Error al obtener la venta: ${error}`);
        }
    }

    static async getAllSales() {
        try {
            const sales = await Sale.findAll();
            return sales;
        } catch (error) {
            throw new Error('Error al obtener los productos');
        }
    }

    static async updateSale(id: number, data: Partial<SaleAttributes> & UpdateSaleData) {
        try {
            const sale = await Sale.findByPk(id);
            if (!sale) throw new Error('Venta no encontrada');
            await sale.update(data);
            return sale;
        } catch (error) {
            throw new Error(`Error al actualizar datos de la venta: ${error}`);
        }
    }

    static async deleteSale(id: number) {
        try {
            const user = await Sale.findByPk(id);
            if (!user) throw new Error('Venta no encontrada');
            await user.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar la venta: ${error}`);
        }
    }
}
