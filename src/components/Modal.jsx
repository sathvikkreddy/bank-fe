export default function Modal({ open, onClose, children }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
          fixed inset-0 flex justify-center items-center transition-colors 
          ${open ? "visible bg-black/20 dark:bg-black/50" : "invisible"}
        `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
            bg-home-image dark:bg-dark-home-image dark:bg-cover bg-center dark:bg-gray-800 text-black dark:text-white rounded-xl shadow p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
      >
        {children}
      </div>
    </div>
  );
}
