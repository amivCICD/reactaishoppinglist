import { useEffect, useState } from "react";
import Suggestions from "./returned_list/Suggestions";



export default () => {
    const [val, setVal] = useState("");
    const [aiReply, setAiReply] = useState(null);
    const [initialQuery, setInitialQuery] = useState(null)

    useEffect(() => {
        console.log('use effect aiReply', aiReply);
        
    }, [aiReply])

    const sendPost = (data) => {
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
        .then(res => res.json())
        .then(data => setAiReply(data))
        .catch(err => console.log(err))
    }

    const handleChange = e => {
        setVal(e.target.value)
        console.log(val);
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(val)
        sendPost(val)
        setInitialQuery(val)
        setVal("")
    }



    return (
        <>
            <div className="bg-neutral rounded-md w-fit h-fit flex flex-col items-center justify-center mx-auto my-[5%]">
                <label className="p-2 font-bold mx-2 my-2">Ask ChatGPT 3.5 Turbo for suggestions...</label>
                <input className='input p-2 bg-transparent border border-error text-white placeholder:text-white placeholder:text-opacity-30' 
                    placeholder="e.g. protein diet"
                    onChange={handleChange}
                    value={val}
                
                />
                <a className="
                    btn outline outline-white outline-dashed 
                    p-2 mx-4 my-4 bg-gradient-to-r from-secondary to-primary text-neutral font-bold 
                    hover:text-accent hover:outline-error
                    "
                   onClick={handleClick}
                >Submit</a>
            </div>
            <div className="flex items-center justify-center">
                <Suggestions aiReply={aiReply} initialQuery={initialQuery} />
            </div>
        </>
    )
}