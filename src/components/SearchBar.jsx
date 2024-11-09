import { useTranslation } from 'react-i18next'
import { BsX, BsSearch } from 'react-icons/bs'

const SearchBar = ({ handleSearch, setSearchQuery, searchQuery }) => {
  const { t, i18n } = useTranslation()
  return (
    <form
      className='px-4 pt-4 pb-2 flex gap-2 relative bg-white dark:bg-gray-700'
      onSubmit={handleSearch}
    >
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        autoComplete='off'
        dir={i18n.language === 'en' ? 'ltr' : 'rtl'}
        type='text'
        enterKeyHint='search'
        placeholder={t('search:placeholder')}
        name='search'
        className='outline-none border border-gray-200 focus:border-main transition duration py-1.5 px-4 flex-grow rounded-full bg-transparent dark:placeholder:text-white dark:text-white peer'
      />
      {searchQuery.length > 0 ? (
        <button
          className={`w-10 h-10 flex items-center justify-center dark:text-gray-100 absolute text-gray-500 peer-focus:text-main ${
            i18n.language === 'en' ? 'right-4' : 'left-4'
          }`}
          onClick={() => setSearchQuery('')}
          type='button'
          title='إنهاء البحث'
        >
          <BsX className='text-2xl' />
        </button>
      ) : (
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-md absolute peer-focus:text-main dark:text-white text-gray-500 focus:outline-none outline-none border-none transition-none active:outline-none ${
            i18n.language === 'en' ? 'right-4' : 'left-4'
          }`}
          title='البحث'
        >
          <BsSearch />
        </button>
      )}
    </form>
  )
}

export default SearchBar
