import Image from 'next/image';

export default function QualitySection() {
  const qualityPoints = [
    {
      title: 'Farm collection centres',
      desc: 'Ensuring fresh ingredients sourced directly from trusted farms.',
    },
    {
      title: 'State of the art food park',
      desc: 'Co-creating and innovating recipe solutions with high-tech facilities for consistent quality.',
    },
    {
      title: 'Food safety compliant warehouse',
      desc: 'Maintaining strict standards for storage and handling.',
    },
    {
      title: 'Frozen supply chain',
      desc: 'Preserving freshness and quality from production to delivery.',
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-20 py-12 bg-white overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Our Commitment to Quality and Freshness
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Quality List */}
        <div className="flex-1 space-y-6">
          {qualityPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-6 transition duration-200 hover:shadow-lg"
            >
              <h3 className="font-semibold text-lg mb-1">{point.title}</h3>
              <p className="text-gray-600 text-sm">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* Right: Overlapping Images */}
        <div className="flex-1 relative flex justify-center items-center h-[220px] sm:h-[240px] w-full overflow-visible">
          {/* Left image */}
          <div className="absolute left-[8px] sm:left-[45px] w-[200px] sm:w-[250px] h-[140px] sm:h-[170px] rounded-xl overflow-hidden z-10 blur-[1.5px]">
            <Image
              src="/qs3.jpg"
              alt="Side left"
              fill
              className="object-cover"
            />
          </div>

          {/* Center image */}
          <div className="relative w-[260px] sm:w-[340px] h-[180px] sm:h-[230px] rounded-2xl overflow-hidden z-30 shadow-lg">
            <Image
              src="/qs2.jpg"
              alt="Tomatoes in crate"
              fill
              className="object-cover"
            />
          </div>

          {/* Right image */}
          <div className="absolute right-[8px] sm:right-[45px] w-[200px] sm:w-[250px] h-[140px] sm:h-[170px] rounded-xl overflow-hidden z-10 blur-[1.5px]">
            <Image
              src="/qs1.jpg"
              alt="Side right"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
