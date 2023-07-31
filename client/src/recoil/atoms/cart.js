import { atom } from "recoil";

const cartState = atom({
    key:'cartState',
    default:{
        loading:true,
        cart:[],
        price:0,
    }
});

export default cartState;