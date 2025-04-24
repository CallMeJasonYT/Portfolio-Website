import type { ReactElement, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SimpleTooltipProps = {
  content?: string | ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  children: ReactNode;
};

const SimpleTooltip = ({
  content,
  side = "bottom",
  children,
}: SimpleTooltipProps): ReactElement =>
  content ? (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="bg-muted text-white" side={side}>
        {content}
      </TooltipContent>
    </Tooltip>
  ) : (
    <>{children}</>
  );

export default SimpleTooltip;
