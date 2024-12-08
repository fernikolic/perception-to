import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export function TeamMember({ name, role, image, bio }: TeamMemberProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <h3 className="mt-4 text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
        <p className="mt-2 text-sm leading-6">{bio}</p>
      </CardContent>
    </Card>
  );
}