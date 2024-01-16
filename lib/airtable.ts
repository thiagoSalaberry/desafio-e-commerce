import Airtable from "airtable"
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_PERSONAL_TOKEN
});
export const base = Airtable.base("appgms7M6eEs4d33V");
