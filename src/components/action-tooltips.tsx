"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface ActionTooltipProps {
  label: string,
  children: React.ReactNode,
  sideOffset?: number | 10,
  side?: "top" | "right" | "bottom" | "left",
  align?: "start" | "center" | "end"
}
export const ActionTooltip = ({
  label, children, side, sideOffset, align
}: ActionTooltipProps) => {
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{ children }</TooltipTrigger>
        <TooltipContent side={side} align={align} sideOffset={sideOffset}>
          <p className="font-semibold text-sm capitalize">{label.toLowerCase()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )  
} 