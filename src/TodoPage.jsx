import { useEffect, useState } from 'react';

const STORAGE_KEY = 'daymark-todos';
const FILTERS = ['All', 'Active', 'Completed'];

function TodoPage({ onLogout }) {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(saved) ? saved.filter((todo) => todo && typeof todo.id === 'string' && typeof todo.text === 'string') : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState('All');
  const [newTodo, setNewTodo] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const remaining = todos.filter((todo) => !todo.completed).length;
  const completed = todos.length - remaining;
  const visibleTodos = todos.filter((todo) => filter === 'All' || (filter === 'Active' ? !todo.completed : todo.completed));

  function addTodo(event) {
    event.preventDefault();
    const text = newTodo.trim();
    if (!text) {
      setInputError('Write a task before adding it.');
      return;
    }
    setTodos((current) => [{ id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() }, ...current]);
    setNewTodo('');
    setInputError('');
  }

  function toggleTodo(id) {
    setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }

  return (
    <main className="todo-page">
      <header className="topbar"><a className="brand" href="#home" aria-label="Daymark home"><span className="brand-mark"><span /></span> daymark</a><div className="topbar-right"><span className="private-pill"><span /> Saved on this device</span><button className="logout-button" onClick={onLogout}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 3H4.8a1.8 1.8 0 0 0-1.8 1.8v10.4A1.8 1.8 0 0 0 4.8 17H8m4-3 4-4-4-4m4 4H8" /></svg>Log out</button></div></header>

      <section className="todo-main">
        <div className="welcome-block"><span className="eyebrow"><span className="eyebrow-dot" /> YOUR SPACE, YOUR PACE</span><h1>A good day starts<br />with <em>one thing.</em></h1><p>Put it down here. You can take it from there.</p></div>
        <div className="task-card">
          <div className="task-card-heading"><div><span className="mini-label">YOUR LIST</span><h2>Today’s tasks <span className="count-badge">{todos.length}</span></h2></div><span className="sun-icon" aria-hidden="true">☼</span></div>
          <form className="add-form" onSubmit={addTodo}>
            <label className="sr-only" htmlFor="new-todo">Add a task</label><span className="add-icon" aria-hidden="true">＋</span>
            <input id="new-todo" type="text" maxLength={160} placeholder="What needs doing?" value={newTodo} onChange={(event) => { setNewTodo(event.target.value); if (inputError) setInputError(''); }} aria-describedby={inputError ? 'todo-error' : undefined} />
            <button type="submit" className="add-button">Add task <span aria-hidden="true">→</span></button>
          </form>
          {inputError && <p className="form-error todo-error" id="todo-error" role="alert">{inputError}</p>}
          <div className="list-toolbar"><div className="filter-tabs" role="group" aria-label="Filter tasks">{FILTERS.map((option) => <button key={option} className={`filter-tab ${filter === option ? 'selected' : ''}`} onClick={() => setFilter(option)} aria-pressed={filter === option}>{option}</button>)}</div><span className="remaining-count"><strong>{remaining}</strong> {remaining === 1 ? 'left to do' : 'left to do'}</span></div>

          {visibleTodos.length > 0 ? <ul className="todo-list">{visibleTodos.map((todo) => <li key={todo.id} className={`todo-row ${todo.completed ? 'is-completed' : ''}`}><button className="check-button" onClick={() => toggleTodo(todo.id)} aria-label={todo.completed ? `Mark ${todo.text} as active` : `Mark ${todo.text} as completed`} aria-pressed={todo.completed}>{todo.completed && <span aria-hidden="true">✓</span>}</button><span className="todo-text">{todo.text}</span><button className="delete-button" onClick={() => deleteTodo(todo.id)} aria-label={`Delete ${todo.text}`}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 6h11m-9.5 0 .6 10h5.8l.6-10M8 6V4.5h4V6m-3.5 2.5v5m3-5v5" /></svg></button></li>)}</ul> : <div className="empty-state"><span className="empty-art" aria-hidden="true">{filter === 'Completed' ? '✳' : '○'}</span><strong>{filter === 'Completed' ? 'Nothing checked off yet.' : filter === 'Active' ? 'You’re all caught up.' : 'A fresh page.'}</strong><span>{filter === 'Completed' ? 'Finished tasks will find a home here.' : filter === 'Active' ? 'Enjoy the breathing room.' : 'Add a task above and take it one step at a time.'}</span></div>}

          <footer className="task-footer"><span><span className="footer-spark">✳</span> {todos.length === 0 ? 'Start small. That’s how good days begin.' : completed === todos.length ? 'Everything’s done. Take a moment for yourself.' : 'One step at a time. You’re doing just fine.'}</span>{completed > 0 && <button className="clear-button" onClick={clearCompleted}>Clear completed</button>}</footer>
        </div>
        <p className="privacy-note"><svg viewBox="0 0 18 18" aria-hidden="true"><rect x="3.5" y="8" width="11" height="7" rx="1.5" /><path d="M6 8V5.5a3 3 0 0 1 6 0V8" /></svg>Your tasks are saved privately in this browser.</p>
      </section>
      <footer className="page-footer"><span>Make space for what matters.</span><span>DAYMARK <b>·</b> A LITTLE MORE ROOM TO THINK</span></footer>
    </main>
  );
}


export default TodoPage;
