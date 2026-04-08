import { Clock, Users, Award, ArrowRight, Play } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'Balayage Mastery: From Foundation to Advanced',
    instructor: 'Michelle Torres',
    instructorRole: 'Master Colorist, NYC',
    duration: '6h 30m',
    students: '12,400+',
    level: 'All Levels',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80&auto=format&fit=crop',
    modules: ['Color Theory', 'Sectioning & Placement', 'Toning & Glossing', 'Business Strategy'],
  },
  {
    id: 2,
    title: 'Precision Cuts: The Geometric Revolution',
    instructor: 'David Kwan',
    instructorRole: 'Session Stylist, London',
    duration: '4h 15m',
    students: '8,200+',
    level: 'Intermediate',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80&auto=format&fit=crop',
    modules: ['Blunt Bobs', 'Interior Layers', 'Razor Techniques', 'Finishing'],
  },
  {
    id: 3,
    title: 'Curl Science: The Complete Stylist Guide',
    instructor: 'Amara Johnson',
    instructorRole: 'Curl Specialist, Atlanta',
    duration: '5h 45m',
    students: '9,800+',
    level: 'Beginner Friendly',
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=800&q=80&auto=format&fit=crop',
    modules: ['Curl Typing', 'Hydration Protocols', 'Product Layering', 'Client Consultations'],
  },
]

const LEVEL_COLOR: Record<string, string> = {
  'All Levels': 'text-blue-400',
  'Intermediate': 'text-yellow-400',
  'Beginner Friendly': 'text-green-400',
}

const BADGE_COLOR: Record<string, string> = {
  'Best Seller': 'bg-gold-500 text-black',
  'New': 'bg-blue-500 text-white',
  'Top Rated': 'bg-emerald-500 text-white',
}

export default function EducationSection() {
  return (
    <section className="bg-charcoal-950 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-0.5 bg-gold-500" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">Education</span>
            </div>
            <h2
              className="text-2xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Learn From the World's<br />
              <em>Best Stylists</em>
            </h2>
            <p className="text-charcoal-400 text-sm mt-3 leading-relaxed">
              Professional masterclasses built for working stylists. Earn CE credits, grow your skills, and build the career you deserve.
            </p>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-charcoal-400 hover:text-gold-500 transition-colors whitespace-nowrap"
          >
            Browse All Courses <ArrowRight size={12} />
          </a>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-px bg-white/5 mb-12 border border-white/5">
          {[
            { value: '200+', label: 'Expert Instructors' },
            { value: '50K+', label: 'Stylists Enrolled' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="bg-charcoal-950 px-6 py-4 text-center">
              <div className="text-2xl font-bold text-gold-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </div>
              <div className="text-[10px] tracking-widest uppercase text-charcoal-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <a
              key={course.id}
              href="#"
              className="group bg-charcoal-900/50 border border-white/5 hover:border-gold-500/30 transition-all duration-300 cursor-pointer card-hover flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center">
                    <Play size={16} className="text-black ml-0.5" />
                  </div>
                </div>
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 ${BADGE_COLOR[course.badge]}`}>
                    {course.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <h3
                  className="text-base font-bold text-charcoal-100 group-hover:text-white transition-colors leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-charcoal-700 flex items-center justify-center text-[9px] text-charcoal-300 font-bold">
                    {course.instructor.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[11px] text-charcoal-300 font-medium">{course.instructor}</p>
                    <p className="text-[10px] text-charcoal-500">{course.instructorRole}</p>
                  </div>
                </div>

                {/* Modules */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {course.modules.map((m) => (
                    <span key={m} className="text-[9px] tracking-wider uppercase bg-white/5 text-charcoal-400 px-2 py-0.5">
                      {m}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-[10px] text-charcoal-500 mt-auto pt-3 border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Clock size={10} /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={10} /> {course.students}
                  </span>
                  <span className={`flex items-center gap-1.5 ml-auto ${LEVEL_COLOR[course.level]}`}>
                    <Award size={10} /> {course.level}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
