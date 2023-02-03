<template>
  <div class="wrapper">
    <div class="side-wrapper">
      <div class="title">商品分類</div>
      <div class="list-item" @click="$router.push('/products')">
        <i class="fas fa-angle-left"></i>
        <span> 所有分類</span>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="title">
        找到{{ number }}件"{{ `${$route.query.key}` }}"的商品
      </div>
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
  </div>
</template>

<script>
import ProductsApi from "../apis/products";

export default {
  data() {
    return {
      products: [],
      number: '',
    
    };
  },
  mounted() {
    console.log(this.$route.query.key);
    this.fetchProducts();
  },
  beforeRouteUpdate (to, from, next) {

    next()
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        console.log("123");
        const response = await ProductsApi.getProducts({
          categoryId: '',
          page: '',
          keyword: this.$route.query.key,
        });

        const { data } = response
        if (response.status === "error") {
          throw new Error(data.message);
        }

        this.products = response.data.totalProducts;
        this.number = response.data.totalProducts.length;

        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss">
</style>