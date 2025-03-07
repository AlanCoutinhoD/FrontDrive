import { Product } from '../models/Product';

export class ProductService {
    async getProducts() {
        try {
            const response = await fetch(`${process.env.REACT_APP_PRODUCTS_API_URL}/products`);
            const data = await response.json();
            return data.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                imageUrl: product.imageUrl
            }));
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
} 