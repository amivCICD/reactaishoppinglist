
import { useEffect, useState } from "react";


export default ({ aiReply, initialQuery, temporaryArr, loading, newQuery, handleStateChange, currentObj, setCurrentObj }) => {
    // console.log(aiReply?.content)
    // let shoppingList = aiReply?.split('\n')
    const [aiObj, setAiObj] = useState([]);

    const [filteredAi, setFilteredAi] = useState(null);
    const [stateChanged, setStateChanged] = useState(false);
    const [diminished, setDiminished] = useState(false);
    const [remainderItems, setRemainderItems] = useState(null);
    

    
    // const aiReplyList = ai?.reply?.split('\n')

    // so we have, aiReply; filteredAi; remainderItems

    // if we have aiReply, turn it into array of objects
    // filtAi will take on aiReply, so that we can filter out each item
    // filtAi is set to remainderItems as the array is diminished
    // once diminished, we need to reset everything
    



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
        console.log(filteredAi);
        
        

        if (filteredAi && !newQuery) {
            return
        } else if (aiReply && newQuery) {
            let arrFromAiReply = aiReply?.reply.split('\n')
            let itemized = makeNewObj(arrFromAiReply)
                // itemized will go here
                setFilteredAi(itemized)
        }  
       
        
        // console.log('aireply as props ', aiReply);
        // console.log('aireply.reply ', aiReply?.reply);
        // console.log('remainderItems ', remainderItems);
        // if (aiReply && !filteredAi) { // aiReply
        //     let arrFromAiReply = aiReply?.reply.split('\n')
        //     let itemized = makeNewObj(arrFromAiReply)
            
        //     setFilteredAi(itemized) // itemized will go here
        // }
        
        
        
        // if (aiReply) {
        //     let arr = aiReply?.reply.split('\n')
        //     let itemized = makeNewObj(arr)
        //     setAiObj(itemized)
        //     console.log(itemized);
        // }
        
    }, [aiReply, filteredAi, temporaryArr, currentObj])

    const handleClick = (e) => {

        
        
        let id = e.target.id;
        // console.log('what does suggestions think is the current obj', currentObj);
        // console.log(id);
        let individualItem = filteredAi.filter(i => i.id === id);
        let copy = { ...currentObj };
        let filt = currentObj.groceryList.filter(i => i.grocery !== 'Please add a grocery item to proceed...'); // filter out
        copy.groceryList = [...filt, ...individualItem]; // join arrays with new individual item
        // console.log('updated copy', copy);
        localStorage.setObj(copy.id, copy);
        setCurrentObj(copy); // re-render with current list
        

        console.log('individualItem', individualItem);
        let remainderItems = filteredAi.filter(i => i.id !== id);
        // setRemainderItems(filteredAi?.filter(i => i.id !== id));
        console.log('remainderItems ', remainderItems);
        // if (remainderItems.length === 0) {
        //     remainderItems = null;
        // } 
        setFilteredAi(remainderItems);
        console.log('filteredai should be null here', filteredAi);
        console.log('null remainder items ', remainderItems);
        // console.log('filtAi length ', filteredAi.length, filteredAi);
        
        // setStateChanged(prev => !prev)
        // handleStateChange(stateChanged)

    }

    const handleAddToList = () => {

    }

    return (
        <>
        {loading && 
            <div className="flex justify-center items-center flex-col p-4 bg-neutral rounded-md">
                <h3 className="text-center text-xl p-4 pt-2">Your query: "{initialQuery}"</h3>
                <span className="text-2xl text-warning bg-transparent mr-auto animate-reverse-spin">&#10042;</span>
                <div className="animate-spin text-8xl text-warning bg-transparent">&#10042;</div>
                <span className="text-4xl text-warning bg-transparent ml-auto animate-reverse-spin">&#10042;</span>
            </div>
        }
        {!loading && !!filteredAi?.length && <div className="flex justify-center items-center flex-col p-4 bg-neutral rounded-md">
            <h3 className="text-center text-xl p-4 pt-2">Your query: "{initialQuery}"</h3>
            <h1 className="text-left text-4xl p-4 pt-2">ChatGPT suggested items:</h1>
                <ul className="m-2">
            {
            // aiObj && aiObj?.map((i) => {
                filteredAi?.map((i) => {
                    return (
                        <li 
                            className="text-center text-success font-bold"
                            key={i.id}
                        >
                                {i.grocery}
                            <a 
                                className="text-3xl text-warning ml-2 btn"
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