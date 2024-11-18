import AddItemForm from "../components/AddItemForm";
import axios from "axios";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
}

interface ItemListResponse {
  totalCount: number;
  list: Item[];
}

function AddItem() {
  const handleSubmit = async (
    formData: FormData
  ): Promise<{ review: Item } | null> => {
    try {
      const response = await axios.post(
        "https://panda-market-api.vercel.app/products",
        formData
      );
      const itemListResponse: ItemListResponse = response.data;
      return { review: itemListResponse.list[0] };
    } catch (error) {
      console.error("Failed to submit product:", error);
      return null;
    }
  };

  const handleSuccess = (item: Item) => {
    console.log("Product submitted successfully:", item);
  };

  return (
    <div className="add-item-form">
      <AddItemForm onSubmit={handleSubmit} onSubmitSuccess={handleSuccess} />
    </div>
  );
}

export default AddItem;
