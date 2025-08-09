// import { useEffect, useState } from "react";
// import './Todo.css';

// export default function Todo() {
//     const [title, setTitle] = useState("");
//     const [description, setDesciption] = useState("");
//     const [todos, setTodos] = useState([]);
//     const [error, setError] = useState("");
//     const [message, setMessage] = useState("");
//     const [editId, setEditId] = useState(-1);

//     // Edit
//     const [editTitle, setEditTitle] = useState("");
//     const [editDescription, setEditDesciption] = useState("");

//     const apiUrl = "http://localhost:8000";

//     const handleSubmit = () => {
//         setError("");
//         if (title.trim() !== '' && description.trim() !== '') {
//             fetch(apiUrl + "/todos", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ title, description, completed: false })
//             }).then((res) => {
//                 if (res.ok) {
//                     setTodos([...todos, { title, description, completed: false }]);
//                     setTitle("");
//                     setDesciption("");
//                     setMessage("Item added successfully");
//                     setTimeout(() => setMessage(""), 3000);
//                 } else {
//                     setError("Unable to create Todo item");
//                 }
//             }).catch(() => {
//                 setError("Unable to create Todo item");
//             });
//         }
//     };

//     useEffect(() => {
//         getItems();
//     }, []);

//     const getItems = () => {
//         fetch(apiUrl + "/todos")
//             .then((res) => res.json())
//             .then((res) => setTodos(res));
//     };

//     const handleEdit = (item) => {
//         setEditId(item._id);
//         setEditTitle(item.title);
//         setEditDesciption(item.description);
//     };

//     const handleUpdate = () => {
//         setError("");
//         if (editTitle.trim() !== '' && editDescription.trim() !== '') {
//             fetch(apiUrl + "/todos/" + editId, {
//                 method: "PUT",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ title: editTitle, description: editDescription })
//             }).then((res) => {
//                 if (res.ok) {
//                     const updatedTodos = todos.map((item) => {
//                         if (item._id === editId) {
//                             return { ...item, title: editTitle, description: editDescription };
//                         }
//                         return item;
//                     });
//                     setTodos(updatedTodos);
//                     setEditTitle("");
//                     setEditDesciption("");
//                     setMessage("Item updated successfully");
//                     setTimeout(() => setMessage(""), 3000);
//                     setEditId(-1);
//                 } else {
//                     setError("Unable to update Todo item");
//                 }
//             }).catch(() => {
//                 setError("Unable to update Todo item");
//             });
//         }
//     };

//     const handleEditCancel = () => {
//         setEditId(-1);
//     };

//     const handleDelete = (id) => {
//         if (window.confirm('Are you sure want to delete?')) {
//             fetch(apiUrl + '/todos/' + id, { method: "DELETE" })
//                 .then(() => {
//                     const updatedTodos = todos.filter((item) => item._id !== id);
//                     setTodos(updatedTodos);
//                 });
//         }
//     };

//     const toggleComplete = (id, currentStatus) => {
//         // If backend supports "completed" field
//         fetch(apiUrl + "/todos/" + id, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ completed: !currentStatus })
//         }).then((res) => {
//             if (res.ok) {
//                 const updatedTodos = todos.map((todo) =>
//                     todo._id === id ? { ...todo, completed: !currentStatus } : todo
//                 );
//                 setTodos(updatedTodos);
//             }
//         }).catch(() => {
//             // Frontend-only update if backend fails
//             const updatedTodos = todos.map((todo) =>
//                 todo._id === id ? { ...todo, completed: !currentStatus } : todo
//             );
//             setTodos(updatedTodos);
//         });
//     };

//     return <>
//         <div className="row p-3 text-dark text-center">
//             <h1>What's on Your Plate?</h1>
//         </div>

//         <div className="row">
//             <h3>Add Task</h3>
//             {message && <p className="text-success">{message}</p>}
//             <div className="form-group d-flex gap-2">
//                 <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text" />
//                 <input placeholder="Description" onChange={(e) => setDesciption(e.target.value)} value={description} className="form-control" type="text" />
//                 <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
//             </div>
//             {error && <p className="text-danger">{error}</p>}
//         </div>

//         <div className="row mt-3">
//             <h3>To-Do List</h3>
//             <div className="col-md-6">
//                 <ul className="list-group">
//                     {todos
//                         // sort: incomplete first
//                         .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
//                         .map((item) => (
//                         <li key={item._id} className={`list-group-item d-flex justify-content-between align-items-center my-2 ${item.completed ? 'completed' : ''}`}>
//                             <div className="d-flex align-items-center gap-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={item.completed || false}
//                                     onChange={() => toggleComplete(item._id, item.completed)}
//                                 />
//                                 <div className="d-flex flex-column me-2">
//                                     {editId !== item._id ? (
//                                         <>
//                                             <span className="fw-bold">{item.title}</span>
//                                             <span>{item.description}</span>
//                                         </>
//                                     ) : (
//                                         <div className="form-group d-flex gap-2">
//                                             <input placeholder="Title" onChange={(e) => setEditTitle(e.target.value)} value={editTitle} className="form-control" type="text" />
//                                             <input placeholder="Description" onChange={(e) => setEditDesciption(e.target.value)} value={editDescription} className="form-control" type="text" />
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="d-flex gap-2">
//                                 {editId !== item._id
//                                     ? <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
//                                     : <button className="btn btn-warning" onClick={handleUpdate}>Update</button>}
//                                 {editId !== item._id
//                                     ? <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
//                                     : <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     </>;
// }







import { useEffect, useState } from "react";
import './Todo.css';

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDesciption] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(-1);

    // Edit
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDesciption] = useState("");

    // <-- Change apiUrl to your Render backend URL here -->
    const apiUrl = "https://taskly-todo-app-75t6.onrender.com";

    const handleSubmit = () => {
        setError("");
        if (title.trim() !== '' && description.trim() !== '') {
            fetch(apiUrl + "/todos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, completed: false })
            }).then((res) => {
                if (res.ok) {
                    setTodos([...todos, { title, description, completed: false }]);
                    setTitle("");
                    setDesciption("");
                    setMessage("Item added successfully");
                    setTimeout(() => setMessage(""), 3000);
                } else {
                    setError("Unable to create Todo item");
                }
            }).catch(() => {
                setError("Unable to create Todo item");
            });
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        fetch(apiUrl + "/todos")
            .then((res) => res.json())
            .then((res) => setTodos(res));
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditTitle(item.title);
        setEditDesciption(item.description);
    };

    const handleUpdate = () => {
        setError("");
        if (editTitle.trim() !== '' && editDescription.trim() !== '') {
            fetch(apiUrl + "/todos/" + editId, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editTitle, description: editDescription })
            }).then((res) => {
                if (res.ok) {
                    const updatedTodos = todos.map((item) => {
                        if (item._id === editId) {
                            return { ...item, title: editTitle, description: editDescription };
                        }
                        return item;
                    });
                    setTodos(updatedTodos);
                    setEditTitle("");
                    setEditDesciption("");
                    setMessage("Item updated successfully");
                    setTimeout(() => setMessage(""), 3000);
                    setEditId(-1);
                } else {
                    setError("Unable to update Todo item");
                }
            }).catch(() => {
                setError("Unable to update Todo item");
            });
        }
    };

    const handleEditCancel = () => {
        setEditId(-1);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure want to delete?')) {
            fetch(apiUrl + '/todos/' + id, { method: "DELETE" })
                .then(() => {
                    const updatedTodos = todos.filter((item) => item._id !== id);
                    setTodos(updatedTodos);
                });
        }
    };

    const toggleComplete = (id, currentStatus) => {
        fetch(apiUrl + "/todos/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !currentStatus })
        }).then((res) => {
            if (res.ok) {
                const updatedTodos = todos.map((todo) =>
                    todo._id === id ? { ...todo, completed: !currentStatus } : todo
                );
                setTodos(updatedTodos);
            }
        }).catch(() => {
            // Frontend-only update fallback
            const updatedTodos = todos.map((todo) =>
                todo._id === id ? { ...todo, completed: !currentStatus } : todo
            );
            setTodos(updatedTodos);
        });
    };

    return <>
        <div className="row p-3 text-dark text-center">
            <h1>What's on Your Plate?</h1>
        </div>

        <div className="row">
            <h3>Add Task</h3>
            {message && <p className="text-success">{message}</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text" />
                <input placeholder="Description" onChange={(e) => setDesciption(e.target.value)} value={description} className="form-control" type="text" />
                <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>

        <div className="row mt-3">
            <h3>To-Do List</h3>
            <div className="col-md-6">
                <ul className="list-group">
                    {todos
                        .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
                        .map((item) => (
                            <li key={item._id} className={`list-group-item d-flex justify-content-between align-items-center my-2 ${item.completed ? 'completed' : ''}`}>
                                <div className="d-flex align-items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={item.completed || false}
                                        onChange={() => toggleComplete(item._id, item.completed)}
                                    />
                                    <div className="d-flex flex-column me-2">
                                        {editId !== item._id ? (
                                            <>
                                                <span className="fw-bold">{item.title}</span>
                                                <span>{item.description}</span>
                                            </>
                                        ) : (
                                            <div className="form-group d-flex gap-2">
                                                <input placeholder="Title" onChange={(e) => setEditTitle(e.target.value)} value={editTitle} className="form-control" type="text" />
                                                <input placeholder="Description" onChange={(e) => setEditDesciption(e.target.value)} value={editDescription} className="form-control" type="text" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="d-flex gap-2">
                                    {editId !== item._id
                                        ? <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                        : <button className="btn btn-warning" onClick={handleUpdate}>Update</button>}
                                    {editId !== item._id
                                        ? <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                        : <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>}
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    </>;
}
