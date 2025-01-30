import axios from 'axios'

const API_URL = 'http://localhost:3000';

export const loadAllProducts = async () => {
    try {
        console.log('Estoy aca');
        const response = await axios.get(`${API_URL}/api/products/getall`, {
            withCredentials: true, 
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los productos', error);
        throw error; 
    }
};

export const loadProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/api/products/getbycategory/${category}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        console.log(productData);
        const response = await axios.post(`${API_URL}/api/products/create`, 
            productData, 
            { withCredentials: true }
        );
        alert("Producto cargado correctamente en la categoría ", productData.category);
        return response.data;
    } catch (error) {
        console.error("Error al crear nuevo producto:", error);
        alert("Ocurrió un error al procesar la solicitud. Por favor, intenta nuevamente más tarde");
    }
};


export const updateProduct = async (productData) => {
    try {
        const response = await axios.put(`${API_URL}/api/products/${productData.product_id}`,
            productData, 
            { withCredentials: true }
        );
        alert(`Producto actualizado correctamente en la categoría ${productData.category}`);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    };
};

export const deleteProduct = async (productID) => {

    try {
        const response = await axios.delete(`${API_URL}/api/products/delete/${productID}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return console.error("Error al eliminar producto:", error.response?.data || error.message);
    };
};
export const actualizeStock = async (products, stock) => {
    console.log('Productos: ', products);
    console.log('Stock: ', stock);
    try {

        const responses = await Promise.all(products.map(async (product) => {
            console.log(stock[product.product_id]);
            const response = await axios.put(`${API_URL}/api/products/stock/${product.product_id}`, { stock: stock[product.product_id] }, {
                withCredentials: true,  // Esto asegura que las cookies (token) se envíen
            });
            return response.data;
        }));
        return responses;
    } catch (error) {
        console.error('Error al realizar la operación de carga:', error);
    }
};

