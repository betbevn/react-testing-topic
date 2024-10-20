/**
 * Exercise
 * 1. Create a story for the Counter component
 * 2. Publish the story you created to Chromatic
 * 3. Check the published content and accept it if there are no problems
 * 4. Make some changes to the Counter component and publish it again to Chromatic,
 * and make sure the differences are detected correctly
 */
import { useState } from "react";

interface CounterProps {
  initialCount?: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={decrement}>ー</button>
      <button onClick={increment}>＋</button>
    </div>
  );
};

export default Counter;
