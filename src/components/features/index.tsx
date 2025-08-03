
export function Features() {
  
  return (
    <section id="features" className="relative overflow-hidden py-12 sm:py-16 lg:py-24 xl:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)]" />
      
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Pain Points Section */}
        <div className="mx-auto max-w-5xl text-center">
        </div>

        {/* What Perception Tracks Section */}
        <div className="mx-auto mt-12 sm:mt-16 lg:mt-24 xl:mt-32 max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl !bg-zinc-900 px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12 lg:py-16 xl:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.04),transparent_70%)]" />
            
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              <div className="space-y-3 sm:space-y-4 lg:space-y-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <span className="text-xs sm:text-sm font-light !text-zinc-400">what Perception tracks</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extralight tracking-tight !text-zinc-100 max-w-3xl mx-auto sm:mx-0 px-2 sm:px-0">
                  Intelligence across the emerging finance ecosystem:
                </h2>
              </div>

              <div className="flex justify-center sm:justify-end">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full sm:w-auto sm:max-w-[800px]">
                  <div className="rounded-xl sm:rounded-2xl !border !border-zinc-800 !bg-zinc-900/50 p-4 sm:p-6 lg:p-8 xl:p-10 hover:!bg-zinc-900/80 transition-colors group relative min-h-[280px] sm:min-h-[320px]">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-xs sm:text-sm font-medium !text-zinc-200 uppercase tracking-wider">Bitcoin</h3>
                        <p className="!text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">The base layer. Institutional commentary, developer activity, regulatory narratives.</p>
                      </div>
                      <div className="flex items-center justify-center mt-auto">
                        <img 
                          src="/images/bitcoin.png" 
                          alt="Bitcoin visualization" 
                          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl sm:rounded-2xl !border !border-zinc-800 !bg-zinc-900/50 p-4 sm:p-6 lg:p-8 xl:p-10 hover:!bg-zinc-900/80 transition-colors group relative min-h-[280px] sm:min-h-[320px]">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-xs sm:text-sm font-medium !text-zinc-200 uppercase tracking-wider">Stablecoins</h3>
                        <p className="!text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">Adoption trends, issuer movements, regional policy shifts.</p>
                      </div>
                      <div className="flex items-center justify-center mt-auto">
                        <img 
                          src="/images/stablecoins.png" 
                          alt="Stablecoins visualization" 
                          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl sm:rounded-2xl !border !border-zinc-800 !bg-zinc-900/50 p-4 sm:p-6 lg:p-8 xl:p-10 hover:!bg-zinc-900/80 transition-colors group relative min-h-[280px] sm:min-h-[320px]">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-xs sm:text-sm font-medium !text-zinc-200 uppercase tracking-wider">Tokenized Assets</h3>
                        <p className="!text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">Real-world asset tokenization, market developments, regulatory frameworks.</p>
                      </div>
                      <div className="flex items-center justify-center mt-auto">
                        <img 
                          src="/images/tokenized assets.png" 
                          alt="Tokenized Assets visualization" 
                          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl sm:rounded-2xl !border !border-zinc-800 !bg-zinc-900/50 p-4 sm:p-6 lg:p-8 xl:p-10 hover:!bg-zinc-900/80 transition-colors group relative min-h-[280px] sm:min-h-[320px]">
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="text-xs sm:text-sm font-medium !text-zinc-200 uppercase tracking-wider">Macro Catalysts</h3>
                        <p className="!text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">Rate moves, FX flows, capital controls, and other drivers of digital asset narratives.</p>
                      </div>
                      <div className="flex items-center justify-center mt-auto">
                        <img 
                          src="/images/macro catalysts.png" 
                          alt="Macro visualization" 
                          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
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