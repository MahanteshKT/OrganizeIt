import React, { useEffect } from 'react';
import Input from '../Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal, faMinimize, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import useDrag from '../../useDrag';
import useResizable from '../../useResizable';  // Import the custom resizable hook
import $ from 'jquery';
import './NoteCard.scss';

function NoteCard(props) {
  const { position, handleMouseDown, handleTouchStart } = useDrag();
  
  // Use the custom hook for resizable functionality
  const { dimensions, handleMouseDown: handleResizeMouseDown } = useResizable(300, 200, 250, 150, 800, 600);

  const handleCurrentCard = (id) => {
    props.setNoteId(id);
    };

    useEffect(() => {
        const handleResizeTextArea = () => {
            if (props.noteId) {
                const $card = $(`.note-card-${props.noteId}`);
                const $textarea = $card.find(`.textarea-${props.noteId}`);

                if ($card.length && $textarea.length) {
                    const cardHeight = $card.height();                   // card total height
                    const textAreaTop = $textarea.position().top;        // top position relative to card
                    const availableHeight = cardHeight - textAreaTop;    // remaining height

                    $textarea.css({
                        height: `${availableHeight}px`,
                        width: `${$card.width()}px`
                    });
                }
            }
        };

        handleResizeTextArea();
    }, [dimensions, props.noteId]);

  return (
    <div 
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${dimensions.width}px`,  // Set width from resizable hook
        height: `${dimensions.height}px`,  // Set height from resizable hook
      }}
      onClick={() => {
        handleCurrentCard(props.noteId);
      }}
      className={`${props.noteId === props.currentSelectCard ? 'z-10' : ''} note-card-${props.noteId} overflow-hidden fixed bg-opacity-70 backdrop-blur-lg rounded-md shadow-lg ${props.bgColor ? props.bgColor : 'bg-slate-100'}`}
    >
      <div className='note-head-tools-container flex flex-row'>
        <div className='min-w-[70%] flex-1 h-[10px] p-[10px] text-[12px] flex justify-center items-center text-slate-500 hover:text-slate-700 hover:bg-slate-00 cursor-grab active:cursor-grabbing'
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <FontAwesomeIcon icon={faGripHorizontal} />
        </div>
        <div className='flex flex-row min-w-[30%]'>
        <div className='w-[100%] bg-transparent  hover:bg-slate-300 hover:opacity-50 rounded-s-sm px-[8px] py-[2px] text-[10px] flex justify-center items-center' onClick={()=>{
                props.closeCard(props.noteId)
            }}
            >
            <FontAwesomeIcon icon={faMinus}/>
        </div>
          <div className='w-[100%] bg-transparent hover:bg-slate-300 hover:opacity-50 rounded-s-sm px-[8px] py-[2px] text-[10px] flex justify-center items-center' >
            <FontAwesomeIcon icon={faMinimize} />
          </div>
          <div className='w-[100%] hover:opacity-90 hover:bg-red-700 px-[8px] py-[2px] text-[10px] flex justify-center items-center' onClick={() => {
              props.closeCard(props.noteId);
            }}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>

      <div>
        <Input
          errors={''}
          className="w-full outline-none bg-transparent"
          attributes={{
            type: "text",
            onChange: null,
            name: "title",
            id: "title",
            className: 'bg-transparent text-[18px] font-bold focus:shadow-none focus:outline-none focus:ring-0 outline-none border-none',
            placeholder: "Title",
          }}
        />
        <div className="note-input-container ">
          <textarea contenteditable="true"
            name=""
            id=""
            wrap="off"
            style={{
                width: `${dimensions.width}px`,  // Set width from resizable hook
            }}
            className={`${props.noteId ? `textarea-${props.noteId}` : ''} max-w-none note-input font-markdown custom-scroll prose bg-transparent py-[10px] note-text-area outline-none border-none w-[100%] focus:shadow-none focus:outline-none focus:ring-0 resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200`}
          />
        </div>
      </div>

      {/* Resize handle at the bottom right */}
      <div className='resize-handle-container'
              onMouseDown={(e) => {
                handleResizeMouseDown(e);
        }}  // Handle the mouse down event to trigger resizing
              onTouchStart={(e) => {
                  handleTouchStart(e);
              }}
          ></div>
           {/* Resize handle at the bottom right */}
      <div className='resize-handle-container resize-handle-container-2'
              onMouseDown={(e) => {
                handleResizeMouseDown(e);
        }}  // Handle the mouse down event to trigger resizing
              onTouchStart={(e) => {
                  handleTouchStart(e);
              }}
      ></div>
    </div>
  );
}

export default NoteCard;
