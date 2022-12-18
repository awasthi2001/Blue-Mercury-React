import { fetchAndUpdate } from "../../Redux/action"



export const deleteAllItemAfterOrder = async (CartCount,Cart_Data,dispatch) => {
try {
    for(let i=0; i<CartCount; i++) {
       await fetch(`https://blue-mercury-3qiw.onrender.com/Cart/${Cart_Data[i].id}`,{
        method : 'DELETE'
       })
    }
    await dispatch(fetchAndUpdate());
} catch (error) {
    console.log(error)
}
}
