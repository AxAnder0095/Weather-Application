import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdDewPoint } from "react-icons/md";
import { BsFillCloudsFill } from "react-icons/bs";
import { FaWind } from "react-icons/fa6";
import { GiWindSlap } from "react-icons/gi";
import { PiWindmill } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { FaSun } from "react-icons/fa";


export const Icons = {
    github: <FaGithub size={30} />,
    linkedin: <FaLinkedin size={30} />,
    cloud: <FaCloud size={50} />,
    feelsLike: <FaSun size={20} />,
    dewPoint: <MdDewPoint size={20} />,
    visibility: <FaRegEye size={20} />,
    pressure: <PiWindmill size={20} />,
    windSpeed: <FaWind size={20} />,
    windDegree: <GiWindSlap size={20} />,
    clouds: <BsFillCloudsFill size={20} />,
    humidity: <WiHumidity size={20} />,
};