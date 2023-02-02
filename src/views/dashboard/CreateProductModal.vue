<template>
    <div class="create-wrapper">
      <button
        type="button"
        class="product-create-btn"
        data-bs-toggle="modal"
        data-bs-target="#createModal"
      @click.prevent.stop="showModal"
      >
        新增產品
      </button>
  
      <!-- Modal -->
      <div
        class="modal fade"
        id="createModal"
        tabindex="-1"
        aria-labelledby="createModal"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createModalLabel">新增產品</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form class="formList-wrapper" @submit.prevent.stop="handleSubmit">
                <div class="form-group mt-3">
                  <label for="name">產品名稱</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    v-model="name"
                    placeholder="請輸入名稱"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="categoryId">分類</label>
                  <select
                    class="form-select"
                    aria-label=""
                    id="categoryId"
                    name="categoryId"
                    v-model="categoryId"
                  >
                  <option value="">請選擇分類</option>  
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
            
                  >
                    {{ category.name }}
                  </option>
      
                
                   
                  </select>
                </div>
                <div class="form-group">
                  <span>
                    <label for="image">圖片</label>
                    <img
                    v-if="image"
                    :src="image"
                      class="d-block img-thumbnail mb-3"
                      width="200"
                      height="200"
                    />
                    <input
               @change="uploadFile"
                      type="file"
                      id="image"
                      name="image"
                      class="form-control"
                    />
                  </span>
                </div>
                <div class="form-group">
                  <span>
                    <label for="quantity">數量</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      v-model="quantity"
                      class="form-control"
                      placeholder="請輸入數量"
                      required
                    />
                  </span>
                </div>
                <div class="form-group">
                  <span>
                    <label for="price">價格</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      v-model="price"
                      class="form-control"
                      placeholder="請輸入價格"
                      required
                    />
                  </span>
                </div>
                <div class="form-group">
                  <span>
                    <label for="description">敘述</label>
                    <textarea
                      id="description"
                      name="description"
                      v-model="description"
                      class="form-control"
                      required
                      cols="30"
                      rows="5"
                    ></textarea>
                  </span>
                </div>
                <div class="btn-wrapper">
                  <button
                    type="button"
                    class="prev-btn"
                 @click.prevent.stop="closeModal"
                  >
                    取消
                  </button>
  
                  <button type="submit" class="next-btn">儲存</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
import AdminApi from "../../apis/admin";
import modal from "bootstrap/js/dist/modal";
import { Toast } from "../../utils/helpers";

  
  export default {
    props: {
      initialCategories: {
        type: Array,
        requirede: true,
      },
    },
    data() {
      return {
        categories: '',
        modal: null,
        categoryId: "",
        name: "",
        quantity: "",
        price: "",
        description: "",
        image: "",
        file: null,
      };
    },
    created() {
      this.fetchCategories()

    },

    methods: {
      async fetchCategories() {
        try {
          const response = await AdminApi.getCategories()
          console.log('response', response)
          this.categories = response.data.categories
          if (response.status === "error") {
            throw new Error(response.data.message)
          }
          
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: "無法取得分類資料，請稍後再試"
          })
          console.log(error)
        }
      },
      showModal() {
        this.modal = new modal(document.getElementById("createModal"));
      console.log(document.getElementById("createModal"));
      this.modal.show();
 
      },
      closeModal() {
        this.modal.hide();
      },
  
      async handleSubmit(e) {
        try {
          const form = e.target
          const formData = new FormData(form)
          const response = await AdminApi.postProduct({
            formData
          })
          console.log('response', response) 
          if (response.status === "error") {
            throw new Error(response.data.message)
          }
          this.$emit('create')
          this.modal.hide();
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: "無法新增產品資料，請稍後再試"
          })
          console.log(error)
        }
      },
      uploadFile(e) {
        const files = e.target.files;
        this.file = files
      console.log(this.file);

    
        const imageURL = window.URL.createObjectURL(files[0]);
        this.image = imageURL;
       
        console.log(imageURL)
      
      },
    },
  };
  </script>
  
  <style lang="scss">
  .formList-wrapper {
    margin: 1rem;
  
    .form-group {
      width: 90%;
      margin: 1rem auto;
      img {
        width: 5rem;
      }
      label {
        width: 100%;
      }
      select {
        height: 2.5rem;
        width: 10rem;
        border: 1px solid #ccc;
      }
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      #description {
        overflow-y: scroll
      }
    }
    .btn-wrapper {
      text-align: center;
  
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
  }
  </style>