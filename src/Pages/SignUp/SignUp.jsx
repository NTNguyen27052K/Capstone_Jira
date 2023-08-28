import React from "react";
import Lottie from "react-lottie";
import * as animation_sigup from "../../Assets/Animation/signup_animation.json";
import FormSignUp from "../../Components/FormSignUp/FormSignUp";
const SignUp = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation_sigup,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex max-w-screen-xl mx-auto items-center min-h-screen">
      <div className="w-8/12">
        <Lottie
          options={defaultOptions}
          //   style={{ height: "50vh", width: "100%" }}
          className=""
          width={400}
          height={400}
        />
      </div>
      <div className="w-4/12 px-10 flex justify-start">
        <FormSignUp />
      </div>
    </div>
  );
};

export default SignUp;
