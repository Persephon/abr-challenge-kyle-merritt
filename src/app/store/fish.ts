import { Instance, types } from "mobx-state-tree";
import { ImageData, IImageData } from './image';

export const Fish = types
    .model({
        id: types.identifierNumber,
        name: types.string,
        region: types.string,
        location: types.string,
        illustration: ImageData,
        healthBenefits: types.string,
        calories: types.maybeNull(types.number),
        fat: types.maybeNull(types.number),
        images: types.array(ImageData)
    })

export type IFish = Instance<typeof Fish>;