import { MoonLoader } from "react-spinners";

function Spinner() {
  return (
    <div>
      <MoonLoader
        size={40}
        className="spinner"
        color="oklch(44.3% 0.11 240.79)"
      />
    </div>
  );
}

export default Spinner;
