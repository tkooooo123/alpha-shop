<template>
  <div class="wrapper">
    <div class="side-wrapper">
      <div class="title">商品分類</div>
      <ul class="list-group">
        <li class="list-item" v-for="category in categories" :key="category.id">
          <router-link
            :to="{ name: 'products', query: { categoryId: category.id } }"
          >
            {{ category.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-wrapper">
      <div class="title">熱賣商品</div>
      <div class="cards-wrapper">
        <div class="product-card" v-for="product in products" :key="product.id">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <div class="product-img"><img :src="product.image" alt="" /></div>
            <div class="product-name">{{ product.name }}</div>
            <div class="product-price">NT$ {{ product.price }}</div>
          </router-link>
        </div>
      </div>
      
    </div>
    <ProductsPagination
        :current-page="currentPage"
        :total-page="totalPage"
        :previous-page="previousPage"
        :next-page="nextPage"
      />
  </div>
</template>

<script>
import ProductsPagination from "../components/ProductsPagination.vue";
import ProductsApi from "../apis/products";

export default {
  components: {
    ProductsPagination,
  },
  data() {
    return {
      products: [],
      categories: [],
      currentPage: 1,
      totalPage: 1,
      previousPage: -1,
      nextPage: -1,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await ProductsApi.getProducts();
        console.log("response", response.data);

        const { products, categories, pagination } = response.data;
        this.products = products;
        this.categories = categories;
        const { page, totalPage, prev, next } = pagination;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;
      } catch (error) {
        console.log("error", error);
      }
    },
  },
};
</script>

<style lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  @media (min-width: 1200px) {
    padding: 0 5rem;
  }
  .side-wrapper {
    display: none;
    @media (min-width: 768px) {
      display: block;
      width: 30%;
      .title {
        margin-top: 1rem;
        padding-right: 1rem;
        line-height: 50px;
        font-size: 1.3rem;
        font-weight: 600;
      }
      .list-item {
        text-align: left;
        margin: auto;
        padding-left: 0.5rem;
        line-height: 40px;
        width: 5rem;
        font-weight: 600;
        cursor: pointer;
        border-top: 1px solid #bbb9b9;
      }
      .list-item:hover {
        color: red;
      }
    }
  }
  .main-wrapper {
    width: 100%;
    padding: 1rem;
    @media (min-width: 768px) {
        width: 70%;
    }
    .title {
      text-align: left;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .cards-wrapper {
      display: flex;
      flex-flow: row wrap;

      .product-card {
        width: 45%;
        margin: 1rem 0.7rem;

        @media (min-width: 900px) {
          width: 30%;
        }
        @media (min-width: 1200px) {
          width: 22%;
        }
      }
      .product-card:hover {
        opacity: 0.7;
        cursor: pointer;
      }

      img {
        width: 100%;
      }
      .product-name {
        padding-top: 1rem;
        font-size: 1.1rem;
        font-weight: 550;
      }
      .product-price {
        color: blue;
        padding-top: 0.5rem;
        font-size: 0.9rem;
        font-weight: 550;
      }
    }
  }
}
</style>