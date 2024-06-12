import { useState, useEffect } from "react";
import Input from "./components/Input";
import SliderInput from "./components/SliderInput";
import "./styles.css";

const tenureOptions = [12, 24, 36, 48, 60];

const regexFunction = (num) => {
  if (num) {
    return num.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  }
  return num;
};

export default function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEmi = (updatedDp) => {
    if (!cost) return;
    const principal = cost - updatedDp;
    const roi = interest / 100;
    const noY = tenure / 12;
    const EMI = (principal * roi * (1 + roi) ** noY) / [(1 + roi) ** noY - 1];
    console.log(EMI);
    return Number(EMI / 12).toFixed(0);
  };

  const calculateDp = (updatedEmi) => {
    if (!cost) return;
    const downPaymentDecimal = 1 - updatedEmi / calculateEmi(0);
    return Number(downPaymentDecimal * cost).toFixed(0);
  };

  const updateEmi = (updatedDownPayment) => {
    if (!cost) return;
    const dp = Number(updatedDownPayment).toFixed(0);
    setDownPayment(dp);
    const updatedEmi = calculateEmi(dp);
    setEmi(updatedEmi);
  };

  const updateDownPayment = (updatedEmi) => {
    const ue = Number(updatedEmi).toFixed(0);
    setEmi(ue);
    const updatedDp = calculateDp(ue);
    setDownPayment(updatedDp);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [tenure, interest, cost]);

  return (
    <>
      <span className="appTitle">EMI Calculator</span>
      <Input title="Total Cost of Asset" data={cost} setData={setCost} />
      <Input
        title="Interest Rate (in %)"
        data={interest}
        setData={setInterest}
      />
      <Input title="Processing Fee (in %)" data={fee} setData={setFee} />
      <div className="flex-me">
        <div className="total-dp">Total Down Payment - </div>
        <div>
          {regexFunction(
            (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(
              0
            )
          )}
        </div>
      </div>
      <SliderInput
        title="Down Payment"
        data={downPayment}
        setData={updateEmi}
        min={0}
        max={cost}
        labelMin="0%"
        labelMax="100%"
      />
      <div className="flex-me">
        <div className="total-dp">Total Emi - </div>
        <div>{emi * 12}</div>
      </div>
      <SliderInput
        title="Loan per Month"
        data={emi}
        setData={updateDownPayment}
        min={calculateEmi(cost)}
        max={calculateEmi(0)}
        labelMin={calculateEmi(cost)}
        labelMax={calculateEmi(0)}
      />
      <div>
        <div className="title">Tenure</div>
        <div className="tenure-container">
          {tenureOptions.map((time) => {
            return (
              <button
                onClick={() => setTenure(time)}
                className={`tenure ${time === tenure ? "active" : ""}`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
