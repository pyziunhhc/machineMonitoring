const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const MachineStatusesSchema = new Schema({
    machineName: {
        type: String,
        require: true
    },
    dateFrom: {
        type: Date,
        require: true,
        unique: true,
    },
    dateTo: {
        type: Date,
        require: true,
        unique: true,
    },
    statuses: {
        forDygraphChart: {
            type: Array,
        },
        forPercentageChartJS: {
            type: Array
        },
        forTimeValuesChartJS: {
            type: Array,
        },
        totalStatuses: {
            erodowanie: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            szlifowanie: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            praca: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            disconnect: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            manual: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            warmup: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            stop: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            suspend: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            alarm: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            rozgrzewka: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            wymiana_sciernicy: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            wymiana_narzedzia: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            przejscie: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
            zatrzymanie: {
                name: {
                    type: String
                },
                displayName: {
                    type: String
                },
                data: {
                    time: {
                        type: Number
                    },
                    feed: {
                        type: Number
                    },
                    avarageFeed: {
                        type: Number
                    },
                    potentiometr: {
                        type: Number
                    },
                    percentage: {
                        type: Number
                    },
                }
            },
        }
    }
})

const MachineSchema = new Schema({
    machineName: {
        type: String,
        required: true,
        unique: true
    },
    machineType: {
        type: String,
        required: true
    }
})
const Machine = mongoose.model('Machine', MachineSchema)
const MachineStatuses = mongoose.model('MachineStatuses', MachineStatusesSchema)
module.exports = {
    MachineStatuses,
    Machine
}