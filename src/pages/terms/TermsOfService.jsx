import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ContentsNav from "../../components/policy/ContentsNav";
import { policyPage as s } from "../../components/policy/policyStyles";
import { useActiveSection } from "../../hooks/useActiveSection";

const sections = [
  ["Overview", "overview", ["This website is operated by GANBO. Throughout the site, the terms “we”, “us” and “our” refer to GANBO. GANBO offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.", "By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including users who are browsers, vendors, customers, merchants, and/or contributors of content.", "Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any Services.", "Any new features or tools which are added to the current store shall also be subject to the Terms of Service. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.", "Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and Services to you."]],
  ["Online Store Terms", "online-store", ["By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you have given us your consent to allow any of your minor dependents to use this site.", "You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction, including copyright laws.", "You must not transmit any worms or viruses or any code of a destructive nature.", "A breach or violation of any of the Terms will result in an immediate termination of your Services."]],
  ["General Conditions", "general", ["We reserve the right to refuse Service to anyone for any reason at any time.", "You understand that your content, not including credit card information, may be transferred unencrypted and involve transmissions over various networks and changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.", "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us.", "The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms."]],
  ["Accuracy, Completeness and Timeliness of Information", "accuracy", ["We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.", "This site may contain certain historical information. Historical information is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update information on our site. You agree that it is your responsibility to monitor changes to our site."]],
  ["Modifications to the Service and Prices", "modifications", ["Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service, or any part or content thereof, without notice. We shall not be liable to you or to any third party for any modification, price change, suspension or discontinuance of the Service."]],
  ["Products or Services", "products", ["Certain products or Services may be available exclusively online through the website. These products or Services may have limited quantities and are subject to return or exchange only according to our Refund Policy: [LINK TO REFUND POLICY]. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store, but we cannot guarantee that your monitor's display will be accurate.", "We reserve the right to limit sales of our products or Services to any person, geographic region or jurisdiction and to limit quantities of any products or Services that we offer. Product descriptions and pricing are subject to change at any time without notice. We reserve the right to discontinue any product at any time. Any offer for any product or Service made on this site is void where prohibited.", "We do not warrant that the quality of any products, Services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected."]],
  ["Accuracy of Billing and Account Information", "billing", ["We reserve the right to refuse any order you place with us. We may limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or the same billing or shipping address.", "In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the email and/or billing address or phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that appear to be placed by dealers, resellers or distributors.", "You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information so that we can complete your transactions and contact you as needed.", "For more details, please review our Refund Policy: [LINK TO REFUND POLICY]"]],
  ["Optional Tools", "tools", ["We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools “as is” and “as available” without warranties, representations or conditions of any kind and without endorsement.", "Any use by you of optional tools offered through the site is entirely at your own risk and discretion. We may also offer new Services and/or features through the website, including new tools and resources, and these shall also be subject to these Terms of Service."]],
  ["Third-Party Links", "third-party-links", ["Certain content, products and Services available via our Service may include materials from third parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy of third-party materials or websites.", "We are not liable for harm or damages related to the purchase or use of goods, Services, resources, content, or other transactions made in connection with third-party websites. Please review the third party's policies and practices before engaging in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third party."]],
  ["User Comments, Feedback and Other Submissions", "comments", ["If, at our request, you send submissions such as contest entries, or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise, you agree that we may edit, copy, publish, distribute, translate and otherwise use them in any medium.", "We are under no obligation to maintain comments in confidence, pay compensation for comments, or respond to comments. We may monitor, edit or remove content that we determine to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene, objectionable or in violation of intellectual property rights or these Terms.", "You agree that your comments will not violate any right of any third party, contain unlawful or abusive material, contain malware, use a false email address, impersonate someone else, or mislead us or third parties. You are solely responsible for your comments and their accuracy."]],
  ["Personal Information", "personal", ["Your submission of personal information through the store is governed by our Privacy Policy, which can be viewed here: [LINK TO PRIVACY POLICY]"]],
  ["Errors, Inaccuracies and Omissions", "errors", ["Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions relating to product descriptions, pricing, promotions, offers, shipping charges, transit times and availability. We reserve the right to correct errors, inaccuracies or omissions, change or update information, or cancel orders if information is inaccurate at any time without prior notice.", "We undertake no obligation to update, amend or clarify information in the Service or on any related website, including pricing information, except as required by law. No specified update or refresh date applied in the Service should be taken to indicate that all information has been modified or updated."]],
  ["Prohibited Uses", "prohibited", ["In addition to other prohibitions, you are prohibited from using the site or its content: for any unlawful purpose; to solicit others to perform unlawful acts; to violate regulations or laws; to infringe intellectual property rights; to harass, abuse, harm, defame, intimidate or discriminate; to submit false information; to upload or transmit malicious code; to collect personal information of others; to spam, phish, pharm, pretext, spider, crawl or scrape; for obscene or immoral purposes; or to interfere with or circumvent security features of the Service or the Internet.", "We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses."]],
  ["Disclaimer of Warranties; Limitation of Liability", "disclaimer", ["We do not guarantee that your use of our Service will be uninterrupted, timely, secure or error-free. We do not warrant that results obtained from use of the Service will be accurate or reliable. You agree that we may remove or cancel the Service at any time without notice.", "The Service and all products and Services delivered through the Service are provided “as is” and “as available”, without warranties or conditions of any kind, either express or implied, including warranties of merchantability, fitness for a particular purpose, durability, title and non-infringement.", "In no case shall GANBO, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, Service providers or licensors be liable for any injury, loss, claim, or direct, indirect, incidental, punitive, special, or consequential damages arising from your use of the Service or products procured using the Service. Where limitation of liability is not permitted, our liability shall be limited to the maximum extent permitted by law."]],
  ["Indemnification", "indemnification", ["You agree to indemnify, defend and hold harmless GANBO and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, Service providers, subcontractors, suppliers, interns and employees from any claim or demand, including reasonable attorneys’ fees, arising out of your breach of these Terms of Service or your violation of any law or third-party rights."]],
  ["Severability", "severability", ["In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, that provision shall be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be severed. This determination shall not affect the validity and enforceability of the remaining provisions."]],
  ["Termination", "termination", ["The obligations and liabilities of the parties incurred prior to the termination date shall survive termination. These Terms are effective unless and until terminated by either you or us. You may terminate these Terms at any time by notifying us that you no longer wish to use our Services or when you cease using our site.", "If we suspect that you have failed to comply with any term or provision, we may terminate this agreement at any time without notice and you will remain liable for amounts due up to the termination date."]],
  ["Entire Agreement", "entire-agreement", ["The failure of us to exercise or enforce any right or provision of these Terms shall not constitute a waiver. These Terms and any policies or operating rules posted by us constitute the entire agreement and understanding between you and us and govern your use of the Service, superseding prior or contemporaneous agreements, communications and proposals."]],
  ["Governing Law", "governing-law", ["These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of China."]],
  ["Changes to Terms of Service", "changes-to-terms", ["You can review the most current version of the Terms of Service at any time on this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms by posting updates and changes to our website. Your continued use of the website or Service following the posting of changes constitutes acceptance of those changes."]],
];

const tocItems = sections.map(([title, id]) => ({ id, label: title }));
const sectionIds = tocItems.map((item) => item.id);

export default function TermsOfService() {
  const activeId = useActiveSection(sectionIds);

  return (
    <div className="bg-[#faf9ff] text-[#141b2b]">
      <Header active="" />
      <main className={s.main}>
        <section className={s.hero}>
          <span className={s.eyebrow}>Legal &amp; Compliance</span>
          <h1 className={s.title}>Terms of Service</h1>
          <p className={s.subtitle}>GANBO Terms and Conditions</p>
        </section>

        <section className={s.bodyWrap}>
          <div className={s.grid}>
            <ContentsNav items={tocItems} activeId={activeId} />

            <div className={s.contentCol}>
              {sections.map(([title, id, paragraphs]) => (
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
                  <h2 className={s.contactTitle}>Contact Information</h2>
                  <p className="mb-5 max-w-2xl text-sm leading-7 text-white/70 sm:mb-6 sm:text-base">
                    Questions about the Terms of Service should be sent to us
                    at:
                  </p>
                  <p className="break-all text-base font-semibold sm:text-lg">
                    ganbo@gmail.com
                  </p>
                  <div className="mt-5 space-y-1 text-sm leading-6 sm:mt-6 sm:text-base">
                    <p>Trading name - RHS Distribution Pvt Ltd</p>
                    <p>Business Address - Please refer to the GST certificate</p>
                    <p>Phone number: +91 7375-004001</p>
                    <p>Business Registration no. - U46529RJ2024PTC096650 (CIN)</p>
                    <p>VAT - Please refer to the GST number</p>
                  </div>
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

