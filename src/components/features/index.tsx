
export function Features() {
  
  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)]" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pain Points Section */}
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mt-8 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extralight tracking-tight">
            Perception replaces hours of manual research with a single, authoritative view.
          </h2>

          <div className="mt-12 sm:mt-16 lg:mt-24 max-w-6xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <img 
                src="/demo-thumbnail.jpg" 
                alt="Perception Demo" 
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/tQbkhuYluOE?autoplay=1&mute=1&playsinline=1&enablejsapi=1"
                title="Perception Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* What Perception Tracks Section */}
        <div className="mx-auto mt-16 sm:mt-24 lg:mt-32 max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl !bg-zinc-900 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.04),transparent_70%)]" />
            
            <div className="space-y-8 sm:space-y-12">
              <div className="space-y-4 sm:space-y-8">
                <div className="inline-flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span className="text-sm font-light !text-zinc-400">what Perception tracks</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extralight tracking-tight !text-zinc-100 max-w-2xl">
                  A comprehensive map of the digital financial landscape:
                </h2>
              </div>

              <div className="flex justify-end">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full sm:w-[800px]">
                  <div className="rounded-2xl !border !border-zinc-800 !bg-zinc-900/50 p-6 sm:p-10 hover:!bg-zinc-900/80 transition-colors group relative">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-sm font-medium !text-zinc-200 uppercase tracking-wider">Bitcoin</h3>
                        <p className="!text-zinc-400 text-sm mt-2">The base layer. Institutional commentary, developer activity, regulatory narratives.</p>
                      </div>
                      <div className="flex items-center justify-center mt-auto">
                        <img 
                          src="/images/bitcoin.png" 
                          alt="Bitcoin visualization" 
                          className="w-48 h-48 sm:w-64 sm:h-64 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl !border !border-zinc-800 !bg-zinc-900/50 p-6 sm:p-10 hover:!bg-zinc-900/80 transition-colors group relative">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-sm font-medium !text-zinc-200 uppercase tracking-wider">Stablecoins</h3>
                        <p className="!text-zinc-400 text-sm mt-2">Adoption trends, issuer movements, regional policy shifts.</p>
                      </div>
                      <div className="flex items-center justify-center mt-auto">
                        <img 
                          src="/images/stablecoins.png" 
                          alt="Stablecoins visualization" 
                          className="w-48 h-48 sm:w-64 sm:h-64 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl !border !border-zinc-800 !bg-zinc-900/50 p-6 sm:p-10 hover:!bg-zinc-900/80 transition-colors group relative">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-sm font-medium !text-zinc-200 uppercase tracking-wider">Tokenized Assets</h3>
                        <p className="!text-zinc-400 text-sm mt-2">Real-world asset tokenization, market developments, regulatory frameworks.</p>
                      </div>
                      <div className="flex items-center justify-center mt-auto">
                        <img 
                          src="/images/tokenized assets.png" 
                          alt="Tokenized Assets visualization" 
                          className="w-48 h-48 sm:w-64 sm:h-64 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl !border !border-zinc-800 !bg-zinc-900/50 p-6 sm:p-10 hover:!bg-zinc-900/80 transition-colors group relative">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-sm font-medium !text-zinc-200 uppercase tracking-wider">Macro Catalysts</h3>
                        <p className="!text-zinc-400 text-sm mt-2">Rate moves, FX flows, capital controls, and other drivers of digital asset narratives.</p>
                      </div>
                      <div className="flex items-center justify-center mt-auto">
                        <img 
                          src="/images/macro catalysts.png" 
                          alt="Macro visualization" 
                          className="w-48 h-48 sm:w-64 sm:h-64 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}