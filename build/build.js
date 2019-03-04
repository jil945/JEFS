import { KeepAwake, registerRootComponent } from "expo";
import App from "@/app";
import { Tasks } from "@/util/tasks";

// eslint-disable-next-line no-undef
if (__DEV__) {
    KeepAwake.activate();
}

Tasks.define();
registerRootComponent(App);