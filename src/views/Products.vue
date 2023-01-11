<template>
    <div class="wrapper">
        <div class="side-wrapper">
            <div class="title">商品分類</div>
            <ul class="list-group">
                <li class="list-item">
                    食品
                </li>
                <li class="list-item">
                    休閒娛樂
                </li>
                <li class="list-item">
                    生活居家
                </li>
            </ul>
        </div>
        <div class="main-wrapper">
           
            <div class="title">熱賣商品</div>
            <div class="cards-wrapper">
                <div class="product-card">
                    <div class="product-img"><img src="https://cdn01.pinkoi.com/product/sSR5CpYZ/0/1/800x0.jpg" alt=""></div>
                    <div class="product-name">65461321</div>
                    <div class="product-price">NT$ 111</div>
                </div>
                <div class="product-card">
                    <div class="product-img"><img src="https://cdn01.pinkoi.com/product/sSR5CpYZ/0/1/800x0.jpg" alt=""></div>
                    <div class="product-name">65461321</div>
                    <div class="product-price">NT$ 111</div>
                </div>
                <div class="product-card">
                    <div class="product-img"><img src="https://cdn01.pinkoi.com/product/sSR5CpYZ/0/1/800x0.jpg" alt=""></div>
                    <div class="product-name">65461321</div>
                    <div class="product-price">NT$ 111</div>
                </div>
                <div class="product-card">
                    <div class="product-img"><img src="https://cdn01.pinkoi.com/product/sSR5CpYZ/0/1/800x0.jpg" alt=""></div>
                    <div class="product-name">65461321</div>
                    <div class="product-price">NT$ 111</div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
.wrapper {
    width: 100%;
   
    display: flex;
    @media (min-width: 1200px) {
        padding: 0 5rem;
    }
    .side-wrapper {
        display: none;
        @media (min-width: 768px) {
            display: block;
            width: 30%;
            .title {
                margin-top: 1rem;
                padding-right: 1rem;
                line-height: 50px;
                font-size: 1.3rem;
                font-weight: 600;
                
            }
            .list-item {
                text-align: left;
                margin: auto;
                padding-left: 0.5rem;
                line-height: 40px;
                width:5rem;
                font-weight: 600;
                cursor: pointer;
                border-top: 1px solid #bbb9b9;
            }
            .list-item:hover {
                color: red;
            }
        }
        
    }
    .main-wrapper {
        width: 100%;
   
        padding: 1rem;
        .title{
            text-align: left;
            font-size: 1.5rem;
            font-weight: 600;
        }


        .cards-wrapper {
            display: flex;
           flex-flow: row wrap;
           justify-content: space-between;
          
            .product-card {
                width: 45%;
                margin: 1rem 0.5rem;
          
                
                @media (min-width: 900px) {
                    width: 30%;

                }
                @media (min-width: 1200px) {
                    width: 22%;

                }
            }
            .product-card:hover {
                opacity: 0.7;
                cursor: pointer;
            }

            img {
               width: 100%;
                
            }
            .product-name {
                padding-top: 1rem;
                font-size: 1.1rem;
                font-weight: 550;
            }
            .product-price {
                color: blue;
                padding-top: 0.5rem;
                font-size: 0.9rem;
                font-weight: 550;
            }
        }

        
    }
}
</style>