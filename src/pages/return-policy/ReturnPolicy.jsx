import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ContentsNav from "../../components/policy/ContentsNav";
import { policyPage as s } from "../../components/policy/policyStyles";
import { useActiveSection } from "../../hooks/useActiveSection";

const sections = [
  {
    id: "refund-policy",
    title: "Refund Policy",
    paragraphs: [
      "We have a 30-day return policy, which means you have 30 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase. To start a return, you can contact us at ganbo@gmail.com.",
      "Please note that returns will need to be sent to the following address: Plot No. 2 Basement Shop, Mitra Colony, Shekhawat Complex, Jaipur, Rajasthan 302020, India.",
      "If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.",
      "You can always contact us for any return question at ganbo@gmail.com.",
    ],
  },
  {
    id: "damages",
    title: "Damages and Issues",
    paragraphs: [
      "Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.",
    ],
  },
  {
    id: "exceptions",
    title: "Exceptions / Non-Returnable Items",
    paragraphs: [
      "Certain types of items cannot be returned, like perishable goods such as food, flowers, or plants; custom products such as special orders or personalized items; and personal care goods such as beauty products. We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.",
      "Unfortunately, we cannot accept returns on sale items or gift cards.",
    ],
  },
  {
    id: "exchanges",
    title: "Exchanges",
    paragraphs: [
      "The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.",
    ],
  },
  {
    id: "eu-cooling-off",
    title: "European Union 14-Day Cooling-Off Period",
    paragraphs: [
      "Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.",
    ],
  },
  {
    id: "refunds",
    title: "Refunds",
    paragraphs: [
      "We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.",
      "If more than 15 business days have passed since we’ve approved your return, please contact us at zs124391651@gmail.com.",
    ],
  },
];

const tocItems = sections.map(({ id, title }) => ({ id, label: title }));
const sectionIds = sections.map(({ id }) => id);

export default function ReturnPolicy() {
  const activeId = useActiveSection(sectionIds);

  return (
    <div className="bg-[#faf9ff] text-[#141b2b]">
      <Header active="" />
      <main className={s.main}>
        <section className={s.hero}>
          <span className={s.eyebrow}>Returns &amp; Support</span>
          <h1 className={s.title}>Return Policy</h1>
          <p className={s.subtitle}>
            Simple, transparent returns for your GANBO purchase.
          </p>
        </section>

        <section className={s.bodyWrap}>
          <div className={s.grid}>
            <ContentsNav items={tocItems} activeId={activeId} />

            <div className={s.contentCol}>
              {sections.map(({ id, title, paragraphs }) => (
                <section key={id} id={id} className={s.card}>
                  <h2 className={s.cardTitle}>{title}</h2>
                  <div className={s.cardBody}>
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <section id="contact" className={s.contactCard}>
                <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-10" />
                <div className="relative z-10">
                  <h2 className={s.contactTitle}>Return Support</h2>
                  <p className="mb-4 max-w-2xl text-sm leading-7 text-white/70 sm:mb-5 sm:text-base">
                    For return questions, contact our support team before
                    sending an item back.
                  </p>
                  <a
                    href="mailto:ganbo@gmail.com"
                    className="break-all text-base font-semibold transition-colors hover:text-blue-300 sm:text-lg"
                  >
                    ganbo@gmail.com
                  </a>
                  <p className="mt-4 text-sm leading-6 sm:mt-5 sm:text-base">
                    Return address: Plot No. 2 Basement Shop, Mitra Colony,
                    Shekhawat Complex, Jaipur, Rajasthan 302020, India
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
