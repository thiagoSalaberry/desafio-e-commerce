import { firestore } from "../lib/firestore";

export type UserProps = {
  id?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  address?: {
    street_name: string;
    street_number: number;
    zip_code: number;
  };
  phone_number?: number;
  orders: any[];
  cart: any[];
  bookmarks: any[];
};

const usersCollection = firestore.collection("users");

export class User {
  ref: FirebaseFirestore.DocumentReference;
  data: UserProps;
  id: string;
  constructor(id: string) {
    this.id = id;
    this.ref = usersCollection.doc(id);
  }
  async pull() {
    const docSnap = await this.ref.get();
    this.data = docSnap.data() as UserProps;
  }
  async push() {
    await this.ref.update(this.data);
  }
  static async createNewUser(userProps: UserProps) {
    const addNewRecord = await usersCollection.add(userProps);
    const newUser: User = new User(addNewRecord.id);
    newUser.data = userProps;
    return newUser;
  }
  addToCart(product) {
    const alreadyInCart = this.data.cart.find(
      (p) => p.productId === product.productId
    );
    if (!alreadyInCart) {
      this.data.cart.push({ ...product, quantity: 1 });
      return true;
    } else {
      alreadyInCart.quantity++;
      return false;
    }
  }
  removeFromCart(productId: string) {
    const productToEliminate = this.data.cart.find(
      (p) => p.productId === productId
    );
    if (productToEliminate && productToEliminate.quantity > 1) {
      productToEliminate.quantity--;
    } else {
      this.data.cart.splice(this.data.cart.indexOf(productToEliminate), 1);
    }
  }
  addToBookmarks(product) {
    const alreadyBookmarked = this.data.bookmarks.find(
      (p) => p.productId === product.productId
    );
    if (!alreadyBookmarked) {
      this.data.bookmarks.push(product);
      return true;
    } else {
      return false;
    }
  }
  removeFromBookmarks(productId: string) {
    const productToEliminate = this.data.bookmarks.find(
      (p) => p.productId === productId
    );
    if (productToEliminate) {
      this.data.bookmarks.splice(
        this.data.bookmarks.indexOf(productToEliminate),
        1
      );
    }
  }
  addOrder(order) {
    this.data.orders.push(order);
  }
}
