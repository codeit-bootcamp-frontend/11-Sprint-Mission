import { useParams } from "react-router-dom";
import { useDeviceType } from "../../contexts/DeviceTypeContext";
import { useEffect, useState } from "react";
import { getProductById } from "../../api";

function ItemDetailPage() {
  const [item, setItem] = useState();
  const { id } = useParams();
  const deviceType = useDeviceType();

  useEffect(() => {
    const fetchDate = async () => {
      const result = await getProductById(id);
      setItem(result);
    };
    fetchDate();
  }, [id]);

  return <>{item.name}</>;
}

export default ItemDetailPage;
