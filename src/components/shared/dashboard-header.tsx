import { LucideIcon } from "lucide-react";

interface DashboardPageHeaderProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const DashboardPageHeader = ({
  title,
  description,
  Icon,
}: DashboardPageHeaderProps) => {
  return (
    <div className="flex flex-col justify-between">
      <h1 className="text-xl font-semibold tracking-tight text-slate-900 flex itrems-center gap-1">
        <Icon className="h-6 w-6 mr-1 mt-px" /> {title}
      </h1>
      <p className="text-lg text-slate-800 -mt-1">{description}</p>
    </div>
  );
};

export default DashboardPageHeader;
