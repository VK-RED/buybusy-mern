import { selector } from "recoil";
import cartState from "../atoms/cart";

const cartSelector = selector({
    key: 'cartSelector',
    get:({get}) => {
        const state = get(cartState);
        return state;
    }
});

export default cartSelector;