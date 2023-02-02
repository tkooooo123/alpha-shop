<template>
  <div class="order-wrapper">
    <!-- Button trigger modal -->
    <button
      class="modal-btn"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click.prevent.stop="showModal"
    >
      詳
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      :id="modalId"
      tabindex="-1"
      aria-labelledby="exampleModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">商品明細</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click.prevent.stop="closeModal"
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div class="modal-body">
            <table>
              <tbody
                v-for="orderProduct in order.orderProducts"
                :key="orderProduct.id"
              >
                <tr>
                  <td class="orderProduct-img">
                    <img :src="orderProduct.image" alt="" />
                  </td>
                  <td class="orderProduct-name">
                    {{ orderProduct.name }}
                  </td>
                  <td class="orderProduct-quantity">
                    {{ orderProduct.OrderItem.quantity }} 件
                  </td>
                  <td class="orderProduct-price">
                    NT$
                    {{ orderProduct.OrderItem.quantity * orderProduct.price }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <p>收件人姓名: {{ order.name }}</p>
            <p>收件地址: {{ order.address }}</p>
            <p>連絡電話: {{ order.phone }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminApi from "../../apis/admin";
import modal from "bootstrap/js/dist/modal";

export default {
  props: {
    initialOrderId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      order: [],
      totalPrice: "",
      modalId: "",
      modal: null,
    };
  },
  created() {
    this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
      try {
        const response = await AdminApi.getOrder({
          id: this.initialOrderId,
        });
        console.log("response", response);
        this.order = response.data.order;
        this.modalId = `order${this.order.id}`;
        this.totalPrice = response.data.totalPrice;
      } catch (error) {
        console.log(error);
      }
    },
    showModal() {
      console.log(";123");
      this.modal = new modal(document.getElementById(this.modalId));
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
};
</script>

<style lang="scss">
.modal-body {
  width: 90%;
  text-align: start;
  margin-left: 1.5rem;

  font-size: 0.8rem;
  font-weight: 550;
  .orderProduct-img {
    width: 15%;
    margin: auto;
    text-align: center;
    border: 1px solid #ccc;
    img {
      width: 5rem;
      margin: auto;
    }
  }
  .orderProduct-name {
    width: 40%;
    padding-left: 1rem;
    text-align: start;
    border: 1px solid #ccc;
  }
  .orderProduct-quantity {
    width: 15%;
    margin: auto;
    text-align: center;
    border: 1px solid #ccc;
  }
  .orderProduct-price {
    width: 15%;
    margin: auto;
    text-align: center;
    border: 1px solid #ccc;
  }
  
}
.modal-footer {
  margin: 0 1.5rem;
    p {
      width: 100%;
      text-align:start;
      font-weight: 550;
    }
  }
</style>