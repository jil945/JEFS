import React from "react";
import { Location, TaskManager, Permissions, Pedometer } from "expo";
import http from "./http";
import DB from "./db";

const LocationTask = {
    name: "@JEFS:LocationTask",
    async init() {
        if (await Location.hasServicesEnabledAsync()) {
            
            try {
                await Permissions.askAsync(Permissions.LOCATION);
                Location.startLocationUpdatesAsync(this.name, { accuracy: Location.Accuracy.Balanced, distanceInterval: 5 });
            } catch(e) {
                console.log(e);
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
            this.handleTask({ steps });

            Pedometer.watchStepCount(({steps}) => {
                this.handleTask({ steps });
            });
        }
    },

    async storeSteps(date, steps) {
        await DB.insert(date, { stepcount: steps });
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
            
            // store steps in local storage
            this.storeSteps(now, this.count);
        }
    },

    /**
     * 
     * @param {Date} currDate 
     */
    async getWeeklySteps(currDate) {
        let weeklySteps = Array(7).fill({
            steps: 0
        });

        if (await Pedometer.isAvailableAsync()) {
            await Promise.all(weeklySteps.map((_, idx) => {

                let day = new Date(currDate);
                day.setDate(day.getDate() - idx);
                return this.getSteps(day)
                    .then(steps => {
                        weeklySteps[idx] = { steps, day };
                    });
            }));
        }
        return weeklySteps;
    },

    async getSteps(currDate) {
        // Check local DB first
        let localDB = await DB.query(currDate);
        if (localDB && localDB.stepcount) {
            return localDB.stepcount;
        }

        let end = new Date(currDate);
        end.setHours(23, 59, 59, 999);
        let start = new Date(end);
        start.setDate(start.getDate() - 1);

        try {
            let { steps } = await Pedometer.getStepCountAsync(start, end);
            await this.storeSteps(currDate, steps);
            return steps;
        } catch(e) {}
        return 0;
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