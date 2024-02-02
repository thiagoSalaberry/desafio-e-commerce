import { firestore } from "../lib/firestore";
export type ProductProps = {
  productId: string;
  title: string;
  description: string;
  unit_price: number;
  stock: boolean;
  category: string;
  images?: string[];
  tags?: string[];
};

const productsCollection = firestore.collection("products");

export class Product {
  ref: FirebaseFirestore.DocumentReference;
  data: ProductProps;
  id: string;
  constructor(id: string) {
    this.id = id;
    this.ref = productsCollection.doc(id);
  }
  async pull() {
    const docSnap = await this.ref.get();
    this.data = docSnap.data() as ProductProps;
  }
  async push() {
    await this.ref.update(this.data);
  }
  static async createNewProduct(productProps: ProductProps) {
    const addNewRecord = await productsCollection.add(productProps);
    const newProduct: Product = new Product(addNewRecord.id);
    newProduct.data = productProps;
    return newProduct;
  }
  static async getProductById(productId: string) {
    try {
      const productDocs = (
        await productsCollection.where("productId", "==", productId).get()
      ).docs;
      const productDoc = productDocs[0];
      return productDoc.data();
    } catch (e) {
      console.log("El producto no existe");
      return null;
    }
  }
  static async getFeaturedProducts() {
    try {
      const productDocs = (await productsCollection.get()).docs;
      const result = productDocs.map((prod) => prod.data());
      const featured = result
        .sort((a, b) => {
          if (Number(a.rating) < Number(b.rating)) return 1;
          if (Number(a.rating) > Number(b.rating)) return -1;
          return 0;
        })
        .slice(0, 3);
      return featured;
    } catch (e) {
      console.log("El producto no existe");
      return null;
    }
  }
}
