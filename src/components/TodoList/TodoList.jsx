import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import List from '../List/List';

const TodoList = () => {
    const [list, setList] = useState([]);
    const [inputText, setInputText] = useState('');

    useEffect(()=>{
        const items = localStorage.getItem('todoList');
        if(items){
            setList(JSON.parse(items));
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem('todoList',JSON.stringify(list));
    },[list]);

    const inputChangeHandler = (e)=>{
        const value= e.target.value;
        setInputText(value);
    };

    const btnClickHandler = ()=>{
        if(inputText.trim()){
            const items = [...list];
            items.push({
                item: inputText,
                isDone: false,
                isEditing: false,
                editingItem: inputText
            });
            setList(items);  
        }
        setInputText('');
    };

    const keyUpHandler = (e)=>{
        if(e.keyCode === 13){
            btnClickHandler();
        }
    };

    const isDoneHandler = (itemIndex)=>{
        const items = [...list];
        items[itemIndex].isDone = true;
        setList(items);
    };

    const deleteHandler = (itemIndex)=>{
        const items = [...list];
        items.splice(itemIndex, 1);
        setList(items);
    };

    const swapItems = (initIndex, finalIndex) => {
        const items = [...list];
        // swap logic
        const item = items[initIndex];
        items[initIndex] = items[finalIndex];
        items[finalIndex] = item;
        setList(items);
    }

    const isEditingHandler = (itemIndex)=>{
        const items = [...list];
        items[itemIndex].isEditing = true;
        setList(items);
    };

    const cancelHandler = (itemIndex)=>{
        const items = [...list];
        items[itemIndex].isEditing = false;
        items[itemIndex].editingItem = items[itemIndex].item;
        setList(items);
    };

    const editingChangeHandler = (event, itemIndex)=>{
        const value = event.target.value;
        const items = [...list];
        items[itemIndex].editingItem = value;
        setList(items);
    };

    const saveHandler = (itemIndex)=>{
        const items = [...list];
        const value = items[itemIndex].editingItem.trim();
        if(value){
            items[itemIndex].item = value;
            items[itemIndex].editingItem = value;
            items[itemIndex].isEditing = false;
            setList(items);
        }
    };

    return(
        <>
            <Input 
                inputChangeHandler={inputChangeHandler}
                value={inputText}
                keyUpHandler={keyUpHandler}/>
            <Button 
                btnText="Add to TodoList"
                btnClickHandler={btnClickHandler}/>
            <List 
                
                list={list}
                isDoneHandler={isDoneHandler}
                deleteHandler={deleteHandler}
                swapItemsHandler={swapItems}
                isEditingHandler={isEditingHandler}
                cancelHandler={cancelHandler}
                editingChangeHandler={editingChangeHandler}
                saveHandler={saveHandler}/> 
        </>
    );
};

export default TodoList;