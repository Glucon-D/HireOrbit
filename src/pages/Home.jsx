import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button';

const Home = () => {
  const featuresRef = useRef(null);
  const socialRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Features Animation
    const features = featuresRef.current.querySelectorAll('.feature-card');
    features.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { 
          opacity: 0, 
          y: 100,
          rotation: -15,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: feature,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Social Proof Animation
    const logos = socialRef.current.querySelectorAll('.company-logo');
    gsap.fromTo(
      logos,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: socialRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        }
      }
    );

    // CTA Animation
    gsap.fromTo(
      ctaRef.current,
      { 
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#ffd82d]/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#ffd82d]/5 backdrop-blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ffd82d]/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Transform Your <span className="text-[#ffd82d]">Hiring</span> Process with AI
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Streamline your recruitment with intelligent interviews, automated assessments, and data-driven insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-[#ffd82d] hover:bg-[#ffd82d]/90 text-gray-900 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                    Get Started Free →
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" size="lg" className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-xl border-2 border-gray-200">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://img.freepik.com/free-vector/recruitment-manager-analyzing-candidates_74855-4565.jpg" 
                alt="AI Recruitment Process" 
                className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#ffd82d]/30 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#ffd82d]/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-24 md:py-32 bg-gradient-to-b from-white via-[#ffd82d]/5 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Features that Make Hiring <span className="text-[#ffd82d]">Better</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to find and hire the best talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Interviews',
                description: 'Conduct fair and consistent interviews with our intelligent assessment system.',
                icon: '🤖',
                gradient: 'from-[#ffd82d]/20 to-[#ffd82d]/5'
              },
              {
                title: 'Smart Resume Analysis',
                description: 'Get instant insights and suggestions to improve candidate resumes.',
                icon: '📝',
                gradient: 'from-[#ffd82d]/20 to-[#ffd82d]/5'
              },
              {
                title: 'Comprehensive Reports',
                description: 'Make data-driven decisions with detailed performance analytics.',
                icon: '📊',
                gradient: 'from-[#ffd82d]/20 to-[#ffd82d]/5'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`feature-card bg-gradient-to-br ${feature.gradient} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1`}
              >
                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div ref={socialRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Companies
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of companies that have transformed their hiring process.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {[
              {
                name: "Google",
                logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              },
              {
                name: "Microsoft",
                logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
              },
              {
                name: "Amazon",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
              },
              {
                name: "Meta",
                logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png"
              }
            ].map((company, index) => (
              <div
                key={index}
                className="w-32 company-logo"
              >
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div ref={ctaRef} className="bg-gradient-to-r from-[#ffd82d]/20 to-[#ffd82d]/5 py-20">
        <div className="container mx-auto px-4 text-center relative">
          <div className="absolute inset-0 bg-[#ffd82d]/5 backdrop-blur-sm rounded-3xl"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of companies that have streamlined their hiring process.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                Get Started Now →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;