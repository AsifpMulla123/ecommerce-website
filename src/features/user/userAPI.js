export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders/own/')
    // const response = await fetch('/orders/own/')
    const data = await response.json()
    resolve({ data })
  }
  );
}
export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/own')
    // const response = await fetch('/users/own')
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/' + update.id, {
    // const response = await fetch('/users/' + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}