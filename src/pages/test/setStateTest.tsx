import { useState } from "react";

const TestPage = () => {
  const [state, setState] = useState<string[] | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-slate-700 dark:text-slate-300">
      <div className="m-0 h-screen w-full p-0">
        <button onClick={() => setState((prev) => [...(prev ?? []), "test"])}>
          setState
        </button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TestPage;
