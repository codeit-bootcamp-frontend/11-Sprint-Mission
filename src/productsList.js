import { useEffect, useState } from "react";
import fetchProducts from "./api"; //

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await fetchProducts();
        console.log(productData);

        if (productData && Array.isArray(productData.list)) {
          setProducts(productData.list);
        } else {
          console.error("API 응답에 제품 목록이 없습니다:", productData);
        }
      } catch (error) {
        console.error("제품을 불러오는 중 오류 발생:", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <strong>ID:</strong> {product.id}, <strong>Name:</strong>{" "}
              {product.name}
              <p>
                <strong>Price:</strong> {product.price}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Tags:</strong> {product.tags.join(", ")}
              </p>{" "}
              {/* 태그 출력 */}
              <p>
                <strong>Owner:</strong> {product.ownerNickname}
              </p>
              {product.images && product.images.length > 0 && (
                <div>
                  <strong>Images:</strong>
                  <div>
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product ${product.name}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>제품 데이터를 불러오는 중이거나 제품이 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default ProductsList;
