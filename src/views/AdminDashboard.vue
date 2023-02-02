<template>
    <div class="dashboard-wrapper">
        <div class="sidebar-wrapper">
            <div class="list-group">
                <router-link to="/admin/categories" class="list-group-item">分類列表</router-link>
                <router-link to="/admin/products" class="list-group-item">產品列表</router-link>
                <router-link to="/admin/orders" class="list-group-item">訂單列表</router-link>   
            </div>
        </div>
        <div class="content-wrapper">
            <router-view></router-view> 
        </div>
    </div>
    
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.dashboard-wrapper {
    display: flex;
  
    padding: 0;
    background-color: #e5e5e5;
    .sidebar-wrapper{
        background-color: #ffffff;
        
        width: 30%;
    }
}
.content-wrapper{
    width: 70%;
    
}

</style>