import Product from '../models/Product';

interface CreateProductInput {
    name: string;
    category: string;
    code: number;
    expiration: string;
    stock: number;
    cost: number;
    discount: number;
    price: number;
}

export class ProductService {
    static async createProduct(data: CreateProductInput) {
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

    static async getProductByCategory(category: string) {
        if (!category || typeof category !== 'string') {
            console.log(category);
            throw new Error('Categoría inválida');
        }
    
        try {
            const filteredProducts = await Product.findAll({
                where: { category }
            });
            return filteredProducts;
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            throw new Error('Error al obtener el producto');
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

    static async updateProductStock(productId: number, newStock: number) {
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }

            if (newStock < 0) {
                throw new Error('No hay suficiente stock disponible');
            }

            product.stock = newStock;
            await product.save();

            return product; // Devuelves el producto actualizado
        } catch (error) {
            console.error('Error al actualizar el stock:', error);
            throw new Error('Error al actualizar el stock');
        }
    }

    static async updateProduct(productId: number, newData: any) {
        try {
            const product = await Product.findByPk(productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            console.log(product);
            await product.update(newData);
            return product;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw new Error('Error al actualizar el producto');
        }
    }

    static async deleteProduct(id: number) {
        try {
            const deleted = await Product.destroy({ where: { product_id: id } });
            return !!deleted;
        } catch (error) {
            throw new Error('Error al eliminar el producto');
        }
    }
}