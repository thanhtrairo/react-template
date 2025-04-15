import { useRef, useState } from "react";
import { Minus, Plus } from "../icons";

type Unit = "%" | "px";

const MAX_VALUE = 100;
const MIN_VALUE = 0;
const DEFAULT_VALUE = 0;

export const UnitValue: React.FC = () => {
  const [unit, setUnit] = useState<Unit>("%");
  const [value, setValue] = useState<string>("0");
  const [lastValidValue, setLastValidValue] = useState<number>(0);
  const [isHoveredInput, setIsHoveredInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const parsedValue: number = parseFloat(value) || DEFAULT_VALUE;
  const isDecrementDisabled: boolean = parsedValue <= 0;
  const isIncrementDisabled: boolean = unit === "%" && parsedValue >= MAX_VALUE;

  const cleanInput = (input: string): string => {
    input = input.replace(",", ".");
    if (input.startsWith("-")) {
      const rest = input.slice(1).replace(/[^0-9.]/g, "");
      input = "-" + rest;
    } else {
      input = input.replace(/[^0-9.]/g, "");
    }
    const parts = input.split(".");
    if (parts.length > 2) {
      input = parts[0] + "." + parts.slice(1).join("");
    }
    return input;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const cleanedValue = cleanInput(e.target.value);
    setValue(cleanedValue);
  };

  const handleBlur = (): void => {
    let parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      parsedValue = lastValidValue;
    } else {
      if (parsedValue < MIN_VALUE) {
        parsedValue = DEFAULT_VALUE;
      } else if (unit === "%" && parsedValue > MAX_VALUE) {
        parsedValue = lastValidValue;
      }
      setLastValidValue(parsedValue);
    }
    setValue(parsedValue.toString());
  };

  const handleUnitChange = (newUnit: Unit): void => {
    setUnit(newUnit);
    let parsedValue = parseFloat(value) || DEFAULT_VALUE;
    if (newUnit === "%" && parsedValue > MAX_VALUE) {
      parsedValue = MAX_VALUE;
      setValue(parsedValue.toString());
      setLastValidValue(parsedValue);
    }
  };

  const handleDecrement = (): void => {
    let parsedValue = parseFloat(value) || DEFAULT_VALUE;
    parsedValue = Math.max(0, parsedValue - 1);
    setValue(parsedValue.toString());
    setLastValidValue(parsedValue);
  };

  const handleIncrement = (): void => {
    let parsedValue = parseFloat(value) || DEFAULT_VALUE;
    if (unit === "%" && parsedValue >= MAX_VALUE) return;
    parsedValue += 1;
    setValue(parsedValue.toString());
    setLastValidValue(parsedValue);
  };

  const handleContainerClick = () => {
    inputRef?.current?.focus();
  };

  return (
    <div className="bg-primary p-4 text-xs text-fifth max-w-max">
      <div className="flex gap-2 items-center mb-4">
        <div className="text-second text-sm mb-2 w-[100px]">Unit</div>
        <div className="flex gap-0.5 rounded-lg bg-third w-[140px] justify-center h-9 items-center">
          <button
            className={`rounded-md w-[67px] h-8 ${
              unit === "%" ? "bg-fourth" : "bg-transparent text-second"
            } hover:bg-fourth`}
            onClick={() => handleUnitChange("%")}
          >
            %
          </button>
          <button
            className={`w-[67px] h-8 rounded-md ${
              unit === "px" ? "bg-fourth" : "bg-transparent text-second"
            } hover:bg-fourth`}
            onClick={() => handleUnitChange("px")}
          >
            px
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="text-second text-sm w-[100px]">Value</div>
        <div
          className={`overflow-hidden flex items-center gap-2 w-[140px] h-9 rounded-lg group focus-within:border focus-within:border-solid focus-within:border-seventh ${
            isHoveredInput ? "bg-sixth" : "bg-third"
          }`}
          onClick={handleContainerClick}
        >
          <button
            className={`shrink-0 w-9 h-9 rounded-bl-[3px] rounded-tl-[3px] flex items-center justify-center ${
              !isDecrementDisabled && "hover:bg-sixth"
            }`}
            onClick={handleDecrement}
            disabled={isDecrementDisabled}
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <Minus height={1.5} />
            </span>
          </button>
          <input
            ref={inputRef}
            type="text"
            className="text-center p-2 focus:outline-none w-full"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onMouseEnter={() => setIsHoveredInput(true)}
            onMouseLeave={() => setIsHoveredInput(false)}
          />
          <button
            className={`w-9 h-9 shrink-0 rounded-br-[3px] rounded-tr-[3px] flex items-center justify-center ${
              !isIncrementDisabled && "hover:bg-sixth"
            }`}
            onClick={handleIncrement}
            disabled={isIncrementDisabled}
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <Plus />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
