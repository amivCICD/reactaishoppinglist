
import ViewDialog from "./viewDialog/ViewDialog";

export default ({ currentObj, listNames, itemsArr, setCurrentObj }) => {


    return (
        <>
            <ViewDialog currentObj={currentObj} setCurrentObj={setCurrentObj} itemsArr={itemsArr} listNames={listNames} />
        </>
    )
}