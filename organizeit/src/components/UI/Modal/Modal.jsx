import React from "react";

const Modal = ({ isOpen, title, content, onClose, onSave }) => {
  if (!isOpen) return null; // Don't render if the modal is closed
/**
 * const [isModalOpen, setIsModalOpen] = useState(false);
 
   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);
 
   const handleSave = () => {
     console.log("Changes saved!");
     closeModal();
   };
   <div className="min-w-[100%] flex items-center px-[10px] py-[8px] gap-[40px] justify-center">
             <div className='create-note text-[20px] cursor-pointer duration-500 bg-slate-200 hover:bg-slate-300 hover:shadow-md opacity-60 w-[35px] h-[35px] rounded-[50%] flex justify-center items-center'>
             <button
           type="button"
           onClick={openModal}
           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
         >
                 <FontAwesomeIcon icon={faPlus} />
         </button>
         <Modal
        isOpen={isModalOpen}
        title="Custom Modal Title"
        content="This is dynamic modal content passed as a prop."
        onClose={closeModal}
        onSave={handleSave}
      />
 */
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Modal Title */}
        <h2 className="text-xl font-semibold">{title}</h2>

        {/* Modal Content */}
        <p className="mt-2">{content}</p>

        {/* Modal Buttons */}
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
