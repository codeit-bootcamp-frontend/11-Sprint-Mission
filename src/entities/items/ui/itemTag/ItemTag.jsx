const ItemTag = ({ tag, onDelete }) => {
  return (
    <div className="bg-slate-200 h-10 border rounded-xl flex p-4 items-center relative">
      <div>#{tag}</div>
      <button
        type="button"
        className="h-6 w-6 flex p-0 items-center justify-center border rounded-full bg-gray-400 text-xl text-gray-50"
        onClick={onDelete}
      >
        x
      </button>
    </div>
  );
};

export default ItemTag;
