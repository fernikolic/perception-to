import { Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    details: 'support@perception.dev',
    description: 'Our team typically responds within 2 hours',
  }
];

export function ContactPage() {
  return (
    <div className="grid gap-4">
      {contactInfo.map((info) => (
        <Card key={info.title}>
          <CardContent className="flex items-center gap-4 p-6">
            <info.icon className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">{info.title}</h3>
              <p className="text-lg">{info.details}</p>
              <p className="text-sm text-muted-foreground">{info.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}