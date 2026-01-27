import { LucideIcon } from "lucide-react";

interface SpecBadgeProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const SpecBadge = ({ icon: Icon, label, value }: SpecBadgeProps) => {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 border border-border">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="text-muted-foreground text-xs uppercase tracking-wider">{label}</span>
      <span className="text-foreground font-semibold">{value}</span>
    </div>
  );
};

export default SpecBadge;
