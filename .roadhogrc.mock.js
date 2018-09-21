import {getList,addEvent} from './mock/event2';
export default {
  'GET /api/events': (req, res) => getList(req, res),
  'POST /api/addevents': (req, res) => addEvent(req, res),
};
