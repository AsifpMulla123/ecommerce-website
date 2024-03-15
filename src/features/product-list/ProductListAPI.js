// A mock function to mimic making an async request for data
// export function fetchAllProducts() {
//   return new Promise(async (resolve) => {
//     // Todo: we will not hard code server url here
//     const response = await fetch('http://localhost:8080/products');
//     const data = await response.json();
//     resolve({ data });
//   }
//   );
// }

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // Todo: we will not hard code server url here
    const response = await fetch('http://localhost:8080/products/' + id)
    // const response = await fetch('/products/' + id)
    const data = await response.json();
    resolve({ data });
  }
  );
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    // Todo: we will not hard code server url here
    const response = await fetch('http://localhost:8080/products/', {
    // const response = await fetch('/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}
export function UpdateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/' + update.id, {
    // const response = await fetch('/products/' + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}
// Fetching data from the dummyjson.com
export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10} 
  // we will not show deleted Products
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  if (admin) {
    queryString += 'admin=true';
  }
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products?' + queryString);
    // const response = await fetch('/products?' + queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    console.log("This are the total items: " + totalItems);
    resolve({ data: { products: data, totalItems: +totalItems } })
  }
  );
}



// category
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories');
    // const response = await fetch('/categories');
    const data = await response.json();
    resolve({ data });
  }
  );
}
// Brands
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands');
    // const response = await fetch('/brands');
    const data = await response.json();
    resolve({ data });
  }
  );
}