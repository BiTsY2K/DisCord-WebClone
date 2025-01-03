import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { IconType } from "react-icons/lib"

interface ChannelItemProps {
  ChannelIcon: IconType,
  name: string
}

export const PrivateChannelListItem = ({
  ChannelIcon, name
} : ChannelItemProps) => {
  const router = useRouter();
  return (
    <div className="channel-item relative max-w-56 py-0.5 ml-2 rounded-sm">
      <Button
        className={cn(
          "group flex items-center justify-start shadow-none h-11 px-2 py-0 w-full rounded bg-transparent",
          "text-[#5c5e66] hover:text-[#313338] hover:bg-[#dfe0e3] dark:hover:bg-[#383a40]",
          // params?.channelId === channel.id &&
          //   "bg-[#d7d8dd] hover:bg-[#d7d8dd] dark:bg-[#3f4248] dark:hover:bg-[#3f4248] dark:text-white"
        )}
        onClick={() => router.push(`/`)}
      >
        <div className="avatar flex items-center justify-center w-9 h-9">
          <ChannelIcon className="min-h-6 min-w-6" />
        </div>

        <div className="content min-w-0 flex-auto text-ellipsis whitespace-nowrap overflow-hidden">
          <div className="name&decorator flex justify-start items-center">
            <div className="name text-base leading-5 font-medium text-ellipsis whitespace-normal overflow-hidden flex-initial">
              {name}
            </div>
          </div>
          {/* SubText */}
          {/* <div className="subText -mt-0.5 text-ellipsis whitespace-nowrap overflow-hidden ">
            <div className="flex items-start text-xs font-medium leading-4 min-w-0 text-ellipsis whitespace-nowrap overflow-hidden">
              <div className="activity_text text-ellipsis whitespace-nowrap overflow-hidden flex-initial">
                Glad 2025 is not a leap year 2025 is not a leap year
              </div>
            </div>
          </div> */}
        </div>
      </Button>
    </div>
  )
}