import { useCallback, useRef } from 'react';
import { useTodo } from '../infrastructure/services';

export function Index() {
  const { todos, toggleTodo, addTodo } = useTodo();

  const textInputRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(async () => {
    if (textInputRef.current) {
      await addTodo(textInputRef.current.value);

      textInputRef.current.value = '';
    }
  }, [addTodo]);

  return (
    <div>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />

              {todo.text}
            </div>
          );
        })}
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
