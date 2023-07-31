import { atom } from "recoil";

const orderState = atom({
    key: 'orderState',
    default:{
        loading:true,
        orders:[],
    }
});

export default orderState;