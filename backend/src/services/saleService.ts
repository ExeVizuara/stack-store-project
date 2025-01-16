import Sale from "../models/Sale";

export class SaleService {
    static async createSale(data: {
        user_id: number;
        product_id: number;
        product_name: string;
        product_category: string;
        product_quantity: number;
        product_price: number;
    }) {
        try {
            const user = await Sale.create(data);
            return user;
        } catch (error) {
            throw new Error('Error al crear el producto');
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

    static async updateSale(
        id: number,
        data: {
                product_name?: string;
                product_category?: string;
                product_quantity?: number;
                product_price?: number;
            }
        ) {
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
