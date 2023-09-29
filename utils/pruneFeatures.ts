import { FeatureItem } from "../types/FeatureItem";
/**
 * @param data Feature list
 * @description Removes duplicate features and reported non-existing features.
 */

const deprecatedFeatures: string[] = ["LTFR_P_MOTORCYKEL.2390318"];

const pruneFeatures = (data: FeatureItem[]) => {
  const modifiedData: FeatureItem[] = [];
  data.forEach((feature: FeatureItem) => {
    if (deprecatedFeatures.includes(feature.id)) {
      return;
    } else if (
      // If a feature with the same address doesn't exist in the new array or has name <Adress saknas> it's added to the array.
      !modifiedData.find(
        (item) => item.properties.ADDRESS === feature.properties.ADDRESS
      )
    ) {
      modifiedData.push(feature);
    } else if (feature.properties.ADDRESS === "<Adress saknas>") {
      modifiedData.push(feature);
    }
  });

  return modifiedData;
};

export { pruneFeatures };
