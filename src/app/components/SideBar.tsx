import Image from "next/image";
import SideRoute from "../components/SideRoute";

export default function SideBar () {
    return (
      <div className="w-[20%] flex flex-col border-r-3 border-gray-100 justify-center items-center">
        <div>
          <div className="w-[100%] border-b-2 border-gray-300">
            <SideRoute
              image="/images/inactiveTrainingLogs.png"
              text="Training Logs"
            />
            <SideRoute image="/images/inactiveAnimalLogo.png" text="Animals" />
          </div>
          <div>
            <p>Admin Access</p>
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
        <div className="w-[70%] border-t-2 border-gray-300">
          <p>Name</p>
        </div>
      </div>
    );

}