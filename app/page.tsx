import PromptEvaluator from "@/components/ui/prompt-evaluator"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <PromptEvaluator />
    </div>
  )
}
