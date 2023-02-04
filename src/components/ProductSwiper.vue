<template>
  <swiper class="swipe-container" ref="mySwiper" :options="swiperOptions">
    <swiper-slide
      class="swiper-slide"
      v-for="(item, index) in products.slice(0, 5)"
      :key="item.id"
    >
      <router-link :to="`/products/${item.id}`">
        <img :src="item.image" alt="" />
      </router-link>
      <div class="swiper-slide-name">
        <div class="item-number">0{{ index + 1 }} |</div>
        <div>
          {{ item.name }}
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      swiperOptions: {
        centeredSlides: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 2500,
        },
        observer: true,
        observeSlideChildren: true,

        preventLinksPropagation: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
};
</script>

<style lang="scss">
.product-wrapper {
  margin: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }

  .swipe-container {
    display: flex;
    height: 20rem;
    width: 100%;
    img {
      object-fit: contain;
    }

    @media (min-width: 768px) {
      width: 50%;
    }
    .swiper-slide {
      top: 0;
      left: 0;
      height: 25rem;
      width: 100%;
      cursor: pointer;
      @media (min-width: 768px) {
        width: 50%;
      }
      .swiper-slide-name {
        position: absolute;
        top: 30%;
        left: 20%;
        width: 10rem;
        padding: 0.5rem;
        text-align: start;
        background: #fff;
        opacity: 0.7;
        color: #000;
        .item-number {
          font-size: 1.2rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .swiper-pagination-bullet {
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      color: #fff;
      font-size: 0.7rem;
    }
  }
  .product-wrapper {
    display: block;
    margin: 1rem auto;
    width: 90%;
    height: 20rem;
    @media (min-width: 768px) {
      width: 50%;
      margin-left: 1rem;
    }
    .title {
      margin-bottom: 1rem;
    }
    .product-card {
      display: flex;
      justify-content: start;
      padding: 0.1rem;
      height: 3.5rem;
      border-bottom: 1px solid #ccc;
      text-align: center;
      cursor: pointer;
      &-number {
        margin: auto 0.2rem;
        width: 10%;
        font-weight: 550;
        font-size: 1.1rem;
        color: #747373;
      }
      &-image {
        width: 20%;
        img {
          height: 2.5rem;
          margin-top: 0.4rem;
          object-fit: contain;
        }
      }
      &-name {
        margin: auto;
        width: 50%;
        text-align: start;
      }
      &:last-child {
        border: none;
      }
      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>