const state = {
  backgrounds: [],
  monsters: [],
  user: {},
  options: {
    volumeSounds: 1,
    volumeMusic:0.03
  },
  listening: [],
  score: 0,
  currentTask : {},
  currentAction: {},
  answer: false,
  gameStatus: false,
  nameBase: {},
  dictionary: {
    english: {},
    sortLetters: []
  },
  actionStatus: {
    hero: {
      position: {},
      currentAction: "pending",
      currentStatus: true
    },
    monster: {
      position: {},
      currentAction: "pending",
      currentStatus: true
    }
  }
};

const actionConfig = {
  monster: {
    default: {
      shadow: {
        scalePart: {
          value: 1,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        x: {
          value: 35,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 95,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      leftArm: {
        scalePart: {
          value: 1,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        x: {
          value: 65,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 90,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      head: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 15,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 20,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      rightArm: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 20,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 100,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 40,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      mouth: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 15,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 70,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      leftLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 55,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 130,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      rightLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 35,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 130,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      }
    }, // =================== PENDING ===================//
    pending: {
      shadow: {
        scalePart: {
          value: 3,
          min: 160,
          max: 168,
          step: 0.1,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.05,
          step: 0.005,
          direction: true
        },
        x: {
          value: 35,
          min: -3,
          max: 2,
          step: 0.1,
          direction: true
        },
        y: {
          value: 94,
          min: 3,
          max: -3,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 2,
          min: -5,
          max: 5,
          step: 1,
          direction: true
        }
      },
      leftArm: {
        x: {
          value: 65,
          min: 67,
          max: 64,
          step: 0.1,
          direction: true
        },
        y: {
          value: 100,
          min: 97,
          max: 103,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -7,
          max: 3,
          step: 0.8,
          direction: true
        }
      },
      head: {
        rotatePart: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.4,
          direction: true
        }
      },
      rightArm: {
        x: {
          value: 20,
          min: 18,
          max: 21,
          step: 0.1,
          direction: true
        },
        y: {
          value: 100,
          min: 98,
          max: 103,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 5,
          min: -3,
          max: 7,
          step: 0.5,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.03,
          step: 0.005,
          direction: true
        },
        x: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.1,
          direction: true
        }
      },
      mouth: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 5,
          step: 0.5,
          direction: true
        }
      }
    }, // ============================= GO =========================
    go: {
      shadow: {
        scalePart: {
          value: 3,
          min: 160,
          max: 168,
          step: 0.1,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.05,
          step: 0.005,
          direction: true
        },
        x: {
          value: 35,
          min: -7,
          max: 4,
          step: 0.5,
          direction: true
        },
        y: {
          value: 94,
          min: 3,
          max: -3,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 2,
          min: -5,
          max: 5,
          step: 1,
          direction: true
        }
      },
      leftArm: {
        x: {
          value: 65,
          min: 67,
          max: 64,
          step: 0.1,
          direction: true
        },
        y: {
          value: 100,
          min: 97,
          max: 103,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -35,
          max: 35,
          step: 5,
          direction: false
        }
      },
      head: {
        rotatePart: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.4,
          direction: true
        }
      },
      rightArm: {
        x: {
          value: 20,
          min: 18,
          max: 21,
          step: 0.1,
          direction: true
        },
        y: {
          value: 100,
          min: 98,
          max: 103,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 5,
          min: -35,
          max: 35,
          step: 5,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.03,
          step: 0.005,
          direction: true
        },
        x: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.1,
          direction: true
        }
      },
      mouth: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 5,
          step: 0.5,
          direction: true
        }
      },
      leftLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 55,
          min: 50,
          max: 58,
          step: 0.5,
          direction: false
        },
        y: {
          value: 130,
          min: 125,
          max: 135,
          step: 0.5,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -15,
          max: 15,
          step: 3,
          direction: true
        }
      },
      rightLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 35,
          min: 30,
          max: 42,
          step: 0.5,
          direction: true
        },
        y: {
          value: 130,
          min: 125,
          max: 133,
          step: 0.5,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -15,
          max: 15,
          step: 3,
          direction: true
        }
      }
    }, // ======================== Attack
    attackOne: {
      shadow: {
        scalePart: {
          value: 3,
          min: 160,
          max: 168,
          step: 0.1,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.05,
          step: 0.005,
          direction: true
        },
        x: {
          value: 35,
          min: -7,
          max: 4,
          step: 0.5,
          direction: true
        },
        y: {
          value: 94,
          min: 3,
          max: -3,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 2,
          min: -5,
          max: 5,
          step: 1,
          direction: true
        }
      },
      leftArm: {
        x: {
          value: 65,
          min: 67,
          max: 64,
          step: 0.1,
          direction: true
        },
        y: {
          value: 100,
          min: 97,
          max: 103,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 90,
          min: 87,
          max: 99,
          step: 3,
          direction: false
        }
      },
      head: {
        rotatePart: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.4,
          direction: true
        }
      },
      rightArm: {
        x: {
          value: 20,
          min: 18,
          max: 21,
          step: 0.1,
          direction: true
        },
        y: {
          value: 100,
          min: 98,
          max: 103,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 90,
          min: 84,
          max: 95,
          step: 3,
          direction: false
        }
      },
      eyes: {
        scalePart: {
          value: 1.1,
          min: 1,
          max: 1.03,
          step: 0.005,
          direction: true
        },
        x: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.1,
          direction: true
        }
      },
      mouth: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 5,
          step: 0.5,
          direction: true
        }
      },
      leftLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 55,
          min: 50,
          max: 58,
          step: 0.5,
          direction: false
        },
        y: {
          value: 130,
          min: 125,
          max: 135,
          step: 0.5,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -15,
          max: 15,
          step: 3,
          direction: true
        }
      },
      rightLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 35,
          min: 30,
          max: 42,
          step: 0.5,
          direction: true
        },
        y: {
          value: 130,
          min: 125,
          max: 133,
          step: 0.5,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -15,
          max: 15,
          step: 3,
          direction: true
        }
      }
    },
    // ============================= Monster get damage
    hit: {
      shadow: {
        scalePart: {
          value: 40,
          min: 35,
          max: 47,
          step: 1,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.05,
          step: 0.005,
          direction: true
        },
        x: {
          value: 35,
          min: -5,
          max: 5,
          step: 1,
          direction: true
        },
        y: {
          value: 94,
          min: 3,
          max: -3,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: -30,
          min: -28,
          max: -35,
          step: 1,
          direction: true
        }
      },
      leftArm: {
        x: {
          value: 65,
          min: 67,
          max: 64,
          step: 0.1,
          direction: true
        },
        y: {
          value: 100,
          min: 97,
          max: 103,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: -45,
          min: -43,
          max: -48,
          step: 0.8,
          direction: true
        }
      },
      head: {
        rotatePart: {
          value: 18,
          min: 27,
          max: 32,
          step: 1,
          direction: true
        }
      },
      rightArm: {
        x: {
          value: 20,
          min: 18,
          max: 21,
          step: 0.1,
          direction: true
        },
        y: {
          value: 100,
          min: 98,
          max: 103,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 180,
          min: 178,
          max: 183,
          step: 1.5,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.07,
          step: 0.01,
          direction: true
        },
        rotatePart: {
          value: 30,
          min: 28,
          max: 32,
          step: 1,
          direction: true
        },
        x: {
          value: -4,
          min: -5,
          max: 2,
          step: 0.1,
          direction: true
        }
      },
      mouth: {
        rotatePart: {
          value: 30,
          min: 28,
          max: 32,
          step: 1,
          direction: true
        },
        x: {
          value: 18,
          min: 16,
          max: 20,
          step: 1,
          direction: true
        }
      }
    },

  },

  // ========================= HERO ========================== //
  hero: {
    default: {
      shadow: {
        scalePart: {
          value: 1,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        x: {
          value: 35,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 95,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      leftArm: {
        scalePart: {
          value: 1,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        x: {
          value: 60,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 90,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      head: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 15,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 45,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      rightArm: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 27,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 90,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 30,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 37,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 68,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      mouth: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 55,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 92,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      leftLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 55,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 125,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      rightLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 35,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 130,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      },
      sword: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 83,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        y: {
          value: 20,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: 0,
          max: 0,
          step: 0,
          direction: true
        }
      }
    }, // =================== PENDING ===================//
    pending: {
      shadow: {
        scalePart: {
          value: 3,
          min: 160,
          max: 168,
          step: 0.1,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.05,
          step: 0.005,
          direction: true
        },
        x: {
          value: 35,
          min: -3,
          max: 2,
          step: 0.1,
          direction: true
        },
        y: {
          value: 95,
          min: 3,
          max: -3,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 2,
          min: -5,
          max: 5,
          step: 1,
          direction: true
        }
      },
      leftArm: {
        x: {
          value: 60,
          min: 58,
          max: 64,
          step: 0.1,
          direction: true
        },
        y: {
          value: 90,
          min: 88,
          max: 94,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -7,
          max: 3,
          step: 0.8,
          direction: true
        }
      },
      head: {
        rotatePart: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.4,
          direction: true
        }
      },
      rightArm: {
        x: {
          value: 27,
          min: 25,
          max: 29,
          step: 0.1,
          direction: true
        },
        y: {
          value: 90,
          min: 86,
          max: 95,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 5,
          min: -3,
          max: 7,
          step: 0.5,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.03,
          step: 0.005,
          direction: true
        },
        x: {
          value: 37,
          min: 35,
          max: 40,
          step: 0.1,
          direction: true
        }
      },
      mouth: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 5,
          step: 0.5,
          direction: true
        }
      },
      sword: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 10,
          step: 1,
          direction: true
        }
      }
    },  // =========================  Defending
    defend: {
      shadow: {
        scalePart: {
          value: 3,
          min: 160,
          max: 168,
          step: 0.1,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.1,
          step: 0.005,
          direction: true
        },
        x: {
          value: 35,
          min: -3,
          max: 2,
          step: 0.1,
          direction: true
        },
        y: {
          value: 95,
          min: 3,
          max: -3,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 2,
          min: -5,
          max: 5,
          step: 1,
          direction: true
        }
      },
      leftArm: {
        x: {
          value: 60,
          min: 58,
          max: 64,
          step: 0.1,
          direction: true
        },
        y: {
          value: 90,
          min: 88,
          max: 94,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -7,
          max: 3,
          step: 0.8,
          direction: true
        }
      },
      head: {
        rotatePart: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.4,
          direction: true
        }
      },
      rightArm: {
        x: {
          value: 37,
          min: 34,
          max: 40,
          step: 0.1,
          direction: true
        },
        y: {
          value: 110,
          min: 108,
          max: 112,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: -95,
          min: -93,
          max: -97,
          step: 0.5,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.1,
          step: 0.005,
          direction: true
        },
        x: {
          value: 37,
          min: 35,
          max: 40,
          step: 0.1,
          direction: true
        }
      },
      mouth: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 5,
          step: 0.5,
          direction: true
        }
      },
      sword: {
        rotatePart: {
          value: 160,
          min: 265,
          max: 275,
          step: 1,
          direction: true
        }
      }
    }, // ========================== hit
    hit: {
      shadow: {
        scalePart: {
          value: 3,
          min: 160,
          max: 168,
          step: 0.1,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.1,
          step: 0.005,
          direction: true
        },
        x: {
          value: 35,
          min: -3,
          max: 2,
          step: 0.1,
          direction: true
        },
        y: {
          value: 95,
          min: 3,
          max: -3,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 2,
          min: -5,
          max: 5,
          step: 1,
          direction: true
        }
      },
      leftArm: {
        x: {
          value: 60,
          min: 58,
          max: 64,
          step: 0.1,
          direction: true
        },
        y: {
          value: 90,
          min: 88,
          max: 94,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: -180,
          min: 175,
          max: 193,
          step: 0.8,
          direction: true
        }
      },
      head: {
        rotatePart: {
          value: 30,
          min: -2,
          max: 2,
          step: 0.4,
          direction: true
        }
      },
      rightArm: {
        x: {
          value: 37,
          min: 34,
          max: 40,
          step: 0.1,
          direction: true
        },
        y: {
          value: 110,
          min: 108,
          max: 112,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: -90,
          min: -175,
          max: -185,
          step: 1,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1.1,
          min: 1,
          max: 1.15,
          step: 0.05,
          direction: true
        },
        x: {
          value: 37,
          min: 35,
          max: 40,
          step: 0.1,
          direction: true
        }
      },
      mouth: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 5,
          step: 0.5,
          direction: true
        }
      },
      sword: {
        rotatePart: {
          value: 160,
          min: 265,
          max: 275,
          step: 1,
          direction: true
        }
      }
    }, 
    // ======================= GO ====================== //
    go: {
      shadow: {
        scalePart: {
          value: 3,
          min: 160,
          max: 168,
          step: 0.1,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.08,
          step: 0.01,
          direction: true
        },
        x: {
          value: 35,
          min: -3,
          max: 2,
          step: 0.1,
          direction: true
        },
        y: {
          value: 95,
          min: 3,
          max: -3,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 15,
          min: 5,
          max: 18,
          step: 1,
          direction: true
        }
      },
      leftArm: {
        x: {
          value: 60,
          min: 58,
          max: 64,
          step: 0.1,
          direction: true
        },
        y: {
          value: 90,
          min: 88,
          max: 94,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -7,
          max: 3,
          step: 0.8,
          direction: true
        }
      },
      head: {
        rotatePart: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.4,
          direction: true
        }
      },
      rightArm: {
        x: {
          value: 27,
          min: 25,
          max: 29,
          step: 0.1,
          direction: true
        },
        y: {
          value: 90,
          min: 86,
          max: 95,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 5,
          min: -35,
          max: 35,
          step: 5,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.03,
          step: 0.005,
          direction: true
        },
        x: {
          value: 37,
          min: 35,
          max: 40,
          step: 0.1,
          direction: true
        }
      },
      mouth: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 5,
          step: 0.5,
          direction: true
        }
      },
      sword: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 10,
          step: 1,
          direction: true
        }
      },
      leftLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 55,
          min: 53,
          max: 58,
          step: 1,
          direction: true
        },
        y: {
          value: 125,
          min: 123,
          max: 128,
          step: 1,
          direction: false
        },
        rotatePart: {
          value: 30,
          min: -30,
          max: 35,
          step: 5,
          direction: true
        }
      },
      rightLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 35,
          min: 32,
          max: 38,
          step: 1,
          direction: true
        },
        y: {
          value: 130,
          min: 128,
          max: 133,
          step: 1,
          direction: true
        },
        rotatePart: {
          value: -30,
          min: -30,
          max: 35,
          step: 5,
          direction: false
        }
      }
    }, // ======================= HERO ATTACK ONE
    attackOne: {
      shadow: {
        scalePart: {
          value: 3,
          min: 160,
          max: 168,
          step: 0.1,
          direction: true
        }
      },
      body: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.08,
          step: 0.01,
          direction: true
        },
        x: {
          value: 35,
          min: -3,
          max: 2,
          step: 0.1,
          direction: true
        },
        y: {
          value: 95,
          min: 3,
          max: -3,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 15,
          min: 5,
          max: 18,
          step: 1,
          direction: true
        }
      },
      leftArm: {
        x: {
          value: 60,
          min: 58,
          max: 64,
          step: 0.1,
          direction: true
        },
        y: {
          value: 90,
          min: 88,
          max: 94,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 0,
          min: -7,
          max: 3,
          step: 0.8,
          direction: true
        }
      },
      head: {
        rotatePart: {
          value: 0,
          min: -2,
          max: 2,
          step: 0.4,
          direction: true
        }
      },
      rightArm: {
        x: {
          value: 27,
          min: 25,
          max: 29,
          step: 0.1,
          direction: true
        },
        y: {
          value: 90,
          min: 86,
          max: 95,
          step: 0.1,
          direction: true
        },
        rotatePart: {
          value: 5,
          min: -35,
          max: 35,
          step: 5,
          direction: true
        }
      },
      eyes: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1.03,
          step: 0.005,
          direction: true
        },
        x: {
          value: 37,
          min: 35,
          max: 40,
          step: 0.1,
          direction: true
        }
      },
      mouth: {
        rotatePart: {
          value: 0,
          min: -10,
          max: 5,
          step: 0.5,
          direction: true
        }
      },
      sword: {
        rotatePart: {
          value: 70,
          min: 0,
          max: 350,
          step: 50,
          direction: true
        }
      },
      leftLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 55,
          min: 53,
          max: 58,
          step: 1,
          direction: true
        },
        y: {
          value: 125,
          min: 123,
          max: 128,
          step: 1,
          direction: false
        },
        rotatePart: {
          value: 30,
          min: -30,
          max: 35,
          step: 5,
          direction: true
        }
      },
      rightLeg: {
        scalePart: {
          value: 1,
          min: 1,
          max: 1,
          step: 0,
          direction: true
        },
        x: {
          value: 35,
          min: 32,
          max: 38,
          step: 1,
          direction: true
        },
        y: {
          value: 130,
          min: 128,
          max: 133,
          step: 1,
          direction: true
        },
        rotatePart: {
          value: -30,
          min: -30,
          max: 35,
          step: 5,
          direction: false
        }
      }
    }
  }
};

export {
  state,
  actionConfig
};