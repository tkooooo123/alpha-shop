<template>
  <div class="container py-5">
    <div class="title-wrapper text-center mb-4 d-flex justify-content-center">
      <div
        class="title-login"
        :class="{ selected: loginSelected }"
        @click.prevent.stop="loginSelect"
      >
        會員登入
      </div>
      <span class="line"></span>
      <div
        class="title-register"
        :class="{ selected: registerSelected }"
        @click.prevent.stop="registerSelect"
      >
        立即註冊
      </div>
    </div>
    <form class="w-40" v-if="loginSelected" @submit.prevent.stop="loginSubmit">
      <div class="login-wrapper">
        <div class="form-label-group mb-2">
          <label for="email" hidden>email</label>
          <input
            v-model="email"
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="請輸入 Email"
            required
          />
        </div>
        <div class="form-label-group mb-3">
          <label for="password" hidden>Password</label>
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            class="form-control"
            placeholder="請輸入密碼"
            required
          />
        </div>
        <button
          class="btn btn-lg btn-primary btn-block mb-3"
          type="submit"
          v-if="loginSelected"
        >
          會員登入
        </button>
      </div>
    </form>

    <form
      class="w-40"
      v-if="registerSelected"
      @submit.prevent.stop="registerSubmit"
    >
      <div class="login-wrapper">
        <div class="form-label-group mb-2">
          <label for="name" hidden>Name</label>
          <input
            v-model="name"
            id="name"
            name="name"
            type="text"
            class="form-control"
            placeholder="請輸入名字"
            required
          />
        </div>
        <div class="form-label-group mb-2">
          <label for="email" hidden>email</label>
          <input
            v-model="email"
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="請輸入 Email"
            required
          />
        </div>
        <div class="form-label-group mb-3">
          <label for="password" hidden>Password</label>
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            class="form-control"
            placeholder="請輸入密碼"
            required
          />
        </div>
        <div class="form-label-group mb-3">
          <label for="confirmPassword" hidden>Password Check</label>
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            class="form-control"
            placeholder="請再一次輸入密碼"
            required
          />
        </div>
        <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
          立即註冊
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      loginSelected: true,
      registerSelected: false,
    };
  },
  methods: {
    async loginSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入所有欄位",
          });
          return;
        }

        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });
        console.log("response", response);
        const { data } = response;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        localStorage.setItem("token", data.token);
        this.$router.push("/products");
      } catch (error) {
        this.password = "";
        Toast.fire({
          icon: "warning",
          title: error.message,
        });
        console.log(error);
      }
    },
    async registerSubmit() {
      try {
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.confirmPassword
        ) {
          Toast.fire({
            icon: "warning",
            title: "請填入所有欄位",
          });
          return;
        }

        const response = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
        console.log("response", response);
        const { data } = response;
        if (data.status === "error") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);
        this.$router.go(0);
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: error.message,
        });
        console.log(error);
      }
    },

    registerSelect() {
      if (this.registerSelected === false) {
        this.loginSelected = false;
        this.registerSelected = true;
      }
    },
    loginSelect() {
      if (this.loginSelected === false) {
        this.loginSelected = true;
        this.registerSelected = false;
      }
    },
  },
};
</script>

<style lang="scss">
.container {
  display: block;
  justify-content: center;
  .title-wrapper {
    margin: auto 20%;
    text-align: center;
    @media (min-width: 900px) {
      margin: auto 30%;
    }

    .line {
      background: #747373;
      width: 1px;
      content: "";
    }
    .title-login,
    .title-register {
      width: 10rem;
      margin: auto;
      font-size: 1.5rem;
      font-weight: 550;
    }
    .selected {
      color: red;
    }
  }
  .login-wrapper {
    margin: auto 20%;
    @media (min-width: 900px) {
      margin: auto 30%;
    }
  }
}
</style>