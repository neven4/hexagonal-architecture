import { createSignal, For } from 'solid-js';
import {
  addTodo,
  todos,
  toggleTodo,
} from './infrastructure/services/Todo.service';

function App() {
  const [inputValue, setInputValue] = createSignal('');

  const onAddTodo = async () => {
    if (inputValue) {
      await addTodo(inputValue());

      setInputValue('');
    }
  };

  return (
    <div>
      <div>
        <For each={todos()}>
          {(todo) => {
            return (
              <div>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />

                {todo.text}
              </div>
            );
          }}
        </For>
      </div>
      <div>
        <input
          value={inputValue()}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </div>
      <div>
        <button onClick={onAddTodo}>Add</button>
      </div>
    </div>
  );
}

export default App;
