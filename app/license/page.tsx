"use client";

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20">
      <div className="container px-4 mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">License & Terms</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Standard License</h2>
            <p>
              When you purchase an item on EbookVault, you are granted a non-exclusive, non-transferable license to use the asset for personal or commercial projects. You may not resell or redistribute the source files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Commercial Use</h2>
            <p>
              You are allowed to use our UI Kits and Codebases in client projects. You are not allowed to use them to create a competing product (e.g., a "UI Kit Builder").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Refunds</h2>
            <p>
              Due to the nature of digital goods, refunds are only issued if the product is technically defective or not as described. Contact support@ebookvault.com within 7 days.
            </p>
          </section>

          {/* NEW NEWSLETTER SECTION */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Communication Policy</h2>
            <p>
              By creating an account or purchasing a product on EbookVault, you agree to receive our weekly newsletter, which contains product updates, discount codes, and industry news. You can unsubscribe from these communications at any time via the link in the footer of our emails, but transactional emails (receipts, password resets) will still be sent.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
