<template>
  <div>
    <div class="cart-alert" v-if="carts.length === 0">
      <h2>您的購物車沒有商品！</h2>
      <router-link to="/products">
        <div class="shopping-btn">前往購物</div>
      </router-link>
    </div>

    <div class="main-container mt-5" v-else>
      <Stepper :stepper="stepper" />
      <div class="cart-wrapper">
        <CartListItem :cartListItems="cartItems" :stepper="stepper" />

        <SubTotal
          :initial-stepper="stepper"
          :totalPrice="totalPrice"
          @click-step-btn="handleStepBtn"
        />

        <CheckoutForm
          :initial-stepper="stepper"
          :totalPrice="totalPrice"
          :cartId="cartId"
          @click-step-btn="handleStepBtn"
          @get-order-id="getOrderId"
        />
        <div class="completed-wrapper"
        v-if="stepper===3"
        >
          <div class="img-wrapper">
            <img
              class="completed-img"
              src="../../public/photo/completed.png"
              alt=""
            />
          </div>
          <h1>感謝您的訂購</h1>
          <p>已收到您的訂單，請您檢視訂單並確認付款狀態</p>
          <div class="btn-wrapper">
            <router-link to="/home">
              <div class="prev-btn">前往首頁</div>
            </router-link>
            <router-link to="/order">
              <div class="next-btn">查看訂單</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "../components/Stepper.vue";
import CartListItem from "../components/CartListItem.vue";
import SubTotal from "../components/subTotal.vue";
import CheckoutForm from "../components/CheckoutForm.vue";
import CartApi from "../apis/cart";
import OrderApi from "../apis/order";
import { mapState } from "vuex";

export default {
  components: {
    Stepper,
    CartListItem,
    SubTotal,
    CheckoutForm,
  },
  data() {
    return {
      cartId: 0,
      carts: [],
      cartItems: [],
      stepper: 1,
      orderId: "",
    };
  },
  created() {
    this.fetchCartListItems();
  },
  methods: {
    async fetchCartListItems() {
      try {
        const cartId = localStorage.getItem("cartId");

        const response = await CartApi.getCart({
          cartId: cartId,
        });
        console.log("response", response);

        const { data } = response;

        console.log(data);
        this.carts = data.carts;
        this.carts.forEach((item) => {
          this.cartItems.push(item.cartProducts);
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleStepBtn(stepper) {
      this.stepper = stepper;
    },
    async handleSubmit() {
      try {
        const response = await OrderApi.postOrder();
        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
      if (this.stepper > 1) {
        this.stepper++;
      }
      const data = JSON.stringify({
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
      });
      console.log("data", data);
    },
    getOrderId(gotOrderId) {
      this.orderId = gotOrderId;
    },
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.cartItems.forEach((item) => {
        total += item.CartItem.quantity * item.price;
      });
      return total;
    },
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>

<style lang="scss">
.cart-alert {
  h2 {
    margin: 6rem auto 3rem;
  }
  .shopping-btn {
    margin: 0 auto;
    padding: 0.5rem 0;
    width: 8rem;
    border-radius: 0;
    background: #00457c;
    color: #ffffff;
  }
}
.main-container {
  margin: 1rem auto;
}
.cart-wrapper {
  @media (min-width: 800px) {
    display: flex;
  }
  @media (min-width: 1100px) {
    margin: 0 10%;
  }
}

.completed-wrapper {
  width: 90%;
  margin: 10rem 5%;
  .img-wrapper {
    margin: 3rem auto;
    height: 15rem;
    width: 15rem;
  }
  h1 {
    font-weight: 700;
    margin: 2rem;
  }
  p {
    font-size: 1.5rem;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    .prev-btn {
      border: 1px solid #747373;
      margin: 1rem 1.5rem;
      padding: 0.5rem 1rem;
      color: #2a2a2a;
      border-radius: 5px;

      &:hover {
        opacity: 0.7;
      }
    }
    .next-btn {
      border: 1px solid #747373;
      margin: 1rem 1.5rem;
      padding: 0.5rem 1rem;
      color: #ffffff;
      background-color: #00457c;
      border-radius: 5px;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>