<template>
  <div class="subtotal-wrapper mt-5" v-if="stepper < 3">
    <div class="wrapper-title">訂單摘要</div>
    <div class="info-wrapper">
      <div class="list-item">
        <div class="item-title">商品金額</div>
        <div class="price">NT$ {{ totalPrice }}</div>
      </div>
      <div class="list-item">
        <div class="item-title">運費</div>
        <div class="price">免運</div>
      </div>
    </div>
    <div class="total-price">
      <div class="title">結帳金額</div>
      <div class="price">NT$ {{ totalPrice }}</div>
    </div>
    <div
      class="next-btn"
      v-if="stepper === 1"
      @click.prevent.stop="handleStepper(stepper)"
    >
      前往結帳
    </div>
    <div
      class="prev-btn"
      v-if="stepper === 2"
      @click.prevent.stop="cancelStepper(stepper)"
    >
      返回購物車
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepper: this.initialStepper,
    };
  },
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
  methods: {
    handleStepper(stepper) {
      if (this.stepper < 3) {
        this.stepper++;
        stepper = this.stepper;
      }
      this.$emit("click-step-btn", stepper);
    },
    cancelStepper(stepper) {
      if (this.stepper > 1) {
        this.stepper--;
        stepper = this.stepper;
      }
      this.$emit("click-step-btn", stepper);
    },
  },
  watch: {
    initialStepper: function () {
      this.stepper = this.initialStepper;
    },
  },
};
</script>

<style lang="scss">
.subtotal-wrapper {
  width: 90%;
  height: 50%;
  margin: 0 5%;
  border: 1px solid #b8b7b7;

  @media (min-width: 800px) {
    width: 50%;
  }

  .wrapper-title {
    border-bottom: 1px solid #b8b7b7;
    line-height: 3rem;
    background-color: rgba(0, 0, 0, 0.03);
  }
  .info-wrapper {
    margin: auto;
    border-bottom: 1px solid #b8b7b7;
    .list-item {
      display: flex;
      justify-content: space-between;
      margin: 5% 10%;
    }
  }
  .total-price {
    display: flex;
    justify-content: space-between;
    margin: 5% 10%;
  }
  .next-btn {
    margin: 10% 2.5rem;
    line-height: 2.5rem;
    background: #00457c;
    color: #ffffff;
    border-radius: 5px;
  }
  .next-btn:hover {
    cursor: pointer;
  }
  .prev-btn {
    margin: 10% 2.5rem;
    line-height: 2.5rem;
    background: #00457c;
    color: #ffffff;
    border-radius: 5px;
    opacity: 0.5;
  }
  .prev-btn:hover {
    cursor: pointer;
    opacity: 0.3;
  }
}
</style>