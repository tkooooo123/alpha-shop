<template>
  <div class="main-container mt-5">
    <Stepper :stepper="stepper"/>
    
    <div class="cart-wrapper">
      <CartListItem 
      :cartListItems="cartListItems"
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

const dummyData = {
  cartListItems: [
    {
      id: 1,
      name: "逗貓棒",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ZpuiBtHuxsl-cKq4EhfBjtSVSyOfF7-iwlrjWtG5jkzKsDR8dwWTP7TGBGX4_8Fg7So&usqp=CAU",
      descrption: "老鼠羽毛款式",
      price: "99",
      quantity: "1",
    },
    {
      id: 2,
      name: "逗貓棒",
      image: "https://cf.shopee.tw/file/e969e0640182b3626fc540b46ebb0f84",
      descrption: "南瓜款式",
      price: "99",
      quantity: "1",
    },
    {
      id: 3,
      name: "動物逗貓棒",
      image:
        "https://shoplineimg.com/5f816d380232320038683a4a/60ae0c38d73e3b003880358a/800x.jpg?",
      descrption: "企鵝款式",
      price: "99",
      quantity: "1",
    },
    {
      id: 4,
      name: "白色逗貓棒",
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUIBxIWEhUVFhkVFRcVFhcVGRsXHRgWFhUaGxYaHSghGCYlGxUXITMlJSkrLjMuHR8zODMtOig5NisBCgoKDg0NFg8QFS0dHRstLTcrNzcrKy0rKysrLis3Nys3Ky03LSsrNysrKys3Kys3Ky03LS0tLSsrNysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAf/xAAvEAEAAgIABAMGBgMBAAAAAAAAAQIDEQQSITFBcdFRYYGxwfATIjKRofEFUnIU/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEDAv/EABgRAQEBAQEAAAAAAAAAAAAAAAABEQIS/9oADAMBAAIRAxEAPwD3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFbTO9QCwwtqOszM/ExZua/JLn1NxcbgOkAAAAAAAAAAAAAAAAAAAAAAAAGGWeW+/c0vkpT9UuTisXE8Ret8NorET1rMfqiddd+Go3pLNhGd8u7d08PeL54rXr47Uz8HOGs35pmPuPq6P8bjx1w81Y69rebHni60vUx2AN2YAAAAAAAAAAAAAAAAAAAAAAi1opXmsrltNY1XvPSPVFcNYndus+/07AYq9Oe3efvTQAc/Exz4LR8PkthpydvGI/ft6K/qxWrP+0x/LaZ/PEef0QWAUAAAAAAAAAAAAAAAAAAAAGd8lublxRufHfSEWzRPTHE2n3dv37LYqTSvXvPWfMEUpPNzZJ3P7RDQRuASI5q+05oBhSN8RPn/AH8oWmZnioj2Vn+ZjXyWrXU78fVTDuclrT7f6QbgKAAAAAAAAAAAAAAAAAADHNaLT+HXvPfy8SYnNea71Ed9dNz5tKY644/JGgTWIrGoSAK3pF41LP8A82Lfb5tgwVjHWOkQnUJARMbRyzrusApyW8JIrbxtP8LgAAAAAAAAAAAAAAAADlrxVeIvOPh53rpM+EepnieKpOGkzEeNo+Uba8Pgx8PijHijUR97mfEF8dIpXULAAAAAAAAAAAAAAAAAAAAAAAACLWisbkEzOo3LDc551XpX2+3yRETxE7npX5uiI1GoBFaxWuoSAAAAAAAAAAAAAAAAAAAAAAAAM82WuKu5BbJetK7sxrW2eefJ0jwj1Rjx2y2/Ey/CPWPo6QAAAAAAAAAAAAAAAAAAAAAAAAAc3EcRFYmKz27z9IBPEcTXFGvFTBitkn8XN8In5z6eCvD8Nz2jNmj/AJifDx3Pv+/LtAAAAAAAAAAAAAAAAAAAAAAAAAAByf5DNkx0iuKtrc06/LHb080cNwtomMmfW47RHaPWXYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z",
      descrption: "圓球款式",
      price: "99",
      quantity: "3",
    },
    {
      id: 5,
      name: "白色逗貓棒",
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUIBxIWEhUVFhkVFRcVFhcVGRsXHRgWFhUaGxYaHSghGCYlGxUXITMlJSkrLjMuHR8zODMtOig5NisBCgoKDg0NFg8QFS0dHRstLTcrNzcrKy0rKysrLis3Nys3Ky03LSsrNysrKys3Kys3Ky03LS0tLSsrNysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAf/xAAvEAEAAgIABAMGBgMBAAAAAAAAAQIDEQQSITFBcdFRYYGxwfATIjKRofEFUnIU/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEDAv/EABgRAQEBAQEAAAAAAAAAAAAAAAABEQIS/9oADAMBAAIRAxEAPwD3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFbTO9QCwwtqOszM/ExZua/JLn1NxcbgOkAAAAAAAAAAAAAAAAAAAAAAAAGGWeW+/c0vkpT9UuTisXE8Ret8NorET1rMfqiddd+Go3pLNhGd8u7d08PeL54rXr47Uz8HOGs35pmPuPq6P8bjx1w81Y69rebHni60vUx2AN2YAAAAAAAAAAAAAAAAAAAAAAi1opXmsrltNY1XvPSPVFcNYndus+/07AYq9Oe3efvTQAc/Exz4LR8PkthpydvGI/ft6K/qxWrP+0x/LaZ/PEef0QWAUAAAAAAAAAAAAAAAAAAAAGd8lublxRufHfSEWzRPTHE2n3dv37LYqTSvXvPWfMEUpPNzZJ3P7RDQRuASI5q+05oBhSN8RPn/AH8oWmZnioj2Vn+ZjXyWrXU78fVTDuclrT7f6QbgKAAAAAAAAAAAAAAAAAADHNaLT+HXvPfy8SYnNea71Ed9dNz5tKY644/JGgTWIrGoSAK3pF41LP8A82Lfb5tgwVjHWOkQnUJARMbRyzrusApyW8JIrbxtP8LgAAAAAAAAAAAAAAAADlrxVeIvOPh53rpM+EepnieKpOGkzEeNo+Uba8Pgx8PijHijUR97mfEF8dIpXULAAAAAAAAAAAAAAAAAAAAAAAACLWisbkEzOo3LDc551XpX2+3yRETxE7npX5uiI1GoBFaxWuoSAAAAAAAAAAAAAAAAAAAAAAAAM82WuKu5BbJetK7sxrW2eefJ0jwj1Rjx2y2/Ey/CPWPo6QAAAAAAAAAAAAAAAAAAAAAAAAAc3EcRFYmKz27z9IBPEcTXFGvFTBitkn8XN8In5z6eCvD8Nz2jNmj/AJifDx3Pv+/LtAAAAAAAAAAAAAAAAAAAAAAAAAAByf5DNkx0iuKtrc06/LHb080cNwtomMmfW47RHaPWXYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z",
      descrption: "圓球款式",
      price: "99",
      quantity: "1",
    },
  ],
};
export default {
  components: {
    Stepper,
    CartListItem,
    SubTotal,
    CheckoutForm
  },
  data() {
    return {
      
      cartListItems: [],
      stepper: 1,
    };
  },
  created() {
    this.fetchCartListItems();
  },
  methods: {
    fetchCartListItems() {
      const { cartListItems } = dummyData;
      this.cartListItems = cartListItems;
    },
    handleStepBtn(stepper) {
      this.stepper = stepper
    },
    handleSubmit() {
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
      this.cartListItems.forEach((item) => {
        total += item.quantity * item.price;
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