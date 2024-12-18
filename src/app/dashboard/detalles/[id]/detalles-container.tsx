import DescriptionWork from "@/components/views/description-work";
import MapDrawingPolygon from "@/components/views/map-drawing-polygon";

interface Obra {
    id: string;
    cui: string;
    name: string;
    points: number[][];
    areaOrLength: string | null;
    resident: string;
    projectType: string;
}

const DetallesContainer: React.FC<{ obra: Obra }> = ({ obra }) => {

    const mapDetails = {
        id: obra.id,
        points: obra.points,
        projectType: obra.projectType,
    };

    const descriptionDetails = {
        id: obra.id,
        cui: obra.cui,
        name: obra.name,
        areaOrLength: obra.areaOrLength,
        resident: obra.resident,
        projectType: obra.projectType,
    };

    return (
        <div className="grid grid-rows-[1fr_1fr] h-full gap-y-4">
            <div className="rounded-3xl overflow-hidden">
                <MapDrawingPolygon obra={mapDetails} />
            </div>
            <div className="rounded-3xl overflow-hidden">
                <DescriptionWork obra={descriptionDetails} />
            </div>
        </div>

    );
};

export default DetallesContainer;
