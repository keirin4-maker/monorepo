import { 
  Button, 
  TemplateCard, 
  FeatureCard, 
  StepCard, 
  TestimonialCard, 
  PricingCard, 
  Accordion 
} from '@repo/ui'

export default function Home() {
  return (
    // We use a fragment <> to wrap all the page sections
    <>
      {/* === 1. HERO SECTION === */}
      <main className="flex flex-col items-center justify-center p-24 bg-white">
        <h1 className="text-5xl font-bold text-center">
          Create resumes that stand out
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          Build professional resumes in minutes with our intuitive,
          beautifully designed resume builder.
        </p>
        <div className="mt-8">
          <Button>Get Started</Button>
        </div>
      </main>

      {/* === 2. TEMPLATE PREVIEW SECTION === */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Professionally Designed Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
          </div>
        </div>
      </section>

      {/* === 3. FEATURES SECTION === */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="No Monthly Fees, Ever"
              description="Build unlimited resumes for free. Pay just $5 when you're ready to download."
            />
            <FeatureCard
              title="ATS-Optimized Templates"
              description="Our templates are tested by hiring managers and pass applicant tracking systems."
            />
            <FeatureCard
              title="AI Writing Assistant"
              description="Get personalized suggestions for bullet points, skills, and achievements."
            />
          </div>
        </div>
      </section>

      {/* === 4. HOW IT WORKS SECTION === */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            From Blank Page to Dream Job in 15 Minutes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <StepCard
              stepNumber="1"
              title="Pick Your Template"
              description="Browse 5+ ATS-optimized templates designed by hiring experts."
            />
            <StepCard
              stepNumber="2"
              title="AI Helps You Write"
              description="Our smart assistant suggests powerful bullet points and achievements."
            />
            <StepCard
              stepNumber="3"
              title="Download & Get Hired"
              description="Pay just $5 and download your professional PDF."
            />
          </div>
        </div>
      </section>

      {/* === 5. TESTIMONIALS SECTION === */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Chen"
              title="Software Engineer at Google"
              quote="ResumeForge helped me land my dream job! The AI suggestions were incredibly helpful, and the templates look so professional."
            />
            <TestimonialCard
              name="Michael Rodriguez"
              title="Marketing Manager at Airbnb"
              quote="I've tried many resume builders, but ResumeForge stands out. The interface is intuitive, and I love the one-time price."
            />
            <TestimonialCard
              name="Emily Johnson"
              title="Product Designer at Spotify"
              quote="The templates are beautifully designed and ATS-friendly. I got 3x more interview calls after switching."
            />
          </div>
        </div>
      </section>

      {/* === 6. PRICING SECTION === */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            No Subscriptions. Just $5 to Download.
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Build your resume for free. Pay only when you're ready to download.
          </p>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <PricingCard
                title="Free"
                price="$0"
                priceDescription=""
                features={[
                  "Unlimited edits",
                  "All templates included",
                  "AI-powered suggestions"
                ]}
              />
              <PricingCard
                title="Download"
                price="$5"
                priceDescription=" one-time"
                features={[
                  "Unlimited edits",
                  "All templates included",
                  "AI-powered suggestions",
                  "Download Professional PDF"
                ]}
                isRecommended={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* === 7. COMPARISON TABLE SECTION === */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            ResumeForge vs Other Resume Builders
          </h2>
          
          <div className="grid grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            
            {/* Headers */}
            <div className="p-4 font-semibold text-left bg-gray-100">Feature</div>
            <div className="p-4 font-semibold text-center bg-gray-100 text-blue-600">ResumeForge</div>
            <div className="p-4 font-semibold text-center bg-gray-100">Other Builders</div>

            {/* Rows... */}
            <div className="p-4 bg-white">Monthly Cost</div>
            <div className="p-4 bg-white text-center font-medium text-gray-900">$0</div>
            <div className="p-4 bg-white text-center text-gray-500">$15-30/month</div>

            <div className="p-4 bg-gray-50">Download Cost</div>
            <div className="p-4 bg-gray-50 text-center font-medium text-gray-900">$5 one-time</div>
            <div className="p-4 bg-gray-50 text-center text-gray-500">Subscription required</div>

            <div className="p-4 bg-white">AI Writing Help</div>
            <div className="p-4 bg-white text-center font-medium text-green-500">✓ Included</div>
            <div className="p-4 bg-white text-center text-gray-500">✗ Premium only</div>
          </div>
        </div>
      </section>

      {/* === 8. FAQ SECTION === */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <Accordion title="Do I have to pay to create my resume?">
              No, creating your resume is completely free. You can build, edit,
              and perfect your resume as much as you want without paying anything.
              You only pay $5 when you're ready to download the final PDF.
            </Accordion>

            <Accordion title="Can I edit my resume after downloading?">
              Yes! Once you've paid for a download, you can continue to edit
              your resume and download updated versions at no additional cost.
            </Accordion>
          </div>
        </div>
      </section>

      {/* === 9. FINAL CTA SECTION === */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 5,000+ job seekers who chose the smart way to create professional resumes.
          </p>
          <button 
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
            Start Building Now - Free
          </button>
        </div>
      </section>
    </>
  )
}