<template>
  <div>
    
    <div>
      <button
        type="button"
        @click.prevent.stop="fetchPayment"
        class="orderList-table-item-payment-btn"
        data-bs-toggle="modal"
        data-bs-target="#paymentModal"
      >
        前往付款
      </button>
      <!-- Modal -->
      <div
        class="modal fade"
        id="paymentModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLabel">確認訂單</h3>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h5>訂單編號：{{ order.id }}</h5>
              <h5>訂單金額： NT$ {{ order.amount }}</h5>
              <h5>收件人： {{ order.name }}</h5>
            </div>
            <div class="modal-footer">
              <form @submit.prevent.stop="submitPayment">
                <input
                  type="text"
                  name="MerchantID"
                  :value="tradeInfo.MerchantID"
                  hidden
                />
                <input
                  type="text"
                  name="TradeInfo"
                  :value="tradeInfo.TradeInfo"
                  hidden
                />
                <input
                  type="text"
                  name="TradeSha"
                  :value="tradeInfo.TradeSha"
                  hidden
                />
                <input
                  type="text"
                  name="Version"
                  :value="tradeInfo.version"
                  hidden
                />
                <div>
                  <button
                    type="button"
                    class="prev-btn"
                    data-bs-dismiss="modal"
                    @click.prevent.stop="closeModal"
                  >
                    取消
                  </button>
                  <button type="submit" class="next-btn">確認</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import OrderApi from "../apis/order"
import modal from "bootstrap/js/dist/modal";
export default {
  props: {
    initialOrder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      order: this.initialOrder,
      orderId: this.initialOrder.id,
      modal: null,
      tradeInfo: []
    };
  },
  methods: {
    async fetchPayment(e) {
      try {
        console.log(e.target.nextElementSibling);
        const response = await OrderApi.getPayment({
          orderId: this.orderId,
        });
        console.log("response", response);
        const { data } = response;
        this.tradeInfo = data.tradeInfo;
        this.modal = new modal(e.target.nextElementSibling);
        this.modal.show();
      } catch (error) {
        console.log(error);
      }
    },
    showModal(e) {
      this.modal = new modal(e.target.nextElementSibling);
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    submitPayment() {
        const data = JSON.stringify({
            MerchantID: this.tradeInfo.MerchantID,
      
      })
      console.log('123')
      console.log('data', data)


    },
  },
};
</script>