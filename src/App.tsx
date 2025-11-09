import { type ChangeEvent, useState } from "react";
import RateHeader from "./components/RateHeader";
import ConversionPanel from "./components/ConversionPanel";
import ManualRateCard from "./components/ManualRateCard";
import HistoryTable from "./components/HistoryTable";
import useLiveRate from "./hooks/useLiveRate";
import useManualRate from "./hooks/useManualRate";
import type { Currency, HistoryEntry } from "./types";
import { toDirectionalRate } from "./utils/rates";

const BASE_RATE = 1.1;
const RATE_VARIATION = 0.05;
const RATE_UPDATE_MS = 3000;
const MANUAL_DRIFT_LIMIT = 0.02;
const HISTORY_LIMIT = 5;

const formatInputValue = (value: number) => {
  if (!Number.isFinite(value)) {
    return "0";
  }
  return Number(value.toFixed(4)).toString();
};

function App() {
  const { realRate, rateDirection } = useLiveRate({
    baseRate: BASE_RATE,
    variation: RATE_VARIATION,
    interval: RATE_UPDATE_MS,
  });
  const [amount, setAmount] = useState("100");
  const [inputCurrency, setInputCurrency] = useState<Currency>("EUR");
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const {
    manualInput,
    manualActive,
    manualRate,
    manualBanner,
    manualMessageTone,
    manualRateDisplay,
    manualDiffPercent,
    handleManualInputChange,
    handleToggleManualRate,
  } = useManualRate({
    realRate,
    baseCurrency: inputCurrency,
    driftLimit: MANUAL_DRIFT_LIMIT,
    initialInput: "1.10",
  });

  const canonicalEffectiveRate =
    manualActive && manualRate ? manualRate : realRate;

  const numericAmount = parseFloat(amount);
  const isAmountValid = !Number.isNaN(numericAmount) && amount.trim() !== "";

  const convertedValue = !isAmountValid
    ? 0
    : inputCurrency === "EUR"
    ? numericAmount * canonicalEffectiveRate
    : canonicalEffectiveRate === 0
    ? 0
    : numericAmount / canonicalEffectiveRate;

  const outputCurrency: Currency = inputCurrency === "EUR" ? "USD" : "EUR";
  const displayRealRate = toDirectionalRate(realRate, inputCurrency);
  const displayEffectiveRate = toDirectionalRate(
    canonicalEffectiveRate,
    inputCurrency
  );

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(",", ".");
    if (rawValue === "") {
      setAmount("");
      return;
    }
    if (/^\d*\.?\d*$/.test(rawValue)) {
      setAmount(rawValue);
    }
  };

  const handleCurrencySwitch = (currency: Currency) => {
    if (currency === inputCurrency) {
      return;
    }
    setAmount(formatInputValue(convertedValue));
    setInputCurrency(currency);
  };

  const handleAddHistory = () => {
    if (!isAmountValid || numericAmount <= 0) {
      return;
    }
    setHistory((previous) => {
      const entry: HistoryEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        realRate,
        manualRate: manualActive && manualRate ? manualRate : null,
        inputAmount: numericAmount,
        inputCurrency,
        outputAmount: convertedValue,
        outputCurrency,
      };
      return [entry, ...previous].slice(0, HISTORY_LIMIT);
    });
  };

  const canAddHistory = isAmountValid && numericAmount > 0;

  return (
    <div className="min-h-screen bg-[#010617] text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10">
        <RateHeader
          rate={displayRealRate}
          direction={rateDirection}
          baseCurrency={inputCurrency}
          quoteCurrency={outputCurrency}
        />

        <section className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ConversionPanel
              amount={amount}
              inputCurrency={inputCurrency}
              outputCurrency={outputCurrency}
              convertedValue={convertedValue}
              effectiveRate={displayEffectiveRate}
              manualActive={manualActive}
              canAddHistory={canAddHistory}
              onAmountChange={handleAmountChange}
              onSelectCurrency={handleCurrencySwitch}
              onAddHistory={handleAddHistory}
            />
          </div>

          <div className="lg:col-span-2">
            <ManualRateCard
              manualInput={manualInput}
              manualActive={manualActive}
              manualBanner={manualBanner}
              manualBannerTone={manualMessageTone}
              manualRateDisplay={manualRateDisplay}
              manualDiffPercent={manualDiffPercent}
              baseCurrency={inputCurrency}
              quoteCurrency={outputCurrency}
              onManualInputChange={handleManualInputChange}
              onToggleManual={handleToggleManualRate}
            />
          </div>
        </section>

        <HistoryTable history={history} />
      </div>
    </div>
  );
}

export default App;
