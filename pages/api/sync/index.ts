import { NextApiRequest, NextApiResponse } from "next";
import { base } from "../../../lib/airtable";
import { productsIndex } from "../../../lib/algolia";
import { Product } from "../../../model/product";
export default function (req: NextApiRequest, res: NextApiResponse) {
  base("Productos")
    .select({ pageSize: 10 })
    .eachPage(
      async function (records, fetchNextPage) {
        const objetoParaAlgolia = records.map((p) => {
          return {
            objectID: p.id,
            ...p.fields,
          };
        });
        const objetosParaFirestore = records.map((p) => {
          return {
            ...p.fields
          }
        });
        objetosParaFirestore.forEach(async function(p:any) {
          await Product.createNewProduct(p);
        })
        await productsIndex.saveObjects(objetoParaAlgolia);
        console.log("siguiente página");
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        res.send("Terminó la sincronización entre Airtable y Algolia");
      }
    );
}
