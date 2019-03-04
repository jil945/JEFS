import React from "react";
import { Location, TaskManager, Permissions, Pedometer } from "expo";
import http from "./http";

const LocationTask = {
    name: "@JEFS:LocationTask",
    async init() {
        if (await Location.hasServicesEnabledAsync()) {
            
            try {
                await Permissions.askAsync(Permissions.LOCATION);
                Location.startLocationUpdatesAsync(this.name, { accuracy: Location.Accuracy.Balanced, distanceInterval: 5 });
            } catch(e) {
                console.log(this.name);
            }
        }

    },

    handleTask({ data, error }) {
        if (!error) {
            data.locations.forEach(loc => {
                let body = Object.keys(loc.coords).reduce((a, c) => {
                    a[c] = loc.coords[c];
                    return a;
                }, {
                    timestamp: loc.timestamp
                });

                http.put("storage/location", body)
                    .catch(console.log); // no-op 
            });
        }
    }
};

const PedometerTask = {
    name: "@JEFS:PedometerTask",
    count: 0,
    lastUpdate: null,
    async init() {
        if (await Pedometer.isAvailableAsync()) {
            let end = new Date();
            let start = new Date();
            start.setHours(0, 0, 0, 0);
            let { steps } = await Pedometer.getStepCountAsync(start, end);
            this.count = steps;

            Pedometer.watchStepCount(({steps}) => {
                this.handleTask({ steps });
            });
        }
    },

    handleTask({ steps }) {
        this.count += steps;
        let now = new Date();

        if (!this.lastUpdate || this.lastUpdate < now) {
            let body = {
                count: this.count,
            };
            http.put("storage/stepcount", body)
                .then(resp => {
                    now.setMinutes(now.getMinutes() + 5); // set interval to be 5 min
                    this.lastUpdate = now;
                })
                .catch(console.log); // no-op
            
        }
    }
};

const Tasks = {
    define() {
        TaskManager.defineTask(LocationTask.name, LocationTask.handleTask);
    },
    init() {
        return Promise.all([
            LocationTask.init(),
            PedometerTask.init()
        ]);
    }
};

export { Tasks, LocationTask, PedometerTask };