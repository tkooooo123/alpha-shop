(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a0931d9e"],{"293c":function(t,a,s){},d2f1:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t._self._c;return a("div",{staticClass:"product-container"},[a("div",{staticClass:"product-wrapper container"},[!0===t.isLoading?a("Spinner"):a("div",{staticClass:"product-detail pt-5"},[a("div",{staticClass:"product-img"},[a("img",{attrs:{src:t.product.image,alt:""}})]),a("div",{staticClass:"product-info"},[!0===t.isProcessing&&t.clickProductId===t.product.id?a("ProcessSpinner"):t._e(),a("div",{staticClass:"product-name"},[t._v(t._s(t.product.name))]),a("div",{staticClass:"product-price"},[t._v("NT$ "+t._s(t.product.price))]),a("span",{staticClass:"line"}),a("div",{staticClass:"product-description"},[t._v(" "+t._s(t.product.description)+" ")]),a("span",{staticClass:"line"}),a("form",{on:{submit:function(a){return a.preventDefault(),a.stopPropagation(),t.handleSubmit.apply(null,arguments)}}},[a("div",{staticClass:"product-quantity"},[a("div",{staticClass:"list-group"},[a("label",{staticClass:"title",attrs:{for:"quantity"}},[t._v("數量")]),a("div",{staticClass:"minus-btn",on:{click:function(a){return a.preventDefault(),a.stopPropagation(),t.subQuantity.apply(null,arguments)}}},[t._v("-")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.itemQuantity,expression:"itemQuantity"}],staticClass:"quantity",attrs:{type:"number",id:"quantity",max:t.product.quantity,disabled:t.product.quantity<=1},domProps:{value:t.itemQuantity},on:{change:function(a){return a.preventDefault(),a.stopPropagation(),t.changeQuantity.apply(null,arguments)},input:function(a){a.target.composing||(t.itemQuantity=a.target.value)}}}),a("input",{attrs:{type:"hidden",name:"productId"},domProps:{value:t.product.id}}),a("input",{attrs:{type:"hidden",name:"cartId"},domProps:{value:t.cartId}}),a("div",{staticClass:"plus-btn",on:{click:function(a){return a.preventDefault(),a.stopPropagation(),t.addQuantity.apply(null,arguments)}}},[t._v("+")])]),a("button",{staticClass:"add-cart",attrs:{type:"submit"}},[t._v("加入購物車")])])])],1)])],1),t._m(0),a("div",{staticClass:"cards-wrapper container"},[a("hr"),a("div",{staticClass:"d-flex align-items-center justify-content-between mt-5"},[a("h2",{directives:[{name:"show",rawName:"v-show",value:t.products.length,expression:"products.length"}],staticClass:"border-blue pl-3 text-left font-weight-bold"},[t._v("您可能會喜歡")]),a("router-link",{attrs:{to:"/products"}},[a("button",{staticClass:"btn btn-outline-dark",attrs:{type:"button"}},[a("i",{staticClass:"fa fa-arrow-left",attrs:{"aria-hidden":"true"}}),t._v(" 回商品列表 ")])])],1),a("div",{staticClass:"row m-3"},t._l(t.products,(function(s){return a("div",{key:s.id,staticClass:"product-card col-xl-3 col-lg-4 col-sm-6 mb-3"},[a("router-link",{attrs:{to:{name:"product",params:{id:s.id}}}},[!0===t.isProcessing&&t.clickProductId===s.id?a("ProcessSpinner"):t._e(),a("div",{staticClass:"product-img"},[a("img",{attrs:{src:s.image,alt:""}})]),a("div",{staticClass:"text-left pl-1"},[a("div",{staticClass:"product-name mt-1 font-weight-bold"},[t._v(t._s(s.name))]),a("span",{staticClass:"product-category"},[a("i",{staticClass:"fa fa-tag",attrs:{"aria-hidden":"true"}}),t._v(" "+t._s(s.Category.name))]),a("div",{staticClass:"product-price"},[t._v("NT$ "+t._s(s.price))]),a("div",{staticClass:"card-detail"},[a("i",{staticClass:"fa fa-search",attrs:{"aria-hidden":"true"}}),t._v(" 查看明細")]),a("button",{staticClass:"btn p-2 text-white",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),a.stopPropagation(),t.addToCart(s.id)}}},[t._v("加入購物車")])])],1)],1)})),0)])])},r=[function(){var t=this,a=t._self._c;return a("div",{staticClass:"container"},[a("hr"),a("h3",{staticClass:"text-center font-weight-bold text-blue"},[t._v("購物須知")]),a("p",{staticClass:"text-left font-weight-bold"},[t._v("運送說明")]),a("ul",{staticClass:"text-left"},[a("li",{staticClass:"mt-1"},[t._v("◆ 本公司之商品委託物流業者配送。")]),a("li",{staticClass:"mt-1"},[t._v("◆ 當確認您的訂單已經付款完成，您的訂單將於付款完成後預計「1~2個工作天」出貨(不含週末及國定假日)；因商品為收到訂單後師傅依序手工製作，部分熱門品項逢節慶檔期可能會有短暫缺貨的情況發生，敬請見諒。")])]),a("p",{staticClass:"text-left font-weight-bold mt-2"},[t._v("退換貨注意")]),a("ul",{staticClass:"text-left"},[a("li",{staticClass:"mt-1"},[t._v("◆ 圖片僅供參考，商品內容物以實際收到商品為主。")]),a("li",{staticClass:"mt-1"},[t._v("◆ 因本公司堅持保持產品之新鮮度，若簽收商品時發現包裝遭受破壞，建議您於商品到貨24小時內，請拍照存證並立即與我們聯繫。")])])])}],e=(s("d9e2"),s("ee21")),c=s("cc17"),o=s("2fa3"),n=s("2f62"),d=s("2375"),u=s("c09c"),l=s("1157"),p=s.n(l),h={components:{Spinner:d["a"],ProcessSpinner:u["a"]},data(){return{product:{},products:[],clickProductId:"",cartId:"",itemQuantity:1,isLoading:!0,isProcessing:!1}},created(){const{id:t}=this.$route.params;this.cartId=localStorage.getItem("cartId"),this.fetchProduct({productId:t})},beforeRouteUpdate(t,a,s){this.isLoading=!0;const{id:i}=t.params;this.fetchProduct({productId:i}),p()("html, body").animate({scrollTop:0},200),s()},methods:{async fetchProduct({productId:t}){try{const a=await e["a"].getProduct({productId:t}),{data:s}=a;if("error"===a.status)throw new Error(s.message);const{product:i}=s;this.product=i,await this.getProducts(),this.isLoading=!1}catch(a){this.isLoading=!1,o["a"].fire({icon:"error",title:"無法取得產品資料，請稍後再試"})}},async getProducts(){try{const t=await e["a"].getProducts({page:"",categoryId:this.product.categoryId}),a=t.data.products.filter(t=>t.id!==this.product.id).splice(0,4);this.products=a}catch(t){console.log(t)}},addQuantity(){this.itemQuantity<this.product.quantity&&this.itemQuantity++},subQuantity(){this.itemQuantity>this.product.quantity?this.itemQuantity=this.product.quantity:this.itemQuantity>1&&this.itemQuantity--},changeQuantity(){(!this.itemQuantity||this.itemQuantity<1)&&(this.itemQuantity=1)},async handleSubmit(){try{this.clickProductId=this.product.id,this.isProcessing=!0;const t=await c["a"].postCart({productId:this.product.id,quantity:this.itemQuantity,cartId:this.cartId}),{data:a}=t;if(this.$bus.$emit("cartUpdate",{cart:a.cart}),"error"===t.status)throw new Error(a.message);this.getCart(),localStorage.setItem("cartId",a.getCartId),this.isProcessing=!1}catch(t){this.isProcessing=!1,!1===this.isAuthenticated?o["a"].fire({icon:"error",title:"無法加入購物車，請先登入使用者"}):o["a"].fire({icon:"error",title:"無法加入購物車，請稍後再試"})}},async getCart(){try{const t=await c["a"].getCart(),{data:a}=t;if("error"===t.status)throw new Error(a.message);this.$bus.$emit("cartUpdate",{cart:a.carts})}catch(t){console.log(t)}},async addToCart(t){try{this.clickProductId=t,this.isProcessing=!0;const a=await c["a"].postCart({productId:t,quantity:1,cartId:this.cartId}),{data:s}=a;if(this.$bus.$emit("cartUpdate",{cart:s.cart}),200===a.status&&o["a"].fire({icon:"success",title:"成功加入購物車"}),"error"===a.status)throw new Error(s.message);await this.getCart(),this.isProcessing=!1}catch(a){this.isProcessing=!1,o["a"].fire({icon:"error",title:"無法加入購物車，請稍後再試"})}}},computed:{...Object(n["b"])(["currentUser","isAuthenticated"])}},m=h,g=(s("daf3"),s("2877")),f=Object(g["a"])(m,i,r,!1,null,null,null);a["default"]=f.exports},daf3:function(t,a,s){"use strict";s("293c")}}]);
//# sourceMappingURL=chunk-a0931d9e.3ba76224.js.map