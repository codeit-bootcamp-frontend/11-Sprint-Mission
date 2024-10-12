import "./additems.css";
import ItemForm from "../components/ItemForm.js";

function AddItems() {
  return (
    <div className="addItemPage">
      <form>
        <ItemForm />
      </form>
    </div>
  );
}

export default AddItems;
