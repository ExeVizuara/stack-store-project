import Product from '../models/Product';

export class ProductService {
    static async createProduct(data: {
        name: string;
        category: string;
        code: number;
        expiration: Date;
        stock: number;
        cost: number;
        discount: number;
        price: number;
    }
    ) {
        try {
            const product = await Product.create(data);
            return product;
        } catch (error) {
            throw new Error('Error al crear el producto');
        }
    }

    static async getProducts() {
        try {
            const products = await Product.findAll();
            return products;
        } catch (error) {
            throw new Error('Error al obtener los productos');
        }
    }

    static async getProductById(id: number) {
        try {
            const product = await Product.findByPk(id);
            return product;
        } catch (error) {
            throw new Error('Error al obtener el producto');
        }
    }

    static async deleteProduct(id: number) {
        try {
            const deleted = await Product.destroy({ where: { id } });
            return !!deleted;
        } catch (error) {
            throw new Error('Error al eliminar el producto');
        }
    }
}