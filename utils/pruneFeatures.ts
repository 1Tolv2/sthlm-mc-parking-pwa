import { FeatureItem } from "../types/FeatureItem";
/**
 * @param data Feature list
 * @description Removes duplicate features and reported non-existing features.
 */
const pruneFeatures = (data: FeatureItem[]) => {
  console.log("Begin pruning features", data.length);
  const modifiedData: FeatureItem[] = [];

  data.forEach((feature: any) => {
    // If a feature with the same address doesn't exist in the new array or has name <Adress saknas> it's added to the array.
    if (
      !modifiedData.find(
        (item) => item.properties.ADDRESS === feature.properties.ADDRESS
      )
    ) {
      modifiedData.push(feature);
    } else if (feature.properties.ADDRESS === "<Adress saknas>") {
      modifiedData.push(feature);
    }
  });

  console.log("Pruning finished", modifiedData.length);

  return modifiedData;
};

export { pruneFeatures };
