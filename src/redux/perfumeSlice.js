import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      const item = state.items.find(i => i.id === action.payload.id && i.type === action.payload.type);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    incrementQuantity(state, action) {
      const { id, type } = action.payload;
      const item = state.items.find(i => i.id === id && i.type === type);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    decrementQuantity(state, action) {
      const { id, type } = action.payload;
      const item = state.items.find(i => i.id === id && i.type === type);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    removeItem(state, action) {
      const { id, type } = action.payload;
      state.items = state.items.filter(item => !(item.id === id && item.type === type));
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    }
  },
});

export const { setCart, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;