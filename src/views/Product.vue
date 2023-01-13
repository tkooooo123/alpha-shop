<template>
  <div class="product-wrapper">
    <div class="product-card">
      <div class="product-img">
        <img
          src="https://cdn01.pinkoi.com/product/sSR5CpYZ/0/1/800x0.jpg"
          alt=""
        />
      </div>
      <div class="product-info">
        <div class="product-name">Marble Hexagon 六角形大理石紋時鐘 - 兩款</div>
        <div class="product-price">NT$ 999</div>
        <span class="line"></span>
        <div class="product-description">
          居家擺設的最佳選擇！極簡設計，大理石紋加上金色時針，獨特的六角形狀，凸顯非凡品味。只要使用一顆AA電池。
        </div>
        <span class="line"></span>
        <div class="product-quantity">
          <div class="list-group">
            <div class="title">數量</div>
            <div class="minus-btn">-</div>
            <div class="quantity">2</div>
            <div class="plus-btn">+</div>
          </div>
          <a class="add-cart">加入購物車</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.product-wrapper {
   
  .product-card {
    padding: 1rem 2rem;
    text-align: start;
    .product-img {
      padding: 1rem 2rem;
    }
    img {
      width: 100%;
    }
    .product-info {
      position: relative;
      padding: 1rem;
    }
    .product-name {
      font-size: 1.2rem;
      font-weight: 550;
    }
    .product-price {
      color: #00457c;
      font-size: 1.1rem;
      padding: 0.5rem 0;
    }
    .product-description {
      padding: 2rem 0;
    }
    .product-quantity {
      padding: 2rem 0;
    }
    .line {
      position: absolute;
      left: 0.5rem;
      right: 0.5rem;
      height: 1px;
      content: "";
      background: #747373;
    }
    .product-quantity {
      text-align: center;
      display: flex;
      .list-group {
        display: flex;
        flex-flow: row wrap;
        line-height: 2rem;

        .title {
          padding-right: 0.5rem;
        }
        .minus-btn,
        .plus-btn {
          border: 1px solid #2a2a2a;
          width: 1.3rem;
          background: #e0e2e4;
        }
        .minus-btn:hover,
        .plus-btn:hover {
          cursor: pointer;
          background: #ffffff;
        }
        .quantity {
          width: 2rem;
          border-top: 1px solid #2a2a2a;
          border-bottom: 1px solid #2a2a2a;
        }
      }
      .add-cart {
        margin-left: 3rem;
        width: 10rem;
        line-height: 2rem;
        border: none;
        border-radius: 3px;
        color: #ffffff;
        background: #4f2e0b;
      }
      .add-cart:hover {
        cursor: pointer;
      }
    }
    @media (min-width: 900px) {
      display: flex;
      flex-flow: row wrap;
      margin-left: 5%; 
      .product-img {
        width: 45%;
      }
      .product-info {
        width: 45%;
      }
    }
    @media (min-width: 1000px) {
        margin-left: 8%; 
      .product-info {
        margin-top: 2rem;
        width: 27rem;
      }
    }
  }
}
</style>