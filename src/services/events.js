/* eslint-disable no-magic-numbers */
const var1 = 2019;
const var2 = 2020;

export default [
  {
    id: 0,
    title: "All Day Event very long title",
    color: "#dc143c",
    allDay: true,
    start: new Date(var1, 0, 0),
    end: new Date(var1, 0, 1)
  },
  {
    id: 1,
    title: "Long Event",
    color: "#dc143c",
    start: new Date(var1, 0, 7),
    end: new Date(var1, 0, 10)
  },

  {
    id: 2,
    title: "DTS STARTS",
    color: "#ff8c00",
    start: new Date(var2, 2, 10, 0, 0, 0),
    end: new Date(var2, 2, 20, 0, 0, 0)
  },

  {
    id: 3,
    title: "DTS ENDS",
    color: "#9932cc",
    start: new Date(var2, 10, 6, 0, 0, 0),
    end: new Date(var2, 10, 10, 0, 0, 0)
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(var1, 0, 9, 0, 0, 0),
    end: new Date(var1, 0, 10, 0, 0, 0)
  },
  {
    id: 5,
    title: "Conference",
    color: "#e9967a",
    start: new Date(var1, 0, 11),
    end: new Date(var1, 0, 13),
    desc: "Big conference for important people"
  },
  {
    id: 6,
    title: "Meeting",
    color: "#8fbc8f",
    start: new Date(var1, 0, 12, 10, 30, 0, 0),
    end: new Date(var1, 0, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting"
  },
  {
    id: 7,
    title: "Lunch",
    color: "#cd5c5c",
    start: new Date(var1, 0, 12, 12, 0, 0, 0),
    end: new Date(var1, 0, 12, 10, 0, 0, 0),
    desc: "Power lunch"
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(var1, 0, 12, 14, 0, 0, 0),
    end: new Date(var1, 0, 12, 15, 0, 0, 0)
  },
  {
    id: 9,
    title: "Happy Hour",
    color: "#da70d6",
    start: new Date(var1, 0, 12, 17, 0, 0, 0),
    end: new Date(var1, 0, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day"
  },
  {
    id: 10,
    title: "Dinner",
    color: "#eee8aa",
    start: new Date(var1, 0, 12, 20, 0, 0, 0),
    end: new Date(var1, 0, 12, 21, 0, 0, 0)
  },
  {
    id: 11,
    title: "Birthday Party",
    color: "#98fb98",
    start: new Date(var1, 0, 10, 7, 0, 0),
    end: new Date(var1, 0, 10, 10, 30, 0)
  },
  {
    id: 12,
    title: "Late Night Event",
    color: "#afeeee",
    start: new Date(var1, 0, 17, 19, 30, 0),
    end: new Date(var1, 0, 18, 2, 0, 0)
  },
  {
    id: 13,
    title: "Late Same Night Event",
    color: "#db7093",
    start: new Date(var1, 0, 17, 19, 30, 0),
    end: new Date(var1, 0, 17, 20, 30, 0)
  },
  {
    id: 14,
    title: "Multi-day Event",
    color: "#cd853f",
    start: new Date(var1, 0, 20, 19, 30, 0),
    end: new Date(var1, 0, 22, 2, 0, 0)
  },
  {
    id: 15,
    title: "Today",
    color: "#b0e0e6",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  }
];
