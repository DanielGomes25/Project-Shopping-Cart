import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

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
