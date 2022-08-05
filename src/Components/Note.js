import { AiFillDelete } from "react-icons/ai";
import { useRef } from "react";
import { default as D } from "react-draggable";

const Note = ({
  isgrouped,
  editNoteHandler,
  id,
  text,
  date,
  handleDeleteNode,
  group,
  author,
  coloridx,
}) => {
  const authorInputRef = useRef(null);
  const textInputRef = useRef(null);
  const groupInputRef = useRef(null);

  const colors = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#bf6fff",
    "#a0c4ff",
    "#bdb2ff",
    "#ffc6ff",
  ];

  if (text === "") {
    // make it content editable
    //  textInputRef.current.setAttribute("contenteditable", "true");
    if (textInputRef.current) textInputRef.current.focus();
  } else if (author === "") {
    // make it content editable
    //authorInputRef.current.setAttribute("contenteditable", "true");
    if (authorInputRef.current) authorInputRef.current.focus();
  } else if (group === "") {
    // make it content editable
    // groupInputRef.current.setAttribute("contenteditable", "true");
    if (groupInputRef.current) groupInputRef.current.focus();
  }
  const newNote = {
    id: id,
    text: text,
    date: date,
    group: group,
    colorIdx: coloridx,
  };

  function updateContent() {
    // console.log(i, data);
    newNote.date = new Date().toISOString().slice(0, 10);
    editNoteHandler({
      ...newNote,
      author: authorInputRef.current.innerText,
      text: textInputRef.current.innerText,
      group: groupInputRef.current.innerText,
    });
  }

  function ondb0(event) {
    event.target.contentEditable = "true";
    authorInputRef.current.focus();
  }
  function ondb1(event) {
    event.target.contentEditable = "true";
    textInputRef.current.focus();
  }
  function ondb2(event) {
    event.target.contentEditable = "true";
    groupInputRef.current.focus();
  }
  return !isgrouped ? (
    <D>
      <div
        style={{
          backgroundColor: colors[coloridx],
        }}
        className="note"
      >
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <h3
              ref={groupInputRef}
              onDoubleClick={ondb2}
              contentEditable="false"
              onBlur={() => updateContent()}
            >
              {group}
            </h3>
            <small>{date}</small>
          </div>
          <p
            ref={textInputRef}
            onDoubleClick={ondb1}
            contentEditable="false"
            onBlur={() => updateContent()}
          >
            {text}
          </p>
        </div>

        <div className="note-footer">
          {/* <div className="d-flex justify-content-between"> */}

          <small
            ref={authorInputRef}
            onDoubleClick={ondb0}
            contentEditable="false"
            onBlur={() => updateContent()}
          >
            {author}
          </small>

          {/* </div> */}
          <AiFillDelete
            className="delete-icon"
            size="1.3em"
            onClick={() => handleDeleteNode(id)}
          />
        </div>
      </div>
    </D>
  ) : (
    <div
      style={{
        backgroundColor: colors[coloridx],
      }}
      className="note"
    >
      <div>
        <div className="d-flex align-items-center justify-content-between">
          <h3
            ref={groupInputRef}
            onDoubleClick={ondb2}
            contentEditable="false"
            onBlur={() => updateContent()}
          >
            {group}
          </h3>
          <small>{date}</small>
        </div>
        <p
          ref={textInputRef}
          onDoubleClick={ondb1}
          contentEditable="false"
          onBlur={() => updateContent()}
        >
          {text}
        </p>
      </div>

      <div className="note-footer">
        <div className="d-flex justify-content-between">
          <small
            ref={authorInputRef}
            onDoubleClick={ondb0}
            contentEditable="false"
            onBlur={() => updateContent()}
          >
            ~ {author}
          </small>
        </div>

        <AiFillDelete
          className="delete-icon"
          size="1.3em"
          onClick={() => handleDeleteNode(id)}
        />
      </div>
    </div>
  );
};

export default Note;
