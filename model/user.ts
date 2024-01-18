import { firestore } from "../lib/firestore";

export type UserProps = {
    id?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    address?:  {
        street_name: string,
        street_number: number,
        zip_code: number,
    },
    phone_number?: number;
    orders: any[];
};

const usersCollection = firestore.collection("users");

export class User {
    ref: FirebaseFirestore.DocumentReference;
    data: UserProps;
    id: string;
    constructor(id:string) {
        this.id = id;
        this.ref = usersCollection.doc(id);
    };
    async pull() {
        const docSnap = await this.ref.get();
        this.data = docSnap.data() as UserProps;
    };
    async push() {
        await this.ref.update(this.data);
    };
    static async createNewUser(userProps:UserProps) {
        const addNewRecord = await usersCollection.add(userProps);
        const newUser:User = new User(addNewRecord.id);
        newUser.data = userProps;
        return newUser;
    };
    addOrder(order) {
        this.data.orders.push(order);
    }
}