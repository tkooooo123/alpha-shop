<template>
    <div>
        <!-- Button trigger modal -->
        <button
              class="orderList-table-item-others-btn-show"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#orderModal"
              @click.prevent.stop="showModal"
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
                      訂單編號 {{ order.id }}
                    </h2>
                    <button
                      class="btn orderModal-close"
                      @click.prevent.stop="closeModal"
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
    </div>
</template> 
<script>
import modal from "bootstrap/js/dist/modal";
export default {
    props: {
        initialOrder: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            order: this.initialOrder
        }
    },
    methods: {
        showModal(e) {
      this.modal = new modal(e.target.nextElementSibling);
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    }
}
</script>