import AddItemForm from "@/components/AddItemForm";
import { addItem } from "@/lib/api"; // addItem 함수 가져오기
import { Product } from "@/types/commontypes";
import styles from "@/styles/additem.module.css";

export default function AddItem() {
  // FormData를 JSON으로 변환하고 API 요청을 보내는 함수
  const handleSubmit = async (
    formData: FormData
  ): Promise<{ review: Product } | null> => {
    try {
      // FormData를 JSON으로 변환
      const itemData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string) || 0,
        images: formData
          .getAll("images")
          .map((file) =>
            typeof file === "string" ? file : (file as File).name
          ), // 파일 이름 전달
        tags: JSON.parse(formData.get("tags") as string),
      };

      // API 요청
      const item = await addItem(itemData); // addItem 함수 호출
      return { review: item }; // 등록된 상품 데이터 반환
    } catch (error) {
      console.error("Failed to submit product:", error);
      return null;
    }
  };

  // 성공적으로 상품 등록 후 처리
  const handleSuccess = (item: Product) => {
    console.log("Product submitted successfully:", item);
    // 필요한 추가 동작을 수행 (예: 페이지 리디렉션 또는 UI 업데이트)
  };

  return (
    <div className={styles.add_item_form}>
      <AddItemForm onSubmit={handleSubmit} onSubmitSuccess={handleSuccess} />
    </div>
  );
}
