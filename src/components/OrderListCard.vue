<template>
  <div class="orderListCard">
    <table class="orderList-table">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>日期</th>
          <th>總金額</th>
          <th>付款狀態</th>
          <th>配送狀態</th>
          <th>其他</th>
          <th>訂單取消</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="orderList-table-item-sn">{{ order.sn }}</td>
          <td class="orderList-table-item-date">{{ order.createdAt }}</td>
          <td class="orderList-table-item-amount">NT$ {{ order.amount }}</td>
          <td class="orderList-table-item-payment">
            <router-link
              class="orderList-table-item-payment-btn"
              to=""
              v-if="order.payment_status === '0'"
            >
              前往付款</router-link
            >
            <div v-else-if="order.payment_status === '1'">付款完成</div>
            <div v-else>已取消</div>
          </td>
          <td class="orderList-table-item-shipment">
            <div v-if="order.shipping_status === '0'">未配送</div>
            <div v-else-if="order.shipping_status === '1'">配送中</div>
            <div v-else>已取消</div>
          </td>
          <td class="orderList-table-item-others">
            <!-- Button trigger modal -->
            <button
              class="orderList-table-item-others-btn-show"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#orderModal"
              @click="showModal"
            >
              詳
            </button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="orderModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h2 class="modal-title" id="exampleModalLabel">
                      訂單編號 {{ order.sn }}
                    </h2>
                    <button class="btn orderModal-close"
                    @click="closeModal"
                    >
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h4>其他資訊如下：</h4>
                    <h5>收貨人姓名：{{ order.name }}</h5>
                    <h5>收貨人電話：{{ order.phone }}</h5>
                    <h5>收貨人地址：{{ order.address }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td class="orderList-table-item-cancel">
            <div
              class="orderList-table-item-cancel-btn"
              v-if="order.payment_status === '0'"
            >
              取消
            </div>
            <div v-else></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="info-table mt-2">
      <table>
        <tbody>
          <div
            class="detail-show-btn"
            style="display: block"
            @click.prevent.stop="handleSwitch1"
          >
            <img
              class="detailSwitch"
              src="//d.ecimg.tw/img/ecvip/img2/icon_list1.gif"
              alt="+"
            />
            <div class="detail-wrapper">看明細</div>
          </div>
          <div class="detail-hidden-btn" style="display: none">
            <img
              class="detailSwitch"
              @click.prevent.stop="handleSwitch2"
              src="//d.ecimg.tw/img/ecvip/img2/icon_list0.gif"
              alt="-"
            />
            <div class="detail-wrapper">
              <table>
                <tbody
                  v-for="orderProduct in order.orderProducts"
                  :key="orderProduct.id"
                >
                  <tr>
                    <td class="detail-wrapper-item-image">
                      <img :src="orderProduct.image" alt="" />
                    </td>
                    <td class="detail-wrapper-item-name">
                      {{ orderProduct.name }}
                    </td>
                    <td class="detail-wrapper-item-quantity">
                      {{ orderProduct.OrderItem.quantity }} 件
                    </td>
                    <td class="detail-wrapper-item-price">
                      NT$
                      {{ orderProduct.OrderItem.quantity * orderProduct.price }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </tbody>
      </table>
    </div>
    <hr />
  </div>
</template>

<script>
import OrderApi from "../apis/order";
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
      modal: null,
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
    handleSwitch1(e) {
      e.target.parentNode.style.display = "none";
      e.target.parentNode.nextElementSibling.style.display = "block";
    },
    handleSwitch2(e) {
      e.target.parentNode.style.display = "none";
      e.target.parentNode.previousElementSibling.style.display = "block";
    },
    showModal(e) {
      this.modal = new modal(e.target.nextElementSibling);
      this.modal.show();
    },
    closeModal() {
        this.modal.hide()
    }
  },
};
</script>