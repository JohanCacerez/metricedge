import ModelChange from "../components/ModelChange";

export default function MenuPage() {
  return (
    <div className="grid grid-cols-4 grid-rows-2">
      <div className="col-span-2 pr-2">
      <ModelChange />
      </div>
      <div className="col-span-2 pl-2">
      <ModelChange />
      </div>
    </div>
  );
}
