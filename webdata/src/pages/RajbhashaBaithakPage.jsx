import React, { useEffect } from 'react';
import PageHeader from '../components/shared/PageHeader';

const RajbhashaBaithakPage = () => {
  useEffect(() => {
    document.title = "कार्यान्वयन समिति की बैठकें | राजभाषा अनुभाग - IIIT Pune";
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="राजभाषा अनुभाग" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
            कार्यान्वयन समिति की बैठकें
          </h2>

          <hr className="border-gray-200 dark:border-gray-700 mb-8" />

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify space-y-6">
            <p className="text-lg">
              संस्थान में राजभाषा कार्यान्वयन समिति की बैठकें नियमित रूप से आयोजित की जाती हैं। इन बैठकों में:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 text-lg pl-4">
              <li>तिमाही प्रगति रिपोर्ट (टीपीआर) की समीक्षा,</li>
              <li>विभागवार हिंदी प्रयोग का मूल्यांकन,</li>
              <li>आगामी अवधि के लिए योजना निर्माण,</li>
              <li>तथा भारत सरकार के दिशा-निर्देशों के अनुरूप सुधारात्मक उपायों पर विचार-विमर्श किया जाता है।</li>
            </ul>
            <p className="text-lg mb-8">
              राजका द्वारा प्राप्त सुझावों के आधार पर संस्थान में हिंदी के प्रयोग को और अधिक सुदृढ़ बनाया जाता है।
            </p>
          </div>

          {/* Committee Structure Section */}
          <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8">
            <h3 className="text-2xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
              1. राजभाषा कार्यान्वयन समिति की संरचना
            </h3>
            
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm mb-10">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left">
                <thead className="bg-gray-50 dark:bg-slate-900/50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider w-24">
                      क्रम संख्या
                    </th>
                    <th scope="col" className="px-6 py-4 text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      नाम एवं पदनाम
                    </th>
                    <th scope="col" className="px-6 py-4 text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      समिति में भूमिका
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300 text-base">
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-900/30">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">1</td>
                    <td className="px-6 py-4">कुलसचिव</td>
                    <td className="px-6 py-4 whitespace-nowrap">अध्यक्ष</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-900/30">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">2</td>
                    <td className="px-6 py-4">सह-अधिष्ठाता (शैक्षणिक)</td>
                    <td className="px-6 py-4 whitespace-nowrap">सदस्य</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-900/30">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">3</td>
                    <td className="px-6 py-4">सह-अधिष्ठाता (अनुसंधान, विकास एवं संकाय कल्याण)</td>
                    <td className="px-6 py-4 whitespace-nowrap">सदस्य</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-900/30">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">4</td>
                    <td className="px-6 py-4">विभागाध्यक्ष, कंप्यूटर साइंस एंड इंजीनियरिंग</td>
                    <td className="px-6 py-4 whitespace-nowrap">सदस्य</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-900/30">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">5</td>
                    <td className="px-6 py-4">विभागाध्यक्ष, इलेक्ट्रॉनिक्स एंड कम्युनिकेशन इंजीनियरिंग</td>
                    <td className="px-6 py-4 whitespace-nowrap">सदस्य</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-900/30">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">6</td>
                    <td className="px-6 py-4">विभागाध्यक्ष, एप्लाइड साइंस एंड ह्यूमैनिटीज</td>
                    <td className="px-6 py-4 whitespace-nowrap">सदस्य</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-900/30">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">7</td>
                    <td className="px-6 py-4">डॉ. महेंद्र प्रताप यादव, संकाय प्रभारी (राजभाषा कार्यान्वयन)</td>
                    <td className="px-6 py-4 whitespace-nowrap">सदस्य</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-slate-900/30">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">8</td>
                    <td className="px-6 py-4">श्री आनंद मोहन, कनिष्ठ अधीक्षक, स्थापना अनुभाग</td>
                    <td className="px-6 py-4 whitespace-nowrap">सदस्य-सचिव</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Responsibilities Section */}
          <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8">
            <h3 className="text-2xl font-bold font-serif text-primary dark:text-blue-400 mb-6">
              2. समिति के कार्य एवं दायित्व
            </h3>
            
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-justify">
              <li className="flex items-start">
                <span className="font-bold text-primary dark:text-blue-400 mr-3">अ.</span>
                <span>गृह मंत्रालय, भारत सरकार, राजभाषा विभाग द्वारा जारी वार्षिक कार्यक्रम के लक्ष्यों की प्राप्ति हेतु आवश्यक कार्रवाई सुनिश्चित करना।</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary dark:text-blue-400 mr-3">ब.</span>
                <span>समिति की बैठक प्रत्येक तिमाही में अनिवार्य रूप से आयोजित करना तथा कार्यवृत्त संधारित करना।</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary dark:text-blue-400 mr-3">स.</span>
                <span>संस्थान की तिमाही प्रगति रिपोर्ट (QPR) की समीक्षा करना एवं प्रशासनिक, शैक्षणिक तथा तकनीकी कार्यों में हिंदी के प्रयोग को बढ़ावा देने हेतु सुझाव प्रस्तुत करना।</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-primary dark:text-blue-400 mr-3">द.</span>
                <span>सम्मानित संसदीय समिति एवं राजभाषा विभाग, शिक्षा मंत्रालय के दिशानिर्देशों का अनुपालन करना एवं राजभाषा नीति के अनुपालन में पाई गई कमियों की पहचान कर सुधारात्मक उपाय सुनिश्चित करना।</span>
              </li>
            </ul>
          </div>

          {/* Orders Section */}
          <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-4">
            <p className="font-semibold text-gray-900 dark:text-white">
              3. यह आदेश सक्षम प्राधिकारी के अनुमोदन से जारी किया जाता है।
            </p>
            <p className="font-semibold text-gray-900 dark:text-white">
              4. यह आदेश तत्काल प्रभाव से लागू होगा।
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RajbhashaBaithakPage;
