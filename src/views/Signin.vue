<template>
  <div class="container py-5">
   
    <form class="w-40" 
    @submit.prevent.stop="handleSubmit"
    >
    <div class="title-wrapper text-center mb-4 d-flex justify-content-center">
        <div
          class="title-login"
          :class="{ selected: loginSelected }"
          @click.prevent.stop="handleSelect"
        >
          會員登入
        </div>
        <span class="line"></span>
        <p
          class="title-register"
          :class="{ selected: registerSelected }"
          @click.prevent.stop="handleSelect"
        >
          立即註冊
        </p>
      </div>
      <div class="login-wrapper">
        <div class="form-label-group mb-2"
        v-if="registerSelected"
        >
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
        <div class="form-label-group mb-3"
        v-if="registerSelected">
          <label for="passwordCheck" hidden>Password Check</label>
          <input
          v-model="passwordCheck"
            id="passwordCheck"
            name="passwordCheck"
            type="password"
            class="form-control"
            placeholder="請再一次輸入密碼"
            required
          />
        </div>
        <button class="btn btn-lg btn-primary btn-block mb-3" type="submit"
        v-if="loginSelected"
        >
          會員登入
        </button>
        <button class="btn btn-lg btn-primary btn-block mb-3" type="submit"
        v-if="registerSelected"
        >
          立即註冊
        </button>
      </div>
    </form>
    

  </div>
</template>

<script>
export default {
  data() {
    return {
      name:'',
      email:'',
      password:'',
      passwordCheck: '',
      loginSelected: true,
      registerSelected: false,
    };
  },
  methods: {
    handleSubmit() {
      const data = JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
        passwordCheck:this.passwordCheck
      });
      console.log("data", data);
    },
    
    handleSelect() {
      if (this.loginSelected === true) {
        this.loginSelected = false;
        this.registerSelected = true;
      } else {
        this.loginSelected = true;
        this.registerSelected = false;
      }
      console.log(this.isSelected);
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;

  .title-wrapper {
    text-align: center;
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
  .form-wrapper {
    
  }
}
</style>