import Image from "next/image";
import Link from "next/link"; // Adjust path after refactoring
import NewsCard from "@/components/marketing/NewsCard"; // Adjust path after refactoring
import FaqSection from "@/components/marketing/FaqSection"; // Create or refactor this
import { Button } from "@/components/ui/button";
import AlumniEvents from "@/components/marketing/AlumniEvents";

// Assume images are in public/assets
const heroImage = "/assets/Image.JPG";
const aboutImage = "/assets/Aboutus.JPG";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[90vh] bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center text-center text-white px-4"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div> {/* Overlay */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-down">
            Welcome to KBHS High School
          </h1>
          <p className="text-lg md:text-xl mb-8 font-medium">
            Empowering students to reach their full potential through academic
            excellence, personal integrity, and global citizenship.
          </p>
          <Link href="/admissions-page">
            <Button
              size="lg"
              className="bg-[#295E4F] hover:bg-[#1f4a3f] text-white text-lg px-8 py-3"
            >
              Enroll Now
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={aboutImage || "/placeholder.svg"}
              alt="About Us KBHS"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              ABOUT US
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              KBHS High School is dedicated to fostering a vibrant educational
              environment where every student is encouraged to achieve academic
              excellence, develop personal integrity, and become a responsible,
              global citizen. With a commitment to innovative teaching methods,
              diverse extracurricular programs, and a supportive community, we
              empower our students to thrive and succeed in a rapidly changing
              world.
            </p>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-[#295E4F] text-[#295E4F] hover:bg-[#295E4F] hover:text-white"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission/Vision Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-3 text-[#295E4F]">
              OUR MISSION
            </h3>
            <p className="text-gray-700 leading-relaxed">
              KBHS High School aims to provide a supportive and challenging
              environment that fosters academic excellence, personal integrity,
              and global citizenship. We are dedicated to nurturing lifelong
              learners and critical thinkers who are prepared for a dynamic
              future.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-3 text-[#295E4F]">
              OUR VISION
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to be a top educational institution in Kenya, known
              for academic excellence and holistic development. We strive to
              inspire students to be passionate learners and responsible leaders
              who positively impact their communities.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section - Import your refactored EventSection */}
      <AlumniEvents />

      {/* News Section - Import your refactored NewsCard */}
      <NewsCard />

      {/* FAQ Section - Import your refactored FaqSection */}
      <FaqSection />
    </div>
  );
};

export default HomePage;
