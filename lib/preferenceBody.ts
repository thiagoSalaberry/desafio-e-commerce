type PreferenceProps = {
    product: {
        id:string,
        title:string,
        description:string,
        picture_url:"http://www.myapp.com/myimage.jpg",
        category_id:string,
        quantity: 1,
        currency_id: "ARS",
        unit_price:number
      },
    address: {
        zip_code:number,
        street_name:string,
        street_number:number
    },
    external_reference:string,
};
export function createPreferenceBody(params:PreferenceProps):object {
    return {
        "back_urls": {
          "success": "",
          "pending": "",
          "failure": ""
        },
        "expires": false,
        "items": [{
            "id": params.product.id,
            "category_id": params.product.category_id,
            "currency_id": "ARS",
            "description": params.product.description,
            "picture_url": "http://www.myapp.com/myimage.jpg",
            "quantity": 1,
            "unit_price": params.product.unit_price,
            "title": params.product.title
          }],
        "payer": {
          "phone": {
            "number": ""
          },
          "identification": {
              "number": "",
              "type": "DNI"
          },
          "address": params.address
        },
        "external_reference": params.external_reference,
        "notification_url": process.env.NOTIFICATION_URL
      }
}