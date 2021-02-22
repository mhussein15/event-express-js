const { Event } = require("../db/models");

exports.eventList = async (req, res) => {
  try {
    const events = await Event.findAll({attributes:req.body});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eventDetail = async (req, res) => {
  try {
    console.log(req.params.eventID)
    const event = await Event.findByPk(+req.params.eventID);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addEvent = async (req, res) => {
    try {
        console.log(req.body)
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
      const toDeleleEvent = await Event.findByPk(+req.params.eventID);
      if (toDeleleEvent) {
        await toDeleleEvent.destroy();
        res.sendStatus(204);
      }
        else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateEvent = async (req, res) => {
    try {
      const toUpdateEvent = await Event.findByPk(+req.params.eventID);
      if (toUpdateEvent) {
        await toUpdateEvent.update(req.body);
        res.sendStatus(204);
      }
        else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };