<template>
  <div class="orderList-wrapper mt-5">
    <OrderListCard
      v-for="order in orders"
      :key="order.id"
      :initial-order="order"
    />
  </div>
</template>

<script>
import OrderApi from "../apis/order";
import OrderListCard from "../components/OrderListCard.vue";


export default {
  components: {
    OrderListCard,
  },
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await OrderApi.getOrders();
        console.log("response", response);
        const { data } = response;
        this.orders = data.orders;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.orderList-wrapper {
  margin: 2rem auto;
  @media (min-width: 900px) {
    width: 80%;
  }
  .orderList-table {
    margin: auto;
    width: 90%;
    border: 1px solid #747373;
    thead {
      border-bottom: 1px solid #747373;
      background-color: #ebebeb;
      th {
        font-size: 0.7rem;
        padding: 0.1rem auto;
        text-align: center;
      }
    }
    td {
      height: 2rem;
      font-size: 0.7rem;
      border-left: 1px solid #747373;
    }
    &-item-id {
      width: 18%;
    }
    &-item-date {
      width: 10%;
    }
    &-item-amount {
      width: 12%;
    }
    &-item-payment {
      width: 18%;
      &-btn {
        padding: 0.3rem;
        background-color: #00457c;
        color: #ffffff;
        border-radius: 5px;
        width: 4rem;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    &-item-shipment {
      width: 9%;
    }
    &-item-others {
      width: 6%;
    }
    &-item-cancel {
      width: 10%;
      &-btn {
        margin: auto;
        padding: 0.15rem;
        background-color: rgb(200, 56, 56);
        color: #ffffff;
        border-radius: 5px;
        width: 2rem;
        &:hover {
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }
  }
  .info-table {
    margin: auto;
    width: 90%;
    table {
      width: 100%;
    }

    .detail-show-btn,
    .detail-hidden-btn {
      position: relative;
      display: flex;
      .detailSwitch {
        position: absolute;
        top: 0.2rem;
        background-color: #ccc;
        height: 1rem;
        width: 1rem;

        cursor: pointer;
        border: 1px solid blue;
      }
      .detail-wrapper {
        width: 90%;
        text-align: start;
        margin-left: 1.5rem;

        font-size: 0.8rem;
        font-weight: 550;
        &-item-image {
          width: 15%;
          margin: auto;
          text-align: center;
          border: 1px solid #ccc;
          img {
            width: 5rem;
            margin: auto;
          }
        }
        &-item-name {
          width: 40%;
          padding-left: 1rem;
          text-align: start;
          border: 1px solid #ccc;
        }
        &-item-quantity {
          width: 15%;
          margin: auto;
          text-align: center;
          border: 1px solid #ccc;
        }
        &-item-price {
          width: 15%;
          margin: auto;
          text-align: center;
          border: 1px solid #ccc;
        }
      }
    }
    .detail-hidden-btn {
      .detail-wrapper {
        padding: 0.1rem 0.1rem 2rem;
      }
    }
  }
  hr {
    border-top: 1px solid #666;
    border-style: dashed;
    width: 88%;
  }
}
.orderList-wrapper .orderListCard:last-child hr {
  display: none;
}

.modal-title {
  font-weight: 700;
}
.modal-body {
  text-align: start;
  h4,
  h5 {
    margin: 0.3rem;
    font-weight: 550;
  }
}
.modal-footer {
  margin: auto;
  .prev-btn {
    margin: auto 1rem;
    padding: 0.3rem 0.5rem;
    background-color: rgb(200, 56, 56);
    color: #ffffff;
    border-radius: 5px;
    width: 4rem;
    font-size: 1.1rem;
    &:hover {
      opacity: 0.8;
    }
  }
  .next-btn {
    margin: auto 1rem;
    padding: 0.3rem 0.5rem;
    background-color: #00457c;
    color: #ffffff;
    border-radius: 5px;
    width: 4rem;
    font-size: 1.1rem;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>