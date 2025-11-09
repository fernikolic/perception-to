import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Leaderboard from './Leaderboard';
import Submit from './Submit';
import Timeline from './Timeline';
import { Navbar } from '../../components/navbar';
import { Toaster } from '../../components/bitcoin-bad-takes/ui/toaster';

export default function BitcoinBadTakes() {
  return (
    <div className="min-h-screen bg-gray-200 relative">
      <Navbar />
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        {/* Main Header */}
        <div className="container mx-auto px-4 py-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Horrible Bitcoin Takes
            </h1>
            <p className="text-sm text-gray-700 max-w-2xl mx-auto mb-4 font-medium leading-relaxed">
              A curated collection of the most misguided predictions and commentary about Bitcoin from media outlets and financial experts.
            </p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/take/:slug" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}