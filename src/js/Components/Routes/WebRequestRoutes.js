import {SerialRouter} from 'chomex';
import * as Controllers from '../Controllers/RequestControllers';

let router = new SerialRouter(4);
router.on([
  {url: /api_get_member\/material/},
  {url: /api_get_member\/kdock/},
  {url: /api_req_kousyou\/createship/}
], Controllers.onCreateShipCompleted);
router.on([{url: /api_req_mission\/start/}], Controllers.onMissionStart);
router.on([{url: /api_get_member\/mapinfo/}], Controllers.onMapPrepare);
router.on([{url: /api_req_kaisou\/powerup/}], Controllers.onKaisouPowerup);

const WebRequestListener = router.listener();

let onCompletedRouter = new SerialRouter(2);
onCompletedRouter.on([
  {url: /api_req_sortie\/battleresult/},
  true
], Controllers.onBattleResulted);
const WebRequestOnCompleteListener = onCompletedRouter.listener();

export {
  WebRequestListener,
  WebRequestOnCompleteListener
}