import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import useDrag from '../useDrag'; // Import the custom hook
import NavLink from '../Layout/SideNavBar/components/NavLink';
import NoteCard from '../UI/NoteCard/NoteCard';
import NavTool from './../../Preferences/NavTool/NavTool';
function NoteTool() {
  const { position, handleMouseDown, handleTouchStart } = useDrag();
  const [ bgColor, setBgColor ] = useState('white');
  const [notes, setNotes] = useState([]);
  // const [isColorSelected, setIsColorSelected] = useState(false);
  const [currentSelectCard, setCurrentSelectedCard] = useState('');
  // function changeBgColor (bgColor) {
  //   setBgColor(bgColor);
  // }
  function CloseNote (id) {
    console.log(id);
    setNotes((prevNotes) => prevNotes.filter((item)=> item.id !== id));
  }
  function changeBgColor (bgColor) {
      setBgColor(bgColor);
      if (notes.length) {
        notes.forEach((item)=>{
          if (item.id === currentSelectCard) {
              item.bgColor = bgColor;
          }
        })
      }
  }
  const createNewNote = () => {
    const newNote = { id: Date.now().toString(), bgColor: bgColor ? bgColor : 'bg-slate-100' };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentSelectedCard(newNote.id);
  };
  const setCurrentNoteId = (id) => {
    setCurrentSelectedCard(id);
  };
  return (
    <>
      {/* Render all NoteCards */}
      {notes.map((note) => (
        <NoteCard key={note.id} noteId={note.id} setNoteId={setCurrentNoteId} closeCard={CloseNote} currentSelectCard={currentSelectCard} bgColor={note.bgColor} />
      ))}
      <div
      style={{
        left: `${position.x}px`,  
        top: `${position.y}px`,
      }}
      className={`fixed bg-opacity-60 transform translate-x-[-50%] backdrop-blur-sm translate-y-[-50%] z-[1000] min-w-[400px] min-h-[45px] select-none overflow-hidden bg-slate-100 shadow-lg rounded-md flex flex-row`}
    >
      <div
        className="dragBar w-[20px] hover:bg-opacity-20 duration-500 bg-slate-500  text-slate-400 flex items-center text-[20px] justify-center p-2 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <FontAwesomeIcon icon={faGripVertical} className="flex" />
      </div>
      <div className="min-w-[100%] flex items-center px-[10px] py-[8px] gap-[40px] justify-center">
          <div  onClick={createNewNote} className='create-note text-[20px] cursor-pointer duration-500 bg-slate-200 hover:bg-slate-300 hover:shadow-md opacity-60 w-[35px] h-[35px] rounded-[50%] flex justify-center items-center'>
              <FontAwesomeIcon icon={faPlus} />
          </div>
          {
            NavTool.navToolColor && NavTool.navToolColor.map((toolColor,index)=>
              <div
                  key={index}
                  onClick={() => changeBgColor(toolColor.color)}
                  className={` ${toolColor.color} ${toolColor.color === bgColor ? 'outline' : ''} create-note text-[20px] cursor-pointer  duration-500  hover:bg-slate-300 hover:shadow-lg opacity-60 w-[35px] h-[35px] rounded-[50%] flex justify-center items-center`}>
              </div>
            )
          }
      </div>
    </div>
    </>
  );
}

export default NoteTool;
