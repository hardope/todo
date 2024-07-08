import React, { useEffect, useState } from 'react';

import '../styles/List.css';

interface Item {
    id?: number
    title: string
    priority: "high" | "medium" | "low"
}

export const List = () => {
    const [items, setItems] = useState<Item[]>(() => {
        const storedItems = localStorage.getItem('items');
        return storedItems ? JSON.parse(storedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    function getId(): number {
        return items.length ? Math.max(...items.map(item => item.id || 0)) + 1 : 1;
    }

    function addItem(event: React.FormEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const title: Item['title'] = form.task.value;
        const priority: Item['priority'] = form.priority.value;

        setItems([...items, { id: getId() || 0, title, priority }]);
        form.reset();
    }

    function removeItem(event: React.MouseEvent) {
        const button = event.target as HTMLButtonElement;
        const id = parseInt(button.dataset.id as string);
        setItems(items.filter(item => item.id !== id));
    }

    return (
        <>
            <h2>Items</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.title} <span className={`priority ${item.priority}`}>⊙</span> <button data-id={item.id} onClick={removeItem}>Remove</button>
                    </li>
                ))}
            </ul>

            <form onSubmit={addItem}>
                <label>
                    Title:
                    <input type="text" name="task" required />
                </label>
                <label>
                    Priority:
                    <select name="priority" required defaultValue="medium">
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </label>
                <button type="submit">Add Item</button>
            </form>
        </>
    )
}
