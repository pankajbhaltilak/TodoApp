import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './List.module.css';

const List = ({ 
    list, 
    isDoneHandler, 
    deleteHandler, 
    swapItemsHandler, 
    isEditingHandler, 
    cancelHandler, 
    editingChangeHandler,
    saveHandler
}) => {
    const listItem = list.map((task,index) => (
        <li className={styles.itemContainer} key={index}>  

            {!task.isEditing && (
                <span className={task.isDone ? styles.itemDone : ''}>
                    {task.item}
                </span>
            )}

            {task.isEditing && (
                <Input value={task.editingItem} inputChangeHandler={(event) => {editingChangeHandler(event, index)}}/>
            )}

            <span className={styles.BtnContainer}>
                {!task.isEditing && (
                    <Button 
                    btnText="Edit" 
                    disabled={task.isDone}
                    btnClickHandler={() => {isEditingHandler(index)}}/>
                )}

                {task.isEditing && (
                    <>
                        <Button 
                            btnText="Save" 
                            btnClickHandler={() => {saveHandler(index)}} 
                            disabled={task.editingItem.trim().length === 0}/>

                        <Button 
                            btnText="Cancal"  
                            btnClickHandler={() => {cancelHandler(index)}} />
                    </>
                )}
                
                {task.isDone && (
                    <Button btnClickHandler={() => {deleteHandler(index)}} btnText="Delete" />
                )}

                {!task.isDone && (
                    <Button 
                        btnClickHandler={()=> {isDoneHandler(index)}} 
                        btnText="Done"
                        disabled={task.isEditing} />
                )}
                <Button 
                    btnClickHandler={()=>{swapItemsHandler(index, index-1)}} 
                    btnText="UP"
                    disabled={index === 0} />

                <Button 
                    btnClickHandler={()=>{swapItemsHandler(index, index+1)}} 
                    btnText="DOWN"
                    disabled={index === (list.length-1)} />
            </span>
        </li>
    ));

    return(
        <div className={styles.ListContainer}>
            <ul>
                {listItem}
            </ul>
        </div>
    );
};

export default List;