
import { useEffect, useState } from "react";

export default ({ aiReply, initialQuery }) => {
    // console.log(aiReply?.content)
    // let shoppingList = aiReply?.split('\n')
    const [aiObj, setAiObj] = useState([])

    // const aiReplyList = ai?.reply?.split('\n')

    function makeNewObj(arr) {
        const newArr = arr.map((i) => {
            let randomId = Math.random().toString().slice(2);
            return {
                grocery: i,
                id: randomId,
                acquired: false,
            }
        })
        return newArr;
    }
    // console.log(makeNewObj(aiReplyList));

    useEffect(() => {
        
        // console.log('aireply as props ', aiReply);
        // console.log('aireply.reply ', aiReply?.reply);
        
        if (aiReply) {
            let arr = aiReply?.reply.split('\n')
            let itemized = makeNewObj(arr)
            setAiObj(itemized)
            console.log(itemized);
        }
        
    }, [aiReply])

    const handleClick = (e) => {


    }

    const handleAddToList = () => {

    }

    return (
        <>
        {aiReply && <div className="flex justify-center items-center flex-col p-4 bg-neutral rounded-md">
            <h3 className="text-center text-xl p-4 pt-2">Your query: "{initialQuery}"</h3>
            <h1 className="text-left text-4xl p-4 pt-2">ChatGPT suggested items:</h1>
                <ul className="m-2">
                    {
            aiObj && aiObj?.map((i) => {
                        return (
                            <li 
                                className="text-center text-success font-bold"
                                key={i.id}
                            >
                                    {i.grocery}
                                <a 
                                    className="text-3xl text-warning ml-2"
                                    id={i.id}    
                                    onClick={handleClick}
                                >
                                    +
                                </a>
                            </li>
                        )
                    }) 
                    }
                </ul>
                <button 
                    className="m-4 p-4 border border-dashed border-accent font-bold rounded-lg hover:bg-primary"
                    onClick={handleAddToList}
                >
                    Add this list to existing list
                </button>
            </div>
        }
        </>
    )
}