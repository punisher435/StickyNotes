import { useState } from "react";
// import {GrClose} from "react-icons/gr";

const AddNote=(props)=>{

    const [noteText, setNoteText] = useState('');
    const[group, setGroup] = useState('');
    const[author, setAuthor] = useState('');

    const handleChange =(event)=>{
            setNoteText(event.target.value);
    }
    
    const handleGroupChange=(event)=>{
            setGroup(event.target.value);
    }

    const handleAuthorChange=(event)=>{
        setAuthor(event.target.value);
}

    const handleSaveClick = ()=>{
        if(noteText.trim().length>0){
            props.handleAddNote(noteText, group,author);
            setNoteText('');
            setGroup('');
            setAuthor('');
        }   
    }

    const handleCloseClick=()=>{
        props.setShowingAddNote(false);
    }

    return(
        <div className="note new">

            <textarea rows="2" cols="10" placeholder="Type group name" value={group} onChange={handleGroupChange} ></textarea>
            <textarea rows="2" cols="10" placeholder="Type author name" value={author} onChange={handleAuthorChange} ></textarea>
            
            <textarea 
                rows="4" 
                cols="10" 
                placeholder="Type to add a note"
                value={noteText}
                onChange={handleChange}
                ></textarea>
            <div className="note-footer">
                
                <button className="save"  style={{marginRight: '5px'}} onClick={handleSaveClick}>Save</button>
                <button className="save" style={{marginRight: '5px'}} onClick={handleCloseClick}>Close</button>

            </div>
        </div>
    );
}

export default AddNote;