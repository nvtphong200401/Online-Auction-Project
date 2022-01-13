export default {
  add(cart, item) {
    for (const i of cart) {
      if (item.id === i.id) {
        return;
      }
    }
    cart.push(item);
  },

  del(cart, id) {
    for (let i = cart.length - 1; i >= 0; i--) {
      if (id === cart[i].id) {
        cart.splice(i, 1);
        return;
      }
    }
  },

  getNumberOfItems(cart) {
    return cart.length;
  },

  isInCart(cart, id) {
    for (const i of cart) {
      if (id === i.id) {
        return true;
      }
    }
    return false;
  }
}