import React from "react";
import * as animation_loading from "../../Assets/Animation/animation_loading.json";
import Lottie from "react-lottie";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation_loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="flex justify-center items-center opacity-70 bg-white"
      style={{ zIndex: "9999" }}
      // redux làm thêm 1 state, overFlowY : hidden
    >
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default Loading;
