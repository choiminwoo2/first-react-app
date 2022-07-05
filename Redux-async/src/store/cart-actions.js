import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const fetchCartData = () =>{
    return  async (dispatch) =>{
        const fetchData = async () =>{
            const response = await fetch("https://valid-song-248113-default-rtdb.firebaseio.com/cart.json");

            if(!response.ok){
                throw new Error('Could not fetch cart Data');
            }

            const data = await response.json();

            return data;
        }
        try{
           const cartData = await fetchData();
           dispatch(cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity
           }))
        }catch(err){
            dispatch(
                uiActions.showNotification({
                  status: 'error',
                  title: 'Error!',
                  message: 'Sending Cart Data Failed!!'
                })
              )
        }
    }
}
export const sendCartData = (cart) => {
    return async (dispatch) => {
      console.log("진입")
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const sendRequest = async () => {
        const response = await fetch(
          "https://valid-song-248113-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({
                items: cart.items,
                totalQuantity: cart.totalQuantity
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Sending cart data failed.");
        }
      };
  
      try{
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
      }
      catch(err){
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending Cart Data Failed!!'
          })
        )
      }
    };
  };