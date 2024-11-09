import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({ children, title, setModalOn, className }) => {
  const handleClose = (e) =>
    e.target.id === 'container' ? setModalOn(false) : null

  return (
    <div
      className={`fixed px-4 inset-0 flex items-center justify-center bg-black z-50 bg-transparent !m-0`}
      id='container'
      onClick={handleClose}
    >
      <div
        className={`w-[95%] scrollbar max-h-[600px] p-4 rounded-lg md:w-[500px] mx-auto dark:bg-gray-700 bg-white flex flex-col ${className}`}
      >
        <div className='flex justify-between items-center border-b border-gray-300 pb-2'>
          <h4 className='font-semibold text-lg'>{title}</h4>
          <button>
            <AiOutlineClose
              className='eax2 w-7 h-7 p-0.5 rounded-full mx-2 bg-gray-700 text-gray-50 hover:bg-gray-400 hover:bg-opacity-50 transform hover:rotate-180 dark:bg-gray-700 dark:text-gray-50'
              onClick={() => setModalOn(false)}
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
