import axios from "axios";

const baseUrl = "https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog";

export default async function api() {
  return await axios.get(baseUrl);
}
