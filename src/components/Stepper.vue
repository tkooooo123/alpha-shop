<template>
    <div class="step-wrapper d-flex justify-content-center">
      <div
        class="step"
        :class="{ active: stepper === 1, checked: stepper > 1 }"
      >
        <div class="circle-container"></div>
        <div class="label-container">確認商品</div>
      </div>
      <div
        class="step"
        :class="{ active: stepper === 2, checked: stepper > 2 }"
      >
        <div class="circle-container"></div>
        <span class="connect-line"></span>
        <div class="label-container">填寫資料</div>
      </div>
      <div class="step" :class="{ active: stepper === 3 }">
        <div class="circle-container"></div>
        <span class="connect-line"></span>
        <div class="label-container">完成訂單</div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        stepper: {
            type: Number,
            required: true
        }
    },

}
</script>

<style lang="scss">
@mixin getStepNums($num) {
  @for $i from 1 through $num {
    &:nth-child(#{$i}) .circle-container::after {
      color: #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "#{$i}";
      font-weight: 700;
    }
  }
}
.step {
    position: relative;
    display: flex;
    justify-content: center;
    width: 30%;
    &.active,
    &.checked {
      .circle-container,
      .connect-line {
        background: #00457c;
      }
    }
    .circle-container {
      position: relative;
      width: 3rem;
      height: 3rem;
      background: #737373;
      border-radius: 50%;
    }

    @include getStepNums(3);

    .connect-line {
      position: absolute;
      height: 2px;
      top: 50%;
      transform: translateY(-50%);
      left: calc(-50% + 20%);
      right: calc(+50% + 20%);
      background: #747373;
    }
    .label-container {
      position: absolute;
      top: 100%;
      width: 100%;
      margin-top: 0.5rem;
      font-size: 1.1rem;
      font-weight: 600;
    }
  }
</style>