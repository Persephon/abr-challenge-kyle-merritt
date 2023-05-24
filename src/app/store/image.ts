import { Instance, types } from "mobx-state-tree";

export const ImageData = types
    .model({
        src: types.string,
        alt: types.string,
        title: types.string
    })

export type IImageData = Instance<typeof ImageData>;