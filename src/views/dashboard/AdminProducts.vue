<template>
  <div class="products-wrapper">
    <CreateProductModal :initial-categories="categories"
    @create="handleEmit"
    />

    <div class="productList mt-4">
      <table class="productList-table">
        <thead>
          <tr>
            <th></th>
            <th>分類</th>
            <th>產品名稱</th>
            <th>價格</th>
            <th>編輯/刪除</th>
          </tr>
        </thead>

        <tbody v-for="product in products" :key="product.id" :id="product.id">
          <tr>
            <td class="img-wrapper">
              <img :src="product.image" alt="" />
            </td>

            <td class="productList-item-category">
              {{ product.Category.name }}
            </td>
            <td class="productList-item-name">{{ product.name }}</td>
            <td class="productList-item-price">NT$ {{ product.price }}</td>
            <td class="productList-item-btn">
              <EditProductModal
                :initial-product-id="product.id"
                :initial-categories="categories"
                @edit="handleEmit"
              />
            </td>
          </tr>
        </tbody>
      </table>
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
import AdminApi from "../../apis/admin";
import { Toast } from "../../utils/helpers";
import EditProductModal from "../dashboard/EditProductModal.vue";
import CreateProductModal from "../dashboard/CreateProductModal.vue";
import ProductsPagination from "../../components/ProductsPagination.vue"
export default {
  components: {
    EditProductModal,
    CreateProductModal,
    ProductsPagination
  },
  data() {
    return {
      products: [],
      categories: [],
      updated: false,
      categoryId: '',
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
    async fetchProducts({ queryPage, queryCategoryId}) {
      try {
        const response = await AdminApi.getProducts({
          page: queryPage,
            categoryId: queryCategoryId
        });
        console.log("response", response);
        const { data } = response;
        if (response.status === " error") {
          throw new Error(data.message);
        }
        console.log(data.pagination )
        const { currentPage, totalPage, next, prev } = data.pagination
        this.currentPage = currentPage
        this.totalPage = totalPage
        this.nextPage = next
        this.previousPage = prev

        this.products = data.products;
        this.categories = data.categories;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得產品資料，請稍後在試",
        });
        console.log(error);
      }
    },
    handleEmit() {
      this.fetchProducts()
    }
  },
  
};
</script>

<style lang="scss">
.products-wrapper {
  margin: 2rem 0;
  @media (min-width: 800px) {
    margin: 2rem 20%;
  }
  .create-wrapper {
    text-align: end;
    .product-create-btn {
      padding: 0.3rem 0.5rem;
      background-color: #00457c;
      color: #ffffff;
      border-radius: 5px;
      width: 6rem;
      font-size: 1.1rem;
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .productList {
    margin: auto;
    border-radius: 10px;
    .productList-table {
      background-color: #747373;
      border-radius: 10px;
      text-align: center;
      margin: auto;
      width: 100%;
      .img-wrapper {
        width: 20%;
        margin: auto;
        padding: 0.2rem;
        text-align: center;
        img {
          width: 4rem;
          margin: auto;
        }
      }
      th {
        height: 2.5rem;
        padding: 0.1rem auto;
        margin: auto;
        text-align: center;
      }
      td {
        margin: auto;
        text-align: center;
        background-color: #ffffff;
      }
      &-item-name {
        width: 10%;
      }
      &-item-category {
        width: 10%;
      }
      &-item-price {
        width: 15%;
      }
      &-item-btn {
        width: 15%;
      }
      tr {
        border-bottom: 1px solid #ccc;
        margin: 0;
      }
    }
    .productList-table tbody:last-child {
      border-bottom: none;
    }
  }
}
</style>