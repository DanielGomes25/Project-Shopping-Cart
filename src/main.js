import { searchCep } from './helpers/cepFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import './style.css';
import { getSavedCartIDs } from './helpers/cartFunctions';

const produtsElement = document.querySelector('.products');
document.querySelector('.cep-button').addEventListener('click', searchCep);

const removeLoading = () => {
  const loading = document.getElementsByClassName('loading');
  if (loading.length) {
    loading[0].remove();
  }
};

const createLoadin = () => {
  const createText = document.createElement('div');
  const label = document.createElement('label');
  label.innerHTML = 'carregando...';
  createText.appendChild(label);
  createText.className = 'loading';
  document.body.appendChild(createText);
  setTimeout(() => removeLoading(), 100, 0);
};
createLoadin();
try {
  const getProduts = await fetchProductsList('computador');

  Object.values(getProduts).forEach((product) => {
    const iten = createProductElement(product);
    produtsElement.appendChild(iten);
  });
} catch (error) {
  const erroMensag = document.createElement('h1');
  const label = document.createElement('label');
  label.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  erroMensag.appendChild(label);
  erroMensag.className = 'error';
  document.body.appendChild(erroMensag);
}
const getLocalStorage = async () => {
  const newPromisse = await getSavedCartIDs();
  const mapPromisse = newPromisse.map((promise) => fetchProduct(promise));
  const allPromisses = await Promise.all(mapPromisse);
  allPromisses.forEach((promise) => {
    const creat = createCartProductElement(promise);
    document.querySelector('.cart__products').appendChild(creat);
  });
};
getLocalStorage();
