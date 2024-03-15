import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsByFilters, fetchBrands, fetchCategories, fetchProductById, createProduct, UpdateProduct } from './ProductListAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
  selectedProduct: null
};
export const createProductAsync = createAsyncThunk(
  'product-list/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const UpdateProductAsync = createAsyncThunk(
  'product-list/update',
  async (update) => {
    const response = await UpdateProduct(update);
    return response.data;
  }
);
export const fetchAllProductByIdsAsync = createAsyncThunk(
  'product-list/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product-list/fetchProductsByFilters',
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination, admin);
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product-list/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product-list/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const productslice = createSlice({
  name: 'product-list',
  initialState,
  reducers: {
    clearselectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchAllProductsAsync.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.products = action.payload;
      // })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchAllProductByIdsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByIdsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(UpdateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product => product.id === action.payload.id);
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
  },
});

export const { clearselectedProduct } = productslice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;

export default productslice.reducer;