import axios from "axios";

const baseUrl = "https://5f920835eca67c001640931a.mockapi.io/catalog/products";

export default async function api() {
  return await axios.get(baseUrl);
}
