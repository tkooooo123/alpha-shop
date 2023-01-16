<template>
     <div class="cartList-wrapper mt-5" v-if="stepper === 1">
        <div class="cartItem-card" v-for="cartItem in cartListItems" :key="cartItem.id">
          <img :src="cartItem.cartProducts.image" alt="" />
          <div class="cartItem-card-info">
            <div class="cartItem-card-info-name mt-3">{{ cartItem.cartProducts.name }}</div>
            <div class="cartItem-card-info-quantity">
              <div class="minus-btn" @click.prevent.stop="subQuantity(cartItem)">
                -
              </div>
              <div class="quantity">{{ cartItem.cartProducts.CartItem.quantity }}</div>
              <div class="plus-btn" @click.prevent.stop="addQuantity(cartItem)">
                +
              </div>
            </div>
            <div class="cartItem-card-info-price">
              NT$ {{ cartItem.cartProducts.CartItem.quantity * cartItem.cartProducts.price }}
            </div>
          </div>
          <button class="btn cartListItem-delete">
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
      </div>
</template>
<script>
export default {
    props: {
        cartListItems: {
            type: Array,
            required: true
        },
        stepper: {
            type: Number,
            required: true
        }
    },
    methods: {
        addQuantity(cartItem) {
          cartItem.cartProducts.CartItem.quantity++;
    },
    subQuantity(cartItem) {
      if (cartItem.cartProducts.CartItem.quantity > 1) {
        cartItem.cartProducts.CartItem.quantity--;
      }
    },
    }
}
</script>

<style lang="scss">
.cartList-wrapper {
    margin: 0 5%;
    @media (min-width: 800px) {
      width: 50%;
    }
    .cartItem-card {
      position: relative;
      display: flex;
      border: 1px solid #b8b7b7;
      border-bottom-width: 0;
      margin: auto;
      width: 100%;
      img {
        width: 30%;
      }
      .cartItem-card-info {
        display: flex;
        flex-flow: row wrap;

        &-name {
          width: 86%;
          margin: auto;
          text-align: start;
          font-weight: 600;
          font-size: 1.1rem;
        }

        &-quantity {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          margin: auto;
          padding-left: 0.4rem;
          line-height: 2rem;

          .minus-btn,
          .plus-btn {
            border: 1px solid #2a2a2a;
            width: 1.3rem;
            background: #e0e2e4;
          }
          .quantity {
            width: 2.5rem;
            border-top: 1px solid #2a2a2a;
            border-bottom: 1px solid #2a2a2a;
          }
          .minus-btn:hover,
          .plus-btn:hover {
            cursor: pointer;
            background: #ffffff;
          }
        }
        &-price {
          width: 40%;
          margin: auto;
          line-height: 2rem;
        }
      }
      .cartListItem-delete {
        position: absolute;
        top: 0;
        right: 0;
        width: 2rem;
        height: 2rem;
        border: none;
        background: #ffffff;
        opacity: 0.5;
        text-decoration: none;
      }
    }
    .cartItem-card:last-child {
      border-bottom: 1px solid #b8b7b7;
    }
  }
</style>