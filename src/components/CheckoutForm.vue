<template>
  <form
    class="form-wrapper"
    v-if="stepper === 2"
    @submit.prevent.stop="handleSubmit(stepper)"
  >
    <div class="form-group mt-3">
      <label for="name">收件人姓名</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="請輸入姓名"
        class="form-control"
        v-model="name"
        required
      />
    </div>
    <div class="form-group">
      <span>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          placeholder="請輸入 Email"
          v-model="email"
          required
        />
      </span>
    </div>
    <div class="form-group">
      <span>
        <label for="phone">電話</label>
        <input
          type="tel"
          id="name"
          name="phone"
          class="form-control"
          placeholder="請輸入電話"
          v-model="phone"
          required
        />
      </span>
    </div>
    <div class="form-group">
      <span>
        <label for="address">收件地址</label>
        <input
          type="text"
          id="address"
          name="address"
          class="form-control"
          placeholder="請輸入地址"
          v-model="address"
          required
        />
      </span>
    </div>
    <input type="hidden" name="userId" :value="userId"  />
    <input type="hidden" name="cartId" :value="cartId" />
    <input type="hidden" name="amount" :value="amount" />
    <input type="hidden" name="shipping_status" value="0" />
    <input type="hidden" name="payment_status" value="0" />
    <button type="submit" class="next-btn">送出資料</button>
  </form>
</template>

<script>
import OrderApi from '../apis/order'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex';

export default {
  props: {
    initialStepper: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
   
  },
  data() {
    return {
      userId: '',
      name: "",
      email: "",
      phone: "",
      address: "",
      shipping_status: 0,
      payment_status: 0,
      cartId: "",
      amount: this.totalPrice,
      stepper: this.initialStepper,
      orderId: ''
    };
  },
  created() {
    this.cartId = localStorage.getItem('cartId')
    this.userId = this.currentUser.id
  },
  methods: {
    handleStepper(stepper) {
      this.stepper = this.initialStepper;
      if (this.stepper < 3) {
        this.stepper++;
        stepper = this.stepper;
      }
      this.$emit("click-step-btn", stepper);
    },
    async handleSubmit(stepper) {
      try {
     
        const response = await OrderApi.postOrder({
          userId: this.userId,
          name: this.name,
          email: this.email,
        phone: this.phone,
        address: this.address,
        cartId: this.cartId,
        amount: this.amount,
        shipping_status: this.shipping_status,
        payment_status: this.payment_status
        })
        console.log('response', response)
        const { data } = response
      
        if (response.status === "error") {
          throw new Error(data.message);
        }
        stepper++
       console.log(stepper)
       this.$emit("click-step-btn", stepper);
       this.$bus.$emit('cartUpdate', {
            cart: []
          })
      } catch (error) {
        Toast.fire({
          icon:'error',
          title: '...'
        })
        console.log(error)
      }
      
      
    },
  },
  watch: {
    initialStepper: function () {
      this.stepper = this.initialStepper;
    },
    totalPrice: function() {
      this.amount = this.totalPrice
    },
    currentUser: function() {
      this.userId = this.currentUser.id
    }
  },
  computed: {
    ...mapState(['currentUser','isAuthenticated'])
  }
};
</script>

<style lang="scss">
.container {
  width: 100%;
}
.form-wrapper {
  border: 1px solid #b8b7b7;
  margin: 2.5rem 5%;
  @media (min-width: 800px) {
    width: 50%;
    margin-top: 3rem;
  }
  @media (min-width: 1100px) {
  }
  .form-group {
    display: block;
    margin: auto 5%;

    label {
      width: 100%;
      text-align: start;
      line-height: 2rem;
    }
    input {
      width: 100%;
      border-radius: 5px;
      border: 1px solid #b8b7b7;
      line-height: 2rem;
    }
  }
  .next-btn {
    margin: 10% auto;
    width: 90%;
    line-height: 2.5rem;
    background: #00457c;
    color: #ffffff;
    border-radius: 5px;
  }
}
</style>