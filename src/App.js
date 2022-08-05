import NotesList from "./Components/NotesList";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import { useContext } from "react";
import AllnotesContext from "./store/main-context";
import AddNote from "./Components/AddNote";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderRows } from "./Components/Reorder";
// import { margin } from "@mui/system";

const App = () => {
  const notesContext = useContext(AllnotesContext);
  //create  a usestate to track sorted or not
  const [grouped, setGroup] = useState(false);
  const notes = notesContext.notes;
  //crate an object which contains groupname as key and notes as value
  const groupedNotes = {};
  for (let i = 0; i < notes.length; i++) {
    if (groupedNotes[notes[i].group]) {
      groupedNotes[notes[i].group].push(notes[i]);
    } else {
      groupedNotes[notes[i].group] = [notes[i]];
    }
  }
  function setGroupHandler(isg) {
    console.log(isg);
    setGroup(isg);
  }

  const [searchText, setSearchText] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteByGroup, setNotebyGroup] = useState([]);

  function showAddNoteHandler(show) {
    setShowAddNote(show);
  }

  useEffect(() => {
    //make a list of objects with group as key and list of notes as value
    const noteByGroup = [];
    const groups = [];
    notes.map((note) => {
      //if group already exists in groups
      if (!groups.includes(note.group)) {
        //add group to groups
        groups.push(note.group);
      }
      return groups;
    });
    //traverse through groups
    groups.map((group) => {
      //make a list of notes with the same group
      const notesByGroup = notes.filter((note) => note.group === group);
      //add group and notes to noteByGroup
      noteByGroup.push({
        id: group,
        values: notesByGroup,
      });

      return noteByGroup;
    });

    console.log(noteByGroup);
    console.log(groups);
    setNotebyGroup(noteByGroup);
  }, [notes]);

  const reorderafterdrag = (notebyGroupAfterDrag) => {
    const newnotes = [];
    //iterate over notebyGroupAfterDrag
    notebyGroupAfterDrag.map((g) => {
      //iterate over group.values
      g.values.map((note) => {
        //add note to notes
        //check if note.group is same as g.id
        if (note.group === g.id) {
          newnotes.push(note);
        } else {
          //create a new note with same id and group as g.id
          const newNote = {
            id: note.id,
            text: note.text,
            group: g.id,
            author: note.author,
            date: note.date,
            colorIdx: note.colorIdx,
          };
          newnotes.push(newNote);
        }
        return newnotes;
      });
      return newnotes;
    });
    notesContext.setnotes(newnotes);
  };

  return !grouped ? (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }
      }}
    >
      <div className="main-container">
        <div className="bg-container">
          <div className="container">
            <Header
              showingAddNote={showAddNote}
              setShowingAddNote={showAddNoteHandler}
              isgrouped={grouped}
              setGrouped={setGroupHandler}
              handleSearchNote={setSearchText}
              className="container"
            />
            {notes.length === 0 && !showAddNote ? (
              <div className="d-flex align-items-center">
                <h1
                  style={{ fontSize: "50px", marginLeft: "60px" }}
                  className="navbar-brand"
                >
                  Welcome to <br />
                  StickyNotes
                </h1>
                <div className="img-container">
                  <img
                    className="image-test"
                    src="https://res.cloudinary.com/djbyqrhy9/image/upload/v1650054084/sticky_p04dhc.png"
                    alt="Click on add note to create new note"
                  />
                </div>
              </div>
            ) : (
              <>
                <NotesList
                  isgrouped={grouped}
                  notes={notes.filter((note) =>
                    note.text.toLowerCase().includes(searchText)
                  )}
                  handleAddNote={notesContext.addNote}
                  handleDeleteNode={notesContext.deleteNode}
                  editNote={notesContext.saveNote}
                  group={null}
                />
                {showAddNote ? (
                  <AddNote
                    setShowingAddNote={showAddNoteHandler}
                    handleAddNote={notesContext.addNote}
                  />
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  ) : (
    //else traverse through the groupedNotes object and render the notes
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }

        reorderafterdrag(reorderRows(noteByGroup, source, destination));
      }}
    >
      <div className="main-container">
        <div className="bg-container">
          <div className="container">
            <Header
              showingAddNote={showAddNote}
              setShowingAddNote={showAddNoteHandler}
              isgrouped={grouped}
              setGrouped={setGroupHandler}
              handleSearchNote={setSearchText}
              className="container"
            />

            {noteByGroup.map((noterow) => {
              return (
                <NotesList
                  isgrouped={grouped}
                  notes={noterow.values}
                  handleAddNote={notesContext.addNote}
                  handleDeleteNode={notesContext.deleteNode}
                  editNote={notesContext.saveNote}
                  group={noterow.id}
                />
              );
            })}
            {showAddNote ? (
              <AddNote
                setShowingAddNote={showAddNoteHandler}
                handleAddNote={notesContext.addNote}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
