export function Card({ children }) {
    return <div className="border p-4 rounded-lg shadow">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div>{children}</div>;
  }
  