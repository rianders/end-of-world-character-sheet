// src/presets/BobPreset.js

const BobPreset = {
  id: "bob-preset-123456",
  name: "Bob",
  physical: {
    dexterity: 4,
    vitality: 5,
    features: [
      "Expert hunter",
      "Wilderness navigation",
      "Strong from mountain living",
      "Skilled with hunting rifle",
      "Weather-resistant",
      "Hand-to-hand combat"
    ],
    stressResistance: [true, true, true, false, false, false, false, false, false]
  },
  mental: {
    logic: 3,
    willpower: 4,
    features: [
      "Survival expertise",
      "Mechanical know-how",
      "Self-reliant thinking",
      "Limited modern tech knowledge",
      "Practical problem solver",
      "Good memory for terrain"
    ],
    stressResistance: [true, true, false, false, false, false, false, false, false]
  },
  social: {
    charisma: 2,
    empathy: 3,
    features: [
      "Straightforward communicator",
      "Loyal to friends",
      "Uncomfortable in crowds",
      "Distrusts authority",
      "Quiet but observant",
      "Values honesty above politeness"
    ],
    stressResistance: [true, false, false, false, false, false, false, false, false]
  },
  traumas: [
    { description: "Surviving the wild 80s", severity: "1M" },
    { description: "Culture shock from modern world", severity: "1W" },
    { description: "Lost hunting partner in accident", severity: "1D" },
    { description: "", severity: "" },
    { description: "", severity: "" },
    { description: "", severity: "" },
    { description: "", severity: "" },
    { description: "", severity: "" },
    { description: "", severity: "" }
  ],
  equipment: [
    "Hunting rifle (well-maintained)",
    "Hunting knife",
    "Topographic maps of Colorado",
    "Worn leather jacket",
    "Survival kit",
    "Waterproof matches",
    "Cabin deed",
    "Old truck keys",
    "Fishing gear",
    "Shortwave radio",
    "First aid kit",
    "Trapping equipment",
    "Winter boots",
    "Compass",
    "Family photo"
  ],
  notes: "Bob is a mountain man from Rifle, Colorado. He has excellent survival skills but struggles with modern technology and social situations. His physical prowess is his strongest asset, with exceptional vitality and good dexterity. Bob's cabin in the mountains serves as his sanctuary from a world that changed too fast for his liking."
};

export default BobPreset;
