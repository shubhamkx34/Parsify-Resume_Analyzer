import { Link } from "react-router";
import ShinyText from "./shineText";

const navbar = () => {
  return (
    <div className="pt-2 h-[10vh] w-screen flex text-white justify-between">
   <ShinyText className=" text-4xl font-[font2] mt-4 ml-13 cursor-pointer"
  text="Parsify"
  speed={2}
  delay={0}
  color="#b5b5b5"
  shineColor="#ffffff"
  spread={120}
  direction="left"
  yoyo
  pauseOnHover={false}
  disabled={false}
/>
      <div className="links text-xl  font-[font1] mt-4 mr-13  ">
        <Link className="pr-10" to="/feature">
          Features
        </Link>
        <Link className="pr-10" to="/working">
          How It Works
        </Link>
        <button className="cursor-pointer py-2 px-5 active:scale-95 bg-white text-black font-[font1] rounded-2xl">Logout</button>
      </div>
    </div>
  );
};

export default navbar;
