import {useState} from 'react'
import Item from './Item'
import {v4 as uuidv4} from 'uuid'

export default function Form(){
    const [items, setItems] = useState([])
    const [input, setInput] = useState();

    const deleteElement = id => {
        const filteredItems = items.filter(item => {
            return item.id !== id;
        })
        setItems(filteredItems)
    }

    const addTodo = e => {
        e.preventDefault();
        const newArr = [...items]

        const newTodo = {'txt': input, 'id': uuidv4()};

        newArr.push(newTodo);
        setItems(newArr);

        setInput('')
    }

    const onChangeInput = e => {
        setInput(e.target.value);
    }

    return (

        <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">

            <form onSubmit={e => addTodo(e)} className="mb-3">
                <label htmlFor="todo" className="form-label mt-3">Chose à faire</label>
                <input
                    value={input}
                    onChange={e => onChangeInput(e)}
                    type="text"
                    className="form-control"
                    id="todo"/>

                <button className="mt-2 btn btn-primary d-block">Envoyez</button>
            </form>

            <h2>Liste des choses à faire : </h2>
            <ul className="list-group">
                {items.map(item => {
                    return (
                        <Item
                            txt={item.txt}
                            key={item.id}
                            id={item.id}
                            delete={deleteElement}
                        />
                    )
                })}
            </ul>
        </div>

    )
}