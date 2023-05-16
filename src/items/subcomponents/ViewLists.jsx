
import ViewDialog from "./viewDialog/ViewDialog";

export default ({ currentObj, listNames, itemsArr }) => {


    return (
        <>
            <ViewDialog currentObj={currentObj} itemsArr={itemsArr} listNames={listNames} />
        </>
    )
}