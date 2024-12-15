import React from "react";
import Loader from "./_components/Loader.component";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <Loader type="page" />
      <span>Loading Todos...</span>
    </div>
  );
};

export default Loading;
