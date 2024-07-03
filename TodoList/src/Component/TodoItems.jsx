/* eslint-disable react/prop-types */
import tick from "../../src/Assets/tick.png";
import noTick from '../../src/Assets/not_tick.png'
import deletepng from "../../src/Assets/delete.png";

export default function ToDoItems({ todo, deleteTodo , toggle}) {
  const handleDelete = () => {
      deleteTodo(todo.id);
  };

  const handleToggle = () => {
    toggle(todo.id);
  };


  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center cursor-pointer">
        <img onClick={handleToggle} src={todo.isCompleted ? tick : noTick} className="w-7" />
        <p className={todo.isCompleted ? "text-slate-700 line-through ml-4 text-[17px]" : "text-slate-700 ml-4 text-[17px]"}>{todo.text}</p>
       
      </div>

      <img
        onClick={handleDelete}
        src={deletepng}
        className="w-3.5 cursor-pointer"
      />
    </div>
  );
}
