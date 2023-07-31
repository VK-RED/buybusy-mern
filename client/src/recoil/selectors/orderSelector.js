import { selector } from "recoil";
import orderState from "../atoms/orders";

const orderSelector = selector({
    key:'orderSelector',
    get:({get}) => {
        const state = get(orderState);
        return state;
    }
});

export default orderSelector;