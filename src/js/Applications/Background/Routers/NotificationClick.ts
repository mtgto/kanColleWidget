import { Router } from "chomex";
import { OnMissionNotFoundClick, OnNotificationClick } from "../Controllers/Notification";

const resolver = (id: string) => {
  const [name /*, query*/] = id.split("?");
  return { name };
};

const router = new Router(resolver);
router.on("Mission", OnNotificationClick);
router.on("Recovery", OnNotificationClick);
router.on("Shipbuilding", OnNotificationClick);
router.on("Tiredness", OnNotificationClick);
router.on("MissionNotFound", OnMissionNotFoundClick);
export default router.listener();
