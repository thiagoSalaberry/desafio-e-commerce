import { productsIndex } from "./algolia";
type ResponseProductsProps = {
  productId: string;
  title: string;
  description: string;
  unit_price: number;
  stock: boolean;
  category: string;
  images: string[];
  tags: string[];
};
export async function searchProducts(q: string) {
  const searchedProduct = await productsIndex.search(q as string);
  const responseProducts: ResponseProductsProps[] = searchedProduct.hits
    .map((prod: any) => {
      return {
        productId: prod.productId,
        title: prod.title,
        description: prod.description,
        unit_price: prod.unit_price,
        stock: prod.stock,
        category: prod.category,
        images: prod.images,
        tags: prod.tags,
      };
    })
    .filter((prod: any) => prod.stock == "true");
  return responseProducts;
};
