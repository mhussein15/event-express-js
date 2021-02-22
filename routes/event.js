const express = require("express");
const router = express.Router();
const {
  eventList,
  eventDetail,
  addEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/event");
//Get EVENTS
router.get("/", eventList);

//GET EVENT DETAIL
router.get("/:eventID", eventDetail);

//ADD EVENT
router.post("/", addEvent);

//DELETE EVENT
router.delete("/:eventID", deleteEvent);

//UPDATE EVENT
router.put("/:eventID", updateEvent);

module.exports = router;
