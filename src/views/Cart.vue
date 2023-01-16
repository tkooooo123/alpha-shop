<template>
  <div class="main-container mt-5">
    <Stepper :stepper="stepper"/>
    
    <div class="cart-wrapper">
      <CartListItem 
      :cartListItems="cartItems"
      :stepper="stepper"
      />

      <SubTotal 
      :initial-stepper="stepper"
      :totalPrice="totalPrice"
      @click-step-btn="handleStepBtn"
      />
     
      <CheckoutForm 
      :initial-stepper="stepper"
      @click-step-btn="handleStepBtn"
      />
      

      

      <div class="completed-wrapper" v-if="stepper === 3">
        <div>訂單已完成!</div>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from '../components/Stepper.vue'
import CartListItem from '../components/CartListItem.vue'
import SubTotal from '../components/subTotal.vue'
import CheckoutForm from '../components/CheckoutForm.vue'
import CartApi from '../apis/cart'
import OrderApi from '../apis/order'

export default {
  
  components: {
    Stepper,
    CartListItem,
    SubTotal,
    CheckoutForm
  },
  data() {
    return {
      cartId: 0,
      carts: [],
      cartItems: [],
      stepper: 1,
    };
  },
  created() {
    this.fetchCartListItems();
    
  },
  methods: {
    async fetchCartListItems() {
      try {
        const cartId = localStorage.getItem('cartId')
    
        const response = await CartApi.getCart({
          cartId: cartId
        }) 
        console.log('response', response)
      
        const { data } = response
        
        console.log(data)
        this.carts = data.carts
        this.carts.forEach(item => {
         this.cartItems.push(item.cartProducts)
      });
       
      } catch (error) {
        console.log(error)
      }
    
    },
    handleStepBtn(stepper) {
      this.stepper = stepper
    },
    async handleSubmit() {
      try {
        const response = await OrderApi.postOrder()
        console.log('response', response)
      } catch (error) {
        console.log(error)
      }
      if(this.stepper > 1) {
        this.stepper++
      }
      const data = JSON.stringify({
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
      });
      console.log("data", data);
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
  },
  
};
</script>

<style lang="scss">
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
  border: 1px solid #b8b7b7;
  margin: 2.5rem 5%;
}
</style>