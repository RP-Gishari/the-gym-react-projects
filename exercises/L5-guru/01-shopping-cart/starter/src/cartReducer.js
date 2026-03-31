// TODO: Implement the cart reducer.
//
// State shape:
//   { items: Array<{ id, name, price, image, qty }> }
//
// Action types to handle:
//
//   { type: 'ADD_ITEM', payload: product }
//     - If an item with payload.id already exists, increment its qty by 1.
//     - If it does not exist, add { ...payload, qty: 1 } to items.
//
//   { type: 'REMOVE_ITEM', payload: id }
//     - Remove the item with the matching id from items entirely.
//
//   { type: 'UPDATE_QTY', payload: { id, qty } }
//     - Set the qty of the item matching id to payload.qty.
//     - If payload.qty is less than 1, remove the item instead.
//
//   { type: 'CLEAR_CART' }
//     - Reset items to an empty array.
//
// Rules:
//   - Never mutate state directly — always return a new object.
//   - The default case must return state unchanged.

export default function cartReducer(state, action) {
  switch (action.type) {
    // your cases here

    default:
      return state
  }
}
