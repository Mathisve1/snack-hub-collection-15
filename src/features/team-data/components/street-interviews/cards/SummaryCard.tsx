
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  children: ReactNode;
};

const SummaryCard = ({ title, icon: Icon, iconColor, children }: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
