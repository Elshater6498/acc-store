import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'
const SearchLabel = ({ filteredItems, searchValue, close }) => {
  const { t } = useTranslation(['search'])
  return (
    <div className='flex relative justify-between items-center mt-4 mb-2 mx-4 px-6 py-4 rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
      <div className={`flex items-center justify-between w-full gap-1`}>
        <h2 className='text-2xl text-main dark:text-white font-bold'>
          {searchValue}
        </h2>
        <span className='text-xs text-gray-600 flex items-center gap-1 dark:text-gray-200'>
          <span className='text-lg text-main dark:text-white font-bold'>
            ({filteredItems?.length})
          </span>
          {t('searchNumber')}
        </span>
      </div>
      <FiX
        className='w-6 absolute -top-2 -left-2 h-6 p-0.5 rounded-full bg-red-600 text-gray-50 hover:bg-opacity-100 opacity-80 dark:bg-red-600 dark:text-gray-50 block transform hover:rotate-180 cursor-pointer transition duration-300 ease'
        onClick={close}
      />
    </div>
  )
}

export default SearchLabel
