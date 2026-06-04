 import { features } from "../../data/feature";
import { gridCellBorderClasses } from "../../utils/gridCellBorderClasses";
import FeatureGridItem from "./feature-grid-item";

export default function FeatureGridContainer() {
  const columns2 = 2;
  const columns3 = 3;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureGridItem
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={<feature.icon />}
          outlineIcon={<feature.outlineIcon className=" text-white" />}
          className={gridCellBorderClasses(index, columns2, columns3, true)}
        />
      ))}
    </div>
  );
}