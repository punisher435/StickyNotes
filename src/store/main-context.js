import { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";
const notes = [
  // {
  //     id: 1,
  //     text: "This is my first note",
  //     date: "13/04/2022",
  //     group: "1",
  //     author: "Joseph",
  //     colorIdx: 0
  // },
  // {
  //     id: 2,
  //     text: "This is my second note",
  //     date: "13/04/2022",
  //     group: "2",
  //     author: "Maverick",
  //     colorIdx: 1
  // },
  // {
  //     id: 3,
  //     text: "This is my third note",
  //     date: "13/04/2022",
  //     group: "3",
  //     author: "Brock",
  //     colorIdx: 2
  // }
];

const AllnotesContext = createContext({
  notes: [],
  totalnotes: 0,
  addNote: (text, group) => {},
  saveNote: (newNote) => {},
  deleteNodes: (id) => {},
  setnotes: (newnotes) => {},
});

export function AllnotesContextProvider(props) {
  const [userAllnotes, setNotes] = useState(notes);
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [userAllnotes]);
  //function to change the favorite status of a project
  const addNote = (text, group, author) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
      group: group,
      author: author,
      //take a random no between 0 and 9
      colorIdx: Math.floor(Math.random() * 8),
    };

    const newNotes = [...userAllnotes, newNote];
    console.log(newNotes);
    setNotes(newNotes);
  };

  // const deleteNodes = (id) => {
  //     console.log("deleting note, id: ", id);
  //     // // const newNotes = ;
  //     // // console.log(newNotes);
  //     // setNotes((prev) => { prev.filter((note) => note.id !== id) });
  //     //remove the note from the array having the id
  //     for (let i = 0; i < userAllnotes.length; i++) {
  //         if (userAllnotes[i].id === id) {
  //             userAllnotes.splice(i, 1);
  //         }
  //     }
  //     setNotes(userAllnotes);
  // }
  const setnotes = (newnotes) => {
    setNotes(newnotes);
  };
  const deleteNodes = (id) => {
    setNotes((prevUserAllNotes) => {
      return prevUserAllNotes.filter((note) => note.id !== id);
    });
  };
  //create a function to edit a project
  const saveNote = (newNote) => {
    console.log("newnote:", newNote);
    console.log("note", userAllnotes);
    //print all the newNote values
    // console.log(newNote);

    // localStorage.setItem('react-notes-app-data', JSON.stringify(newNotes))
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === newNote.id) {
          return {
            ...newNote,
            id: note.id,
          };
        } else {
          return note;
        }
      })
    );
  };

  const context = {
    notes: userAllnotes,
    totalnotes: userAllnotes.length,
    addNote: addNote,
    deleteNode: deleteNodes,
    saveNote: saveNote,
    setnotes: setnotes,
  };

  return (
    <AllnotesContext.Provider value={context}>
      {props.children}
    </AllnotesContext.Provider>
  );
}

export default AllnotesContext;
