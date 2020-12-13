export function validForm(products, total, client) {
  return !products?.every((producto) => producto.cantidad > 0) ||
    total === 0 ||
    client?.length === 0
    ? true
    : false;
}
