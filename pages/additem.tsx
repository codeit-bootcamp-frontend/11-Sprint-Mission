import AddItemForm from "@/components/AddItem";
import axios from "axios";
import { Item, ItemListResponse } from "@/types/commontypes";
import styles from "@/styles/additem.module.css";

export default function AddItem() {
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
    <div className={styles.add_item_form}>
      <AddItemForm onSubmit={handleSubmit} onSubmitSuccess={handleSuccess} />
    </div>
  );
}
