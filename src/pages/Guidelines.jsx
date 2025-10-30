// import React from 'react';

// function Guidelines() {
//   return (
//     <div className="container mx-auto px-4 py-12 max-w-4xl">
//       <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 border border-gray-100 prose prose-lg prose-orange max-w-none"> {/* Use prose for styling */}
//         <h1 className="text-center !mb-10 flex items-center justify-center gap-2"> {/* Center and add icon */}
//           <span role="img" aria-label="flower" className="text-3xl">🌸</span>
//            Oorza YATRA GUIDELINES
//         </h1>

//         {/* Section 1 */}
//         <section className="mb-8 pb-6 border-b border-gray-200">
//           <h2 className="flex items-center gap-2 !mt-0"> {/* !mt-0 override prose */}
//              <span role="img" aria-label="lamp" className="text-2xl">🪔</span> Eligibility & Intent
//           </h2>
//           <ul>
//             <li>Participation is open to spiritually inclined individuals and families seeking a disciplined, devotional travel experience.</li>
//             <li>All participants (including children over 5) must register individually.</li>
//             <li>Registration signifies acceptance of these guidelines.</li>
//           </ul>
//         </section>

//         {/* Section 2 */}
//         <section className="mb-8 pb-6 border-b border-gray-200">
//           <h2 className="flex items-center gap-2">
//              <span role="img" aria-label="scroll" className="text-2xl">🧾</span> Registration Process
//           </h2>
//           <ol>
//             <li>
//               <strong>Complete Form:</strong> Accurately fill all fields (name, age, contact, ID, health).
//             </li>
//             <li>
//               <strong>Submit ID:</strong> Provide a valid photo ID (Aadhaar/Passport).
//             </li>
//             <li>
//               <strong>Payment:</strong> Pay the Yatra fee by the deadline and share proof.
//             </li>
//             <li>
//               <strong>Confirmation:</strong> Your place is secured upon full payment and document verification.
//             </li>
//           </ol>
//         </section>

//         {/* Section 3 */}
//         <section>
//           <h2 className="flex items-center gap-2">
//              <span role="img" aria-label="money bag" className="text-2xl">💰</span> Payment & Refund Policy
//           </h2>
//           <ul>
//             <li>Use official channels only (bank transfer/UPI/authorized coordinators).</li>
//             <li>Registration is strictly non-transferable.</li>
//             <li>
//               <strong>Cancellation Policy:</strong>
//               <ul className="!list-[circle] !mt-1"> {/* Use ! to override prose list style */}
//                 <li>Cancellation 15–25 days before departure: 50% refund.</li>
//                 <li>Cancellation less than 15 days before departure: No refund.</li>
//                  <li>Approved refunds are processed within 10–15 working days after written request.</li>
//               </ul>
//             </li>
//             <li>Approved refunds are processed within 10–15 working days after written request.</li>
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Guidelines;


import React from 'react';

// Optional: Simple inline SVG icons if you prefer them over emojis
const EligibilityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline mr-2 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const ProcessIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const PaymentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;


function Guidelines() {
  return (
    // Container with padding and max-width
    <div className="container mx-auto px-8 py-12 max-w-8xl">
      {/* Card styling for the content */}
      <div className="bg-gradient-to-br from-white via-orange-50/30 to-white rounded-xl shadow-xl p-8 sm:p-12 border border-orange-100/80">

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-950 text-center mb-10 flex items-center justify-center gap-3 drop-shadow">
          <span role="img" aria-label="flower" className="text-3xl">🌸</span>
           Oorza Yatra Guidelines
        </h1>

        {/* Apply Tailwind Typography styles */}
        {/* prose-lg makes text larger, prose-orange themes links/bullets, max-w-none removes width limit */}
        <div className="prose prose-lg prose-headings:text-orange-950 prose-headings:font-semibold prose-strong:text-gray-900 prose-ul:list-outside prose-li:marker:text-orange-600 prose-ol:list-outside prose-li:marker:text-orange-600 prose-p:text-gray-800 prose-li:text-gray-700 max-w-none space-y-8">

          {/* Section 1 */}
          <section className="pb-6 border-b border-orange-200/60">
            <h2 className="flex items-center gap-2 !mt-0 !mb-5"> {/* !mt-0 override prose margin */}
              {/* <EligibilityIcon /> */}
              <span role="img" aria-label="lamp" className="text-3xl">🪔</span>
              <strong className="text-2xl font-bold">Eligibility & Intent  </strong>
            </h2>
            {/* Unordered list (bullets) */}
            <ul>
              <li>1. Participation is open to spiritually inclined individuals and families seeking a disciplined, devotional travel experience within a respectful group environment.</li>
              <li>2. Every participant must register individually (including children above 5 years).</li>
              <li>3. The registration confirms your intent to participate and your acceptance of these guidelines.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="pb-6 border-b border-orange-200/60">
            <h2 className="flex items-center gap-2 !mb-5">
              {/* <ProcessIcon /> */}
              <span role="img" aria-label="scroll" className="text-3xl">🧾</span>
              <strong className="text-2xl font-bold">Registration Process</strong>
            </h2>
            {/* Ordered list (numbers) */}
            <ol className="!pl-5 space-y-3"> {/* Added space between items */}
              <li>
                <strong>1. Complete the Online Form:</strong> Provide accurate and complete details in the Registration Form (name, age, contact, emergency contact, ID type selected, health declaration).
              </li>
              <li>
                <strong>2. Submit Required Documents:</strong> Valid photo ID proof (Aadhaar/Passport).
              </li>
              <li>
                <strong>3. Make Payment:</strong> Pay the full Yatra fee payment within the specified deadline. Share proof of payment (screenshot/transaction ID).
              </li>
              <li>
                <strong>4. Receive Confirmation:</strong> Your participation is officially confirmed only after we verify receipt of your full payment and the required ID document.
              </li>
            </ol>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="flex items-center gap-2 !mb-5">
              {/* <PaymentIcon /> */}
               <span role="img" aria-label="money bag" className="text-3xl">💰</span>
             <strong className="text-2xl font-bold"> Payment & Refund Policy</strong>
            </h2>
            {/* Unordered list */}
            <ul className="space-y-2"> {/* Added space */}
              <li>1. Payments must be made exclusively through official channels provided by Oorza Yatraas. We are not responsible for payments made through unauthorized means or individuals.</li>
              <li>2. Yatra registrations are strictly <strong>Non-Transferable</strong> to another person or a different Yatra date.</li>
              <li>
                <strong>Cancellation & Refund Policy:</strong> 
                {/* Nested list */}
                <ul className="!list-[circle] !mt-2 !pl-6 space-y-1"> {/* Use ! to override prose, circle bullets */}
                  <li>Cancellation  (15 to 25 days) prior to departure: (50% refund).</li>
                  <li>Cancellation  (less than 15 days) prior to departure: (No refund).</li>
                  
                </ul>
              </li>
             
              <li>3. Approved refunds (based on the policy above) will be processed back to the original mode of payment within 10–15 working days.</li>
            </ul>
            {/* You can add more sections like Code of Conduct, Health, Luggage etc. here */}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Guidelines;


