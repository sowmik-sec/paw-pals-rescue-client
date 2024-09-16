function VolunteerDonate() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-orange-500 mb-6">
          Help Us Save Lives
        </h2>
        <p className="text-lg  mb-10">
          Join the Paw Pals Rescue community by donating or volunteering to help
          pets in need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donate Section */}
          <div className="rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-semibold  mb-4">Make a Donation</h3>
            <p className=" mb-6">
              Your generous donations help us continue to rescue, rehabilitate,
              and rehome pets in need.
            </p>
            <a
              href="/donate"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              Donate Now
            </a>
          </div>

          {/* Volunteer Section */}
          <div className=" rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Become a Volunteer</h3>
            <p className="mb-6">
              Help us by volunteering your time and skills to care for pets and
              assist in adoption campaigns.
            </p>
            <a
              href="/volunteer"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VolunteerDonate;
