import Link from "next/link";
import { Button } from "@/app/components/button";
import { Card, CardContent } from "@/app/components/card";
import {
  Search,
  Activity,
  ExternalLink
} from "lucide-react";

export default function Home() {
  return (
    <main>
      <section className="relative text-(--foreground)">
        <img
          src="images/banner.png" // Replace with actual image URL
          alt="Spatial Transcriptomics image"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-6 flex items-center justify-center gap-2">
              <span> PROVitD - Pathophysiological Role Of Vitamin D </span> 
            </h1>
            
            <h2 className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Investigating the molecular mechanisms by which vitamin D
                signaling influences cellular processes and disease progression
            </h2>
            <h3 className="text-l md:text-xl italic mb-8 max-w-2xl mx-auto opacity-90">
                Group lead by Dr. Gilles Laverny at IGBMC
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/studies">
                <Button size="xl" variant="outline" className="bg-(--accent-background2)">
                  <span className="text-lg">Explore Our Research</span>
                </Button>
              </Link>
              <Link href="https://www.igbmc.fr/en/recherche/teams/subgroups/pathophysiological-role-of-vitamin-d-signalling">
                <Button size="xl" variant="outline" className="bg-(--accent-background2)">
                  <span className="text-lg">Visit IGBMC Group Page</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-(--background)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-(--foreground) mb-4">
              Research Highlights
            </h2>
          </div>
          <div className="space-y-12">
            {/* Highlight 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg leading-relaxed text-(--foreground)">
                  The active form of the hormone vitamin D controls calcium and
                  phosphate levels in the body. In addition, it contributes to
                  the regulation of the inflammation and cell proliferation,
                  conferring a protective, even therapeutic, role in various
                  cancers and autoimmune diseases. To date, the mechanisms
                  underlying the activities of vitamin D have not been
                  elucidated.
                  This lack of understanding limits its clinical use, since the
                  doses required for the treatment of cancers or autoimmune
                  diseases induce hypercalcemia; resulting in calcification of
                  the kidneys, heart and vessels, leading to dysfunction of
                  these organs.
                </p>
              </div>
              <Card className="order-1 md:order-2">
                <CardContent className="p-6 ">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-(--accent-background) rounded-lg flex items-center justify-center">
                      <Search className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold m-0">
                      Exploring disease progression
                    </h3>
                  </div>
                  <p className="text-(--foreground)">
                    Identification of the mechanisms underlying disease initiation and progression.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Highlight 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-(--accent-background) rounded-lg flex items-center justify-center">
                      <Activity className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold m-0">
                      Unravelling Vitamin D activities
                    </h3>
                  </div>
                  <p className="text-(--foreground)">
                    Studying how disruptions in vitamin D signaling contribute
                    to disease development and progression.
                  </p>
                </CardContent>
              </Card>
              <div>
                <p className="text-lg leading-relaxed text-(--foreground)">
                  Our group is interested in understanding how vitamin D
                  controls calcium homeostasis and tumor progression. We focus
                  on rare diseases characterized by impaired vitamin D
                  signaling, and on prostate cancer. We use patient cells and
                  mouse models recapitulating human pathologies, and leverage
                  single-cell and spatial transcriptomic analyses coupled with
                  functional validations. We also collaborate with chemists to
                  characterise new vitamin D analogues with potent therapeutic
                  activities for many diseases that are refractory to current
                  treatments.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

