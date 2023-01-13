<template>
    <div class="wrapper">
        <div class="side-wrapper">
            <div class="title">商品分類</div>
            <ul class="list-group">
                <li class="list-item"
                v-for="category in categories" :key="category.id">
                    {{ category.name }}
                </li>
            </ul>
        </div>
        <div class="main-wrapper">
           
            <div class="title">熱賣商品</div>
            <div class="cards-wrapper">
                <div class="product-card"
                v-for="product in products" :key="product.id">
                    <router-link :to="{ name: 'product', params: { id: product.id} }">
                        <div class="product-img"><img :src="product.image" alt=""></div>
                    <div class="product-name">{{product.name}}</div>
                    <div class="product-price">NT$ {{product.price}}</div>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
const dummyData = {
    products:[
        {
            id:1,
            name:'逗貓棒',
            image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ZpuiBtHuxsl-cKq4EhfBjtSVSyOfF7-iwlrjWtG5jkzKsDR8dwWTP7TGBGX4_8Fg7So&usqp=CAU',
            descrption:'老鼠羽毛款式',
            price: '99',
            quantity: '100'
        },
        {
            id:2,
            name:'逗貓棒',
            image:'https://cf.shopee.tw/file/e969e0640182b3626fc540b46ebb0f84',
            descrption:'南瓜款式',
            price: '99',
            quantity: '100'
        },
        {
            id:3,
            name:'動物逗貓棒',
            image:'https://shoplineimg.com/5f816d380232320038683a4a/60ae0c38d73e3b003880358a/800x.jpg?',
            descrption:'企鵝款式',
            price: '99',
            quantity: '100'
        },
        {
            id:4,
            name:'白色逗貓棒',
            image:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUIBxIWEhUVFhkVFRcVFhcVGRsXHRgWFhUaGxYaHSghGCYlGxUXITMlJSkrLjMuHR8zODMtOig5NisBCgoKDg0NFg8QFS0dHRstLTcrNzcrKy0rKysrLis3Nys3Ky03LSsrNysrKys3Kys3Ky03LS0tLSsrNysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAf/xAAvEAEAAgIABAMGBgMBAAAAAAAAAQIDEQQSITFBcdFRYYGxwfATIjKRofEFUnIU/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEDAv/EABgRAQEBAQEAAAAAAAAAAAAAAAABEQIS/9oADAMBAAIRAxEAPwD3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFbTO9QCwwtqOszM/ExZua/JLn1NxcbgOkAAAAAAAAAAAAAAAAAAAAAAAAGGWeW+/c0vkpT9UuTisXE8Ret8NorET1rMfqiddd+Go3pLNhGd8u7d08PeL54rXr47Uz8HOGs35pmPuPq6P8bjx1w81Y69rebHni60vUx2AN2YAAAAAAAAAAAAAAAAAAAAAAi1opXmsrltNY1XvPSPVFcNYndus+/07AYq9Oe3efvTQAc/Exz4LR8PkthpydvGI/ft6K/qxWrP+0x/LaZ/PEef0QWAUAAAAAAAAAAAAAAAAAAAAGd8lublxRufHfSEWzRPTHE2n3dv37LYqTSvXvPWfMEUpPNzZJ3P7RDQRuASI5q+05oBhSN8RPn/AH8oWmZnioj2Vn+ZjXyWrXU78fVTDuclrT7f6QbgKAAAAAAAAAAAAAAAAAADHNaLT+HXvPfy8SYnNea71Ed9dNz5tKY644/JGgTWIrGoSAK3pF41LP8A82Lfb5tgwVjHWOkQnUJARMbRyzrusApyW8JIrbxtP8LgAAAAAAAAAAAAAAAADlrxVeIvOPh53rpM+EepnieKpOGkzEeNo+Uba8Pgx8PijHijUR97mfEF8dIpXULAAAAAAAAAAAAAAAAAAAAAAAACLWisbkEzOo3LDc551XpX2+3yRETxE7npX5uiI1GoBFaxWuoSAAAAAAAAAAAAAAAAAAAAAAAAM82WuKu5BbJetK7sxrW2eefJ0jwj1Rjx2y2/Ey/CPWPo6QAAAAAAAAAAAAAAAAAAAAAAAAAc3EcRFYmKz27z9IBPEcTXFGvFTBitkn8XN8In5z6eCvD8Nz2jNmj/AJifDx3Pv+/LtAAAAAAAAAAAAAAAAAAAAAAAAAAByf5DNkx0iuKtrc06/LHb080cNwtomMmfW47RHaPWXYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z',
            descrption:'圓球款式',
            price: '99',
            quantity: '100'
        },
        {
            id:5,
            name:'白色逗貓棒',
            image:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUIBxIWEhUVFhkVFRcVFhcVGRsXHRgWFhUaGxYaHSghGCYlGxUXITMlJSkrLjMuHR8zODMtOig5NisBCgoKDg0NFg8QFS0dHRstLTcrNzcrKy0rKysrLis3Nys3Ky03LSsrNysrKys3Kys3Ky03LS0tLSsrNysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAZAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAf/xAAvEAEAAgIABAMGBgMBAAAAAAAAAQIDEQQSITFBcdFRYYGxwfATIjKRofEFUnIU/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEDAv/EABgRAQEBAQEAAAAAAAAAAAAAAAABEQIS/9oADAMBAAIRAxEAPwD3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFbTO9QCwwtqOszM/ExZua/JLn1NxcbgOkAAAAAAAAAAAAAAAAAAAAAAAAGGWeW+/c0vkpT9UuTisXE8Ret8NorET1rMfqiddd+Go3pLNhGd8u7d08PeL54rXr47Uz8HOGs35pmPuPq6P8bjx1w81Y69rebHni60vUx2AN2YAAAAAAAAAAAAAAAAAAAAAAi1opXmsrltNY1XvPSPVFcNYndus+/07AYq9Oe3efvTQAc/Exz4LR8PkthpydvGI/ft6K/qxWrP+0x/LaZ/PEef0QWAUAAAAAAAAAAAAAAAAAAAAGd8lublxRufHfSEWzRPTHE2n3dv37LYqTSvXvPWfMEUpPNzZJ3P7RDQRuASI5q+05oBhSN8RPn/AH8oWmZnioj2Vn+ZjXyWrXU78fVTDuclrT7f6QbgKAAAAAAAAAAAAAAAAAADHNaLT+HXvPfy8SYnNea71Ed9dNz5tKY644/JGgTWIrGoSAK3pF41LP8A82Lfb5tgwVjHWOkQnUJARMbRyzrusApyW8JIrbxtP8LgAAAAAAAAAAAAAAAADlrxVeIvOPh53rpM+EepnieKpOGkzEeNo+Uba8Pgx8PijHijUR97mfEF8dIpXULAAAAAAAAAAAAAAAAAAAAAAAACLWisbkEzOo3LDc551XpX2+3yRETxE7npX5uiI1GoBFaxWuoSAAAAAAAAAAAAAAAAAAAAAAAAM82WuKu5BbJetK7sxrW2eefJ0jwj1Rjx2y2/Ey/CPWPo6QAAAAAAAAAAAAAAAAAAAAAAAAAc3EcRFYmKz27z9IBPEcTXFGvFTBitkn8XN8In5z6eCvD8Nz2jNmj/AJifDx3Pv+/LtAAAAAAAAAAAAAAAAAAAAAAAAAAByf5DNkx0iuKtrc06/LHb080cNwtomMmfW47RHaPWXYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z',
            descrption:'圓球款式',
            price: '99',
            quantity: '100'
        }
    ],
    categories: [
        {
            id:1,
            name:'食品',
        },
        {
            id:2,
            name:'休閒娛樂',
        },
        {
            id:3,
            name:'生活居家',
        },
    ]
}

export default {
    data() {
        return {
            products: [],
            categories:[]
        }
    },
    created() {
        this.fetchProducts()

    },
    methods: {
        fetchProducts() {
            const { products, categories } = dummyData
            this.products = products
            this.categories = categories
        }
    }
}
</script>

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
           
          
            .product-card {
                width: 45%;
                margin: 1rem 0.7rem;
          
                
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