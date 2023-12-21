

export const Alert = ({alert}) => {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r p-3 text-center text-white rounded-xl uppercase text-sm mb-10 font-bold`}>
        {alert.msg}
    </div>
  )
}
