import { selector } from "recoil";
import productState from "../atoms/products";


const productSelector = selector({
    key:'productSelector',
    get:({get}) => {
        const state = get(productState);
        return state;
    }
})

export default productSelector;