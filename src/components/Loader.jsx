const Loader = () => {
  return (
    <div
      role='status'
      className='flex h-full items-center justify-center my-10'
    >
      <div className='w-[48px] h-[48px] border-4 border-gray-300 border-b-transparent inline-block rounded-full animate-spin'></div>
    </div>
  )
}

export default Loader
