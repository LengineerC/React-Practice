const initScore=0;
export default function scoreReducer(preState=initScore,action){
    const {type,data}=action;

    switch(type){
        case "increment":
            return preState+data;
        case "clear":
            return 0;
        default:
            return preState;
    }
}