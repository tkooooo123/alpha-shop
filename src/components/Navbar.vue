<template>
  <div class="nav-wrapper">
    <div class="navbar">
      <div class="nav-brand" >
        <router-link to="/">
          <img
            class="logo-img"
            src="https://imgpile.com/images/biexQR.png"
            alt=""
          />
        </router-link>
      </div>
      <div class="search-bar collapse" id="search-bar">
        <div class="input-wrapper d-flex">
          <div class="input-icon">
            <i class="fas fa-search"></i>
          </div>

          <input
            type="text"
            class="form-control search-input"
            placeholder="請輸入關鍵字"
            v-model.lazy="keyword"
            @change="searchKeyword"
          />
          <button class="form-control btn-search">搜尋</button>
          <button
            class="close"
            @click.prevent.stop="closeCollapse('search-bar')"
          >
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="bottom" @click="closeCollapse('search-bar')"></div>
      </div>
      <div class="item-group d-flex">
        <button class="btn-login" v-if="isAuthenticated" @click="logout">
          登出
        </button>

        <button class="btn-login" v-else>
          <router-link to="/signin" class="routerLink"> 我要登入 </router-link>
        </button>
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#search-bar"
          @click.prevent.stop="showCollapse('search-bar')"
        >
          <i class="fas fa-search fa-lg">50%</i>
        </button>

        <div class="cart-icon" >
          <button @click.prevent.stop="$router.push('/cart')">
            <i class="fa fa-shopping-cart fa-lg">80%</i>
          </button>
        </div>

        <label
          class="navbar-toggle-label"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-expand"
          @click.prevent.stop="showCollapse('navbar-expand')"
        >
          <span class="hamburger"></span>
        </label>
      </div>
    </div>
    <div class="topList">
      <router-link to="/products" class="router-link mr-3"
        >所有分類</router-link
      >
      <div v-for="category in categories" :key="category.id">
        <router-link :to="`/products?categoryId=${category.id}`">{{
          category.name
        }}</router-link>
      </div>
    </div>

    <div class="navbar-expand-collapse collapse" id="navbar-expand">
      <div class="expand-wrapper">
        <div class="expand-item-wrapper login" v-if="!isAuthenticated">
          <router-link to="/signin" class="expand-item">
            登入/註冊
          </router-link>
        </div>
        <div class="expand-item-wrapper logout" v-else>
          <a  href="" class="expand-item" @click="logout"> 登出 </a>
        </div>
        <div class="category-group">
          <div class="expand-item-wrapper" @click.prevent.stop="handleChecked">
            <router-link to="/products" class="expand-item">
              所有分類

              <i class="fa fa-angle-right"></i>
            </router-link>
          </div>
          <div class="category-list">
            <div
              class="expand-item-wrapper"
              v-for="category in categories"
              :key="category.id"
            >
              <router-link
                :to="`/products?categoryId=${category.id}`"
                class="expand-item"
              >
                {{ category.name }}
                <i class="fa fa-angle-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="expand-bottom" @click.prevent.stop="closeCollapse"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Collapse } from "bootstrap";
import ProductsApi from "../apis/products";

export default {
  data() {
    return {
      keyword: "",
      collapse: null,
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        console.log("123");
        const response = await ProductsApi.getCategories();
        console.log("response", response);
        this.categories = response.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
    handleChecked() {
      if (this.isChecked === true) {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
   
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
    searchKeyword() {
      console.log(this.keyword);
      this.$router.push(`/search?key=${this.keyword}`);
    },
    showCollapse(id) {
      console.log(document.getElementById(id));
      this.collapse = new Collapse(document.getElementById(id));
      console.log(this.collapse);
      this.collapse.show();
    },
    closeCollapse() {
      this.collapse.hide();
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  watch: {
    $route() {
      if(this.collapse) {
        this.collapse.hide();
      }
 
      this.keyword = "";
    },
  },
};
</script>

<style lang="scss">
.nav-wrapper {
  position: relative;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
}
.navbar {
  width: 100%;
  height: 72px;
  line-height: 72px;
  margin: auto;

  .nav-brand {
    position: absolute;
    top: 50%;
    left: 27%;
    transform: translate(-50%, -50%);
    @media (min-width: 768px) {
      left: 20%;
    }
    .logo-img {
      height: 1.8rem;
    }
  }
  .search-bar {
    transition: all 0.3s ease-in-out;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    z-index: 999;
    .input-icon {
      position: absolute;
      top: 0;
    }
    .bottom {
      position: fixed;
      opacity: 0.7;
      width: 100%;
      height: 100%;
      background: #747373;
    }
    .btn-search {
      display: none;
    }
    .input-wrapper {
      padding: 1rem;
      background: #ffffff;
    }

    .search-input {
      border-radius: 0;
      margin-left: 1.5rem;
    }

    @media (min-width: 768px) {
      display: flex;
      position: absolute;
      height: 40px;
      top: 0.3rem;
      left: 35%;
      background-color: white;

      z-index: 0;
      .bottom {
        display: none;
      }
      .input-icon {
        display: none;
      }
      .search-input {
        width: 70%;
        margin-left: 0;
      }
      .btn-search {
        display: block;
        width: 70px;
        border-radius: 0;
        background: #00457c;
        color: #ffffff;
      }
      .close {
        display: none;
      }
      .btn-search:hover {
        cursor: pointer;
      }
    }
  }
  .item-group {
    justify-content: space-around;
    position: absolute;
    width: 10rem;
    line-height: 40px;
    right: 5%;

    .routerLink {
      text-decoration: none;
    }
    .btn-login {
      display: none;
      @media (min-width: 768px) {
        display: flex;
        background: #ffffff;
        border-radius: 5px;
        border: 1px solid #747373;
      }
    }
    img {
      height: 25px;
    }
    .btn-search {
      @media (min-width: 768px) {
        display: none;
      }
    }
    .cart-icon {
      height: 100%;
      text-align: center;
    }

    .navbar-toggle-label {
      display: flex;
      width: 25px;
      margin-top: 0.5rem;
      text-align: center;
      @media (min-width: 768px) {
        display: none;
      }

      .hamburger {
        height: 3px;
        width: 20px;
        margin: auto;
        background-color: #000000;
        position: relative;
      }
      .hamburger::after,
      .hamburger::before {
        position: absolute;
        content: "";
        height: 3px;
        width: 20px;
        background-color: #000000;
      }
      .hamburger::after {
        top: 7px;
        left: 0;
      }
      .hamburger::before {
        bottom: 7px;
        left: 0;
      }
    }
  }
}
.topList {
  display: none;
  width: 70%;
  margin: 0.5rem auto;
  font-size: 1.2rem;
  font-weight: 550;
  color: #ccc;
  justify-content: space-between;

  @media (min-width: 768px) {
    display: flex;
  }
}

.navbar-expand-collapse {
  transition: all 0.1s ease-out;
  position: fixed;
  display: flex;
  margin: auto;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 999;

  .expand-wrapper {
    margin: auto;
    width: 70%;
    min-height: 100%;
    background: #fff;
  

    .expand-item-wrapper {
      padding: 1rem;
      font-weight: 600;
      .expand-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: auto;
        width: 100%;
      }
    }
    .login,
    .logout {
      background: #f7f7f7;
    }
  }
  .expand-bottom {
    display: inline-block;
    width: 30%;
    height: 100%;
    background: #747373;
    opacity: 0.6;
  }

  @media (min-width: 768px) {
    display: none;
    height: 60px;
    width: 70%;
    margin: auto;

    .login,
    .logout {
      display: none;
    }
    .category-group {
      display: flex;
      justify-content: space-between;
      line-height: 60px;
      .expand-item {
        width: 100%;
        font-weight: 600;
        font-size: 1.2rem;
        color: #676666;
      }
      .expand-item:hover {
        color: #642f09;
      }
    }
  }
}
</style>