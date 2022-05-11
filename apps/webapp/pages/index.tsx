import { useCallback, useRef, useState } from 'react';
let render = 0;

export function Index() {
  const [count, setCount] = useState(0);

  render++;
  console.log(render);

  // const { todos, addTodo, togggleTodo } = useTodos();

  const textInputRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(async () => {
    console.log('setting count');

    setCount((count) => count + 1);
    setCount((count) => count + 1);
  }, []);

  return (
    <div>
      <div>
        {count}
        {/* {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => togggleTodo(todo.id)}
            />
            {todo.text}
          </div>
        ))} */}
      </div>
      <div>
        <input ref={textInputRef} />
      </div>
      <div>
        <button onClick={onAddTodo}>Add</button>
      </div>
    </div>
  );
}

export default Index;
