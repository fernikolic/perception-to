import { TestimonialCard } from './testimonial-card';

const testimonials = [
  {
    content: "This platform helped me uncover trends that shaped some of my most-read articles. A must-have for crypto journalists.",
    author: {
      name: "Sarah Chen",
      role: "Senior Crypto Reporter",
      company: "CryptoNews Daily",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      tweetUrl: "https://twitter.com/sarahchen/status/1234567890"
    }
  },
  {
    content: "The data visualization tools have transformed how I present complex crypto concepts to my audience.",
    author: {
      name: "Michael Torres",
      role: "Content Creator",
      company: "Crypto Insights",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      tweetUrl: "https://twitter.com/michaeltorres/status/1234567891"
    }
  },
  {
    content: "Moving to this platform has been transformative. Our clients love it!",
    author: {
      name: "Isabella Martinez",
      role: "Founder",
      company: "ClientConnect",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      tweetUrl: "https://twitter.com/isabellamartinez/status/1234567892"
    }
  },
  {
    content: "The user interface is clean and simple to navigate. It's truly a designer's dream platform!",
    author: {
      name: "Ava Hill",
      role: "UI Designer",
      company: "Creatify",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      tweetUrl: "https://twitter.com/avahill/status/1234567893"
    }
  },
  {
    content: "Our creative process has never been more fluid. The features are top-notch and so easy to use!",
    author: {
      name: "Emma López",
      role: "Creative Director",
      company: "VisualVibe",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      tweetUrl: "https://twitter.com/emmalopez/status/1234567894"
    }
  },
  {
    content: "It's transformed our daily operations with its brilliant automation features.",
    author: {
      name: "Liam Smith",
      role: "Operations Lead",
      company: "EfficientOps",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      tweetUrl: "https://twitter.com/liamsmith/status/1234567895"
    }
  },
  {
    content: "Our marketing campaigns have become significantly more effective and easier to manage.",
    author: {
      name: "Rachel Green",
      role: "Marketing Director",
      company: "FreshLook",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
      tweetUrl: "https://twitter.com/rachelgreen/status/1234567896"
    }
  },
  {
    content: "The analytics capabilities have revolutionized how we make business decisions.",
    author: {
      name: "Daniel Park",
      role: "Data Analyst",
      company: "DataDrive",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      tweetUrl: "https://twitter.com/danielpark/status/1234567897"
    }
  },
  {
    content: "Our operational efficiency has soared beyond expectations with this platform.",
    author: {
      name: "Emily Parker",
      role: "CEO",
      company: "GreenTech",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      tweetUrl: "https://twitter.com/emilyparker/status/1234567898"
    }
  }
];

// Split testimonials into three rows
const rows = [
  testimonials.slice(0, 3),
  testimonials.slice(3, 6),
  testimonials.slice(6, 9),
];

export function TestimonialList() {
  return (
    <div className="relative w-full overflow-hidden">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="group flex gap-4 py-4 [&:hover>*]:pause-animation"
          style={{
            animation: `scroll${rowIndex % 2 === 0 ? 'Left' : 'Right'} 20s linear infinite`,
            width: 'fit-content'
          }}
        >
          {/* Double the items to create seamless loop */}
          {[...row, ...row].map((testimonial, index) => (
            <div
              key={`${testimonial.author.name}-${index}`}
              className="w-[min(400px,80vw)] flex-shrink-0"
            >
              <TestimonialCard
                content={testimonial.content}
                author={testimonial.author}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}