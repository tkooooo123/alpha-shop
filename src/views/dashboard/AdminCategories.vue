<template>
  <div class="categories-wrapper">
    <form
      class="create-form"
      @submit.prevent.stop="createCategory"
      v-if="state === 1"
    >
      <div class="form-group">
        <label for="name">名稱</label>
        <input
          type="text"
          name="name"
          placeholder="請輸入分類名稱"
          v-model="name"
        />
      </div>
      <button type="submit" class="submit-btn">新增</button>
    </form>
    <form
      class="edit-form"
      @submit.prevent.stop="createCategory"
      v-else-if="state === 2"
    >
      <div class="form-group">
        <label for="name">名稱</label>
        <input
          type="text"
          name="name"
          placeholder="請輸入分類名稱"
          v-model="name"
        />
      </div>
      <button type="submit" class="submit-btn">儲存</button>
    </form>
    <button
      type="button"
      class="create-btn"
      @click.prevent.stop="handleState"
      v-else
    >
      新增分類
    </button>
    <div class="categoryList mt-4">
      <table class="categoryList-table">
        <thead>
          <tr>
            <th>#</th>
            <th>名稱</th>
            <th>編輯/刪除</th>
          </tr>
        </thead>

        <tbody v-for="category in categories" :key="category.id">
          <tr>
            <td class="img-wrapper">
              {{ category.id }}
            </td>

            <td class="categoryList-category-name">
              <div v-show="!category.isEditing">
                {{ category.name }}
              </div>
              <input
                v-show="category.isEditing"
                v-model="category.name"
                type="text"
                class="form-control"
              />
              <span v-show="category.isEditing" class="cancel"
              @click.prevent.stop="handleCancel(category.id)"
              > ✕ </span>
            </td>
            <td class="categoryList-btn">
              <button
              v-show="category.isEditing"
              @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
              >
                <i class="fa fa-save fa-lg"></i>
              </button>
              <button @click.prevent.stop="toggleIsEditing(category.id)"
              v-show="!category.isEditing">
                <i class="fa fa-edit fa-lg"></i>
              </button>
              <button @click.prevent.stop="deleteCategory(category.id)">
                <i class="fa fa-trash fa-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
import AdminApi from "../../apis/admin";
import { Toast } from "../../utils/helpers";

export default {
  components: {},
  data() {
    return {
      categories: [],
      name: "",
      state: 0,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await AdminApi.getCategories();
        console.log("response", response);
        const { data } = response;
        if (response.status === "error") {
          throw new Error(response.data.message);
        }

        this.categories = data.categories.map((category) => ({
          ...category,
          isEditing: false,
          nameCached: "",
        }));
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得分類資料，請稍後再試",
        });

        console.log(error);
      }
    },
    async createCategory() {
      try {
        console.log(this.name);
        const response = await AdminApi.createCategory({
          name: this.name,
        });
        if (response.status === "error") {
          throw new Error(response.data.message);
        }
        console.log("response", response);
        this.state = 0;
        this.name = ''
        this.fetchCategories()
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增分類資料，請稍後再試",
        });
        console.log(error);
      }
    },
    async deleteCategory(categoryId) {
      try {
        const response = await AdminApi.deleteCategory({
          id: categoryId,
        });
        if (response.status === "error") {
          throw new Error(response.data.message);
        }
        console.log(this.categoryId);
        console.log("response", response);
        this.fetchCategories()
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法刪除分類資料，請稍後再試",
        });
        console.log(error);
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name,
          };
        }
        return category;
      });
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: category.nameCached,
          };
        }
        return category;
      });
      this.toggleIsEditing(categoryId);
    },
    async updateCategory({ categoryId, name }) {
      try {
        const response = await AdminApi.updateCategory({
          id: categoryId,
          name: name
        })
        if (response.status === "error") {
          throw new Error(response.data.message);
        }
        console.log('response', response)
        this.toggleIsEditing(categoryId)
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法更新分類資料，請稍後再試",
        });
        console.log(error)
      }
    },
    handleState() {
      if (this.state === 0) {
        this.state++;
      } else {
        this.state = 0;
      }
    },
  },
};
</script>
  
  <style lang="scss">
.categories-wrapper {
  margin: 2rem 0;
  text-align: end;
  @media (min-width: 800px) {
  margin: 2rem 20%; 
    
  }
  .create-form,
  .edit-form {
    display: flex;
    justify-content: space-around;
    .form-group {
      margin: 0.5rem;
      text-align: start;
      width: 10rem;
      label {
        margin-right: 0.5rem;
        font-weight: 550;
      }
      input {
        margin: auto;
        width: 8rem;
        height: 2rem;
        border: 1px solid #ccc;
      }
    }
  }
  .create-btn,
  .submit-btn {
    margin: auto 1rem;
    padding: 0.3rem 0.5rem;
    background-color: #00457c;
    color: #ffffff;
    border-radius: 5px;
    width: 6rem;
    font-size: 1.1rem;
    &:hover {
      opacity: 0.8;
    }
  }
  .categoryList {
    margin: auto;
    border-radius: 10px;
    .categoryList-table {
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
    .categoryList-table tbody:last-child {
      border-bottom: none;
    }
    &-category-name {
      position: relative;
      width: 40%;
      .cancel {
        width: 1.5rem;
        height: 1.5rem;
        border: 1px solid red;
        border-radius: 50%;
        position: absolute;
        right: -2rem;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
  }
}
</style>