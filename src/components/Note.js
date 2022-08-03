import deleteIcon from "../images/delete-icon.svg";

export default function Note(props) {
    return(
        <div className="note">
            <img src={deleteIcon} alt="delete name tag" className="delete-note" />
            <input 
                className="note-title"
                type="text" 
                placeholder="Note title"
                name="noteTitle"
                value={props.title}
                onChange={(e) => props.updateNote(e, props.id)}
            />
            <textarea 
                className="note-body"
                placeholder="Write the note here..."
                name="noteBody"
                value={props.body}
                onChange={(e) => props.updateNote(e, props.id)}
            />
        </div>
    );
}