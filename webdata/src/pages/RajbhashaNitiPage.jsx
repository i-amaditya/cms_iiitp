import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';

const RajbhashaNitiPage = () => {
  useEffect(() => {
    document.title = "राजभाषा नीति एवं कार्यान्वयन तंत्र | राजभाषा अनुभाग - IIIT Pune";
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="राजभाषा अनुभाग" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Policy Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
            राजभाषा नीति एवं कार्यान्वयन तंत्र
          </h2>

          <hr className="border-gray-200 dark:border-gray-700 mb-8" />

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify space-y-6">
            <p className="text-lg">
              भारत सरकार की राजभाषा नीति का मुख्य उद्देश्य है —
            </p>
            <blockquote className="border-l-4 border-accent pl-4 italic text-xl text-primary dark:text-blue-300 my-4 font-serif">
              “राजकीय कार्यों में हिंदी का क्रमिक और व्यावहारिक रूप से अधिकाधिक प्रयोग सुनिश्चित करना, ताकि प्रशासन जनता के निकट आए।”
            </blockquote>
            <p className="text-lg">
              राजभाषा नीति के प्रभावी कार्यान्वयन हेतु निम्न संस्थागत तंत्र कार्यरत है:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 text-lg pl-4">
              <li><strong>गृह मंत्रालय (राजभाषा विभाग)</strong> – नीति निर्माण एवं निगरानी।</li>
              <li><strong>संसदीय राजभाषा समिति</strong> – नीति के क्रियान्वयन की समीक्षा।</li>
              <li><strong>केंद्रीय राजभाषा कार्यान्वयन समिति</strong> – मंत्रालयों/कार्यालयों की प्रगति समीक्षा।</li>
              <li><strong>कार्यालय स्तर पर राजभाषा कार्यान्वयन समिति (राजका)</strong> – संस्थानिक स्तर पर योजना, निगरानी एवं प्रोत्साहन।</li>
            </ol>
            <p className="text-lg pt-4">
              भारत सरकार द्वारा देश को ‘क’, ‘ख’ और ‘ग’ राजभाषा क्षेत्रों में विभाजित किया गया है।
            </p>
            <p className="text-lg">
              महाराष्ट्र राज्य, जहाँ IIIT Pune स्थित है, ‘ख’ क्षेत्र में आता है। इस क्षेत्र के कार्यालयों के लिए अपने 55% से अधिक पत्राचार हिंदी में करने का लक्ष्य निर्धारित है।
            </p>
          </div>
        </section>

        {/* Scheduled Programs Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
            नियत कार्यक्रम एवं आयोजन
          </h2>

          <hr className="border-gray-200 dark:border-gray-700 mb-8" />

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify space-y-6">
            <p className="text-lg">
              IIIT Pune में प्रतिवर्ष निम्नलिखित कार्यक्रम आयोजित किए जाते हैं:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-lg pl-4">
              <li>हिंदी दिवस (14 सितम्बर)</li>
              <li>हिंदी पखवाड़ा (14 से 28 सितम्बर)</li>
              <li>विश्व हिंदी दिवस (10 जनवरी)</li>
            </ul>
            <p className="text-lg pt-4">
              इन अवसरों पर विविध प्रतियोगिताएँ आयोजित की जाती हैं, जिनमें –
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-lg pl-4">
              <li>निबंध लेखन प्रतियोगिता</li>
              <li>वाद-विवाद प्रतियोगिता</li>
              <li>राजभाषा प्रश्नोत्तरी</li>
              <li>नोटिंग-ड्राफ्टिंग प्रतियोगिता</li>
              <li>कविता पाठ एवं अंताक्षरी</li>
              <li>पोस्टर निर्माण प्रतियोगिता</li>
              <li>आदर्शवाक्य लेखन</li>
            </ul>
            <p className="text-lg pt-4">
              इन कार्यक्रमों का उद्देश्य कर्मचारियों एवं विद्यार्थियों में हिंदी के प्रयोग के प्रति उत्साह, आत्मविश्वास और सरलता विकसित करना है।
            </p>
          </div>
        </section>

        {/* Incentive Schemes Section */}
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
            प्रोत्साहन योजनाएँ
          </h2>

          <hr className="border-gray-200 dark:border-gray-700 mb-8" />

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify space-y-6">
            <p className="text-lg">
              संस्थान द्वारा राजभाषा हिंदी के प्रचार-प्रसार में उत्कृष्ट योगदान देने वाले अधिकारियों/कर्मचारियों को राजभाषा प्रोत्साहन पुरस्कार प्रदान किए जाते हैं।
            </p>
            <p className="text-lg">
              इसके अतिरिक्त, हिंदी में उत्कृष्ट रिपोर्ट, पत्राचार या प्रस्तुति तैयार करने वाले समूहों को भी विशेष रूप से सम्मानित किया जाता है।
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RajbhashaNitiPage;
