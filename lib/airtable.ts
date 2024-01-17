import Airtable from "airtable"
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_PERSONAL_TOKEN
});
export const base = Airtable.base(process.env.AIRTABLE_APP_ID);
