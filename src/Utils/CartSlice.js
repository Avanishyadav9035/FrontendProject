import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
     name : "Cart",
     initialState : {
      id : null,
      data : []
     },
     reducers : {
           addItem :(state, action)=>{
            
           if(!state.id){
            state.id = action.payload.resId
           } 
            if(state.id != action.payload.resId){
               toast.error("Cannot add items from different stores")
               return
            } else{
                  const flag = state.data.find((item)=>{
                        return item.id == action.payload.info.id
                  })
                if(!flag){
                  state.data.push({...action.payload.info, quantity : 1})
                  toast.success(`${action.payload.info.name} added to the cart`)
                } else {
                  for(let item of state.data){
                        if(item.id == action.payload.info.id){
                              item.quantity = item.quantity + 1
                        }
                  }
                   toast.success(`${action.payload.info.name} added to the cart`)
                }
            }
           },
           
           removeItem:(state,action)=>{
            if(!state.data.length){
                  toast.error("Cart Empty")
                  return
            }
            
            for(let i = 0; i < state.data.length; i++){
                  console.log(state.data[i].id, action.payload.id)
                  if(state.data[i].id == action.payload.id){
                        if(state.data[i].quantity > 1){
                            state.data[i].quantity = state.data[i].quantity - 1
                            toast.success("Item quantity decreased")
                        } else{
                              // Remove item from cart
                              const removedItem = state.data[i]
                              state.data.splice(i, 1)
                              toast.success(`${removedItem.name} removed from cart`)
                        }
                        break; // Exit loop after finding the item
                  }
            }
            
            // CRITICAL FIX: Clear restaurant ID when cart becomes empty
            if(state.data.length === 0){
                  state.id = null
                  toast.success("Cart cleared")
            }
           },
           
           clearCart : (state, action)=>{
            state.data = []
            state.id = null // CRITICAL FIX: Clear restaurant ID when clearing cart
            toast.success("Cart cleared")
           }
        }
})

export default cartSlice.reducer
export const { addItem, removeItem, clearCart } = cartSlice.actions