import { atom } from "recoil"


const userState = atom({
    key: "userState",
    default:{
        loading:true,
        user:null,
    }
})

export default userState;

