import Image from "next/image";
import SideRoute from "../components/SideRoute";

export default function SideBar () {
    return (
      <div className="w-[20%] flex flex-col">
        <div className="">
          <SideRoute
            image="/images/inactiveTrainingLogs.png"
            text="Training Logs"
          />
          <SideRoute image="/images/inactiveAnimalLogo.png" text="Animals" />
        </div>
        <div>
          <SideRoute
            image="/images/inactiveAllTrainingLogo.png"
            text="All Training"
          />
          <SideRoute
            image="/images/inactiveAllAnimalsLogo.png"
            text="All Animals"
          />
          <SideRoute
            image="/images/inactiveAllUsersLogo.png"
            text="All Users"
          />
        </div>
      </div>
    );

}