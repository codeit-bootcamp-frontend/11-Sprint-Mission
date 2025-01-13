import { ProductInputAction, ProductInputState } from "@/types/product";

const INITIAL_INPUT: ProductInputState = {
  images: [],
  name: "",
  description: "",
  price: 0,
  tags: [],
};

const ProductInputReducer = (
  state: ProductInputState,
  action: ProductInputAction
): ProductInputState => {
  const target = action.type.split("_")[1].toLowerCase();
  switch (action.type) {
    case "SET_IMAGES":
    case "SET_NAME":
    case "SET_DESCRIPTION":
    case "SET_PRICE":
    case "SET_TAGS":
      return { ...state, [target]: action.payload };
    case "RESET_INPUT":
      return { ...action.payload };
    default:
      return state;
  }
};

export { ProductInputReducer, INITIAL_INPUT };
