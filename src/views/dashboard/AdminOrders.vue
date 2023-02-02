<template>
  <div class="orders-wrapper">
    <div class="orderList mt-4">
      <table class="orderList-table">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>訂單日期</th>
            <th>總金額</th>
            <th>付款狀態</th>
            <th>配送狀態</th>
            <th>其他</th>
            <th>編輯/取消</th>
          </tr>
        </thead>

        <tbody v-for="order in orders" :key="order.id">
          <tr>
            <td>
              {{ order.id }}
            </td>

            <td class="orderList-item-category">
              {{ order.createdAt }}
            </td>
            <td class="orderList-item-name">NT$ {{ order.amount }}</td>
            <td class="orderList-item-price">
              <div v-show="!order.isEditing">
                <div v-if="order.payment_status === '0'">未付款</div>
                <div v-else-if="order.payment_status === '1'">已付款</div>
                <div v-else>已取消</div>
              </div>
              <div v-show="order.isEditing">
                <label for="payment"></label>
                <select name="payment" id="payment"
                v-model="order.payment_status">
                  <option value="-1" :selected="order.payment_status === '-1'">
                    已取消
                  </option>
                  <option value="0" :selected="order.payment_status === '0'">
                    未付款
                  </option>
                  <option value="1" :selected="order.payment_status === '1'">
                    已付款
                  </option>
                </select>
              </div>
            </td>
            <td>
              <div v-show="!order.isEditing">
                <div v-if="order.shipping_status === '0'">未配送</div>
                <div v-else-if="order.shipping_status === '1'">配送中</div>
                <div v-else>已取消</div>
              </div>
              <div v-show="order.isEditing">
                <label for="shipment"></label>
                <select name="shipment" id="shipment"
                v-model="order.shipping_status"

                >
                  <option value="-1" :selected="order.shipping_status === '-1'">
                    已取消
                  </option>
                  <option value="0" :selected="order.shipping_status === '0'">
                    未配送
                  </option>
                  <option value="1" :selected="order.shipping_status === '1'">
                    配送中
                  </option>
                </select>
              </div>
            </td>
            <td>
              <AdminOrderModal
              :initial-order-id="order.id"
              />
            </td>
            <td class="orderList-item-btn">
              <button
                v-show="!order.isEditing"
                @click.prevent.stop="toggleIsEditing(order.id)"
              >
                <i class="fa fa-edit fa-lg"></i>
              </button>
              <button
                v-show="order.isEditing"
                @click.prevent.stop="updateOrder({orderId: order.id, payment: order.payment_status, shipment: order.shipping_status})"
              >
                <i class="fa fa-save fa-lg"></i>
              </button>
              <button @click.prevent.stop="cancelOrder(order.id)">
                <i class="fa fa-cancel fa-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AdminOrderPaginaiton 
    :current-page="currentPage"
        :total-page="totalPage"
        :previous-page="previousPage"
        :next-page="nextPage"
    />
    
  </div>
</template>
  
  <script>
import AdminApi from "../../apis/admin";
import { Toast } from "../../utils/helpers";
import AdminOrderModal from "../dashboard/AdminOrderModal.vue"
import AdminOrderPaginaiton from "./AdminOrderPaginaiton.vue"; 

export default {
  components: {
    AdminOrderModal,
    AdminOrderPaginaiton
  },
  data() {
    return {
      orders: [],
      currentPage: 1,
      totalPage: 1,
      previousPage: -1,
      nextPage: -1,
    };
  },
  created() {
    const { page = '' } = this.$route.query
    this.fetchOrders({ queryPage: page });
  },
  beforeRouteUpdate (to, from, next) {
    const { page='' } = to.query
    this.fetchOrders({ queryPage: page })
    next()
  },
  methods: {
    async fetchOrders({queryPage}) {
      try {
        const response = await AdminApi.getOrders({
          page: queryPage
        });
        console.log("response", response);
        const { data } = response;
        if (response.status === "error") {
          throw new Error(data.message);
        }
        this.orders = data.orders.map((order) => ({
          ...order,
          isEditing: false,
        }));
        console.log( data.pagination)
        const { currentPage, totalPage, next, prev } = data.pagination
        this.currentPage = currentPage
        this.totalPage = totalPage
        this.nextPage = next
        this.previousPage = prev

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得訂單資料，請稍後再試",
        });
        console.log(error);
      }
    },
    async cancelOrder(orderId) {
      try {
        console.log(orderId);
        const response = await AdminApi.cancelOrder({
          id: orderId,
        });
        console.log("response", response);
        if (response.status === "error") {
          throw new Error(response.data.message);
        }
        this.fetchOrders();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消訂單，請稍後再試",
        });
        console.log(error);
      }
    },
    toggleIsEditing(orderId) {
      console.log(orderId);

      this.orders = this.orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            isEditing: !order.isEditing,
          };
        }
        return order;
      });
    },
    async updateOrder(order) {
      try {
        console.log('123',order)
        const response = await AdminApi.updateOrder({
          id: order.orderId,
          payment: order.payment,
          shipment: order.shipment
        })
         if (response.status === "error") {
          throw new Error(response.data.message);
        }
        console.log('response', response)
        this.toggleIsEditing(order.orderId)
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法編輯訂單資料，請稍後再試"
        })
        console.log(error)
      }
    }
  },
};
</script>
  
  <style lang="scss">
.orders-wrapper {
  margin: 2rem 0;
  @media (min-width: 800px) {
    margin: 2rem 20%;
  }
  .orderList {
    margin: auto;
    border-radius: 10px;
    .orderList-table {
      background-color: #747373;
      border-radius: 10px;
      text-align: center;
      margin: auto;
      width: 100%;
      .img-wrapper {
        width: 20%;
        margin: auto;
        padding: 0.2rem;
        text-align: center;
        img {
          width: 4rem;
          margin: auto;
        }
      }
      th {
        height: 2.5rem;
        padding: 0.1rem auto;
        margin: auto;
        text-align: center;
      }
      td {
        margin: auto;
        text-align: center;
        background-color: #ffffff;
      }
      &-item-name {
        width: 10%;
      }
      &-item-category {
        width: 10%;
      }
      &-item-price {
        width: 15%;
      }
      &-item-btn {
        width: 15%;
      }
      tr {
        border-bottom: 1px solid #ccc;
        margin: 0;
      }
    }
    .productList-table tbody:last-child {
      border-bottom: none;
    }
  }
}
</style>