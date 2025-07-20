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

      <div className='flex'>
         <div className="flex flex-col md:flex-row sm:ml-[10] items-center justify-between gap-8">
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
         <div className="ml-[5px] sm:ml-0">
          <img src="/qsimg.png" alt="" />
        </div>

      </div>
      </div>
    </section>
  );
}
