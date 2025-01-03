"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionTooltipProps {
  label: string,
  children: React.ReactNode,
  sideOffset?: number | 10,
  direction?: "top" | "right" | "bottom" | "left",
  align?: "start" | "center" | "end"
}

export const ActionTooltip = ({
  label, children, direction, sideOffset, align
}: ActionTooltipProps) => {
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{ children }</TooltipTrigger>
        <TooltipContent side={direction} align={align} sideOffset={sideOffset}>
          <p className="font-semibold text-sm capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )  
} 
