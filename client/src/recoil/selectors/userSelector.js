import { selector } from "recoil";
import userState from "../atoms/user";

const userSelector = selector({
    key:'userSelector',
    get:({get}) => {
        const state = get(userState);
        return state;
    }
});

export default userSelector;