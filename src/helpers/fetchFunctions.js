export const fetchProduct = async (ProductID) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${ProductID}`);
  if (!ProductID) {
    throw new Error('ID não informado');
  }
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (QUERY) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
  if (!QUERY) {
    throw new Error('Termo de busca não informado');
  }
  const data = await response.json();
  return data.results;
};
