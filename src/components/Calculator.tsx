
import { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Operation = '+' | '-' | '×' | '÷' | null;

interface HistoryItem {
  calculation: string;
  result: string;
  timestamp: Date;
}

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: Operation) => {
    const current = parseFloat(display);
    if (firstNumber === null) {
      setFirstNumber(current);
    } else if (operation) {
      const result = calculate(firstNumber, current, operation);
      setFirstNumber(result);
      setDisplay(result.toString());
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (first: number, second: number, op: Operation): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return second !== 0 ? first / second : 0;
      default: return second;
    }
  };

  const handleEquals = () => {
    if (firstNumber === null || operation === null) return;
    
    const secondNumber = parseFloat(display);
    const result = calculate(firstNumber, secondNumber, operation);
    const calculation = `${firstNumber} ${operation} ${secondNumber}`;
    
    setHistory(prev => [{
      calculation,
      result: result.toString(),
      timestamp: new Date()
    }, ...prev.slice(0, 4)]);
    
    setDisplay(result.toString());
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ children, onClick, className }: { 
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "calculator-button h-16 text-lg font-medium rounded-2xl bg-white/10 backdrop-blur-sm",
        "border border-white/20 shadow-lg",
        "active:shadow-sm transition-all duration-200",
        className
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="calculator w-full max-w-md space-y-8">
        <div className="flex items-center justify-center space-x-2 text-white/90">
          <CalculatorIcon className="w-6 h-6" />
          <h1 className="text-xl font-medium">Calculator</h1>
        </div>

        <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-6 space-y-6 shadow-xl border border-white/10">
          <div className="calculator-display h-24 flex flex-col items-end justify-center p-4 rounded-2xl bg-black/20 border border-white/10">
            <div className="text-white/60 text-sm h-6">
              {firstNumber !== null && `${firstNumber} ${operation}`}
            </div>
            <div className="text-white text-4xl font-light">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button onClick={handleClear} className="text-red-400">AC</Button>
            <Button onClick={handleDelete} className="text-red-400">DEL</Button>
            <Button onClick={() => handleOperation('÷')} className="text-blue-400">÷</Button>
            <Button onClick={() => handleOperation('×')} className="text-blue-400">×</Button>
            
            {[7, 8, 9].map(num => (
              <Button key={num} onClick={() => handleNumber(num.toString())} className="text-white">
                {num}
              </Button>
            ))}
            <Button onClick={() => handleOperation('-')} className="text-blue-400">-</Button>
            
            {[4, 5, 6].map(num => (
              <Button key={num} onClick={() => handleNumber(num.toString())} className="text-white">
                {num}
              </Button>
            ))}
            <Button onClick={() => handleOperation('+')} className="text-blue-400">+</Button>
            
            {[1, 2, 3].map(num => (
              <Button key={num} onClick={() => handleNumber(num.toString())} className="text-white">
                {num}
              </Button>
            ))}
            <Button onClick={handleEquals} className="row-span-2 bg-blue-500/20 text-blue-400">=</Button>
            
            <Button onClick={() => handleNumber('0')} className="col-span-2 text-white">0</Button>
            <Button onClick={() => handleNumber('.')} className="text-white">.</Button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h2 className="text-white/90 text-sm font-medium mb-4">History</h2>
            <div className="space-y-3">
              {history.map((item, index) => (
                <div 
                  key={index} 
                  className="history-item flex justify-between text-sm p-2 rounded-lg bg-white/5 border border-white/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-white/70">{item.calculation} =</span>
                  <span className="text-white font-medium">{item.result}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
