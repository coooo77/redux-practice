import { useState } from 'react'

// store 相關
import { decrement, increment, incrementByAmount, reset } from './counterSlice'
import { useAppDispatch, useAppSelector } from '../../app/utils'

const Counter = () => {
  const useDispatch = useAppDispatch()
  const count = useAppSelector((state) => state.counter.value)

  const [incrementAmount, setIncrementAmount] = useState(0)
  const addValue = Number(incrementAmount) || 0

  const resetAll = () => {
    setIncrementAmount(0)
    useDispatch(reset())
  }
  return (
    <section className="counter">
      <p>{count}</p>

      <div>
        <button onClick={() => useDispatch(increment())}>+</button>
        <button onClick={() => useDispatch(decrement())}>-</button>
      </div>

      <input type="number" value={incrementAmount} onChange={(e) => setIncrementAmount(+e.target.value)} />

      <div>
        <button onClick={() => useDispatch(incrementByAmount(addValue))}>Add Amount</button>
        <button onClick={resetAll}>Reset</button>
      </div>
    </section>
  )
}

export default Counter
