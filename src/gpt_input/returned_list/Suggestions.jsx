import { useEffect } from "react";

export default ({ aiReply, initialQuery }) => {
    // console.log(aiReply?.content)
    // let shoppingList = aiReply?.split('\n')

    const aiReply2 = [1,2,3,4];

    useEffect(() => {

        console.log('aireply as props ', aiReply);
        console.log('aireply.reply ', aiReply?.reply);
        let arr = aiReply?.reply.split('\n')
        console.log(arr);
        
    }, [aiReply])

    return (
        <>
        {aiReply && <div className="flex justify-center items-center flex-col p-4 bg-neutral rounded-md">
            <h3 className="text-center text-xl p-4 pt-2">Your query: "{initialQuery}"</h3>
            <h1 className="text-left text-4xl p-4 pt-2">ChatGPT suggested items:</h1>
                <ul className="m-2">
                    {
                    aiReply?.reply.split('\n').map((i) => {
                        return <li className="text-center text-success font-bold">{i}<a className="text-3xl text-warning ml-2">+</a></li>
                    }) 
                    }
                </ul>
                <button className="m-4 p-4 border border-dashed border-accent font-bold rounded-lg hover:bg-primary">Add this list to existing list</button>
            </div>
        }
        </>
    )
}