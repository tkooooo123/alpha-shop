<template>
    <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 前一頁 previousPage -->
      <li
        v-show="previousPage"
        :class="['page-item', { disabled: currentPage === 1 }]"
      >
        <router-link
          class="page-link"
          aria-label="Previous"
          :to="{
            name: 'products',
            query: { categoryId, page: previousPage }
          }"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>
      <!-- 頁碼 -->
      <li 
      v-for="page in totalPage"
      :key="page"
      :class="['page-item', { active: currentPage === page }]"
      >
      <router-link
      class="page-link"
      :to="{name: 'products', query: { categoryId, page }}">
      {{ page }}
      </router-link>
      </li>

      
      <!-- 後一頁 nextPage -->
      <li
        v-show="nextPage"
        :class="['page-item', { disabled: currentPage === totalPage }]"
      >
        <router-link
          class="page-link"
          :to="{ name: 'products', query: { categoryId, page: nextPage } }"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>

    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    categoryId: {
      type: [String, Number],
      default: ''
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      required: true
    },
    previousPage: {
      type: Number,
      required: true
    },
    nextPage: {
      type: Number,
      required: true
    }
  },
  
}
</script>
<style lang="scss">
nav {
    width: 100%;
    display:flex;
    justify-content: center;
}
</style>