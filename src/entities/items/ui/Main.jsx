import React from "react";

import BestItems from "./BestItems";
import AllItems from "./AllItems";

const Main = () => {
  return (
    <main className="w-full flex justify-center items-center flex-col mt-5 ">
      <BestItems />
      <AllItems />
    </main>
  );
};

export default Main;
