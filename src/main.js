import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

const produtsElement = document.querySelector('.products');
document.querySelector('.cep-button').addEventListener('click', searchCep);
const getProduts = await fetchProductsList('computador');

Object.values(getProduts).forEach((product) => {
  const iten = createProductElement(product);
  produtsElement.appendChild(iten);
});
