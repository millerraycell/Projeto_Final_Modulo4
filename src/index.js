import { autocomplete } from "./autocomplete.js";

const cities = ["São Paulo", "Rio de Janeiro"];
const inputCity = document.getElementById("myInput");

autocomplete(inputCity, cities);