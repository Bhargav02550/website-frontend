export default function BulkBenefitsSection() {
  const features = [
    {
      title: "Flexible Schedules",
      description: "Choose daily, weekly, or custom delivery times",
      image: "/time.png", // replace with your actual image path
    },
    {
      title: "Custom Instructions",
      description: "We follow your preferences, every time",
      image: "/doc.png", // replace with your actual image path
    },
    {
      title: "Multiple Payment Modes",
      description: "Pay your way: UPI, cards, wallets & more",
      image: "/wal.png", // replace with your actual image path
    },
  ];

  return (
    <section className="text-center py-10 px-4 bg-white">
      <h2 className="text-3xl font-bold mb-2">Bulk Orders, Smarter Benefits</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Need it tomorrow or today? We’ve got you. Choose delivery that works for you from routine restocks to urgent same-day items and specialty goods.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 text-center flex flex-col items-center space-y-3"
          >
            <img src={feature.image} alt={feature.title} className="w-12 h-12" />
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
