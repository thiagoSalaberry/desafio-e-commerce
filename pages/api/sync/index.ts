import { NextApiRequest, NextApiResponse } from "next";
import { base } from "../../../lib/airtable";
import { productsIndex } from "../../../lib/algolia";

export default function (req: NextApiRequest, res: NextApiResponse) {
  base("Productos")
    .select({ pageSize: 10 })
    .eachPage(
      async function (records, fetchNextPage) {
        const objetoParaLosProductos = records.map((p) => {
          return {
            objectID: p.id,
            ...p.fields,
          };
        });
        await productsIndex.saveObjects(objetoParaLosProductos);
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
