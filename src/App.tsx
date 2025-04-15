import { UnitValue } from "./components/widgets";

const App = () => {
  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100 font-Inter">
      <div className="w-96 bg-neutral-800 p-4 rounded-lg">
        <UnitValue />
        {/* <label className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <span className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer">
            -
          </span>

          <input
            type="number"
            className="w-full px-3 py-2 border-0 text-center focus:outline-none"
            defaultValue="0"
          />

          <span className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer">
            +
          </span>
        </label> */}
      </div>
    </div>
  );
};

export default App;
