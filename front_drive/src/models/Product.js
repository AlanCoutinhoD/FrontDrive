export class Product {
    constructor(id, name, price, description, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }

    static fromJSON(json) {
        return new Product(
            json.ID,
            json.Name,
            json.Price,
            json.Description,
            json.Image
        );
    }
} 