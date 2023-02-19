import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * 定義 initialState 的型別資訊，目的是讓 createSlice 知道該 slice 中 state 的型別資訊
 **/
export interface CounterState {
  value: number
}

export const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // 直接操作 state
    increment: (state) => {
      state.value++
    },
    // 直接回傳整個 state
    decrement: (state) => ({ value: state.value - 1 }),
    // 使用 PayloadAction 型別來定義 action.payload 能夠接受的型別
    // 這裡的 action.payload 需要時 number
    incrementByAmount: (state, action: PayloadAction<number>) => ({
      value: state.value + action.payload,
    }),
    reset: (state) => ({ value: 0 }),
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

export default counterSlice.reducer
