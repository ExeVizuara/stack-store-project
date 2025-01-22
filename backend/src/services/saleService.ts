import sequelize from "../config/database";
import Sale, { SaleAttributes } from "../models/Sale";
import { SaleProducts } from "../models/SaleProducts";

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

    static async createSale(data: CreateSaleInput) {
        const t = await sequelize.transaction();

        try {
            const { user_id, products } = data;

            // Crear la venta
            const sale = await Sale.create(
                { user_id, total: products.reduce((sum, p) => sum + p.price * p.quantity, 0) },
                { transaction: t }
            );

            // Crear las entradas en SaleProducts
            const saleProducts = products.map(product => ({
                sale_id: sale.id,
                product_id: product.product_id,
                quantity: product.quantity,
                price: product.price
            }));

            await SaleProducts.bulkCreate(saleProducts, { transaction: t });

            await t.commit();
            return sale;
        } catch (error) {
            await t.rollback();
            throw new Error('Error al crear la venta');
        }
    }

    static async getSaleById(id: number) {
        try {
            const user = await Sale.findByPk(id);
            if (!user) throw new Error('Producto no encontrado');
            return user;
        } catch (error) {
            throw new Error(`Error al obtener el producto: ${error}`);
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
