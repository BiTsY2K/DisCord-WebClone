import { Hash } from "lucide-react";
import { UserAvatar } from "../UserAvatar";

type ChatWelcomeProps = {
  name: string;
  type: "CHANNEL" | "CONVERSATION";
};

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="flex flex-col flex-auto grow-0 shrink-0 justify-end m-4">
      {type === "CHANNEL" && (
        <div className="flex items-center justify-center w-[4.25rem] h-[4.25rem] mt-4 rounded-full bg-[#6d6f78] dark:bg-[#41434a]">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      {type === "CONVERSATION" && (
        <UserAvatar srcURL="" alt={""} className="h-20 w-20" />
      )}

      <h3 className="text-xl md:text-[2rem] leading-[1.25] font-bold my-2 text-[#313338] dark:text-[#dbdee1]">
        {type === "CHANNEL" ? `Welcome to #${name}!` : name}
      </h3>

      <div className="text-base leading-[1.25] font-normal text-[#4e5058] dark:text-[#b5bac1]">
        {type === "CHANNEL"
          ? `This is the start of #${name} channel.`
          : `This is the beginning of your direct message history with ${(
              <strong>{name}</strong>
            )}.`}
      </div>
    </div>
  );
};
