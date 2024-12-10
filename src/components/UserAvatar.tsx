import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  alt: string;
  srcURL?: string;
  className?: string;
};

export const UserAvatar = ({ alt, srcURL, className}: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-9 w-9", className)}>
      <AvatarImage src={srcURL} alt={alt}/>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};