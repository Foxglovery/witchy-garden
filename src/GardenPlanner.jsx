import { useState } from "react";
import { SketchPicker } from "react-color";

const bedSizes = [
  { label: "2x2", width: 2, height: 2 },
  { label: "3x3", width: 3, height: 3 },
  { label: "4x4", width: 4, height: 4 },
  { label: "5x5", width: 5, height: 5 },
  { label: "6x6", width: 6, height: 6 },
  { label: "7x7", width: 7, height: 7 },
  { label: "10x10", width: 10, height: 10 }
];

const containerSizes = [1, 2, 3, 4]; // in feet or units

export default function GardenPlanner() {
  const [elements, setElements] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [plantName, setPlantName] = useState("");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [placing, setPlacing] = useState(false);

  const handleCanvasClick = (e) => {
    if (!placing || !selectedShape) return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements((prev) => [
      ...prev,
      {
        ...selectedShape,
        x,
        y,
        plantName,
        outlineColor,
        id: Date.now(),
      },
    ]);

    setPlacing(false);
    setSelectedShape(null);
    setPlantName("");
    setOutlineColor("#000000");
  };

  return (
    <div className="w-screen h-screen bg-cover p-4" style={{ backgroundImage: "url('/grove.jpg')" }}>
      <div className="mb-4 bg-white/80 p-2 rounded-xl shadow-md">
        <h1 className="text-xl font-bold mb-2">Witchy Garden Planner</h1>

        <div className="flex gap-2 mb-2">
          {bedSizes.map((bed) => (
            <button
              key={bed.label}
              className="bg-green-200 px-2 py-1 rounded"
              onClick={() => {
                setSelectedShape({ type: "rect", ...bed });
                setPlacing(true);
              }}
            >
              {bed.label}
            </button>
          ))}

          {containerSizes.map((diameter) => (
            <button
              key={diameter}
              className="bg-blue-200 px-2 py-1 rounded"
              onClick={() => {
                setSelectedShape({ type: "circle", diameter });
                setPlacing(true);
              }}
            >
              {diameter}ft Ø
            </button>
          ))}
        </div>

        {placing && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Plant Name"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              className="p-1 border rounded w-full"
            />
            <SketchPicker
              color={outlineColor}
              onChangeComplete={(color) => setOutlineColor(color.hex)}
            />
            <p className="text-sm italic text-gray-700">
              Tap the grove to place your {selectedShape.type === 'rect' ? `${selectedShape.width}x${selectedShape.height}` : `${selectedShape.diameter}ft container`}.
            </p>
          </div>
        )}
      </div>

      <div
        className="w-full h-[85%] relative border border-black rounded-xl overflow-hidden"
        onClick={handleCanvasClick}
      >
        {elements.map((el) => (
          <div
            key={el.id}
            className="absolute flex items-center justify-center text-xs font-bold"
            style={{
              top: el.y,
              left: el.x,
              width: el.type === "rect" ? el.width * 20 : el.diameter * 20,
              height: el.type === "rect" ? el.height * 20 : el.diameter * 20,
              border: `2px solid ${el.outlineColor}`,
              borderRadius: el.type === "circle" ? "9999px" : "0",
              backgroundColor: "rgba(255,255,255,0.4)",
              transform: "translate(-50%, -50%)",
            }}
          >
            {el.plantName}
          </div>
        ))}
      </div>
    </div>
  );
}
