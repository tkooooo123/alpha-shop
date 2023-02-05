<template>
  <div class="wrapper">
    <div class="side-wrapper">
      <div class="title">商品分類</div>
      <ul class="list-group">
        <li class="list-item" v-for="category in categories" :key="category.id">
          <router-link
            :to="{ name: 'products', query: { categoryId: category.id } }"
          >
          <i class="fas fa-angle-left"></i>
            {{ category.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-wrapper">
      <div class="product-wrapper">
        <ProductSwiper 
      :products="products"
      /><div class="product-wrapper">
      <div class="title">最新商品 TOP 5</div>
      <div
        class="product-card"
        v-for="(item, index) in products.slice(0, 5)"
        :key="item.id"
        @click.prevent.stop="$router.push(`/products/${item.id}`)"
      >
        <div class="product-card-number">0{{ index + 1 }}</div>
        <div class="product-card-image">
          <img :src="item.image" alt="" />
        </div>
        <div class="product-card-name">{{ item.name }}</div>
      </div>
    </div>

      </div>
      
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
        :categoryId="categoryId"
  
      />
  </div>
</template>

<script>
import ProductsPagination from "../components/ProductsPagination.vue";
import ProductsApi from "../apis/products";
import { Toast } from './../utils/helpers'
import ProductSwiper from "../components/ProductSwiper.vue";


export default {
  components: {
    ProductsPagination,
    ProductSwiper
  },

  data() {
    return {
      products: [],
      categories: [],
      categoryId:'',
      currentPage: 1,
      totalPage: 1,
      previousPage: -1,
      nextPage: -1,

      
    };
  },
  created() {
    const { page = '', categoryId = '' } = this.$route.query
    this.fetchProducts({
        queryPage: page,
        queryCategoryId: categoryId
    });
  },
  beforeRouteUpdate (to, from, next) {
    const { page='', categoryId='' } = to.query
    this.fetchProducts({ queryPage: page, queryCategoryId: categoryId })
    next()
  },
  methods: {
    async fetchProducts({  queryPage, queryCategoryId }) {
      try {
  
        const response = await ProductsApi.getProducts({
            page: queryPage,
            categoryId: queryCategoryId,
        });
        console.log("response", response);
        const { data } = response
        if (response.status === "error") {
          throw new Error(data.message);
        }

        const { products, categories, categoryId, pagination } = data;
        this.products = products;
        this.categories = categories;
        this.categoryId = categoryId
        const { currentPage, totalPage, prev, next } = pagination;
        this.currentPage = currentPage;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;
      
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得產品資料，請稍後再試'
        })
        console.log("error", error);
      }
    },
  }
 
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
      width: 20%;
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
        width: 6rem;
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
        width: 75%;
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
        width: 40%;

        margin: 1rem ;
        @media (min-width: 576px) {
         width: 27%;
        }

       
        @media (min-width: 1200px) {
          width: 20%;
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