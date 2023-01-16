<template>
  <div class="product-wrapper">
    <div class="product-card">
      <div class="product-img">
        <img :src="product.image" alt="" />
      </div>
      <div class="product-info">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-price">NT$ {{ product.price }}</div>
        <span class="line"></span>
        <div class="product-description">
          {{ product.description }}
        </div>
        <span class="line"></span>
        <form @submit.prevent.stop="handleSubmit">
          <div class="product-quantity">
          <div class="list-group">
            <label class="title" for="quantity">數量</label>
              <div class="minus-btn" @click.prevent.stop="subQuantity">-</div>
              <input
                type="number"
                class="quantity"
                id="quantity"
                v-model="itemQuantity"
                :max="product.quantity"
                :disabled="itemQuantity <= 1"
              />
              <input type="hidden" name="productId" :value="product.id"/>
              <input type="hidden" name="cartId" :value="cartId"/>
              <div class="plus-btn" @click.prevent.stop="addQuantity">+</div>
          </div>
          <button type="submit" class="add-cart">加入購物車</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsApi from "../apis/products";
import CartApi from '../apis/cart'
import { Toast } from '../utils/helpers'


export default {
  data() {
    return {
      product: {},
      cartId: '',
      itemQuantity: 1,
    };
  },
  created() {
    const { id: productId } = this.$route.params;
    this.cartId = localStorage.getItem('cartId')
    this.fetchProduct({ productId });
  },
  methods: {
    async fetchProduct({ productId }) {
      try {
        const response = await ProductsApi.getProduct({ productId });
        console.log("response", response);
        const { data } = response
        if (response.status === "error") {
          throw new Error(data.message);
        }
        const { product } = data;
        this.product = product;
      } catch (error) {
        Toast.fire({
          icon:"error",
          title: "無法取得產品資料，請稍後再試"
        })
        console.log(error);
      }
    },
    addQuantity() {
      if (this.itemQuantity < this.product.quantity) {
        this.itemQuantity++;
      }
    },
    subQuantity() {
      if(this.itemQuantity > this.product.quantity) {
        this.itemQuantity = this.product.quantity
      } else if (this.itemQuantity > 1) {
        this.itemQuantity--;
      }
    },
    async handleSubmit() {
      try {
        
        const response = await CartApi.postCart({
          productId: this.product.id,
          quantity: this.itemQuantity,
          cartId: this.cartId
        })
        console.log('response', response)
        const { data } = response
        if (response.status === "error") {
          throw new Error(data.message);
        }
        if (response.status === 200) {
          Toast.fire({
            icon: "success",
            title: "商品成功加入購物車"
          })
        }
        
        localStorage.setItem('cartId', data.getCartId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法加入購物車，請稍後再試'
        })
        console.log(error)
      }
    }
  },
};
</script>

<style lang="scss">
.product-wrapper {
  .product-card {
    padding: 1rem 2rem;
    text-align: start;
    .product-img {
      padding: 1rem 2rem;
    }
    img {
      width: 100%;
    }
    .product-info {
      position: relative;
      padding: 1rem;
    }
    .product-name {
      font-size: 1.2rem;
      font-weight: 550;
    }
    .product-price {
      color: #00457c;
      font-size: 1.1rem;
      padding: 0.5rem 0;
    }
    .product-description {
      padding: 2rem 0;
    }
    
    .line {
      position: absolute;
      left: 0.5rem;
      right: 0.5rem;
      height: 1px;
      content: "";
      background: #747373;
    }
    .product-quantity {
      text-align: center;
      display: flex;
      padding: 2rem 0;
      .list-group {
        display: flex;
        flex-flow: row wrap;
        line-height: 2rem;
        .title {
          padding-right: 0.5rem;
          margin: auto;
        }
        .minus-btn,
        .plus-btn {
          border: 1px solid #2a2a2a;
          margin: auto;
          width: 1.3rem;
          background: #e0e2e4;
        }
        .minus-btn:hover,
        .plus-btn:hover {
          cursor: pointer;
          background: #ffffff;
        }
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
        .quantity {
          width: 2rem;
          margin: auto;
          text-align: center;
          border-top: 1px solid #2a2a2a;
          border-bottom: 1px solid #2a2a2a;
          
        }
      }
      .add-cart {
        margin-left: 3rem;
        width: 10rem;
        line-height: 2rem;
        border: none;
        border-radius: 3px;
        color: #ffffff;
        background: #4f2e0b;
      }
      .add-cart:hover {
        cursor: pointer;
      }
    }
    @media (min-width: 900px) {
      display: flex;
      flex-flow: row wrap;
      margin-left: 5%;
      .product-img {
        width: 45%;
      }
      .product-info {
        width: 45%;
      }
    }
    @media (min-width: 1000px) {
      margin-left: 8%;
      .product-info {
        margin-top: 2rem;
        width: 27rem;
      }
    }
  }
}
</style>