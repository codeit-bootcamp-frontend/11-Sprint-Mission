import Nav from "../components/Nav";
import AddItemForm from "../components/AddItemForm";

function AddItem() {
  return (
    <div>
      <Nav />
      <div className="add-item-form">
        <AddItemForm />
      </div>
    </div>
  );
}

export default AddItem;
