import { Card } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </Card>
  );
}