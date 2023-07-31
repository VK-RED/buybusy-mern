import { atom } from "recoil";


const productState = atom({
    key:'productState',
    default:{
        loading:true,
        products:[]
    }
});

export default productState;