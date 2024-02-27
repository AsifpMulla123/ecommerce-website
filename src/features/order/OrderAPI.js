export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders', {
      method: "POST",
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}
export function fetchAllOrders(pagination) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products?' + queryString);
    // console.log(queryString);
    // const data = await response.json();
    const data = await response.json();
    const totalOrders = await response.headers.get('X-Total-Count');
    console.log("This are the total items: " + totalOrders);
    resolve({ data: { orders: data, totalOrders: +totalOrders } })
  }
  );
}