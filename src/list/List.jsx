import ListItem from "./ListItem"


let arr = ["Please add an item to continue..."]

export default ({ itemsArr, currentObj, setCurrentObj, onStateChange }) => {

    
    return (
        <div>
            
            <div className="w-5/6 sm:w-3/4 bg-neutral flex flex-col items-start mx-auto p-5 h-fit rounded-md">
                {/* <ListItem itemsArr={itemsArr?.length !== 0 ? itemsArr : arr} onStateChange={onStateChange} /> */}
                <ListItem 
                    itemsArr={itemsArr} 
                    currentObj={currentObj}
                    setCurrentObj={setCurrentObj} 
                    onStateChange={onStateChange} 
                />
            </div>
        
        </div>
    )
}