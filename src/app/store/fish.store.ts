import { types, Instance } from 'mobx-state-tree';
import { Fish, IFish } from './fish';
import { AppRoute } from './route';

export const FishStore = types
  .model({
    fishes: types.array(Fish),
    route: AppRoute
  })
  .views((self) => {
    function roundToHundredths(value: number): number {
      return Math.round(value * 100) / 100;
    }

    function getAverageCaloriesByRegionName(regionName: string) {
      return roundToHundredths(
        self.fishes
          .filter((fish) => fish.region === regionName && fish.calories != null)
          .reduce((total, fish) => total + fish.calories!, 0) /
          self.fishes.filter(
            (fish) => fish.region === regionName && fish.calories != null
          ).length
      );
    }

    function getAverageFatByRegionName(regionName: string) {
      return roundToHundredths(
        self.fishes
          .filter((fish) => fish.region === regionName && fish.fat != null)
          .reduce((total, fish) => total + fish.fat!, 0) /
          self.fishes.filter(
            (fish) => fish.region === regionName && fish.fat != null
          ).length
      );
    }

    function getRegions(): Array<IRegionInfo> {
      const regionsNames = self.fishes
        .map((fish) => fish.region)
        .filter((region, i, array) => {
          return array.indexOf(region) === i;
        });

      return regionsNames.map((name, id) => ({
        id,
        name,
        averageCalories: getAverageCaloriesByRegionName(name),
        averageFat: getAverageFatByRegionName(name),
      }));
    }

    return {
      get regions(): Array<IRegionInfo> {
        return getRegions();
      },
      getRegionById(id: number): IRegionInfo | undefined {
        return getRegions().find((region) => id === region.id);
      },
      get currentRegion(): IRegionInfo {
        return getRegions().find((region) => parseInt(self.route.parameter ?? '0') === region.id) ?? getRegions()[0];
      },
      getFishesByRegionName(regionName: string): Array<IFish> {
        return self.fishes.filter((fish) => fish.region === regionName);
      },
    };
  })
  .actions((self) => ({
    addFishes(fishesData: Array<any>) {
      fishesData.forEach((fishData) => {
        self.fishes.push(<IFish>{
          id:
            self.fishes.reduce((maxId, fish) => Math.max(fish.id, maxId), -1) +
            1,
          region: fishData.NOAAFisheriesRegion
            ? fishData.NOAAFisheriesRegion
            : '',
          calories: fishData.Calories ? parseFloat(fishData.Calories) : null,
          fat: fishData.FatTotal ? parseFloat(fishData.FatTotal) : null,
          name: fishData.SpeciesName ? fishData.SpeciesName : '',
          illustration: fishData.SpeciesIllustrationPhoto ? fishData.SpeciesIllustrationPhoto : '',
          images:
            fishData.ImageGallery &&
            typeof fishData.ImageGallery[Symbol.iterator] === 'function'
              ? [...fishData.ImageGallery]
              : [],
          healthBenefits: fishData.HealthBenefits
            ? fishData.HealthBenefits
            : '',
          location: fishData.Location
            ? fishData.Location
            : '',
        });
      });
    },
  }));

export type IFishStore = Instance<typeof FishStore>;
export interface IRegionInfo {
  name: string;
  id: number;
  averageCalories: number;
  averageFat: number;
}
