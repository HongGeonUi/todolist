import react from 'react';
import '../css/Todolisttemplate.css'

const Todolisttemplate = ({form, children }) => {
    return (
        <main className="todo-list-template">
            <div className="todo-list-title">
                2023년 목표
            </div>
            <section className="form-wrapper">
                {form}
            </section>
            <section className="todoItemList-wrapper">
                {children}
            </section>
        </main>
    );
};

export default Todolisttemplate;