type ItemProps = {
  item: {
    id: string;
    title: string;
    description: string;
    picture_url: "http://www.myapp.com/myimage.jpg";
    category_id: string;
    quantity: number;
    currency_id: "ARS";
    unit_price: number;
  };
};
type PreferenceProps = {
  items: ItemProps[];
  address: {
    zip_code: number;
    street_name: string;
    street_number: number;
  };
  external_reference: string;
};
export function createPreferenceBody(params: PreferenceProps): object {
  return {
    back_urls: {
      success: "",
      pending: "",
      failure: "",
    },
    expires: false,
    items: params.items,
    payer: {
      phone: {
        number: "",
      },
      identification: {
        number: "",
        type: "DNI",
      },
      address: params.address,
    },
    external_reference: params.external_reference,
    notification_url: process.env.NOTIFICATION_URL,
  };
}
