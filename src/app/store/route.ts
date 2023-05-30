import { Instance, types } from "mobx-state-tree";

export const AppRoute = types
    .model({
        name: types.string,
        parameter: types.maybeNull(types.string),
    })
    .actions((self) => ({
        setRoute(path: string) {
            self.name = path.split("/")[1] ?? "home";
            self.parameter = path.split("/")[2] ?? null;
        },
    }));

export type IAppRoute = Instance<typeof AppRoute>;
