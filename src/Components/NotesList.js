import Note from "./Note.js";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useRef, useEffect, useState } from "react";
import Selecto from "react-selecto";
import { useContext } from "react";
import AllnotesContext from "../store/main-context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const NotesList = ({
  isgrouped,
  notes,
  handleAddNote,
  handleDeleteNode,
  editNote,
  group,
}) => {
  const notesContext = useContext(AllnotesContext);
  const [scrollOptions, setScrollOptions] = useState({});
  const selectoRef = useRef(null);
  const scrollerRef = useRef(null);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const newGroupInputRef = useRef(null);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };
  function onD(event) {
    setContextMenu(null);
    event.preventDefault();

    for (let i = 0; i < selectedNotes.length; i++) {
      notesContext.deleteNode(selectedNotes[i]);
    }
    setSelectedNotes([]);
  }
  const handleClose = () => {
    setContextMenu(null);
  };
  function handleChangeGroup(event) {
    event.preventDefault();
    for (let i = 0; i < selectedNotes.length; i++) {
      //createa a new note with the same content as the selected note
      //find the note in the project having key = selectedNotes[i]
      const curNote = notes.filter((n) => n.id === selectedNotes[i])[0];
      let newNote = {
        ...curNote,
        group: newGroupInputRef.current.value,
      };
      //update the note in the project
      notesContext.saveNote(newNote);
    }
    setSelectedNotes([]);
  }

  console.log(selectedNotes);
  useEffect(() => {
    setScrollOptions({
      container: scrollerRef.current,
      throttleTime: 30,
      threshold: 0,
    });
  }, []);

  return isgrouped ? (
    <div className="checking">
      <h3 className="text-center">Group {group}</h3>
      <Droppable
        droppableId={group}
        direction="horizontal"
        isCombineEnabled={false}
      >
        {(dropProvided) => (
          <div
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
            className="notes-list"
          >
            {notes.map((note, index) => (
              <Draggable key={note.id} draggableId={note.id} index={index}>
                {(dragProvided) => (
                  <div
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                  >
                    <Note
                      isgrouped={isgrouped}
                      editNoteHandler={editNote}
                      id={note.id}
                      text={note.text}
                      date={note.date}
                      handleDeleteNode={handleDeleteNode}
                      group={note.group}
                      author={note.author}
                      coloridx={note.colorIdx}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  ) : (
    <div>
      <div className="select" onContextMenu={handleContextMenu}>
        <Selecto
          ref={selectoRef}
          dragContainer={".elements"}
          selectableTargets={[".selecto-area .cube"]}
          hitRate={20}
          selectByClick={true}
          selectFromInside={true}
          toggleContinueSelect={["shift"]}
          ratio={0}
          scrollOptions={scrollOptions}
          onDragStart={(e) => {
            if (e.inputEvent.target.nodeName === "BUTTON") {
              return false;
            }
            return true;
          }}
          onSelect={(e) => {
            e.added.forEach((el) => {
              el.classList.add("selected");
              console.log("added....");
              setSelectedNotes((prev) => [...prev, el.id.split("*")[1]]);
            });
            e.removed.forEach((el) => {
              el.classList.remove("selected");
              console.log("removed....");
              setSelectedNotes((prev) =>
                prev.filter((id) => id !== el.id.split("*")[1])
              );
            });
          }}
          onScroll={(e) => {
            scrollerRef.current.scrollBy(
              e.direction[0] * 10,
              e.direction[1] * 10
            );
          }}
        ></Selecto>
        <div
          className="notes-list elements scroll selecto-area"
          id="selecto1"
          ref={scrollerRef}
          onScroll={() => {
            selectoRef.current.checkScroll();
          }}
        >
          {notes.map((note) => (
            <div
              key={note.id}
              id={`noteID*${note.id}`}
              style={{ display: "inline-block" }}
              className="cube"
            >
              <Note
                isgrouped={isgrouped}
                editNoteHandler={editNote}
                id={note.id}
                text={note.text}
                date={note.date}
                handleDeleteNode={handleDeleteNode}
                group={note.group}
                author={note.author}
                coloridx={note.colorIdx}
              />
            </div>
          ))}
        </div>
        <Menu
          open={selectedNotes.length > 0 && contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={onD}>Delete Notes</MenuItem>
          {/* create a text area to input new group name */}
          <form onBlur={handleChangeGroup} onSubmit={handleChangeGroup}>
            <input
              ref={newGroupInputRef}
              id="group-name"
              placeholder="Enter New Group Name"
            ></input>
          </form>
        </Menu>
      </div>
    </div>
  );
};

export default NotesList;
