import { firestore } from "../lib/firestore";
export type AuthProps = {
  email: string;
  code?: number | "";
  expiresAt?: Date | null;
  userId: string;
};

const authCollection = firestore.collection("auths");

export class Auth {
  ref: FirebaseFirestore.DocumentReference;
  data: AuthProps;
  id: string;
  constructor(id: string) {
    this.id = id;
    this.ref = authCollection.doc(id);
  }
  async pull() {
    const docSnap = await this.ref.get();
    this.data = docSnap.data() as AuthProps;
  }
  async push() {
    await this.ref.update(this.data);
  }
  static async createNewAuth(authProps: AuthProps) {
    const addNewRecord = await authCollection.add(authProps);
    const newAuth: Auth = new Auth(addNewRecord.id);
    newAuth.data = authProps;
    return newAuth;
  }
  static async findAuthByEmail(email: string) {
    const results = await authCollection.where("email", "==", email).get();
    if (results.empty) {
      return null;
    } else {
      const first = results.docs[0];
      const newAuth: Auth = new Auth(first.id);
      newAuth.data = first.data() as AuthProps;
      return newAuth;
    }
  }
  static async checkEmailAndCode(email: string, code: number) {
    const allDocs = (await authCollection.get()).docs;
    const auths = allDocs.map((auth) => auth.data());
    const now = Math.ceil(new Date().getTime() / 1000);
    const foundAuth = auths.find(
      (auth) =>
        auth.email == email &&
        auth.code == code &&
        auth.expiresAt._seconds > now
    );
    return foundAuth ? foundAuth : null;
  }
}
