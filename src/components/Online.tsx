import { memo, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface todoInterface {
    Title: string,
    Content: string,
    userEmail: string,
    Created: string
}

function Online() {
    const [currentPage, setCurrentPage] = useState(1);
    const [input, setInput] = useState({ Title: "", Content: "", userEmail: "", Created: "" })
    const [todo, setTodo] = useState<todoInterface[]>([]);

    useEffect(() => {
        const todo = new Array(0).fill({
            Title: "birthday",
            Content: "Upcoming birthday of alan nixon paliakkara and it is in august 16",
            userEmail: "alannixon2520@gmail.com",
            Created: "1 August 2024 at 17:41:22 UTC+5:30",
        });
        setTodo(todo)
    }, [])



    const saveOnlineNote = () => {
        if (input.userEmail) {

        } else {
            const other = { userEmail: "", Created: new Date() + "" }
            setInput({ Title: "", Content: "", userEmail: "", Created: "" })
            setTodo([{ ...input, ...other }, ...todo])
        }
    }

    const deleteTodo = (index: number) => {
        const deleted = [...todo].filter((_, i) => i !== index);
        setTodo(deleted)
        // delete fire base code
    }

    const itemsPerPage = 2;

    const handleNextPage = () => {
        if (currentPage < Math.ceil(todo.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = todo.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="w-full p-2 bg-gray-200 rounded-sm mt-5">
            <h2 className="text-xl font-bold">UPSERT YOUR NOTE</h2>
            <div className="flex flex-col md:flex-row">

                <div className="w-full md:w-1/2 mt-4">
                    <form className="max-w-sm ml-5 mt-5">
                        <div className="mb-5">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-black">Your Title</label>
                            <input type="text" onChange={(e) => setInput(rest => ({ ...rest, Title: e.target.value }))} id="text" value={input.Title} className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-black" placeholder="your title here..." required />
                        </div>

                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">Your message</label>
                        <textarea
                            id="message"
                            rows={4}
                            onChange={(e) => setInput(rest => ({ ...rest, Content: e.target.value }))}
                            value={input.Content}
                            className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                            placeholder="Write your messsage here..." />

                        <div className="flex mt-3">
                            <div className="ml-auto">
                                <button type="button" onClick={() => setInput({ Title: "", Content: "", userEmail: "", Created: "" })} className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800">Clear</button>
                                <button type="button" onClick={() => saveOnlineNote()} className="text-white ml-3 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>

                {todo.length !== 0 ? <div className="w-full ml-8 md:w-1/2 mt-4">
                    <h1 className="text-xl font-bold">Notes</h1>
                    {currentItems.map((item, index) => (
                        <div key={index} className="Todo w-[80%] mb-4">
                            <div className="flex w-full">
                                <p>{item.Title}</p>
                                <div className='flex ml-auto'>
                                    <div className="" onClick={() => setInput(item)}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </div>
                                    <div className="ml-3" onClick={() => deleteTodo(index)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                </div>
                            </div>
                            <div>{item.Content}</div>
                            <p className='mt-2'>created at : {item.Created.split("at")[0]}</p>
                        </div>
                    ))}

                    <div className="flex w-[80%] justify-between mt-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}>
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(todo.length / itemsPerPage)}
                            className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === Math.ceil(todo.length / itemsPerPage) && 'opacity-50 cursor-not-allowed'}`}>
                            Next
                        </button>
                    </div>

                </div> : <>
                    <div className="mx-auto">
                        <img src="/noImageData.jpg" alt="" className='w-80 h-80' />
                        <p className="text-center rounded-full mt-3">You haven't added any online note</p>
                    </div>
                </>}
            </div>
        </div>
    );
}

export default memo(Online);
