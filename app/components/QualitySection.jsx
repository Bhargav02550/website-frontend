import Image from 'next/image';

export default function QualitySection() {
  const qualityPoints = [
    {
      icon: '/q1.png', // 🟢 Use appropriate icons here
      title: 'Food safety compliant warehouse',
      desc: 'Maintaining strict standards for storage and handling.',
    },
    {
      icon: '/q2.png', // 🟠
      title: 'State of the art food park',
      desc: 'Co-creating and innovating recipe solutions with high-tech facilities for consistent quality.',
    },
    {
      icon: '/q3.png', // 🔴
      title: 'Farm collection centres',
      desc: 'Ensuring fresh ingredients sourced directly from trusted farms.',
    },
    {
      icon: '/q4.png', // 🔵
      title: 'Frozen supply chain',
      desc: 'Preserving freshness and quality from production to delivery.',
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-20 pt-12 pb-20 bg-white overflow-hidden" id='services'>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-18">
        Our Commitment to Quality and Freshness
      </h2>

      <div className="flex flex-col md:flex-row ml-[-10px] items-center justify-between gap-8">
        {/* Left: Quality List */}
       <div className="ml-8 flex-1 max-w-lg bg-white rounded-2xl p-6 shadow-xl space-y-4">
        {qualityPoints.map((point, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-4 pb-4 ${idx !== qualityPoints.length - 1 ? 'border-b-2 border-gray-200' : ''}`}
          >
            <div className="w-10 h-10 mt-1 flex-shrink-0">
              <Image src={point.icon} alt="icon" width={60} height={60} />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base mb-1">{point.title}</h3>
              <p className="text-gray-500 text-sm leading-snug">{point.desc}</p>
            </div>
          </div>
        ))}
      </div>


        {/* Desktop View */}
      <div className="hidden sm:flex flex-1 relative justify-center items-center h-[220px] w-full overflow-visible">
        {/* Outer ring */}
        <div
          className="absolute w-[405px] h-[405px] rounded-full z-0"
          style={{ backgroundColor: '#FFEDC2' }}
        />

        {/* Inner ring */}
        <div
          className="absolute w-[315px] h-[315px] rounded-full z-0"
          style={{ backgroundColor: '#FFC764' }}
        />

        {/* Left blurred image */}
        <div className="absolute left-[40px] w-[200px] h-[160px] rounded-xl overflow-hidden z-10 blur-[2px] shadow-md">
          <Image src="/qs3.jpg" alt="Side left" fill className="object-cover" />
        </div>

        {/* Center image */}
        <div className="relative w-[320px] h-[220px] rounded-2xl overflow-hidden z-30 shadow-xl">
          <Image src="/qs2.jpg" alt="Tomatoes in crate" fill className="object-cover" />
        </div>

        {/* Right blurred image */}
        <div className="absolute right-[40px] w-[200px] h-[160px] rounded-xl overflow-hidden z-10 blur-[2px] shadow-md">
          <Image src="/qs1.jpg" alt="Side right" fill className="object-cover" />
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden  mt-[-30px] relative w-full flex justify-center py-0">
        <div className="relative flex flex-col items-center w-full max-w-[320px]">
          
          {/* Background Circles */}
          <div
            className="absolute top-1/2 left-1/2 w-[340px] h-[340px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0"
            style={{ backgroundColor: '#FFEDC2' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[260px] h-[260px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0"
            style={{ backgroundColor: '#FFC764' }}
          />

          {/* Left Image */}
          <div className="relative top-[160px] right-[90px] w-[180px] h-[140px] rounded-xl overflow-hidden blur-[2px] shadow-md z-10">
            <Image src="/qs3.jpg" alt="Side left" fill className="object-cover" />
          </div>

          {/* Center Image */}
          <div className="relative top-[0px] w-[270px] h-[180px] rounded-2xl overflow-hidden z-20 shadow-xl">
            <Image src="/qs2.jpg" alt="Tomatoes in crate" fill className="object-cover" />
          </div>

          {/* Right Image */}
          <div className="relative top-[-160px] left-[90px] w-[180px] h-[140px] rounded-xl overflow-hidden blur-[2px] shadow-md z-10">
            <Image src="/qs1.jpg" alt="Side right" fill className="object-cover" />
          </div>
        </div>
      </div>



      </div>
    </section>
  );
}
