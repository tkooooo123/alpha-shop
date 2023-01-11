<template>
  <div class="nav-wrapper">
    <div class="navbar">
      <div class="nav-brand">
        <img
          class="logo-img"
          src="https://imgpile.com/images/biexQR.png"
          alt=""
        />
      </div>
      <div class="search-bar">
        <div class="input-wrapper d-flex">
          <input type="text" class="form-control search-input" placeholder="請輸入關鍵字"/>
          <button class="form-control btn-search" >搜尋</button>
        </div>
      </div>
      <div class="item-group d-flex">
        <button class="btn-login">我要登入</button>
        <div class="btn-search">
          <img src="https://imgpile.com/images/biezQo.png" alt="" />
        </div>
        <div class="cart-icon">
          <img src="https://imgpile.com/images/bieXPS.png" alt="" />
        </div>

        <label class="navbar-toggle-label" for="navbar-toggle">
          <span class="hamburger"></span>
        </label>
      </div>
    </div>
    <input type="checkbox" class="navbar-toggle" id="navbar-toggle" />
    <div class="navbar-expand">
      <div class="expand-item login">登入/註冊</div>
      <div class="category-group">
        <div class="expand-item">所有分類</div>
        <div class="expand-item">食品</div>
        <div class="expand-item">休閒娛樂</div>
        <div class="expand-item">生活居家</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nav-wrapper {
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
    left: 20%;
    transform: translate(-50%, -50%);
    .logo-img {
      height: 2rem;
    }
  }
  .search-bar {
    display: none;
    height: 40px;
    .search-input {
      border-radius: 0;
    }
  
    @media (min-width: 768px) {
      display: flex;
      position: absolute;
      top:25%;
      left: 35%;
      .btn-search {
        width: 70px;
        border-radius:0;
        background:#00457c;
        color:#ffffff;
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
      text-align: center;
    }
    
    .navbar-toggle-label {
      display: flex;
      width: 25px;
      margin-top: 6%;
      text-align: center;
      @media (min-width: 768px) {
        display: none;
      }

      .hamburger {
        height: 3px;
        width: 25px;
        margin: auto;
        background-color: #000000;
        position: relative;
      }
      .hamburger::after,
      .hamburger::before {
        position: absolute;
        content: "";
        height: 3px;
        width: 25px;
        background-color: #000000;
      }
      .hamburger::after {
        top: 9px;
        left: 0;
      }
      .hamburger::before {
        bottom: 9px;
        left: 0;
      }
    }
  }
}

.navbar-toggle {
    display: none;
}
.navbar-toggle:checked ~ .navbar-expand {
  position: absolute;
  width: 100%;
  display: block;
  text-align: center;
  z-index: 999;
  background: #ffffff;
 
  .expand-item {
    line-height: 60px;
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 1.2rem;
  
  }
  .expand-item:hover{
    color:red;
  }
  .category-group > .expand-item {
    width: 80%;
    margin:auto;
    border-top: 1px solid #b9b0b0;
  }
}


.navbar-expand {
  display:none;

  @media (min-width: 768px) {
    display: block;
    height: 60px;
    width: 70%;
    margin: auto;
   
    .login{
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
            color: #676666
        }
        .expand-item:hover {
            color: #642f09
        }
    }
  }
}
</style>